"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var svg = require("@svgdotjs/svg.js");
var core_1 = require("@app/core");
var svg_renderer2_1 = require("./svg-renderer2");
describe('SVGRenderer2', function () {
    var renderer;
    var container;
    var root;
    var bounds = new core_1.Rect2(0, 0, 100, 100);
    beforeEach(function () {
        root = svg.SVG().addTo(document.body);
        container = new svg.G().addTo(root);
        renderer = new svg_renderer2_1.SVGRenderer2();
        renderer.setContainer(container);
    });
    describe('Process', function () {
        it('should render same element', function () {
            renderRect();
            var rendered1 = container.get(0);
            renderRect();
            var rendered2 = container.get(0);
            expect(rendered2).toBe(rendered1);
            expect(container.children().length).toEqual(1);
        });
        it('should render same element with different colors', function () {
            renderWithBackground('#00ff00');
            var rendered1 = container.get(0);
            renderWithBackground('#ff0000');
            var rendered2 = container.get(0);
            expect(rendered2).toBe(rendered1);
            expect(rendered2.fill()).toEqual('#ff0000');
            expect(container.children().length).toEqual(1);
        });
        it('should reuse element when element changed', function () {
            renderConditional(true);
            var rendered1 = container.get(2);
            renderConditional(false);
            var rendered2 = container.get(2);
            expect(rendered2).toBe(rendered1);
            expect(container.children().length).toEqual(3);
        });
        it('should not reuse element when element added', function () {
            renderAdded(false);
            var rendered1 = container.get(2);
            renderAdded(true);
            var rendered2 = container.get(2);
            expect(rendered2).not.toBe(rendered1);
            expect(container.children().length).toEqual(4);
        });
        it('should remove old elements', function () {
            renderAdded(true);
            renderAdded(false);
            expect(container.children().length).toEqual(3);
        });
        it('should set clip element', function () {
            renderWithClip(true);
            var rendered = container.get(0);
            expect(rendered.attr('clip-path')).toBeDefined();
            expect(rendered.children().length).toEqual(2);
        });
        it('should unset clip element', function () {
            renderWithClip(true);
            var rendered1 = container.get(0);
            renderWithClip(false);
            var rendered2 = container.get(0);
            expect(rendered2).toBe(rendered1);
            expect(rendered2.attr('clip-path')).not.toBeDefined();
            expect(rendered2.children().length).toEqual(1);
        });
        it('should only allow one clip element', function () {
            expect(function () {
                render(function (r) {
                    r.group(function (g) {
                        g.rectangle(1, 0, bounds);
                    }, function (c) {
                        c.rectangle(1, 0, bounds);
                        c.rectangle(1, 0, bounds);
                    });
                });
            }).toThrowError();
        });
        function renderRect() {
            render(function (r) {
                r.rectangle(1, 10, bounds);
            });
        }
        function renderWithBackground(color) {
            render(function (r) {
                r.rectangle(1, 10, bounds, function (p) {
                    p.setBackgroundColor(color);
                });
            });
        }
        function renderConditional(condition) {
            render(function (r) {
                r.rectangle(1, 10, bounds);
                if (condition) {
                    r.path(1, '');
                }
                else {
                    r.ellipse(1, bounds);
                }
                r.rectangle(1, 10, bounds);
            });
        }
        function renderAdded(condition) {
            render(function (r) {
                r.rectangle(1, 10, bounds);
                if (condition) {
                    r.ellipse(1, bounds);
                    r.ellipse(1, bounds);
                }
                else {
                    r.ellipse(1, bounds);
                }
                r.rectangle(1, 10, bounds);
            });
        }
        function renderWithClip(clip) {
            render(function (r) {
                r.group(function (g) {
                    g.rectangle(1, 0, bounds);
                }, function (c) {
                    if (clip) {
                        c.rectangle(1, 0, bounds);
                    }
                });
            });
        }
    });
    describe('Elements', function () {
        it('should render ellipse', function () {
            render(function (r) {
                r.ellipse(1, bounds);
            });
            expect(container.get(0).node.tagName).toEqual('ellipse');
        });
        it('should render path', function () {
            render(function (r) {
                r.path(1, 'M0,0 L10,10');
            });
            expect(container.get(0).node.tagName).toEqual('path');
        });
        it('should render raster', function () {
            render(function (r) {
                r.raster('source', bounds);
            });
            expect(container.get(0).node.tagName).toEqual('image');
        });
        it('should render rectangle', function () {
            render(function (r) {
                r.rectangle(1, 10, bounds);
            });
            expect(container.get(0).node.tagName).toEqual('rect');
        });
        it('should render rounded rectangle bottom', function () {
            render(function (r) {
                r.roundedRectangleBottom(1, 10, new core_1.Rect2(0, 0, 10, 10));
            });
            expect(container.get(0).node.tagName).toEqual('path');
        });
        it('should render rounded rectangle left', function () {
            render(function (r) {
                r.roundedRectangleLeft(1, 10, new core_1.Rect2(0, 0, 10, 10));
            });
            expect(container.get(0).node.tagName).toEqual('path');
        });
        it('should render rounded rectangle right', function () {
            render(function (r) {
                r.roundedRectangleRight(1, 10, new core_1.Rect2(0, 0, 10, 10));
            });
            expect(container.get(0).node.tagName).toEqual('path');
        });
        it('should render rounded rectangle top', function () {
            render(function (r) {
                r.roundedRectangleTop(1, 10, new core_1.Rect2(0, 0, 10, 10));
            });
            expect(container.get(0).node.tagName).toEqual('path');
        });
        it('should render text', function () {
            render(function (r) {
                r.text({}, bounds);
            });
            expect(container.get(0).node.tagName).toEqual('foreignObject');
        });
        it('should render multiline text', function () {
            render(function (r) {
                r.textMultiline({}, bounds);
            });
            expect(container.get(0).node.tagName).toEqual('foreignObject');
        });
    });
    describe('Properties', function () {
        it('should render background', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setBackgroundColor('#ff0000');
                });
            });
            expect(container.get(0).fill()).toEqual('#ff0000');
        });
        it('should render background from shape', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setBackgroundColor({ backgroundColor: '#ff0000', getAppearance: function () { return false; } });
                });
            });
            expect(container.get(0).fill()).toEqual('#ff0000');
        });
        it('should render foreground color', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setForegroundColor('#00ff00');
                });
            });
            expect(container.get(0).attr('color')).toEqual('#00ff00');
        });
        it('should render foreground from shape', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setForegroundColor({ foregroundColor: '#00ff00', getAppearance: function () { return false; } });
                });
            });
            expect(container.get(0).attr('color')).toEqual('#00ff00');
        });
        it('should render stroke color', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setStrokeColor('#0000ff');
                });
            });
            expect(container.get(0).stroke()).toEqual('#0000ff');
        });
        it('should render stroke color from shape', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setStrokeColor({ strokeColor: '#0000ff', getAppearance: function () { return false; } });
                });
            });
            expect(container.get(0).stroke()).toEqual('#0000ff');
        });
        it('should render stroke style', function () {
            render(function (r) {
                r.rectangle(1, 0, bounds, function (p) {
                    p.setStrokeStyle('rounded', 'squared');
                });
            });
            expect(container.get(0).attr('stroke-linecap')).toEqual('rounded');
            expect(container.get(0).attr('stroke-linejoin')).toEqual('squared');
        });
        it('should render font family', function () {
            render(function (r) {
                r.text({}, bounds, function (p) {
                    p.setFontFamily('Arial');
                });
            });
            expect(container.get(0).node.children[0].style.fontFamily).toEqual('Arial');
        });
        it('should render font family from shape', function () {
            render(function (r) {
                r.text({}, bounds, function (p) {
                    p.setFontFamily({ fontFamily: 'Arial', getAppearance: function () { return false; } });
                });
            });
            expect(container.get(0).node.children[0].style.fontFamily).toEqual('Arial');
        });
        it('should render opacity', function () {
            render(function (r) {
                r.text({}, bounds, function (p) {
                    p.setOpacity(0.3);
                });
            });
            expect(container.get(0).opacity()).toEqual(0.3);
        });
        it('should render opacity from shape', function () {
            render(function (r) {
                r.text({}, bounds, function (p) {
                    p.setOpacity({ opacity: 0.3, getAppearance: function () { return false; } });
                });
            });
            expect(container.get(0).opacity()).toEqual(0.3);
        });
        it('should render text', function () {
            render(function (r) {
                r.text({}, bounds, function (p) {
                    p.setText('Text');
                });
            });
            expect((container.get(0).node.children[0]).textContent).toEqual('Text');
        });
        it('should render text from shape', function () {
            render(function (r) {
                r.text({}, bounds, function (p) {
                    p.setText({ text: 'Text', getAppearance: function () { return false; } });
                });
            });
            expect((container.get(0).node.children[0]).textContent).toEqual('Text');
        });
    });
    function render(action) {
        renderer.setContainer(container);
        action(renderer);
        renderer.cleanupAll();
    }
});
