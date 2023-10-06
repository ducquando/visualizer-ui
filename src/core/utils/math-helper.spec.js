"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('MathHelper', function () {
    it('should calculate different guids', function () {
        var guid1 = core_1.MathHelper.guid();
        var guid2 = core_1.MathHelper.guid();
        expect(guid1).not.toBe(guid2);
    });
    it('should calculate different ids', function () {
        var id1 = core_1.MathHelper.nextId();
        var id2 = core_1.MathHelper.nextId();
        expect(id1).not.toBe(id2);
    });
    it('should convert to rad', function () {
        expect(core_1.MathHelper.toRad(0)).toBe(0);
        expect(core_1.MathHelper.toRad(180)).toBe(Math.PI * 1);
        expect(core_1.MathHelper.toRad(360)).toBe(Math.PI * 2);
    });
    it('should convert to degree', function () {
        expect(core_1.MathHelper.toDegree(0)).toBe(0);
        expect(core_1.MathHelper.toDegree(Math.PI * 1)).toBe(180);
        expect(core_1.MathHelper.toDegree(Math.PI * 2)).toBe(360);
    });
    it('should adjust invalid degrees', function () {
        expect(core_1.MathHelper.toPositiveDegree(36.5 - (1 * 360))).toBe(36.5);
        expect(core_1.MathHelper.toPositiveDegree(36.5 - (2 * 360))).toBe(36.5);
        expect(core_1.MathHelper.toPositiveDegree(36.5 + (1 * 360))).toBe(36.5);
        expect(core_1.MathHelper.toPositiveDegree(36.5 + (2 * 360))).toBe(36.5);
    });
    it('should calculate multiple of 10', function () {
        expect(core_1.MathHelper.roundToMultipleOf(13, 10)).toBe(10);
        expect(core_1.MathHelper.roundToMultipleOf(16, 10)).toBe(20);
    });
    it('should calculate multiple of 2', function () {
        expect(core_1.MathHelper.roundToMultipleOfTwo(13)).toBe(14);
        expect(core_1.MathHelper.roundToMultipleOfTwo(12.2)).toBe(12);
    });
});
