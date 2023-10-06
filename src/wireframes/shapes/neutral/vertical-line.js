"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.VerticalLine = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = 2,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var BorderWidthConstraint = /** @class */ (function () {
    function BorderWidthConstraint() {
    }
    BorderWidthConstraint.prototype.updateSize = function (shape, size) {
        var strokeThickness = shape.strokeThickness;
        return new interface_1.Vec2(strokeThickness, size.y);
    };
    BorderWidthConstraint.prototype.calculateSizeX = function () {
        return true;
    };
    BorderWidthConstraint.prototype.calculateSizeY = function () {
        return false;
    };
    BorderWidthConstraint.INSTANCE = new BorderWidthConstraint();
    return BorderWidthConstraint;
}());
var VerticalLine = /** @class */ (function () {
    function VerticalLine() {
    }
    VerticalLine.prototype.identifier = function () {
        return 'VerticalLine';
    };
    VerticalLine.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    VerticalLine.prototype.defaultSize = function () {
        return { x: 2, y: 300 };
    };
    VerticalLine.prototype.previewSize = function (_, desiredHeight) {
        return { x: 8, y: desiredHeight };
    };
    VerticalLine.prototype.constraint = function () {
        return BorderWidthConstraint.INSTANCE;
    };
    VerticalLine.prototype.render = function (ctx) {
        ctx.renderer2.rectangle(0, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    };
    return VerticalLine;
}());
exports.VerticalLine = VerticalLine;
