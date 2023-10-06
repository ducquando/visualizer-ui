"use strict";
var _a;
exports.__esModule = true;
exports.Label = void 0;
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.TEXT] = 'Label',
    _a);
var Label = /** @class */ (function () {
    function Label() {
    }
    Label.prototype.identifier = function () {
        return 'Label';
    };
    Label.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Label.prototype.defaultSize = function () {
        return { x: 46, y: 30 };
    };
    Label.prototype.create = function (source) {
        var _a;
        if (source.type == 'Text') {
            var text = source.text;
            return {
                renderer: this.identifier(),
                appearance: (_a = {},
                    _a[interface_1.DefaultAppearance.TEXT] = text,
                    _a)
            };
        }
        return null;
    };
    Label.prototype.constraint = function (factory) {
        return factory.textSize(5, 5);
    };
    Label.prototype.render = function (ctx) {
        ctx.renderer2.text(ctx.shape, ctx.rect, function (p) {
            p.setForegroundColor(ctx.shape);
        }, true);
    };
    return Label;
}());
exports.Label = Label;
