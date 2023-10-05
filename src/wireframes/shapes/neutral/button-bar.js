"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.ButtonBar = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var ACCENT_COLOR = 'ACCENT_COLOR';
var DEFAULT_APPEARANCE = (_a = {},
    _a[ACCENT_COLOR] = 0x2171b5,
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.TEXT] = 'left,middle*,right',
    _a);
var ButtonBar = /** @class */ (function () {
    function ButtonBar() {
    }
    ButtonBar.prototype.identifier = function () {
        return 'ButtonBar';
    };
    ButtonBar.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    ButtonBar.prototype.defaultSize = function () {
        return { x: 180, y: 30 };
    };
    ButtonBar.prototype.configurables = function (factory) {
        return [
            factory.color(ACCENT_COLOR, 'Accent Color'),
        ];
    };
    ButtonBar.prototype.render = function (ctx) {
        var _this = this;
        var w = ctx.rect.width;
        var h = ctx.rect.height;
        var parts = this.parseText(ctx.shape);
        var itemWidth = Math.floor(w / parts.length);
        var itemHeight = h;
        var accentColor = interface_1.Color.fromValue(ctx.shape.getAppearance(ACCENT_COLOR));
        var renderButtons = function (selected) {
            var x = 0;
            var _loop_1 = function (i) {
                var part = parts[i];
                if (part.selected === selected) {
                    var isLast = i === parts.length - 1;
                    var isFirst = i === 0;
                    var width = isLast ? (w - x) : itemWidth;
                    var bounds = new interface_1.Rect2(x, 0, width, itemHeight);
                    if (parts.length === 1) {
                        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, bounds, function (p) {
                            _this.stylePart(part, ctx, accentColor, p);
                        });
                    }
                    else if (isFirst) {
                        ctx.renderer2.roundedRectangleLeft(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, bounds, function (p) {
                            _this.stylePart(part, ctx, accentColor, p);
                        });
                    }
                    else if (isLast) {
                        ctx.renderer2.roundedRectangleRight(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, bounds, function (p) {
                            _this.stylePart(part, ctx, accentColor, p);
                        });
                    }
                    else {
                        ctx.renderer2.rectangle(ctx.shape, 0, bounds, function (p) {
                            _this.stylePart(part, ctx, accentColor, p);
                        });
                    }
                    // Button text.
                    ctx.renderer2.text(ctx.shape, bounds.deflate(4), function (p) {
                        if (part.selected) {
                            if (accentColor.luminance > 0.4) {
                                p.setForegroundColor(0);
                            }
                            else {
                                p.setForegroundColor(0xffffff);
                            }
                        }
                        else {
                            p.setForegroundColor(ctx.shape);
                        }
                        p.setText(part.text);
                    });
                }
                x += itemWidth;
            };
            for (var i = 0; i < parts.length; i++) {
                _loop_1(i);
            }
        };
        renderButtons(false);
        renderButtons(true);
    };
    ButtonBar.prototype.stylePart = function (part, ctx, accentColor, p) {
        if (part.selected) {
            p.setBackgroundColor(accentColor);
            p.setStrokeColor(accentColor);
        }
        else {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        }
    };
    ButtonBar.prototype.parseText = function (shape) {
        var key = shape.text;
        var result = shape.renderCache['PARSED'];
        if (!result || result.key !== key) {
            var parts = key.split(',');
            var parsed = parts.map(function (text) {
                var selected = text.endsWith('*');
                if (selected) {
                    return { text: text.substring(0, text.length - 1).trim(), selected: selected };
                }
                else {
                    return { text: text, selected: selected };
                }
            });
            result = { parsed: parsed, key: key };
            shape.renderCache['PARSED'] = result;
        }
        return result.parsed;
    };
    return ButtonBar;
}());
exports.ButtonBar = ButtonBar;
