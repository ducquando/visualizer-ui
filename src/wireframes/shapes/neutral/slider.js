"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Slider = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var THUMB_COLOR = 'ACCENT_COLOR';
var THUMB_VALUE = 'VALUE';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0xffffff,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a[THUMB_COLOR] = 0x2171b5,
    _a[THUMB_VALUE] = 50,
    _a);
var HEIGHT_TOTAL = 20;
var HEIGHT_BORDER = 8;
var Slider = /** @class */ (function () {
    function Slider() {
    }
    Slider.prototype.identifier = function () {
        return 'Slider';
    };
    Slider.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Slider.prototype.defaultSize = function () {
        return { x: 150, y: HEIGHT_TOTAL };
    };
    Slider.prototype.constraint = function (factory) {
        return factory.size(undefined, HEIGHT_TOTAL);
    };
    Slider.prototype.configurables = function (factory) {
        return [
            factory.slider(THUMB_VALUE, 'Value', 0, 100),
            factory.color(THUMB_COLOR, 'Accent Color'),
        ];
    };
    Slider.prototype.render = function (ctx) {
        var sliderRect = new interface_1.Rect2(HEIGHT_TOTAL * 0.5, (HEIGHT_TOTAL - HEIGHT_BORDER) * 0.5, ctx.rect.width - HEIGHT_TOTAL, HEIGHT_BORDER);
        var relative = ctx.shape.getAppearance(THUMB_VALUE) / 100;
        this.createBackground(ctx, sliderRect, relative);
        this.createBorder(ctx, sliderRect);
        this.createThumb(ctx, relative);
    };
    Slider.prototype.createThumb = function (ctx, relative) {
        var thumbCenter = new interface_1.Vec2(ctx.rect.x + ctx.rect.width * relative, 0.5 * HEIGHT_TOTAL);
        ctx.renderer2.ellipse(ctx.shape, interface_1.Rect2.fromCenter(thumbCenter, 0.5 * HEIGHT_TOTAL), function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape.foregroundColor);
        });
    };
    Slider.prototype.createBackground = function (ctx, bounds, relative) {
        ctx.renderer2.group(function (items) {
            var activeRect = new interface_1.Rect2(bounds.x, bounds.y, bounds.width * relative, bounds.height);
            // Active item.
            items.rectangle(0, 0, activeRect, function (p) {
                p.setBackgroundColor(ctx.shape.getAppearance(THUMB_COLOR));
            });
            var inactiveRect = new interface_1.Rect2(bounds.x + bounds.width * relative, bounds.top, bounds.width * (1 - relative), bounds.height);
            // Inactive item
            ctx.renderer2.rectangle(0, 0, inactiveRect, function (p) {
                p.setBackgroundColor(ctx.shape);
            });
        }, function (clip) {
            clip.rectangle(0, bounds.height * 0.5, bounds);
        });
    };
    Slider.prototype.createBorder = function (ctx, bounds) {
        ctx.renderer2.rectangle(ctx.shape, bounds.height * 0.5, bounds, function (p) {
            p.setStrokeColor(ctx.shape);
        });
    };
    return Slider;
}());
exports.Slider = Slider;
