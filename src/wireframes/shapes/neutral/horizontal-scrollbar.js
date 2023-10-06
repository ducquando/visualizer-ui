"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.HorizontalScrollbar = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var ARROW_COLOR = 'ARROW_COLOR';
var THUMB_COLOR = 'BAR_COLOR';
var THUMB_POSITION = 'BAR_POSITION';
var THUMB_SIZE = 'BAR_SIZE';
var DEFAULT_APPEARANCE = (_a = {},
    _a[ARROW_COLOR] = 0xbdbdbd,
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = 2,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a[THUMB_COLOR] = 0xbdbdbd,
    _a[THUMB_POSITION] = 0,
    _a[THUMB_SIZE] = 50,
    _a);
var HorizontalScrollbar = /** @class */ (function () {
    function HorizontalScrollbar() {
    }
    HorizontalScrollbar.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    HorizontalScrollbar.prototype.identifier = function () {
        return 'HorizontalScrollbar';
    };
    HorizontalScrollbar.prototype.defaultSize = function () {
        return { x: 300, y: 20 };
    };
    HorizontalScrollbar.prototype.configurables = function (factory) {
        return [
            factory.color(THUMB_COLOR, 'Thumb Color'),
            factory.slider(THUMB_SIZE, 'Thumb Size', 0, 100),
            factory.slider(THUMB_SIZE, 'Thumb Position', 0, 100),
            factory.color(ARROW_COLOR, 'Arrow Color'),
        ];
    };
    HorizontalScrollbar.prototype.render = function (ctx) {
        var clickSize = Math.min(30, Math.min(0.8 * ctx.rect.width, ctx.rect.height));
        this.createBackground(ctx, clickSize);
        this.createBorder(ctx);
        this.createRightTriangle(ctx, clickSize);
        this.createLeftTriangle(ctx, clickSize);
    };
    HorizontalScrollbar.prototype.createBackground = function (ctx, clickSize) {
        ctx.renderer2.group(function (items) {
            // Rail
            items.rectangle(0, 0, ctx.rect, function (p) {
                p.setBackgroundColor(ctx.shape);
            });
            var barWidth = ctx.shape.getAppearance(THUMB_SIZE) / 100;
            var barOffset = ctx.shape.getAppearance(THUMB_POSITION) / 100 * (ctx.rect.width - 2 * clickSize) * (1 - barWidth);
            var barRect = new interface_1.Rect2(ctx.rect.x + clickSize + barOffset, ctx.rect.y, (ctx.rect.width - 2 * clickSize) * barWidth, ctx.rect.height);
            // Bar
            items.rectangle(0, 0, barRect, function (p) {
                p.setBackgroundColor(ctx.shape.getAppearance(THUMB_COLOR));
            });
        }, function (clip) {
            clip.rectangle(0, 0, ctx.rect);
        });
    };
    HorizontalScrollbar.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, 0, ctx.rect, function (p) {
            p.setStrokeColor(ctx.shape);
        });
    };
    HorizontalScrollbar.prototype.createRightTriangle = function (ctx, clickSize) {
        var y = ctx.rect.height * 0.5;
        var x = ctx.rect.right - 0.5 * clickSize;
        var w = clickSize * 0.3;
        var h = clickSize * 0.3;
        var path = "M".concat(x - 0.4 * w, ",").concat(y - 0.5 * h, " L").concat(x + 0.6 * w, ",").concat(y, ",L").concat(x - 0.4 * w, ",").concat(y + 0.5 * h, " z");
        ctx.renderer2.path(0, path, function (p) {
            p.setBackgroundColor(ctx.shape.getAppearance(ARROW_COLOR));
        });
    };
    HorizontalScrollbar.prototype.createLeftTriangle = function (ctx, clickSize) {
        var y = ctx.rect.height * 0.5;
        var x = ctx.rect.left + 0.5 * clickSize;
        var w = clickSize * 0.3;
        var h = clickSize * 0.3;
        var path = "M".concat(x + 0.4 * w, ",").concat(y - 0.5 * h, " L").concat(x - 0.6 * w, ",").concat(y, ",L").concat(x + 0.4 * w, ",").concat(y + 0.5 * h, " z");
        ctx.renderer2.path(0, path, function (p) {
            p.setBackgroundColor(ctx.shape.getAppearance(ARROW_COLOR));
        });
    };
    return HorizontalScrollbar;
}());
exports.HorizontalScrollbar = HorizontalScrollbar;
