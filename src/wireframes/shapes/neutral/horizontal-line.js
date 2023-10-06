"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.HorizontalLine = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = 2,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var BorderHeightConstraint = /** @class */ (function () {
    function BorderHeightConstraint() {
    }
    BorderHeightConstraint.prototype.updateSize = function (shape, size) {
        var strokeThickness = shape.strokeThickness;
        return new interface_1.Vec2(size.x, strokeThickness);
    };
    BorderHeightConstraint.prototype.calculateSizeX = function () {
        return false;
    };
    BorderHeightConstraint.prototype.calculateSizeY = function () {
        return true;
    };
    BorderHeightConstraint.INSTANCE = new BorderHeightConstraint();
    return BorderHeightConstraint;
}());
var HorizontalLine = /** @class */ (function () {
    function HorizontalLine() {
    }
    HorizontalLine.prototype.identifier = function () {
        return 'HorizontalLine';
    };
    HorizontalLine.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    HorizontalLine.prototype.defaultSize = function () {
        return { x: 300, y: 2 };
    };
    HorizontalLine.prototype.previewSize = function (desiredWidth) {
        return { x: desiredWidth, y: 7 };
    };
    HorizontalLine.prototype.constraint = function () {
        return BorderHeightConstraint.INSTANCE;
    };
    HorizontalLine.prototype.render = function (ctx) {
        ctx.renderer2.rectangle(0, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    };
    return HorizontalLine;
}());
exports.HorizontalLine = HorizontalLine;
