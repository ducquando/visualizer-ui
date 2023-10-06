"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.RadioButton = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var STATE = 'STATE';
var STATE_NORMAL = 'Normal';
var STATE_CHECKED = 'Checked';
var CIRCLE_MARGIN = 4;
var CIRCLE_RADIUS = 9;
var CIRCLE_POSITION_X = CIRCLE_MARGIN + CIRCLE_RADIUS;
var CIRCLE_CHECK_RADIUS = CIRCLE_RADIUS - 4;
var TEXT_POSITION_X = 2 * CIRCLE_MARGIN + 2 * CIRCLE_RADIUS;
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'RadioButton',
    _a[STATE] = STATE_NORMAL,
    _a);
var RadioButton = /** @class */ (function () {
    function RadioButton() {
    }
    RadioButton.prototype.identifier = function () {
        return 'RadioButton';
    };
    RadioButton.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    RadioButton.prototype.defaultSize = function () {
        return { x: 130, y: 36 };
    };
    RadioButton.prototype.constraint = function (factory) {
        return factory.textSize((CIRCLE_MARGIN * 3 + CIRCLE_RADIUS * 2) / 2, 8);
    };
    RadioButton.prototype.configurables = function (factory) {
        return [
            factory.selection(STATE, 'State', [
                STATE_NORMAL,
                STATE_CHECKED,
            ]),
        ];
    };
    RadioButton.prototype.render = function (ctx) {
        this.createCircle(ctx);
        this.createText(ctx);
    };
    RadioButton.prototype.createCircle = function (ctx) {
        var y = 0.5 * ctx.rect.h;
        // Circle
        ctx.renderer2.ellipse(ctx.shape, interface_1.Rect2.fromCenter(new interface_1.Vec2(CIRCLE_POSITION_X, y), CIRCLE_RADIUS), function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
        var state = ctx.shape.getAppearance(STATE);
        if (state === STATE_CHECKED) {
            // Checked circle
            ctx.renderer2.ellipse(0, interface_1.Rect2.fromCenter(new interface_1.Vec2(CIRCLE_POSITION_X, y), CIRCLE_CHECK_RADIUS), function (p) {
                p.setBackgroundColor(ctx.shape.strokeColor);
            });
        }
    };
    RadioButton.prototype.createText = function (ctx) {
        var w = ctx.rect.width - TEXT_POSITION_X;
        var h = ctx.rect.height;
        var textRect = new interface_1.Rect2(TEXT_POSITION_X, 0, w, h);
        ctx.renderer2.text(ctx.shape, textRect);
    };
    return RadioButton;
}());
exports.RadioButton = RadioButton;
