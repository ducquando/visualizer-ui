"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Link = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0x08519c,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.TEXT] = 'Link',
    _a);
var Link = /** @class */ (function () {
    function Link() {
    }
    Link.prototype.identifier = function () {
        return 'Link';
    };
    Link.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Link.prototype.defaultSize = function () {
        return { x: 40, y: 30 };
    };
    Link.prototype.create = function (source) {
        var _a;
        if (source.type == 'Url') {
            var url = source.url;
            return {
                renderer: this.identifier(),
                appearance: (_a = {},
                    _a[interface_1.DefaultAppearance.TEXT] = url,
                    _a)
            };
        }
        return null;
    };
    Link.prototype.constraint = function (factory) {
        return factory.textSize(5, 5);
    };
    Link.prototype.render = function (ctx) {
        ctx.renderer2.text(ctx.shape, ctx.rect, function (p) {
            p.setForegroundColor(ctx.shape);
            p.setTextDecoration('underline');
        });
    };
    return Link;
}());
exports.Link = Link;
