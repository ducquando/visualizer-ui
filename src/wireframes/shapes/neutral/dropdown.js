"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Dropdown = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'Dropdown',
    _a);
var Dropdown = /** @class */ (function () {
    function Dropdown() {
    }
    Dropdown.prototype.identifier = function () {
        return 'Dropdown';
    };
    Dropdown.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Dropdown.prototype.defaultSize = function () {
        return { x: 120, y: 30 };
    };
    Dropdown.prototype.render = function (ctx) {
        var clickArea = Math.min(40, Math.min(0.8 * ctx.rect.width, ctx.rect.height));
        this.createBorder(ctx);
        this.createText(ctx, clickArea);
        this.createClickTriangle(ctx, clickArea);
    };
    Dropdown.prototype.createClickTriangle = function (ctx, clickSize) {
        var y = ctx.rect.height * 0.5;
        var x = ctx.rect.right - 0.5 * clickSize;
        var w = clickSize * 0.3;
        var h = clickSize * 0.2;
        var path = "M".concat(x - 0.5 * w, ",").concat(y - 0.4 * h, " L").concat(x, ",").concat(y + 0.6 * h, ",L").concat(x + 0.5 * w, ",").concat(y - 0.4 * h, " z");
        ctx.renderer2.path(0, path, function (p) {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    };
    Dropdown.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        });
    };
    Dropdown.prototype.createText = function (ctx, clickSize) {
        var textRect = new interface_1.Rect2(14, 4, Math.max(0, ctx.rect.width - clickSize - 6), Math.max(0, ctx.rect.height - 8));
        ctx.renderer2.text(ctx.shape, textRect, function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return Dropdown;
}());
exports.Dropdown = Dropdown;
