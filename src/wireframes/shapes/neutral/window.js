"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Window = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var OFFSET = { left: 2, top: 30, right: 2, bottom: 1 };
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var Window = /** @class */ (function () {
    function Window() {
    }
    Window.prototype.identifier = function () {
        return 'Window';
    };
    Window.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Window.prototype.defaultSize = function () {
        return { x: 800, y: 600 };
    };
    Window.prototype.previewSize = function () {
        return { x: 400, y: 300 };
    };
    Window.prototype.previewOffset = function () {
        return OFFSET;
    };
    Window.prototype.render = function (ctx) {
        this.createWindow(ctx);
        if (ctx.rect.width >= 50 && ctx.rect.height > 200) {
            this.createInner(ctx);
            this.createButtons(ctx);
        }
    };
    Window.prototype.createWindow = function (ctx) {
        var windowRect = new interface_1.Rect2(-OFFSET.left, -OFFSET.top, ctx.rect.width + OFFSET.left + OFFSET.right, ctx.rect.height + OFFSET.top + OFFSET.bottom);
        ctx.renderer2.rectangle(1, 0, windowRect, function (p) {
            p.setBackgroundColor(_theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR);
            p.setStrokeColor(_theme_1.CommonTheme.CONTROL_BORDER_COLOR);
        });
    };
    Window.prototype.createInner = function (ctx) {
        ctx.renderer2.rectangle(0, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
        });
    };
    Window.prototype.createButtons = function (ctx) {
        ctx.renderer2.ellipse(0, new interface_1.Rect2(10, -20, 12, 12), function (p) {
            p.setBackgroundColor(0xff0000);
        });
        ctx.renderer2.ellipse(0, new interface_1.Rect2(30, -20, 12, 12), function (p) {
            p.setBackgroundColor(0xffff00);
        });
        ctx.renderer2.ellipse(0, new interface_1.Rect2(50, -20, 12, 12), function (p) {
            p.setBackgroundColor(0x00ff00);
        });
    };
    return Window;
}());
exports.Window = Window;
