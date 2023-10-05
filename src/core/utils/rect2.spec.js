"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('Rect2', function () {
    it('should provide values from constructor', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        expect(rect.y).toBe(20);
        expect(rect.top).toBe(20);
        expect(rect.x).toBe(10);
        expect(rect.left).toBe(10);
        expect(rect.w).toBe(50);
        expect(rect.width).toBe(50);
        expect(rect.h).toBe(30);
        expect(rect.height).toBe(30);
        expect(rect.right).toBe(60);
        expect(rect.bottom).toBe(50);
        expect(rect.cx).toBe(35);
        expect(rect.cy).toBe(35);
        expect(rect.center).toEqual(new core_1.Vec2(35, 35));
        expect(rect.area).toBe(1500);
        expect(rect.toString()).toBe('(x: 10, y: 20, w: 50, h: 30)');
    });
    it('should calculate isEmpty correctly', function () {
        expect(new core_1.Rect2(10, 20, 50, 30).isEmpty).toBeFalsy();
        expect(new core_1.Rect2(10, 20, -1, 30).isEmpty).toBeTruthy();
        expect(new core_1.Rect2(10, 20, 50, -9).isEmpty).toBeTruthy();
    });
    it('should calculate isInfinite correctly', function () {
        expect(new core_1.Rect2(10, 20, 50, 30).isInfinite).toBeFalsy();
        expect(new core_1.Rect2(10, 20, Number.POSITIVE_INFINITY, 30).isInfinite).toBeTruthy();
        expect(new core_1.Rect2(10, 20, 50, Number.POSITIVE_INFINITY).isInfinite).toBeTruthy();
    });
    it('should inflate correctly', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        var actual1 = rect.inflateV(new core_1.Vec2(10, 20));
        var actual2 = rect.inflate(10, 20);
        var expected = new core_1.Rect2(0, 0, 70, 70);
        expect(actual1).toEqual(expected);
        expect(actual2).toEqual(expected);
    });
    it('should deflate correctly', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        var actual1 = rect.deflateV(new core_1.Vec2(25, 15));
        var actual2 = rect.deflate(25, 15);
        var expected = new core_1.Rect2(35, 35, 0, 0);
        expect(actual1).toEqual(expected);
        expect(actual2).toEqual(expected);
    });
    it('should return true for intersection with infinite rect', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        expect(rect.intersects(core_1.Rect2.INFINITY)).toBeTruthy();
        expect(core_1.Rect2.INFINITY.intersects(rect)).toBeTruthy();
        expect(core_1.Rect2.INFINITY.intersects(core_1.Rect2.INFINITY)).toBeTruthy();
    });
    it('should return false for intersection with empty rect', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        expect(rect.intersects(core_1.Rect2.EMPTY)).toBeFalsy();
        expect(core_1.Rect2.EMPTY.intersects(rect)).toBeFalsy();
        expect(core_1.Rect2.EMPTY.intersects(core_1.Rect2.INFINITY)).toBeFalsy();
    });
    it('should return empty for no intersection', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        var outer = new core_1.Rect2(100, 20, 50, 30);
        var actual = rect.intersect(outer);
        var expected = core_1.Rect2.EMPTY;
        expect(actual).toEqual(expected);
    });
    it('should return result for intersection', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        var inner = new core_1.Rect2(35, 35, 100, 30);
        var actual = rect.intersect(inner);
        var expected = new core_1.Rect2(35, 35, 25, 15);
        expect(actual).toEqual(expected);
    });
    it('should make correct contains by vector tests', function () {
        var rect = new core_1.Rect2(10, 20, 50, 30);
        expect(rect.contains(rect.center)).toBeTruthy();
        expect(rect.contains(new core_1.Vec2(rect.left, rect.top))).toBeTruthy();
        expect(rect.contains(new core_1.Vec2(rect.cx, 0))).toBeFalsy();
        expect(rect.contains(new core_1.Vec2(rect.cx, 100))).toBeFalsy();
        expect(rect.contains(new core_1.Vec2(100, rect.cy))).toBeFalsy();
        expect(rect.contains(new core_1.Vec2(-50, rect.cy))).toBeFalsy();
    });
    it('should return true when rect contains other rect', function () {
        var rect = new core_1.Rect2(400, 400, 400, 400);
        var other = new core_1.Rect2(500, 500, 200, 200);
        expect(rect.contains(other)).toBeTruthy();
    });
    it('should return false when other rect is too top', function () {
        var rect = new core_1.Rect2(400, 400, 400, 400);
        var other = new core_1.Rect2(300, 900, 300, 100);
        expect(rect.contains(other)).toBeFalsy();
    });
    it('should return false when other rect is too bottom', function () {
        var rect = new core_1.Rect2(400, 400, 400, 400);
        var other = new core_1.Rect2(300, 900, 100, 300);
        expect(rect.contains(other)).toBeFalsy();
    });
    it('should return false when other rect is too left', function () {
        var rect = new core_1.Rect2(400, 400, 400, 400);
        var other = new core_1.Rect2(200, 200, 100, 300);
        expect(rect.contains(other)).toBeFalsy();
    });
    it('should return false when other right is too left', function () {
        var rect = new core_1.Rect2(400, 400, 400, 400);
        var other = new core_1.Rect2(900, 200, 100, 300);
        expect(rect.contains(other)).toBeFalsy();
    });
    it('should return empty when creating from null vectors', function () {
        var actual = core_1.Rect2.fromVecs(null);
        var expected = core_1.Rect2.EMPTY;
        expect(actual).toEqual(expected);
    });
    it('should return empty when creating from null rects', function () {
        var actual = core_1.Rect2.fromRects(null);
        var expected = core_1.Rect2.EMPTY;
        expect(actual).toEqual(expected);
    });
    it('should provide valid zero instance', function () {
        var actual = core_1.Rect2.ZERO;
        var expected = new core_1.Rect2(0, 0, 0, 0);
        expect(actual).toEqual(expected);
    });
    it('should provide valid empty instance', function () {
        var actual = core_1.Rect2.EMPTY;
        var expected = new core_1.Rect2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        expect(actual).toEqual(expected);
    });
    it('should provide valid infinite instance', function () {
        var actual = core_1.Rect2.INFINITY;
        var expected = new core_1.Rect2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        expect(actual).toEqual(expected);
    });
    it('should create from center', function () {
        var actual = core_1.Rect2.fromCenter(new core_1.Vec2(100, 100), 10);
        var expected = new core_1.Rect2(90, 90, 20, 20);
        expect(actual).toEqual(expected);
    });
    it('should create correct rect from vectors', function () {
        var actual = core_1.Rect2.fromVecs([
            new core_1.Vec2(100, 100),
            new core_1.Vec2(500, 300),
            new core_1.Vec2(900, 800)
        ]);
        var expected = new core_1.Rect2(100, 100, 800, 700);
        expect(actual).toEqual(expected);
    });
    it('should create correct rect from rects', function () {
        var actual = core_1.Rect2.fromRects([
            new core_1.Rect2(100, 100, 100, 100),
            new core_1.Rect2(500, 300, 100, 100),
            new core_1.Rect2(150, 150, 750, 650)
        ]);
        var expected = new core_1.Rect2(100, 100, 800, 700);
        expect(actual).toEqual(expected);
    });
    it('should create rect from rotation', function () {
        var actual = core_1.Rect2.rotated(new core_1.Vec2(400, 300), new core_1.Vec2(600, 400), core_1.Rotation.fromRadian(Math.PI / 2));
        var expected = new core_1.Rect2(500, 200, 400, 600);
        expect(actual).toEqual(expected);
    });
    it('should create rect from zero rotation', function () {
        var actual = core_1.Rect2.rotated(new core_1.Vec2(400, 300), new core_1.Vec2(600, 400), core_1.Rotation.ZERO);
        var expected = new core_1.Rect2(400, 300, 600, 400);
        expect(actual).toEqual(expected);
    });
    it('should make valid equal comparisons', function () {
        expect(new core_1.Rect2(10, 10, 10, 10).equals(new core_1.Rect2(10, 10, 10, 10))).toBeTruthy();
        expect(new core_1.Rect2(10, 10, 10, 10).equals(new core_1.Rect2(20, 20, 20, 20))).toBeFalsy();
    });
});
