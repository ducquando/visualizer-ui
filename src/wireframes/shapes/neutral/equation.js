"use strict";
/*
 * mydraft.cc
 *
 * Author: Duc Quan Do
 * Date: 24/09/2023
*/
var _a;
exports.__esModule = true;
exports.Equation = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'c = \\pm\\sqrt{a^2 + b^2}',
    _a);
var Equation = /** @class */ (function () {
    function Equation() {
    }
    Equation.prototype.identifier = function () {
        return 'Equation';
    };
    Equation.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Equation.prototype.defaultSize = function () {
        return { x: 140, y: 50 };
    };
    Equation.prototype.render = function (ctx) {
        ctx.renderer2.equation(ctx.shape, ctx.rect, undefined);
    };
    return Equation;
}());
exports.Equation = Equation;
