"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
/* eslint-disable @typescript-eslint/naming-convention */
describe('Transform', function () {
    var transform = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(45));
    it('should convert from old json', function () {
        var json = {
            position: {
                x: 10,
                y: 20
            },
            size: {
                x: 30,
                y: 40
            },
            rotation: 45
        };
        var parsed = model_1.Transform.fromJS(json);
        expect(parsed.position.x).toEqual(10);
        expect(parsed.position.y).toEqual(20);
        expect(parsed.size.x).toEqual(30);
        expect(parsed.size.y).toEqual(40);
        expect(parsed.rotation.degree).toEqual(45);
    });
    it('should convert from new json', function () {
        var json = {
            x: 10,
            y: 20,
            w: 30,
            h: 40,
            r: 45
        };
        var parsed = model_1.Transform.fromJS(json);
        expect(parsed.position.x).toEqual(10);
        expect(parsed.position.y).toEqual(20);
        expect(parsed.size.x).toEqual(30);
        expect(parsed.size.y).toEqual(40);
        expect(parsed.rotation.degree).toEqual(45);
    });
    it('should convert to json', function () {
        var json = transform.toJS();
        expect(json.x).toEqual(10);
        expect(json.y).toEqual(20);
        expect(json.w).toEqual(30);
        expect(json.h).toEqual(40);
        expect(json.r).toEqual(45);
    });
    it('should make correct equal comparisons', function () {
        expect(transform.equals(transform.moveBy(core_1.Vec2.ZERO))).toBeTruthy();
        expect(transform.equals(transform.moveBy(core_1.Vec2.ONE))).toBeFalsy();
    });
    it('should calculate to string', function () {
        var actual = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(45)).toString();
        var expected = '<position: (10, 20), size: (30, 40), rotation: 45°>';
        expect(actual).toEqual(expected);
    });
    it('should calculate to string', function () {
        var actual = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(45)).halfSize;
        var expected = new core_1.Vec2(15, 20);
        expect(actual).toEqual(expected);
    });
    it('should rotate around anchor', function () {
        var actual = transform.rotateAroundAnchor(new core_1.Vec2(25, 140), core_1.Rotation.fromDegree(90));
        var expected = new model_1.Transform(new core_1.Vec2(145, 125), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(135));
        expect(actual).toEqual(expected);
    });
    it('should replace position by moveTo', function () {
        var actual = transform.moveTo(new core_1.Vec2(100, 60));
        var expected = new model_1.Transform(new core_1.Vec2(100, 60), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(45));
        expect(actual).toEqual(expected);
    });
    it('should add position by moveBy', function () {
        var actual = transform.moveBy(new core_1.Vec2(100, 60));
        var expected = new model_1.Transform(new core_1.Vec2(110, 80), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(45));
        expect(actual).toEqual(expected);
    });
    it('should replace size by resizeTo', function () {
        var actual = transform.resizeTo(new core_1.Vec2(100, 60));
        var expected = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(100, 60), core_1.Rotation.fromDegree(45));
        expect(actual).toEqual(expected);
    });
    it('should add size by resizeBy', function () {
        var actual = transform.resizeBy(new core_1.Vec2(100, 60));
        var expected = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(130, 100), core_1.Rotation.fromDegree(45));
        expect(actual).toEqual(expected);
    });
    it('should replace rotation by rotateTo', function () {
        var actual = transform.rotateTo(core_1.Rotation.fromDegree(90));
        var expected = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(90));
        expect(actual).toEqual(expected);
    });
    it('should add size by rotateBy', function () {
        var actual = transform.rotateBy(core_1.Rotation.fromDegree(90));
        var expected = new model_1.Transform(new core_1.Vec2(10, 20), new core_1.Vec2(30, 40), core_1.Rotation.fromDegree(135));
        expect(actual).toEqual(expected);
    });
    it('Should create from rect', function () {
        var actual = model_1.Transform.fromRect(new core_1.Rect2(100, 60, 30, 40));
        var expected = new model_1.Transform(new core_1.Vec2(115, 80), new core_1.Vec2(30, 40), core_1.Rotation.ZERO);
        expect(actual).toEqual(expected);
    });
    it('should provide zero transform', function () {
        var actual = model_1.Transform.ZERO;
        var expected = new model_1.Transform(core_1.Vec2.ZERO, core_1.Vec2.ZERO, core_1.Rotation.ZERO);
        expect(actual).toEqual(expected);
    });
    it('Should create from rects', function () {
        var rects = [
            new core_1.Rect2(100, 60, 30, 40),
            new core_1.Rect2(200, 60, 30, 40),
        ];
        var actual = model_1.Transform.fromRects(rects);
        var expected = new model_1.Transform(new core_1.Vec2(165, 80), new core_1.Vec2(130, 40), core_1.Rotation.ZERO);
        expect(actual).toEqual(expected);
    });
    it('should create from transformations and rotation', function () {
        var center = new core_1.Vec2(300, 150);
        var rotation = core_1.Rotation.fromDegree(45);
        var transformation1 = new model_1.Transform(new core_1.Vec2(200, 100), new core_1.Vec2(100, 40), core_1.Rotation.ZERO)
            .rotateAroundAnchor(center, rotation);
        var transformation2 = new model_1.Transform(new core_1.Vec2(400, 200), new core_1.Vec2(100, 40), core_1.Rotation.ZERO)
            .rotateAroundAnchor(center, rotation);
        var actual = model_1.Transform.createFromTransformationsAndRotation([transformation1, transformation2], rotation);
        var expected = new model_1.Transform(new core_1.Vec2(300, 150), new core_1.Vec2(300, 140), core_1.Rotation.fromDegree(45));
        expect(actual.equals(expected)).toBeTrue();
    });
    it('should return same instance when resizing to same size', function () {
        var transform_0 = new model_1.Transform(core_1.Vec2.ZERO, new core_1.Vec2(100, 100), core_1.Rotation.ZERO);
        var transform_1 = transform_0.resizeTopLeft(new core_1.Vec2(100, 100));
        expect(transform_1).toBe(transform_0);
    });
    [
        { rotation: 0, expectedPosition: new core_1.Vec2(150, 100) },
        { rotation: 90, expectedPosition: new core_1.Vec2(100, 150) },
        { rotation: 180, expectedPosition: new core_1.Vec2(50, 100) },
        { rotation: 270, expectedPosition: new core_1.Vec2(100, 50) },
    ].forEach(function (test) {
        it("should resize top left with ".concat(test.rotation, " rotation"), function () {
            var oldSize = new core_1.Vec2(100, 100);
            var oldPos = new core_1.Vec2(100, 100);
            var newSize = new core_1.Vec2(200, 100);
            var newPos = test.expectedPosition;
            var rotation = core_1.Rotation.fromDegree(test.rotation);
            var actual = new model_1.Transform(oldPos, oldSize, rotation).resizeTopLeft(newSize);
            var expected = new model_1.Transform(newPos, newSize, rotation);
            expect(actual).toEqual(expected);
        });
    });
    [
        { dw: 2, dx: 1 },
        { dw: 1, dx: 0.5 },
        { dw: -2, dx: -1 },
        { dw: -1, dx: -0.5 },
    ].forEach(function (test) {
        it("should transform by bounds with dw=".concat(test.dw, " and dx=").concat(test.dx), function () {
            var source = new model_1.Transform(new core_1.Vec2(50, 50), new core_1.Vec2(100, 100), core_1.Rotation.ZERO);
            var target = new model_1.Transform(new core_1.Vec2(50 + test.dx, 50), new core_1.Vec2(100 + test.dw, 100), core_1.Rotation.ZERO);
            var actual = source.transformByBounds(source, target, undefined);
            expect(actual.position).toEqual(target.position);
            expect(actual.size).toEqual(target.size);
        });
    });
});
