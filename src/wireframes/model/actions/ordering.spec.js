"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
/* eslint-disable @typescript-eslint/naming-convention */
var model_1 = require("@app/wireframes/model");
describe('OrderingReducer', function () {
    var shape1 = model_1.DiagramItem.createShape({ id: '1', renderer: 'Button' });
    var shape2 = model_1.DiagramItem.createShape({ id: '2', renderer: 'Button' });
    var shape3 = model_1.DiagramItem.createShape({ id: '3', renderer: 'Button' });
    var diagram = model_1.Diagram.create({ id: '1' })
        .addShape(shape1)
        .addShape(shape2)
        .addShape(shape3);
    var state = model_1.EditorState.create()
        .addDiagram(diagram);
    var reducer = (0, model_1.createClassReducer)(state, function (builder) { return (0, model_1.buildOrdering)(builder); });
    it('should return same state if action is unknown', function () {
        var action = { type: 'UNKNOWN' };
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should return same state if action has unknown ordering type', function () {
        var action = (0, model_1.orderItems)('UNKNOWN', diagram, []);
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should move items', function () {
        var _a;
        var action = (0, model_1.moveItems)(diagram, [shape1], 1);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect((_a = state_2.diagrams.get(diagram.id)) === null || _a === void 0 ? void 0 : _a.rootIds.values).toEqual([shape2.id, shape1.id, shape3.id]);
    });
    it('should bring item forwards', function () {
        testOrdering(model_1.OrderMode.BringForwards, shape1, [shape2.id, shape1.id, shape3.id]);
    });
    it('should bring item to front', function () {
        testOrdering(model_1.OrderMode.BringToFront, shape1, [shape2.id, shape3.id, shape1.id]);
    });
    it('should send item backwards', function () {
        testOrdering(model_1.OrderMode.SendBackwards, shape3, [shape1.id, shape3.id, shape2.id]);
    });
    it('should send item to back', function () {
        testOrdering(model_1.OrderMode.SendToBack, shape3, [shape3.id, shape1.id, shape2.id]);
    });
    function testOrdering(mode, shape, expectedIds) {
        var _a;
        var action = (0, model_1.orderItems)(mode, diagram, [shape]);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect((_a = state_2.diagrams.get(diagram.id)) === null || _a === void 0 ? void 0 : _a.rootIds.values).toEqual(expectedIds);
    }
});
