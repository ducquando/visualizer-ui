"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Rotation = void 0;
/* eslint-disable no-multi-assign */
var math_helper_1 = require("./math-helper");
var Rotation = /** @class */ (function () {
    function Rotation(radian, degree) {
        this.radian = radian;
        this.degree = degree;
        this.computed = { cos: null, sin: null };
        Object.freeze(this);
    }
    Object.defineProperty(Rotation.prototype, "cos", {
        get: function () {
            var cos = this.computed.cos;
            if (cos === null) {
                this.computed.cos = cos = Math.cos(this.radian);
            }
            return cos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rotation.prototype, "sin", {
        get: function () {
            var sin = this.computed.sin;
            if (sin === null) {
                this.computed.sin = sin = Math.sin(this.radian);
            }
            return sin;
        },
        enumerable: false,
        configurable: true
    });
    Rotation.fromRadian = function (radian) {
        return new Rotation(radian, math_helper_1.MathHelper.toDegree(radian));
    };
    Rotation.fromDegree = function (degree) {
        return new Rotation(math_helper_1.MathHelper.toRad(degree), degree);
    };
    Rotation.prototype.equals = function (r) {
        return Rotation.equals(this, r);
    };
    Rotation.equals = function (lhs, rhs) {
        return lhs.radian === rhs.radian;
    };
    Rotation.prototype.toString = function () {
        return "".concat(this.degree, "\u00B0");
    };
    Rotation.prototype.add = function (r) {
        return Rotation.fromDegree(math_helper_1.MathHelper.toPositiveDegree(this.degree + r.degree));
    };
    Rotation.prototype.sub = function (r) {
        return Rotation.fromDegree(math_helper_1.MathHelper.toPositiveDegree(this.degree - r.degree));
    };
    Rotation.prototype.negate = function () {
        return Rotation.fromDegree(-this.degree);
    };
    Rotation.ZERO = Rotation.fromRadian(0);
    return Rotation;
}());
exports.Rotation = Rotation;
