"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
var core_1 = require("@app/core");
var interface_1 = require("@app/wireframes/interface");
var model_1 = require("@app/wireframes/model");
var shape = model_1.DiagramItem.createShape({
    id: '1',
    renderer: 'Button',
    appearance: (_a = {},
        _a[interface_1.DefaultAppearance.FONT_SIZE] = 12,
        _a)
});
describe('TextHeightConstraint', function () {
    it('should set y size from font size', function () {
        var constraint = new model_1.TextHeightConstraint(10);
        var size = constraint.updateSize(shape, new core_1.Vec2(130, 20));
        expect(size).toEqual(new core_1.Vec2(130, 34));
        expect(constraint.calculateSizeX()).toBeFalsy();
        expect(constraint.calculateSizeY()).toBeTruthy();
    });
});
describe('MinSizeConstraint', function () {
    it('should use x value as size if x is smaller than y', function () {
        var constraint = new model_1.MinSizeConstraint();
        var size = constraint.updateSize(shape, new core_1.Vec2(30, 40));
        expect(size).toEqual(new core_1.Vec2(30, 30));
        expect(constraint.calculateSizeX()).toBeFalsy();
        expect(constraint.calculateSizeY()).toBeFalsy();
    });
    it('should use y value as size if y is smaller than x', function () {
        var constraint = new model_1.MinSizeConstraint();
        var size = constraint.updateSize(shape, new core_1.Vec2(50, 20));
        expect(size).toEqual(new core_1.Vec2(20, 20));
        expect(constraint.calculateSizeX()).toBeFalsy();
        expect(constraint.calculateSizeY()).toBeFalsy();
    });
});
describe('SizeConstraint', function () {
    it('should not calculate size when not configured', function () {
        var constraint = new model_1.SizeConstraint(undefined, undefined);
        var size = constraint.updateSize(shape, new core_1.Vec2(50, 60));
        expect(size).toEqual(new core_1.Vec2(50, 60));
        expect(constraint.calculateSizeX()).toBeFalsy();
        expect(constraint.calculateSizeY()).toBeFalsy();
    });
    it('should calculate size when configured', function () {
        var constraint = new model_1.SizeConstraint(55, 33);
        var size = constraint.updateSize(shape, new core_1.Vec2(50, 60));
        expect(size).toEqual(new core_1.Vec2(55, 33));
        expect(constraint.calculateSizeX()).toBeTruthy();
        expect(constraint.calculateSizeY()).toBeTruthy();
    });
});
