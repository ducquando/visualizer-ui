"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.SVGRenderer2 = void 0;
/* eslint-disable quote-props */
var svg = require("@svgdotjs/svg.js");
var marked_1 = require("marked");
var core_1 = require("@app/core");
var katex = require('katex');
__exportStar(require("./abstract-renderer"), exports);
var Factory = /** @class */ (function () {
    function Factory() {
        this.container = null;
        this.containerIndex = 0;
        this.clipping = false;
        this.wasClipped = false;
    }
    Factory.prototype.getContainer = function () {
        return this.container;
    };
    Factory.prototype.setContainer = function (container, index, clipping) {
        if (index === void 0) { index = 0; }
        if (clipping === void 0) { clipping = false; }
        this.clipping = clipping;
        this.container = container;
        this.containerIndex = index;
        this.wasClipped = false;
    };
    Factory.prototype.getOuterBounds = function (strokeWidth, bounds) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return actualBounds;
    };
    Factory.prototype.rectangle = function (strokeWidth, radius, bounds, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return this["new"]('rect', function () { return new svg.Rect(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setRadius(radius || 0);
            p.setTransform(actualBounds);
        }, properties);
    };
    Factory.prototype.ellipse = function (strokeWidth, bounds, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return this["new"]('ellipse', function () { return new svg.Ellipse(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setTransform(actualBounds);
        }, properties);
    };
    Factory.prototype.roundedRectangleLeft = function (strokeWidth, radius, bounds, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return this["new"]('path', function () { return new svg.Path(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setPath(core_1.SVGHelper.roundedRectangleLeft(actualBounds, radius));
        }, properties);
    };
    Factory.prototype.roundedRectangleRight = function (strokeWidth, radius, bounds, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return this["new"]('path', function () { return new svg.Path(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setPath(core_1.SVGHelper.roundedRectangleRight(actualBounds, radius));
        }, properties);
    };
    Factory.prototype.roundedRectangleTop = function (strokeWidth, radius, bounds, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return this["new"]('path', function () { return new svg.Path(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setPath(core_1.SVGHelper.roundedRectangleTop(actualBounds, radius));
        }, properties);
    };
    Factory.prototype.roundedRectangleBottom = function (strokeWidth, radius, bounds, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        var actualBounds = getBounds(bounds, actualStroke);
        return this["new"]('path', function () { return new svg.Path(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setPath(core_1.SVGHelper.roundedRectangleBottom(actualBounds, radius));
        }, properties);
    };
    Factory.prototype.path = function (strokeWidth, path, properties) {
        var actualStroke = getStrokeWidth(strokeWidth);
        return this["new"]('path', function () { return new svg.Path(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setStrokeWidth(actualStroke);
            p.setPath(path);
        }, properties);
    };
    Factory.prototype.text = function (config, bounds, properties, allowMarkdown) {
        return this["new"]('foreignObject', function () { return core_1.SVGHelper.createText(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setText(config === null || config === void 0 ? void 0 : config.text, allowMarkdown);
            p.setFontSize(config);
            p.setFontFamily(config);
            p.setAlignment(config);
            p.setVerticalAlignment('middle');
            p.setTransform(bounds);
        }, properties);
    };
    Factory.prototype.textMultiline = function (config, bounds, properties, allowMarkdown) {
        return this["new"]('foreignObject', function () { return core_1.SVGHelper.createText(); }, function (p) {
            var _a;
            p.setBackgroundColor('transparent');
            p.setText((_a = config === null || config === void 0 ? void 0 : config.text) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, '<br />'), allowMarkdown);
            p.setFontSize(config);
            p.setFontFamily(config);
            p.setAlignment(config);
            p.setVerticalAlignment('top');
            p.setTransform(bounds);
        }, properties);
    };
    Factory.prototype.equation = function (config, bounds, properties) {
        return this["new"]('foreignObject', function () { return core_1.SVGHelper.createText(); }, function (p) {
            var _a;
            p.setBackgroundColor('transparent');
            p.setKatex((_a = config === null || config === void 0 ? void 0 : config.text) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, ' \\newline '));
            p.setFontSize(config);
            p.setAlignment(config);
            p.setVerticalAlignment('top');
            p.setTransform(bounds);
        }, properties);
    };
    Factory.prototype.raster = function (source, bounds, preserveAspectRatio, properties) {
        return this["new"]('image', function () { return new svg.Image(); }, function (p) {
            p.setBackgroundColor('transparent');
            p.setPreserveAspectValue(preserveAspectRatio);
            p.setImage(source);
            p.setTransform(bounds);
        }, properties);
    };
    Factory.prototype.group = function (items, clip, properties) {
        var _this = this;
        return this["new"]('g', function () { return new svg.G(); }, function (_, group) {
            var clipping = _this.clipping;
            var container = _this.container;
            var containerIndex = _this.containerIndex;
            var wasClipped = _this.wasClipped;
            _this.container = group;
            _this.containerIndex = 0;
            if (items) {
                items(_this);
            }
            if (clip) {
                _this.clipping = true;
                clip(_this);
            }
            _this.cleanupAll();
            _this.clipping = clipping;
            _this.container = container;
            _this.containerIndex = containerIndex;
            _this.wasClipped = wasClipped;
        }, properties);
    };
    Factory.prototype["new"] = function (name, factory, defaults, customProperties) {
        var _a;
        var element;
        if (this.wasClipped) {
            throw new Error('Only one clipping element is supported.');
        }
        var properties = Properties.INSTANCE;
        if (this.clipping) {
            element = (_a = this.container.clipper()) === null || _a === void 0 ? void 0 : _a.get(0);
            if (!element || element.node.tagName !== name) {
                element = factory();
                var clipPath = new svg.ClipPath();
                clipPath.add(element);
                this.container.add(clipPath);
                this.container.clipWith(clipPath);
            }
            this.wasClipped = true;
        }
        else {
            element = this.container.get(this.containerIndex);
            if (!element) {
                element = factory();
                element.addTo(this.container);
            }
            else if (element.node.tagName !== name) {
                var previous = element;
                element = factory();
                element.insertAfter(previous);
                previous.remove();
            }
            this.containerIndex++;
        }
        properties.setElement(element);
        if (defaults) {
            defaults(properties, element);
        }
        if (customProperties) {
            customProperties(properties);
        }
        properties.sync();
        return element;
    };
    Factory.prototype.cleanupAll = function () {
        var childNodes = this.container.node.childNodes;
        var childrenSize = childNodes.length;
        for (var i = childrenSize - 1; i >= this.containerIndex; i--) {
            var last = childNodes[i];
            if (last.nodeName === 'clipPath' && this.wasClipped) {
                i--;
            }
            else {
                last.remove();
            }
        }
        if (!this.wasClipped) {
            this.container.unclip();
        }
    };
    return Factory;
}());
var SVGRenderer2 = /** @class */ (function (_super) {
    __extends(SVGRenderer2, _super);
    function SVGRenderer2() {
        var _this = _super.call(this) || this;
        _this.measureDiv = document.createElement('div');
        _this.measureDiv.style.height = 'auto';
        _this.measureDiv.style.position = 'absolute';
        _this.measureDiv.style.visibility = 'hidden';
        _this.measureDiv.style.width = 'auto';
        _this.measureDiv.style.whiteSpace = 'nowrap';
        document.body.appendChild(_this.measureDiv);
        return _this;
    }
    SVGRenderer2.prototype.getLocalBounds = function (element) {
        var e = this.getElement(element);
        if (!e.visible()) {
            return core_1.Rect2.EMPTY;
        }
        var box = e.bbox();
        return core_1.SVGHelper.box2Rect(box);
    };
    SVGRenderer2.prototype.getBounds = function (element) {
        var e = this.getElement(element);
        if (!e.visible()) {
            return core_1.Rect2.EMPTY;
        }
        var box = e.bbox().transform(e.matrixify());
        return core_1.SVGHelper.box2Rect(box);
    };
    SVGRenderer2.prototype.getElement = function (element) {
        if (element.textElement) {
            return element.textElement;
        }
        else {
            return element;
        }
    };
    SVGRenderer2.prototype.getTextWidth = function (text, fontSize, fontFamily) {
        this.measureDiv.textContent = text;
        this.measureDiv.style.fontSize = (0, core_1.sizeInPx)(fontSize);
        this.measureDiv.style.fontFamily = fontFamily;
        return this.measureDiv.clientWidth + 1;
    };
    SVGRenderer2.INSTANCE = new SVGRenderer2();
    return SVGRenderer2;
}(Factory));
exports.SVGRenderer2 = SVGRenderer2;
var PROPERTIES = [
    'color',
    'fill',
    'font-family',
    'font-size',
    'image',
    'katex',
    'markdown',
    'opacity',
    'preserve-aspect-ratio',
    'radius',
    'stroke',
    'stroke-cap',
    'stroke-line-join',
    'stroke-width',
    'path',
    'text',
    'text-alignment',
    'text-decoration',
    'vertical-alignment',
    'transform', // Transform must be last.
];
var Properties = /** @class */ (function () {
    function Properties() {
        this.element = null;
        this.propertiesNew = {};
        this.propertiesOld = {};
    }
    Object.defineProperty(Properties.prototype, "shape", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    Properties.prototype.setElement = function (element) {
        if (element.textElement) {
            this.element = element.textElement;
        }
        else {
            this.element = element;
        }
        this.propertiesNew = {};
        this.propertiesOld = this.element.node['properties'] || {};
    };
    Properties.prototype.setBackgroundColor = function (color) {
        this.propertiesNew['fill'] = getBackgroundColor(color);
        return this;
    };
    Properties.prototype.setForegroundColor = function (color) {
        this.propertiesNew['color'] = getForegroundColor(color);
        return this;
    };
    Properties.prototype.setStrokeColor = function (color) {
        this.propertiesNew['stroke'] = getStrokeColor(color);
        return this;
    };
    Properties.prototype.setStrokeWidth = function (width) {
        this.propertiesNew['stroke-width'] = width;
        return this;
    };
    Properties.prototype.setPath = function (path) {
        this.propertiesNew['path'] = path;
        return this;
    };
    Properties.prototype.setPreserveAspectValue = function (value) {
        this.propertiesNew['preserve-aspect-ratio'] = value;
        return this;
    };
    Properties.prototype.setRadius = function (radius) {
        this.propertiesNew['radius'] = radius || 0;
        return this;
    };
    Properties.prototype.setTransform = function (rect) {
        this.propertiesNew['transform'] = rect;
        return this;
    };
    Properties.prototype.setImage = function (source) {
        this.propertiesNew['image'] = source;
        return this;
    };
    Properties.prototype.setFontSize = function (fontSize) {
        this.propertiesNew['font-size'] = getFontSize(fontSize);
        return this;
    };
    Properties.prototype.setFontFamily = function (fontFamily) {
        this.propertiesNew['font-family'] = getFontFamily(fontFamily);
        return this;
    };
    Properties.prototype.setAlignment = function (alignment) {
        this.propertiesNew['text-alignment'] = getTextAlignment(alignment);
        return this;
    };
    Properties.prototype.setTextDecoration = function (decoration) {
        this.propertiesNew['text-decoration'] = decoration;
        return this;
    };
    Properties.prototype.setVerticalAlignment = function (alignment) {
        this.propertiesNew['vertical-alignment'] = alignment;
        return this;
    };
    Properties.prototype.setStrokeStyle = function (cap, join) {
        this.propertiesNew['stroke-cap'] = cap;
        this.propertiesNew['stroke-line-join'] = join;
        return this;
    };
    Properties.prototype.setOpacity = function (opacity) {
        var value = getOpacity(opacity);
        if (Number.isFinite(value)) {
            this.propertiesNew['opacity'] = value;
        }
        return this;
    };
    Properties.prototype.setText = function (text, markdown) {
        if (markdown) {
            this.propertiesNew['markdown'] = getText(text);
        }
        else {
            this.propertiesNew['text'] = getText(text);
        }
        return this;
    };
    Properties.prototype.setKatex = function (text) {
        this.propertiesNew['katex'] = getText(text);
        return this;
    };
    Properties.prototype.sync = function () {
        for (var _i = 0, PROPERTIES_1 = PROPERTIES; _i < PROPERTIES_1.length; _i++) {
            var key = PROPERTIES_1[_i];
            var value = this.propertiesNew[key];
            if (!core_1.Types.equals(value, this.propertiesOld[key])) {
                Properties.SETTERS[key](value, this.element);
            }
        }
        this.element.node['properties'] = this.propertiesNew;
    };
    Properties.SETTERS = {
        'color': function (value, element) {
            core_1.SVGHelper.fastSetAttribute(element.node, 'color', value);
        },
        'fill': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'fill', value);
        },
        'opacity': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'opacity', value);
        },
        'preserve-aspect-ratio': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'preserveAspectRatio', value ? 'xMidYMid' : 'none');
        },
        'stroke': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'stroke', value);
        },
        'stroke-cap': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'stroke-linecap', value);
        },
        'stroke-line-join': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'stroke-linejoin', value);
        },
        'stroke-width': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'stroke-width', value);
        },
        'image': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'href', value);
        },
        'path': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'd', value);
        },
        'radius': function (value, element) {
            core_1.SVGHelper.setAttribute(element.node, 'rx', value);
            core_1.SVGHelper.setAttribute(element.node, 'ry', value);
        },
        'font-family': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                div.style.fontFamily = value;
            }
        },
        'font-size': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                div.style.fontSize = "".concat(value, "px");
            }
        },
        'markdown': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                var textOrHtml = marked_1.marked.parseInline(value);
                if (textOrHtml.indexOf('&') >= 0 || textOrHtml.indexOf('<') >= 0) {
                    div.innerHTML = textOrHtml;
                }
                else {
                    div.innerText = textOrHtml;
                }
            }
        },
        'text': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                var textOrHtml = (0, core_1.escapeHTML)(value);
                if (textOrHtml.indexOf('&') >= 0 || textOrHtml.indexOf('<') >= 0) {
                    div.innerHTML = textOrHtml;
                }
                else {
                    div.innerText = textOrHtml;
                }
            }
        },
        'katex': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                var textOrHtml = katex.renderToString(value, {
                    throwOnError: false,
                    output: 'html'
                });
                if (textOrHtml.indexOf('&') >= 0 || textOrHtml.indexOf('<') >= 0) {
                    div.innerHTML = textOrHtml;
                }
                else {
                    div.innerText = textOrHtml;
                }
            }
        },
        'text-alignment': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                div.style.textAlign = value;
            }
        },
        'text-decoration': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                div.style.textDecoration = value;
            }
        },
        'vertical-alignment': function (value, element) {
            var div = element.node.children[0];
            if ((div === null || div === void 0 ? void 0 : div.nodeName) === 'DIV') {
                div.style.verticalAlign = value;
            }
        },
        'transform': function (value, element) {
            core_1.SVGHelper.transformByRect(element, value, false);
        }
    };
    Properties.INSTANCE = new Properties();
    return Properties;
}());
function getBounds(bounds, strokeWidth) {
    var halfStrokeWidth = strokeWidth / 2;
    return bounds.inflate(-halfStrokeWidth, -halfStrokeWidth);
}
function getBackgroundColor(value) {
    if (isShape(value)) {
        return core_1.SVGHelper.toColor(value.backgroundColor);
    }
    else {
        return core_1.SVGHelper.toColor(value);
    }
}
function getForegroundColor(value) {
    if (isShape(value)) {
        return core_1.SVGHelper.toColor(value.foregroundColor);
    }
    else {
        return core_1.SVGHelper.toColor(value);
    }
}
function getStrokeColor(value) {
    if (isShape(value)) {
        return core_1.SVGHelper.toColor(value.strokeColor);
    }
    else {
        return core_1.SVGHelper.toColor(value);
    }
}
function getStrokeWidth(value) {
    if (isShape(value)) {
        return value.strokeThickness;
    }
    else {
        return value || 0;
    }
}
function getText(value) {
    if (isShape(value)) {
        return value.text || '';
    }
    else {
        return (value === null || value === void 0 ? void 0 : value['text']) || value || '';
    }
}
function getTextAlignment(value) {
    if (isShape(value)) {
        return value.textAlignment || 'center';
    }
    else {
        return (value === null || value === void 0 ? void 0 : value['alignment']) || value || 'center';
    }
}
function getFontSize(value) {
    if (isShape(value)) {
        return value.fontSize || 10;
    }
    else {
        return (value === null || value === void 0 ? void 0 : value['fontSize']) || value || 10;
    }
}
function getFontFamily(value) {
    if (isShape(value)) {
        return value.fontFamily || 'inherit';
    }
    else {
        return (value === null || value === void 0 ? void 0 : value['fontFamily']) || value || 10;
    }
}
function getOpacity(value) {
    if (isShape(value)) {
        return value.opacity;
    }
    else {
        return value;
    }
}
function isShape(element) {
    return core_1.Types.isFunction(element === null || element === void 0 ? void 0 : element.getAppearance);
}
