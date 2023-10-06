"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.TextHeightConstraint = exports.MinSizeConstraint = exports.SizeConstraint = void 0;
var core_1 = require("@app/core");
var SizeConstraint = /** @class */ (function () {
    function SizeConstraint(width, height) {
        this.width = width;
        this.height = height;
        Object.freeze(this);
    }
    SizeConstraint.prototype.updateSize = function (_, size) {
        var w = size.x;
        var h = size.y;
        if (this.width) {
            w = this.width;
        }
        if (this.height) {
            h = this.height;
        }
        return new core_1.Vec2(w, h);
    };
    SizeConstraint.prototype.calculateSizeX = function () {
        return !!this.width;
    };
    SizeConstraint.prototype.calculateSizeY = function () {
        return !!this.height;
    };
    return SizeConstraint;
}());
exports.SizeConstraint = SizeConstraint;
var MinSizeConstraint = /** @class */ (function () {
    function MinSizeConstraint() {
        Object.freeze(this);
    }
    MinSizeConstraint.prototype.updateSize = function (_, size) {
        var minSize = Math.min(size.x, size.y);
        return new core_1.Vec2(minSize, minSize);
    };
    MinSizeConstraint.prototype.calculateSizeX = function () {
        return false;
    };
    MinSizeConstraint.prototype.calculateSizeY = function () {
        return false;
    };
    return MinSizeConstraint;
}());
exports.MinSizeConstraint = MinSizeConstraint;
var TextHeightConstraint = /** @class */ (function () {
    function TextHeightConstraint(padding) {
        this.padding = padding;
        Object.freeze(this);
    }
    TextHeightConstraint.prototype.updateSize = function (shape, size) {
        var fontSize = shape.fontSize;
        return new core_1.Vec2(size.x, core_1.MathHelper.roundToMultipleOfTwo(fontSize * 1.2 + this.padding * 2));
    };
    TextHeightConstraint.prototype.calculateSizeX = function () {
        return false;
    };
    TextHeightConstraint.prototype.calculateSizeY = function () {
        return true;
    };
    return TextHeightConstraint;
}());
exports.TextHeightConstraint = TextHeightConstraint;
