"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Progress = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var BAR_COLOR = 'ACCENT_COLOR';
var BAR_VALUE = 'VALUE';
var DEFAULT_APPEARANCE = (_a = {},
    _a[BAR_COLOR] = 0x2171b5,
    _a[BAR_VALUE] = 50,
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0xffffff,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var HEIGHT_TOTAL = 16;
var Progress = /** @class */ (function () {
    function Progress() {
    }
    Progress.prototype.identifier = function () {
        return 'Progress';
    };
    Progress.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Progress.prototype.defaultSize = function () {
        return { x: 150, y: HEIGHT_TOTAL };
    };
    Progress.prototype.constraint = function (factory) {
        return factory.size(undefined, HEIGHT_TOTAL);
    };
    Progress.prototype.configurables = function (factory) {
        return [
            factory.slider(BAR_VALUE, 'Value', 0, 100),
            factory.color(BAR_COLOR, 'Accent Color'),
        ];
    };
    Progress.prototype.render = function (ctx) {
        this.createBackground(ctx);
        this.createBorder(ctx);
    };
    Progress.prototype.createBackground = function (ctx) {
        var relative = ctx.shape.getAppearance(BAR_VALUE) / 100;
        ctx.renderer2.group(function (items) {
            var activeBounds = new interface_1.Rect2(ctx.rect.x, ctx.rect.y, ctx.rect.width * relative, ctx.rect.height);
            // Active area
            ctx.renderer2.rectangle(0, 0, activeBounds, function (p) {
                p.setBackgroundColor(ctx.shape.getAppearance(BAR_COLOR));
            });
            var inactiveBounds = new interface_1.Rect2(ctx.rect.width * relative, ctx.rect.top, ctx.rect.width * (1 - relative), ctx.rect.height);
            // Inactive area.
            items.rectangle(0, 0, inactiveBounds, function (p) {
                p.setBackgroundColor(ctx.shape);
            });
        }, function (clip) {
            clip.rectangle(0, ctx.rect.height * 0.5, ctx.rect);
        });
    };
    Progress.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, ctx.rect.height * 0.5, ctx.rect, function (p) {
            p.setStrokeColor(ctx.shape);
        });
    };
    return Progress;
}());
exports.Progress = Progress;
