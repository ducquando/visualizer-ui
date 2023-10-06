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
describe('AlignmentReducer', function () {
    var shape1 = model_1.DiagramItem.createShape({
        id: '1',
        renderer: 'Button',
        transform: new model_1.Transform(new core_1.Vec2(100, 100), new core_1.Vec2(20, 20), core_1.Rotation.ZERO)
    });
    var shape2 = model_1.DiagramItem.createShape({
        id: '2',
        renderer: 'Button',
        transform: new model_1.Transform(new core_1.Vec2(200, 200), new core_1.Vec2(40, 40), core_1.Rotation.ZERO)
    });
    var shape3 = model_1.DiagramItem.createShape({
        id: '3',
        renderer: 'Button',
        transform: new model_1.Transform(new core_1.Vec2(300, 300), new core_1.Vec2(80, 80), core_1.Rotation.ZERO)
    });
    var diagram = model_1.Diagram.create({ id: '1' })
        .addShape(shape1)
        .addShape(shape2)
        .addShape(shape3);
    var state = model_1.EditorState.create()
        .addDiagram(diagram);
    var reducer = (0, model_1.createClassReducer)(state, function (builder) { return (0, model_1.buildAlignment)(builder); });
    it('should return same state if action is unknown', function () {
        var action = { type: 'UNKNOWN' };
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should return same state if action has unknown alignment type', function () {
        var action = (0, model_1.alignItems)('UNKNOWN', diagram, []);
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should align to horizontally left', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.HorizontalLeft, [new core_1.Vec2(100, 100), new core_1.Vec2(110, 200), new core_1.Vec2(130, 300)]);
    });
    it('should align to horizontally center', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.HorizontalCenter, [new core_1.Vec2(215, 100), new core_1.Vec2(215, 200), new core_1.Vec2(215, 300)]);
    });
    it('should align to horizontally right', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.HorizontalRight, [new core_1.Vec2(330, 100), new core_1.Vec2(320, 200), new core_1.Vec2(300, 300)]);
    });
    it('should align to vertically top', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.VerticalTop, [new core_1.Vec2(100, 100), new core_1.Vec2(200, 110), new core_1.Vec2(300, 130)]);
    });
    it('should align to vertically center', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.VerticalCenter, [new core_1.Vec2(100, 215), new core_1.Vec2(200, 215), new core_1.Vec2(300, 215)]);
    });
    it('should align to vertically bottom', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.VerticalBottom, [new core_1.Vec2(100, 330), new core_1.Vec2(200, 320), new core_1.Vec2(300, 300)]);
    });
    it('should distribute vertically', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.DistributeVertical, [new core_1.Vec2(100, 100), new core_1.Vec2(200, 185), new core_1.Vec2(300, 300)]);
    });
    it('should distribute horizontally', function () {
        expectPositionsAfterAlignment(model_1.AlignmentMode.DistributeHorizontal, [new core_1.Vec2(100, 100), new core_1.Vec2(185, 200), new core_1.Vec2(300, 300)]);
    });
    function expectPositionsAfterAlignment(type, positions) {
        var action = (0, model_1.alignItems)(type, diagram, diagram.items.values);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var shapes = state_2.diagrams.get(diagram.id).items.values;
        var i = 0;
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var shape = shapes_1[_i];
            expect(shape.transform.position).toEqual(positions[i]);
            i++;
        }
    }
});
