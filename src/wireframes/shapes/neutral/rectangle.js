"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Rectangle = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var BORDER_RADIUS = 'BORDER_RADIUS';
var PADDING_HORIZONTAL = 'PADDING_HORIZONTAL2';
var PADDING_VERTICAL = 'PADDING_VERTICAL2';
var DEFAULT_APPEARANCE = (_a = {},
    _a[BORDER_RADIUS] = 0,
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.TEXT] = 'Rectangle',
    _a[PADDING_HORIZONTAL] = 10,
    _a[PADDING_VERTICAL] = 10,
    _a);
var Rectangle = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.identifier = function () {
        return 'Rectangle';
    };
    Rectangle.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Rectangle.prototype.defaultSize = function () {
        return { x: 100, y: 60 };
    };
    Rectangle.prototype.configurables = function (factory) {
        return [
            factory.slider(BORDER_RADIUS, 'Border Radius', 0, 40),
            factory.number(PADDING_HORIZONTAL, 'Padding Horizontal', 0, 40),
            factory.number(PADDING_VERTICAL, 'Padding Vertical', 0, 40),
        ];
    };
    Rectangle.prototype.render = function (ctx) {
        this.createShape(ctx);
        this.createText(ctx);
    };
    Rectangle.prototype.createShape = function (ctx) {
        var borderRadius = ctx.shape.getAppearance(BORDER_RADIUS);
        ctx.renderer2.rectangle(ctx.shape, borderRadius, ctx.rect, function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
    };
    Rectangle.prototype.createText = function (ctx) {
        var paddingVertical = ctx.shape.getAppearance(PADDING_VERTICAL);
        var paddingHorizontal = ctx.shape.getAppearance(PADDING_HORIZONTAL);
        ctx.renderer2.text(ctx.shape, ctx.rect.deflate(paddingHorizontal, paddingVertical), function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
