"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.VerticalScrollbar = void 0;
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
var VerticalScrollbar = /** @class */ (function () {
    function VerticalScrollbar() {
    }
    VerticalScrollbar.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    VerticalScrollbar.prototype.identifier = function () {
        return 'VerticalScrollbar';
    };
    VerticalScrollbar.prototype.defaultSize = function () {
        return { x: 20, y: 300 };
    };
    VerticalScrollbar.prototype.configurables = function (factory) {
        return [
            factory.color(THUMB_COLOR, 'Thumb Color'),
            factory.slider(THUMB_SIZE, 'Thumb Size', 0, 100),
            factory.slider(THUMB_SIZE, 'Thumb Position', 0, 100),
            factory.color(ARROW_COLOR, 'Arrow Color'),
        ];
    };
    VerticalScrollbar.prototype.render = function (ctx) {
        var clickSize = Math.min(30, Math.min(0.8 * ctx.rect.height, ctx.rect.width));
        this.createBackground(ctx, clickSize);
        this.createBorder(ctx);
        this.createTopTriangle(ctx, clickSize);
        this.createBottomTriangle(ctx, clickSize);
    };
    VerticalScrollbar.prototype.createBackground = function (ctx, clickSize) {
        ctx.renderer2.group(function (items) {
            // Rail
            items.rectangle(0, 0, ctx.rect, function (p) {
                p.setBackgroundColor(ctx.shape);
            });
            var barHeight = ctx.shape.getAppearance(THUMB_SIZE) / 100;
            var barOffset = ctx.shape.getAppearance(THUMB_POSITION) / 100 * (ctx.rect.height - 2 * clickSize) * (1 - barHeight);
            var barRect = new interface_1.Rect2(ctx.rect.x, ctx.rect.y + clickSize + barOffset, ctx.rect.width, (ctx.rect.height - 2 * clickSize) * barHeight);
            // Bar
            items.rectangle(0, 0, barRect, function (p) {
                p.setBackgroundColor(ctx.shape.getAppearance(THUMB_COLOR));
            });
        }, function (mask) {
            mask.rectangle(0, 0, ctx.rect);
        });
    };
    VerticalScrollbar.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, 0, ctx.rect, function (p) {
            p.setStrokeColor(ctx.shape);
        });
    };
    VerticalScrollbar.prototype.createBottomTriangle = function (ctx, clickSize) {
        var y = ctx.rect.height - 0.5 * clickSize;
        var x = ctx.rect.right * 0.5;
        var w = clickSize * 0.3;
        var h = clickSize * 0.3;
        ctx.renderer2.path(0, "M".concat(x - 0.5 * w, ",").concat(y - 0.4 * h, " L").concat(x, ",").concat(y + 0.6 * h, ",L").concat(x + 0.5 * w, ",").concat(y - 0.4 * h, " z"), function (p) {
            p.setBackgroundColor(ctx.shape.getAppearance(ARROW_COLOR));
        });
    };
    VerticalScrollbar.prototype.createTopTriangle = function (ctx, clickSize) {
        var y = ctx.rect.top + 0.5 * clickSize;
        var x = ctx.rect.right * 0.5;
        var w = clickSize * 0.3;
        var h = clickSize * 0.3;
        ctx.renderer2.path(0, "M".concat(x - 0.5 * w, ",").concat(y + 0.4 * h, " L").concat(x, ",").concat(y - 0.6 * h, ",L").concat(x + 0.5 * w, ",").concat(y + 0.4 * h, " z"), function (p) {
            p.setBackgroundColor(ctx.shape.getAppearance(ARROW_COLOR));
        });
    };
    return VerticalScrollbar;
}());
exports.VerticalScrollbar = VerticalScrollbar;
