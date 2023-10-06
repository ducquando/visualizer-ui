"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Button = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.TEXT] = 'Button',
    _a);
var Button = /** @class */ (function () {
    function Button() {
    }
    Button.prototype.identifier = function () {
        return 'Button';
    };
    Button.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Button.prototype.defaultSize = function () {
        return { x: 100, y: 30 };
    };
    Button.prototype.render = function (ctx) {
        this.createBorder(ctx);
        this.createText(ctx);
    };
    Button.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        });
    };
    Button.prototype.createText = function (ctx) {
        ctx.renderer2.text(ctx.shape, ctx.rect.deflate(14, 4), function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return Button;
}());
exports.Button = Button;
