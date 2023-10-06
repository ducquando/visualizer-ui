"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Vec2 = void 0;
var math_helper_1 = require("./math-helper");
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }
    Object.defineProperty(Vec2.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "lengtSquared", {
        get: function () {
            return this.x * this.x + this.y * this.y;
        },
        enumerable: false,
        configurable: true
    });
    Vec2.prototype.equals = function (v) {
        return Vec2.equals(this, v);
    };
    Vec2.equals = function (lhs, rhs) {
        return lhs.x === rhs.x && lhs.y === rhs.y;
    };
    Vec2.prototype.toString = function () {
        return "(".concat(this.x, ", ").concat(this.y, ")");
    };
    Vec2.prototype.add = function (v) {
        if (v instanceof Vec2) {
            return new Vec2(this.x + v.x, this.y + v.y);
        }
        else {
            return new Vec2(this.x + v, this.y + v);
        }
    };
    Vec2.prototype.sub = function (v) {
        if (v instanceof Vec2) {
            return new Vec2(this.x - v.x, this.y - v.y);
        }
        else {
            return new Vec2(this.x - v, this.y - v);
        }
    };
    Vec2.prototype.mul = function (v) {
        if (v instanceof Vec2) {
            return new Vec2(this.x * v.x, this.y * v.y);
        }
        else {
            return new Vec2(this.x * v, this.y * v);
        }
    };
    Vec2.prototype.div = function (v) {
        if (v instanceof Vec2) {
            return new Vec2(this.x / v.x, this.y / v.y);
        }
        else {
            return new Vec2(this.x / v, this.y / v);
        }
    };
    Vec2.prototype.negate = function () {
        return new Vec2(-this.x, -this.y);
    };
    Vec2.max = function (lhs, rhs) {
        return new Vec2(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y));
    };
    Vec2.min = function (lhs, rhs) {
        return new Vec2(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y));
    };
    Vec2.prototype.round = function (factor) {
        if (factor === void 0) { factor = 1; }
        return new Vec2(math_helper_1.MathHelper.roundToMultipleOf(this.x, factor), math_helper_1.MathHelper.roundToMultipleOf(this.y, factor));
    };
    Vec2.prototype.roundToMultipleOfTwo = function () {
        return new Vec2(math_helper_1.MathHelper.roundToMultipleOf(this.x, 2), math_helper_1.MathHelper.roundToMultipleOf(this.y, 2));
    };
    Vec2.rotated = function (vec, center, rotation) {
        var x = vec.x - center.x;
        var y = vec.y - center.y;
        var result = new Vec2((x * rotation.cos) - (y * rotation.sin) + center.x, (x * rotation.sin) + (y * rotation.cos) + center.y);
        return result;
    };
    Vec2.median = function () {
        var vecs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vecs[_i] = arguments[_i];
        }
        var medianX = 0;
        var medianY = 0;
        for (var _a = 0, vecs_1 = vecs; _a < vecs_1.length; _a++) {
            var v = vecs_1[_a];
            medianX += v.x;
            medianY += v.y;
        }
        return new Vec2(medianX / vecs.length, medianY / vecs.length);
    };
    Vec2.angleBetween = function (lhs, rhs) {
        var y = (lhs.x * rhs.y) - (rhs.x * lhs.y);
        var x = (lhs.x * rhs.x) + (lhs.y * rhs.y);
        return math_helper_1.MathHelper.toPositiveDegree(math_helper_1.MathHelper.toDegree(Math.atan2(y, x)));
    };
    Vec2.ZERO = new Vec2(0, 0);
    Vec2.ONE = new Vec2(1, 1);
    Vec2.POSITIVE_INFINITY = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    Vec2.NEGATIVE_INFINITY = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    return Vec2;
}());
exports.Vec2 = Vec2;
