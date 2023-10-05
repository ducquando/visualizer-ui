"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Toggle = void 0;
// tslint:disable: prefer-const
var interface_1 = require("@app/wireframes/interface");
var STATE = 'STATE';
var STATE_NORMAL = 'Normal';
var STATE_CHECKED = 'Checked';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xbdbdbd,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0x238b45,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = 0xffffff,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = 4,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a[STATE] = STATE_CHECKED,
    _a);
var Toggle = /** @class */ (function () {
    function Toggle() {
    }
    Toggle.prototype.identifier = function () {
        return 'Toggle';
    };
    Toggle.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Toggle.prototype.defaultSize = function () {
        return { x: 60, y: 30 };
    };
    Toggle.prototype.configurables = function (factory) {
        return [
            factory.selection(STATE, 'State', [
                STATE_NORMAL,
                STATE_CHECKED,
            ]),
        ];
    };
    Toggle.prototype.render = function (ctx) {
        var border = ctx.shape.strokeThickness;
        var radius = Math.min(ctx.rect.width, ctx.rect.height) * 0.5;
        var isUnchecked = ctx.shape.getAppearance(STATE) === STATE_NORMAL;
        var circleY = ctx.rect.height * 0.5;
        var circleX = isUnchecked ? radius : ctx.rect.width - radius;
        var circleCenter = new interface_1.Vec2(circleX, circleY);
        var circleSize = radius - border;
        var barColor = isUnchecked ? ctx.shape : ctx.shape.foregroundColor;
        // Pill
        ctx.renderer2.rectangle(0, radius, ctx.rect, function (p) {
            p.setBackgroundColor(barColor);
        });
        // Circle.
        ctx.renderer2.ellipse(0, interface_1.Rect2.fromCenter(circleCenter, circleSize), function (p) {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    };
    return Toggle;
}());
exports.Toggle = Toggle;
