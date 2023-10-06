"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Heading = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FONT_SIZE] = 24,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.TEXT] = 'Heading',
    _a);
var Heading = /** @class */ (function () {
    function Heading() {
    }
    Heading.prototype.identifier = function () {
        return 'Heading';
    };
    Heading.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Heading.prototype.defaultSize = function () {
        return { x: 90, y: 35 };
    };
    Heading.prototype.constraint = function (factory) {
        return factory.textSize(10, 10);
    };
    Heading.prototype.render = function (ctx) {
        ctx.renderer2.text(ctx.shape, ctx.rect, function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return Heading;
}());
exports.Heading = Heading;
