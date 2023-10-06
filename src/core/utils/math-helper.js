"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.MathHelper = void 0;
var MathHelper;
(function (MathHelper) {
    var CURRENT_ID = new Date().getTime();
    function nextId() {
        CURRENT_ID++;
        return CURRENT_ID.toString();
    }
    MathHelper.nextId = nextId;
    function guid() {
        return "".concat(s4() + s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
    }
    MathHelper.guid = guid;
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    MathHelper.s4 = s4;
    function toRad(degree) {
        return degree * Math.PI / 180;
    }
    MathHelper.toRad = toRad;
    function toDegree(rad) {
        return rad * 180 / Math.PI;
    }
    MathHelper.toDegree = toDegree;
    function roundToMultipleOf(value, factor) {
        return Math.round(value / factor) * factor;
    }
    MathHelper.roundToMultipleOf = roundToMultipleOf;
    function roundToMultipleOfTwo(value) {
        return Math.round(value / 2) * 2;
    }
    MathHelper.roundToMultipleOfTwo = roundToMultipleOfTwo;
    function toPositiveDegree(degree) {
        while (degree < 0) {
            degree += 360;
        }
        while (degree >= 360) {
            degree -= 360;
        }
        return degree;
    }
    MathHelper.toPositiveDegree = toPositiveDegree;
})(MathHelper = exports.MathHelper || (exports.MathHelper = {}));
