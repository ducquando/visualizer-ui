"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Paragraph = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'Lorem ipsum dolor sit amet, alii rebum postea eam ex. Et mei laoreet officiis, summo sensibus id mei.',
    _a);
var Paragraph = /** @class */ (function () {
    function Paragraph() {
    }
    Paragraph.prototype.identifier = function () {
        return 'Paragraph';
    };
    Paragraph.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Paragraph.prototype.defaultSize = function () {
        return { x: 200, y: 140 };
    };
    Paragraph.prototype.previewSize = function (desiredWidth, desiredHeight) {
        return { x: desiredWidth * 2, y: desiredHeight * 2 };
    };
    Paragraph.prototype.render = function (ctx) {
        ctx.renderer2.textMultiline(ctx.shape, ctx.rect, undefined, true);
    };
    return Paragraph;
}());
exports.Paragraph = Paragraph;
