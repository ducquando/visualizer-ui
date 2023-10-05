"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('Vec2', function () {
    it('should instantiate from x and y value', function () {
        var v = new core_1.Vec2(10, 20);
        expect(v.x).toBe(10);
        expect(v.y).toBe(20);
        expect(v.toString()).toBe('(10, 20)');
    });
    it('should make valid equal comparisons', function () {
        expect(new core_1.Vec2(10, 10).equals(new core_1.Vec2(10, 10))).toBeTruthy();
        expect(new core_1.Vec2(10, 10).equals(new core_1.Vec2(20, 20))).toBeFalsy();
    });
    it('should calculate multiple of 10', function () {
        var actual = new core_1.Vec2(13, 16).round(10);
        var expected = new core_1.Vec2(10, 20);
        expect(actual).toEqual(expected);
    });
    it('should calculate multiple of 2', function () {
        var actual = new core_1.Vec2(13, 12.2).roundToMultipleOfTwo();
        var expected = new core_1.Vec2(14, 12);
        expect(actual).toEqual(expected);
    });
    it('should add by vector correctly', function () {
        var actual = new core_1.Vec2(15, 12).add(new core_1.Vec2(4, 1));
        var expected = new core_1.Vec2(19, 13);
        expect(actual).toEqual(expected);
    });
    it('should add by scalar correctly', function () {
        var actual = new core_1.Vec2(15, 12).add(3);
        var expected = new core_1.Vec2(18, 15);
        expect(actual).toEqual(expected);
    });
    it('should subtract by vector correctly', function () {
        var actual = new core_1.Vec2(15, 12).sub(new core_1.Vec2(4, 1));
        var expected = new core_1.Vec2(11, 11);
        expect(actual).toEqual(expected);
    });
    it('should subtract by scalar correctly', function () {
        var actual = new core_1.Vec2(15, 12).sub(3);
        var expected = new core_1.Vec2(12, 9);
        expect(actual).toEqual(expected);
    });
    it('should multiply by vector correctly', function () {
        var actual = new core_1.Vec2(15, 12).mul(new core_1.Vec2(4, 2));
        var expected = new core_1.Vec2(60, 24);
        expect(actual).toEqual(expected);
    });
    it('should multiply by scalar correctly', function () {
        var actual = new core_1.Vec2(15, 12).mul(3);
        var expected = new core_1.Vec2(45, 36);
        expect(actual).toEqual(expected);
    });
    it('should divide by vector correctly', function () {
        var actual = new core_1.Vec2(15, 12).div(new core_1.Vec2(5, 2));
        var expected = new core_1.Vec2(3, 6);
        expect(actual).toEqual(expected);
    });
    it('should divide by scalar correctly', function () {
        var actual = new core_1.Vec2(15, 12).div(3);
        var expected = new core_1.Vec2(5, 4);
        expect(actual).toEqual(expected);
    });
    it('should negate correctly', function () {
        var actual = new core_1.Vec2(15, 12).negate();
        var expected = new core_1.Vec2(-15, -12);
        expect(actual).toEqual(expected);
    });
    it('should calculate max vector', function () {
        var actual = core_1.Vec2.max(new core_1.Vec2(20, 10), new core_1.Vec2(15, 30));
        var expected = new core_1.Vec2(20, 30);
        expect(actual).toEqual(expected);
    });
    it('should calculate min vector', function () {
        var actual = core_1.Vec2.min(new core_1.Vec2(20, 10), new core_1.Vec2(15, 30));
        var expected = new core_1.Vec2(15, 10);
        expect(actual).toEqual(expected);
    });
    it('should calculate length', function () {
        var actual = new core_1.Vec2(10, 10).length;
        var expected = Math.sqrt(200);
        expect(actual).toBe(expected);
    });
    it('should calculate length squared', function () {
        var actual = new core_1.Vec2(10, 10).lengtSquared;
        var expected = 200;
        expect(actual).toBe(expected);
    });
    it('should calculate median', function () {
        var actual = core_1.Vec2.median(new core_1.Vec2(10, 20), new core_1.Vec2(20, 20), new core_1.Vec2(60, 20));
        var expected = new core_1.Vec2(30, 20);
        expect(actual).toEqual(expected);
    });
    it('should calculate rotated vector correctly', function () {
        var source = new core_1.Vec2(40, 20);
        var center = new core_1.Vec2(20, 20);
        var rotation = core_1.Rotation.fromRadian(Math.PI / 2);
        var actual = core_1.Vec2.rotated(source, center, rotation);
        var expected = new core_1.Vec2(20, 40);
        expect(actual).toEqual(expected);
    });
    it('should calculate angles between vectors', function () {
        expect(core_1.Vec2.angleBetween(new core_1.Vec2(1, 0), new core_1.Vec2(1, 0))).toBe(0);
        expect(core_1.Vec2.angleBetween(new core_1.Vec2(1, 0), new core_1.Vec2(1, 1))).toBe(45);
        expect(core_1.Vec2.angleBetween(new core_1.Vec2(1, 0), new core_1.Vec2(0, 1))).toBe(90);
    });
});
