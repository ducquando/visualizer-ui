"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.TextArea = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'TextArea',
    _a);
var TextArea = /** @class */ (function () {
    function TextArea() {
    }
    TextArea.prototype.identifier = function () {
        return 'TextArea';
    };
    TextArea.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    TextArea.prototype.defaultSize = function () {
        return { x: 160, y: 60 };
    };
    TextArea.prototype.previewSize = function (desiredWidth) {
        return { x: desiredWidth, y: 60 };
    };
    TextArea.prototype.render = function (ctx) {
        this.createBorder(ctx);
        this.createText(ctx);
    };
    TextArea.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        });
    };
    TextArea.prototype.createText = function (ctx) {
        ctx.renderer2.textMultiline(ctx.shape, ctx.rect.deflate(14, 4), function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return TextArea;
}());
exports.TextArea = TextArea;
