"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Checkbox = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var STATE = 'STATE';
var STATE_NORMAL = 'Normal';
var STATE_CHECKED = 'Checked';
var STATE_INTERDEMINATE = 'Interdeminate';
var BOX_SIZE = 18;
var BOX_MARGIN = 4;
var TEXT_POSITION_X = BOX_SIZE + 2 * BOX_MARGIN;
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'Checkbox',
    _a[STATE] = STATE_NORMAL,
    _a);
var Checkbox = /** @class */ (function () {
    function Checkbox() {
    }
    Checkbox.prototype.identifier = function () {
        return 'Checkbox';
    };
    Checkbox.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Checkbox.prototype.defaultSize = function () {
        return { x: 104, y: 36 };
    };
    Checkbox.prototype.constraint = function (factory) {
        return factory.textHeight(8);
    };
    Checkbox.prototype.configurables = function (factory) {
        return [
            factory.selection(STATE, 'State', [
                STATE_NORMAL,
                STATE_CHECKED,
                STATE_INTERDEMINATE,
            ]),
        ];
    };
    Checkbox.prototype.render = function (ctx) {
        this.createBox(ctx);
        this.createText(ctx);
    };
    Checkbox.prototype.createBox = function (ctx) {
        var s = BOX_SIZE;
        var x = BOX_MARGIN;
        var y = (ctx.rect.height - s) * 0.5;
        var bounds = new interface_1.Rect2(x, y, s, s);
        ctx.renderer2.rectangle(ctx.shape, 0, bounds, function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
        var state = ctx.shape.getAppearance(STATE);
        if (state === STATE_INTERDEMINATE) {
            ctx.renderer2.rectangle(0, 0, bounds.deflate(4), function (p) {
                p.setBackgroundColor(ctx.shape.strokeColor);
            });
        }
        else if (state === STATE_CHECKED) {
            var path = "M".concat(bounds.left + 3, " ").concat(bounds.cy + 2, " L").concat(bounds.left + bounds.width * 0.4, " ").concat(bounds.bottom - 4, " L").concat(bounds.right - 3, " ").concat(bounds.top + 3);
            ctx.renderer2.path(2, path, function (p) {
                p.setStrokeColor(ctx.shape);
                p.setStrokeStyle('butt', 'butt');
            });
        }
    };
    Checkbox.prototype.createText = function (ctx) {
        var w = ctx.rect.width - TEXT_POSITION_X;
        var h = ctx.rect.height;
        ctx.renderer2.text(ctx.shape, new interface_1.Rect2(TEXT_POSITION_X, 0, w, h));
    };
    return Checkbox;
}());
exports.Checkbox = Checkbox;
