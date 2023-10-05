"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('Rotation', function () {
    it('should sub correctly', function () {
        var rotation1 = core_1.Rotation.fromDegree(180);
        var rotation2 = core_1.Rotation.fromDegree(45);
        var actual = rotation1.sub(rotation2);
        var expected = core_1.Rotation.fromDegree(135);
        expect(actual).toEqual(expected);
    });
    it('should add correctly', function () {
        var rotation1 = core_1.Rotation.fromDegree(180);
        var rotation2 = core_1.Rotation.fromDegree(45);
        var actual = rotation1.add(rotation2);
        var expected = core_1.Rotation.fromDegree(225);
        expect(actual).toEqual(expected);
    });
    it('should calculate negated rotation', function () {
        var rotation = core_1.Rotation.fromDegree(180);
        var actual = rotation.negate();
        var expected = core_1.Rotation.fromDegree(-180);
        expect(actual).toEqual(expected);
    });
    it('should create rotation by degree', function () {
        var rotation = core_1.Rotation.fromDegree(180);
        expect(rotation.degree).toBe(180);
        expect(rotation.radian).toBe(Math.PI);
        expect(rotation.cos).toBe(Math.cos(Math.PI));
        expect(rotation.sin).toBe(Math.sin(Math.PI));
        expect(rotation.toString()).toBe('180°');
    });
    it('should create rotation by radian', function () {
        var rotation = core_1.Rotation.fromRadian(Math.PI);
        expect(rotation.degree).toBe(180);
        expect(rotation.radian).toBe(Math.PI);
        expect(rotation.cos).toBe(Math.cos(Math.PI));
        expect(rotation.sin).toBe(Math.sin(Math.PI));
        expect(rotation.toString()).toBe('180°');
    });
    it('should make correct equal comparisons', function () {
        expect(core_1.Rotation.fromDegree(123).equals(core_1.Rotation.fromDegree(123))).toBeTruthy();
        expect(core_1.Rotation.fromDegree(123).equals(core_1.Rotation.fromDegree(234))).toBeFalsy();
    });
});
