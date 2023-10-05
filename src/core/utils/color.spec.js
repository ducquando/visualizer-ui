"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('Color', function () {
    it('should instantiate', function () {
        var color = new core_1.Color(0.3, 0.6, 0.9);
        expect(color.r).toBe(0.3);
        expect(color.g).toBe(0.6);
        expect(color.b).toBe(0.9);
    });
    it('should adjust values when instantiating', function () {
        var color = new core_1.Color(-1, 0.5, 2);
        expect(color.r).toBe(0);
        expect(color.g).toBe(0.5);
        expect(color.b).toBe(1);
    });
    it('should convert to color', function () {
        var color = core_1.Color.fromHex(23, 46, 59);
        expect(color.toNumber()).toBe(0x234659);
    });
    it('should convert to string', function () {
        var color = core_1.Color.fromHex(23, 46, 59);
        expect(color.toString()).toBe('#234659');
    });
    it('should convert to string with leading zeros', function () {
        var color = core_1.Color.fromHex(3, 6, 9);
        expect(color.toString()).toBe('#030609');
    });
    it('should be created from long string', function () {
        var color = core_1.Color.fromValue('#336699');
        expect(color.r).toBe(0.2);
        expect(color.g).toBe(0.4);
        expect(color.b).toBe(0.6);
    });
    it('should be created from short string', function () {
        var color = core_1.Color.fromValue('#369');
        expect(color.r).toBe(0.2);
        expect(color.g).toBe(0.4);
        expect(color.b).toBe(0.6);
    });
    it('should be created from rgb string', function () {
        var color = core_1.Color.fromValue('rgb(51, 102, 153)');
        expect(color.r).toBe(0.2);
        expect(color.g).toBe(0.4);
        expect(color.b).toBe(0.6);
    });
    it('should be created from rgb number', function () {
        var color = core_1.Color.fromValue(0x336699);
        expect(color.r).toBe(0.2);
        expect(color.g).toBe(0.4);
        expect(color.b).toBe(0.6);
    });
    it('should be created from rgb values', function () {
        var color = core_1.Color.fromHex(33, 66, 99);
        expect(color.r).toBe(0.2);
        expect(color.g).toBe(0.4);
        expect(color.b).toBe(0.6);
    });
    it('should convert from hsl with black', function () {
        var color = core_1.Color.fromHsl(0, 0, 0);
        expect(color.r).toBe(0);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should convert from hsl with dark black', function () {
        var color = core_1.Color.fromHsl(0, 1, 0.1);
        expect(color.r).toBe(0.2);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should convert from hsl with red', function () {
        var color = core_1.Color.fromHsl(0, 1, 0.5);
        expect(color.r).toBeCloseTo(1, 1);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should convert from hsl with yellow', function () {
        var color = core_1.Color.fromHsl(60, 1, 0.5);
        expect(color.r).toBeCloseTo(1, 1);
        expect(color.g).toBeCloseTo(1, 1);
        expect(color.b).toBe(0);
    });
    it('should convert from hsl with blue', function () {
        var color = core_1.Color.fromHsl(120, 1, 0.5);
        expect(color.r).toBe(0);
        expect(color.g).toBe(1);
        expect(color.b).toBe(0);
    });
    it('should convert from hsl with turkis', function () {
        var color = core_1.Color.fromHsl(180, 1, 0.5);
        expect(color.r).toBe(0);
        expect(color.g).toBeCloseTo(1, 1);
        expect(color.b).toBeCloseTo(1, 1);
    });
    it('should convert from hsv with red', function () {
        var color = core_1.Color.fromHsv(240, 1, 1);
        expect(color.r).toBe(0);
        expect(color.g).toBe(0);
        expect(color.b).toBe(1);
    });
    it('should convert from hsv with pink', function () {
        var color = core_1.Color.fromHsv(300, 1, 1);
        expect(color.r).toBe(1);
        expect(color.g).toBe(0);
        expect(color.b).toBe(1);
    });
    it('should convert from hsl with another red', function () {
        var color = core_1.Color.fromHsl(360, 1, 0.5);
        expect(color.r).toBeCloseTo(1, 1);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should convert from hsv with red', function () {
        var color = core_1.Color.fromHsv(0, 1, 1);
        expect(color.r).toBe(1);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should convert from hsv with yellow', function () {
        var color = core_1.Color.fromHsv(60, 1, 1);
        expect(color.r).toBe(1);
        expect(color.g).toBe(1);
        expect(color.b).toBe(0);
    });
    it('should convert from hsv with blue', function () {
        var color = core_1.Color.fromHsv(120, 1, 1);
        expect(color.r).toBe(0);
        expect(color.g).toBe(1);
        expect(color.b).toBe(0);
    });
    it('should convert from hsv with turkis', function () {
        var color = core_1.Color.fromHsv(180, 1, 1);
        expect(color.r).toBe(0);
        expect(color.g).toBe(1);
        expect(color.b).toBe(1);
    });
    it('should convert from hsv with red', function () {
        var color = core_1.Color.fromHsv(240, 1, 1);
        expect(color.r).toBe(0);
        expect(color.g).toBe(0);
        expect(color.b).toBe(1);
    });
    it('should convert from hsv with pink', function () {
        var color = core_1.Color.fromHsv(300, 1, 1);
        expect(color.r).toBe(1);
        expect(color.g).toBe(0);
        expect(color.b).toBe(1);
    });
    it('should be valid black', function () {
        var color = core_1.Color.BLACK;
        expect(color.r).toBe(0);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should be valid white', function () {
        var color = core_1.Color.WHITE;
        expect(color.r).toBe(1);
        expect(color.g).toBe(1);
        expect(color.b).toBe(1);
    });
    it('should be valid red', function () {
        var color = core_1.Color.RED;
        expect(color.r).toBe(1);
        expect(color.g).toBe(0);
        expect(color.b).toBe(0);
    });
    it('should be valid green', function () {
        var color = core_1.Color.GREEN;
        expect(color.r).toBe(0);
        expect(color.g).toBe(1);
        expect(color.b).toBe(0);
    });
    it('should be valid blue', function () {
        var color = core_1.Color.BLUE;
        expect(color.r).toBe(0);
        expect(color.g).toBe(0);
        expect(color.b).toBe(1);
    });
    it('should calculate correct luminance', function () {
        expect(new core_1.Color(1, 1, 1).luminance).toBe(1);
        expect(new core_1.Color(0, 0, 0).luminance).toBe(0);
        expect(new core_1.Color(1, 0, 0).luminance).toBe(1 / 3);
        expect(new core_1.Color(0, 1, 0).luminance).toBe(1 / 2);
        expect(new core_1.Color(0, 0, 1).luminance).toBe(1 / 6);
    });
    it('should make valid equal comparisons', function () {
        expect(new core_1.Color(0.1, 0.1, 0.1).eq(new core_1.Color(0.1, 0.1, 0.1))).toBeTruthy();
        expect(new core_1.Color(0.1, 0.1, 0.4).eq(new core_1.Color(0.1, 0.1, 0.1))).toBeFalsy();
    });
    it('should make valid not equal comparisons', function () {
        expect(new core_1.Color(0.1, 0.1, 0.1).ne(new core_1.Color(0.1, 0.1, 0.4))).toBeTruthy();
        expect(new core_1.Color(0.1, 0.1, 0.1).ne(new core_1.Color(0.1, 0.1, 0.1))).toBeFalsy();
    });
    it('should return color when creating from color', function () {
        var color = core_1.Color.fromHsv(300, 1, 1);
        var created = core_1.Color.fromValue(color);
        expect(created).toBe(color);
    });
    it('should throw error for invalid string', function () {
        expect(function () { return core_1.Color.fromValue('INVALID'); }).toThrowError('Color is not in a valid format.');
    });
});
