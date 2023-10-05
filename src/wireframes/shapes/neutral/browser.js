"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Browser = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var OFFSET = { left: 4, top: 70, right: 4, bottom: 15 };
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var REFRESH_CODE = String.fromCharCode(0xf021);
var Browser = /** @class */ (function () {
    function Browser() {
    }
    Browser.prototype.identifier = function () {
        return 'Browser';
    };
    Browser.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Browser.prototype.defaultSize = function () {
        return { x: 800, y: 600 };
    };
    Browser.prototype.previewSize = function () {
        return { x: 400, y: 300 };
    };
    Browser.prototype.previewOffset = function () {
        return OFFSET;
    };
    Browser.prototype.render = function (ctx) {
        this.createWindow(ctx);
        if (ctx.rect.width >= 50 && ctx.rect.height > 200) {
            this.createInner(ctx);
            this.createSearch(ctx);
            this.createButtons(ctx);
            this.createIcon(ctx);
        }
    };
    Browser.prototype.createWindow = function (ctx) {
        var windowRect = new interface_1.Rect2(-OFFSET.left, -OFFSET.top, ctx.rect.width + OFFSET.left + OFFSET.right, ctx.rect.height + OFFSET.top + OFFSET.bottom);
        ctx.renderer2.rectangle(1, 0, windowRect, function (p) {
            p.setBackgroundColor(_theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR);
            p.setStrokeColor(_theme_1.CommonTheme.CONTROL_BORDER_COLOR);
        });
    };
    Browser.prototype.createInner = function (ctx) {
        ctx.renderer2.rectangle(0, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
        });
    };
    Browser.prototype.createSearch = function (ctx) {
        var searchRect = new interface_1.Rect2(50, -34, ctx.rect.width - 50, 30);
        ctx.renderer2.rectangle(1, 15, searchRect, function (p) {
            p.setBackgroundColor(0xffffff);
            p.setStrokeColor(_theme_1.CommonTheme.CONTROL_BORDER_COLOR);
        });
    };
    Browser.prototype.createIcon = function (ctx) {
        var iconRect = new interface_1.Rect2(5, -34, 30, 30);
        ctx.renderer2.text({ fontSize: 20, text: REFRESH_CODE, alignment: 'center' }, iconRect, function (p) {
            p.setForegroundColor(0x555555);
            p.setFontFamily('FontAwesome');
        });
    };
    Browser.prototype.createButtons = function (ctx) {
        ctx.renderer2.ellipse(0, new interface_1.Rect2(10, -50, 12, 12), function (p) {
            p.setBackgroundColor(0xff0000);
        });
        ctx.renderer2.ellipse(0, new interface_1.Rect2(30, -50, 12, 12), function (p) {
            p.setBackgroundColor(0xffff00);
        });
        ctx.renderer2.ellipse(0, new interface_1.Rect2(50, -50, 12, 12), function (p) {
            p.setBackgroundColor(0x00ff00);
        });
    };
    return Browser;
}());
exports.Browser = Browser;
