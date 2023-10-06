"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
/* eslint-disable @typescript-eslint/naming-convention */
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
describe('DiagramReducer', function () {
    var state = model_1.EditorState.create();
    var reducer = (0, model_1.createClassReducer)(state, function (builder) { return (0, model_1.buildDiagrams)(builder); });
    it('should return same state if action is unknown', function () {
        var action = { type: 'UNKNOWN' };
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should add diagram', function () {
        var _a;
        var action = (0, model_1.addDiagram)('1');
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2.diagrams.size).toBe(1);
        expect((_a = state_2.diagrams.get('1')) === null || _a === void 0 ? void 0 : _a.id).toBe('1');
        expect(state_2.selectedDiagramId).toBe('1');
    });
    it('should select diagram', function () {
        var diagram = model_1.Diagram.create({ id: '1' });
        var action = (0, model_1.selectDiagram)(diagram);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect(state_2.selectedDiagramId).toBe(diagram.id);
    });
    it('should duplicate diagram', function () {
        var diagram = model_1.Diagram.create({ id: '1' });
        var action = (0, model_1.duplicateDiagram)(diagram);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect(state_2.diagrams.size).toBe(2);
    });
    it('should remove diagram', function () {
        var diagram = model_1.Diagram.create({ id: '1' });
        var action = (0, model_1.removeDiagram)(diagram);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect(state_2.diagrams.size).toBe(0);
    });
    it('should move diagram', function () {
        var diagram1 = model_1.Diagram.create({ id: '1' });
        var diagram2 = model_1.Diagram.create({ id: '2' });
        var action = (0, model_1.moveDiagram)(diagram2, 0);
        var state_1 = model_1.EditorState.create().addDiagram(diagram1).addDiagram(diagram2);
        var state_2 = reducer(state_1, action);
        expect(state_2.orderedDiagrams).toEqual([diagram2, diagram1]);
    });
    it('should change size', function () {
        var action = (0, model_1.changeSize)(1500, 1200);
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2.size).toEqual(new core_1.Vec2(1500, 1200));
    });
    it('should change color', function () {
        var action = (0, model_1.changeColor)(core_1.Color.RED);
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2.color).toEqual(core_1.Color.fromString('#ff0000'));
    });
    it('should rename title', function () {
        var _a;
        var diagram = model_1.Diagram.create({ id: '1' });
        var action = (0, model_1.renameDiagram)(diagram, 'New Title');
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect((_a = state_2.diagrams.get('1')) === null || _a === void 0 ? void 0 : _a.title).toEqual('New Title');
    });
    it('should set master', function () {
        var _a;
        var diagram = model_1.Diagram.create({ id: '1' });
        var action = (0, model_1.setDiagramMaster)(diagram, 'Master');
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        expect((_a = state_2.diagrams.get('1')) === null || _a === void 0 ? void 0 : _a.master).toEqual('Master');
    });
});
