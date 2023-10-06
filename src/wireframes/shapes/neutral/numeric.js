"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Numeric = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = '43',
    _a);
var Numeric = /** @class */ (function () {
    function Numeric() {
    }
    Numeric.prototype.identifier = function () {
        return 'Numeric';
    };
    Numeric.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Numeric.prototype.defaultSize = function () {
        return { x: 80, y: 30 };
    };
    Numeric.prototype.render = function (ctx) {
        var clickSize = Math.min(40, Math.min(0.8 * ctx.rect.width, ctx.rect.height));
        this.createInputArea(ctx, clickSize);
        this.createText(ctx, clickSize);
        this.createClickArea(ctx, clickSize);
        this.createIncrementer(ctx, clickSize);
        this.createDecrementer(ctx, clickSize);
    };
    Numeric.prototype.createClickArea = function (ctx, clickSize) {
        var clickAreaRect = new interface_1.Rect2(ctx.rect.right - clickSize, 0, clickSize, ctx.rect.height);
        ctx.renderer2.roundedRectangleRight(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, clickAreaRect, function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
    };
    Numeric.prototype.createIncrementer = function (ctx, clickSize) {
        var y = ctx.rect.height * 0.35;
        var x = ctx.rect.right - 0.5 * clickSize;
        var w = clickSize * 0.3;
        var h = clickSize * 0.2;
        var path = "M".concat(x - 0.5 * w, ",").concat(y, " L").concat(x, ",").concat(y - h, ",L").concat(x + 0.5 * w, ",").concat(y, " z");
        ctx.renderer2.path(0, path, function (p) {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    };
    Numeric.prototype.createDecrementer = function (ctx, clickSize) {
        var y = ctx.rect.height * 0.65;
        var x = ctx.rect.right - 0.5 * clickSize;
        var w = clickSize * 0.3;
        var h = clickSize * 0.2;
        var path = "M".concat(x - 0.5 * w, ",").concat(y, " L").concat(x, ",").concat(y + h, ",L").concat(x + 0.5 * w, ",").concat(y, " z");
        ctx.renderer2.path(0, path, function (p) {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    };
    Numeric.prototype.createInputArea = function (ctx, clickSize) {
        var inputAreaRect = new interface_1.Rect2(0, 0, ctx.rect.width - clickSize + 1, ctx.rect.height);
        ctx.renderer2.roundedRectangleLeft(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, inputAreaRect, function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(0xffffff);
        });
    };
    Numeric.prototype.createText = function (ctx, clickSize) {
        var textRect = new interface_1.Rect2(14, 4, Math.max(0, ctx.rect.width - clickSize - 6), Math.max(0, ctx.rect.height - 8));
        ctx.renderer2.text(ctx.shape, textRect, function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return Numeric;
}());
exports.Numeric = Numeric;
