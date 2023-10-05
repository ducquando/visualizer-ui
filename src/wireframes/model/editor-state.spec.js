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
describe('EditorState', function () {
    var state_1 = model_1.EditorState.create();
    var diagram = model_1.Diagram.create({ id: '1' });
    it('should instantiate', function () {
        var state = model_1.EditorState.create();
        expect(state).toBeDefined();
    });
    it('should add diagram', function () {
        var state_2 = state_1.addDiagram(diagram);
        expect(state_2.diagrams.has(diagram.id)).toBeTruthy();
    });
    it('should return original state when diagram is already added', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.addDiagram(diagram);
        expect(state_3).toBe(state_2);
    });
    it('should remove diagram', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.removeDiagram(diagram.id);
        expect(state_3.diagrams.has(diagram.id)).toBeFalsy();
    });
    it('should return original state when diagram to remove is not found', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.removeDiagram('unfound');
        expect(state_3).toBe(state_2);
    });
    it('should unselect diagram when diagram to remove is selected', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.selectDiagram(diagram.id);
        var state_4 = state_3.removeDiagram(diagram.id);
        expect(state_4.diagrams.has(diagram.id)).toBeFalsy();
        expect(state_4.selectedDiagramId).toBeNull();
    });
    it('should move diagram', function () {
        var diagram1 = model_1.Diagram.create({ id: '1' });
        var diagram2 = model_1.Diagram.create({ id: '2' });
        var state_2 = state_1.addDiagram(diagram1).addDiagram(diagram2);
        var state_3 = state_2.moveDiagram(diagram2.id, 0);
        expect(state_3.orderedDiagrams).toEqual([diagram2, diagram1]);
    });
    it('should select diagram', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.selectDiagram(diagram.id);
        expect(state_3.selectedDiagramId).toBe(diagram.id);
    });
    it('should return original state when diagram to select is not found', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.selectDiagram('unfound');
        expect(state_3).toBe(state_2);
    });
    it('should update diagram', function () {
        var newDiagram = model_1.Diagram.create({ id: diagram.id });
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.updateDiagram(diagram.id, function () { return newDiagram; });
        expect(state_3.diagrams.size).toBe(1);
        expect(state_3.diagrams.get(diagram.id)).toEqual(newDiagram);
    });
    it('should return orignal state when diagram to update is not found', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.updateDiagram('unfound', function (d) { return model_1.Diagram.create({ id: d.id }); });
        expect(state_3).toBe(state_2);
    });
    it('should return orignal state when updater returns same diagram', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.updateDiagram(diagram.id, function (d) { return d; });
        expect(state_3).toBe(state_2);
    });
    it('should update all diagrams', function () {
        var newDiagram = model_1.Diagram.create({ id: diagram.id });
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.updateAllDiagrams(function () { return newDiagram; });
        expect(state_3.diagrams.size).toBe(1);
        expect(state_3.diagrams.get(diagram.id)).toEqual(newDiagram);
    });
    it('should return orignal state when all updater returns same diagrams', function () {
        var state_2 = state_1.addDiagram(diagram);
        var state_3 = state_2.updateAllDiagrams(function (d) { return d; });
        expect(state_3).toBe(state_2);
    });
    it('should change size', function () {
        var newSize = new core_1.Vec2(1500, 1200);
        var state_2 = state_1.changeSize(newSize);
        expect(state_2.size).toEqual(newSize);
    });
    it('should change color', function () {
        var newColor = core_1.Color.fromString('#f00');
        var state_2 = state_1.changeColor(newColor);
        expect(state_2.color).toEqual(newColor);
    });
    it('should return orignal state when size not changed', function () {
        var state_2 = state_1.changeSize(new core_1.Vec2(1000, 1000));
        expect(state_2).toBe(state_1);
    });
});
