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
var button_1 = require("@app/wireframes/shapes/neutral/button");
var icon_1 = require("@app/wireframes/shapes/shared/icon");
var raster_1 = require("@app/wireframes/shapes/shared/raster");
var abstract_control_1 = require("@app/wireframes/shapes/utils/abstract-control");
describe('ItemsReducer', function () {
    var groupId = 'group-1';
    var shape1 = model_1.DiagramItem.createShape({ id: '1', renderer: 'Button' });
    var shape2 = model_1.DiagramItem.createShape({ id: '2', renderer: 'Button' });
    var shape3 = model_1.DiagramItem.createShape({ id: '3', renderer: 'Button' });
    var diagram = model_1.Diagram.create({ id: '1' })
        .addShape(shape1)
        .addShape(shape2.lock())
        .addShape(shape3);
    diagram = diagram.group(groupId, [shape1.id, shape2.id]);
    model_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new icon_1.Icon()));
    model_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new button_1.Button()));
    model_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new raster_1.Raster()));
    var state = model_1.EditorState.create()
        .addDiagram(diagram);
    var reducer = (0, model_1.createClassReducer)(state, function (builder) { return (0, model_1.buildItems)(builder); });
    it('should return same state if action is unknown', function () {
        var action = { type: 'UNKNOWN' };
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should select shapes and set the ids of these shapes', function () {
        var action = (0, model_1.selectItems)(diagram, [groupId]);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get(diagram.id);
        expect(newDiagram.selectedIds.values).toEqual([groupId]);
    });
    it('should remove items and all children', function () {
        var action = (0, model_1.removeItems)(diagram, [diagram.items.get(groupId)]);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get(diagram.id);
        expect(newDiagram.selectedIds.size).toBe(0);
    });
    it('should rename item', function () {
        var action = (0, model_1.renameItems)(diagram, [shape1], 'Name');
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newShape = state_2.diagrams.get(diagram.id).items.get('1');
        expect(newShape.name).toEqual('Name');
    });
    it('should lock item', function () {
        var action = (0, model_1.lockItems)(diagram, [shape1]);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newShape = state_2.diagrams.get(diagram.id).items.get('1');
        expect(newShape.isLocked).toBeTruthy();
    });
    it('should unlock item', function () {
        var action = (0, model_1.unlockItems)(diagram, [shape2]);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newShape = state_2.diagrams.get(diagram.id).items.get('2');
        expect(newShape.isLocked).toBeFalsy();
    });
    it('should add shape and select this shape', function () {
        var shapeId = 'shape';
        var action = (0, model_1.addShape)(diagram, 'Button', { position: { x: 100, y: 20 } }, shapeId);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get(diagram.id);
        var newShape = newDiagram.items.get(shapeId);
        expect(newShape.id).toBe(shapeId);
        expect(newShape.transform.position).toEqual(new core_1.Vec2(150, 35));
        expect(newDiagram.selectedIds.values).toEqual([shapeId]);
    });
    it('should add shape with default properties and select this shape', function () {
        var shapeId = 'shape';
        var action = (0, model_1.addShape)(diagram, 'Button', { position: { x: 100, y: 20 }, appearance: { text1: 'text1', text2: 'text2' } }, shapeId);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get(diagram.id);
        var newShape = newDiagram.items.get(shapeId);
        expect(newShape.id).toBe(shapeId);
        expect(newShape.appearance.get('text1')).toEqual('text1');
        expect(newShape.appearance.get('text2')).toEqual('text2');
        expect(newShape.transform.position).toEqual(new core_1.Vec2(150, 35));
        expect(newDiagram.selectedIds.values).toEqual([shapeId]);
    });
    it('should paste json and add group and items', function () {
        var source = model_1.DiagramItemSet.createFromDiagram(diagram.rootIds.values, diagram);
        source = model_1.Serializer.serializeSet(source);
        source = JSON.stringify(source);
        var action1 = (0, model_1.pasteItems)(diagram, source);
        var action2 = (0, model_1.pasteItems)(diagram, source);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action1);
        var state_3 = reducer(state_2, action2);
        var newDiagram1 = state_2.diagrams.get(diagram.id);
        var newDiagram2 = state_3.diagrams.get(diagram.id);
        expect(newDiagram1.items.size).toBe(8);
        expect(newDiagram1.rootIds.size).toBe(4);
        expect(newDiagram1.selectedIds.size).toBe(2);
        expect(newDiagram2.items.size).toBe(12);
        expect(newDiagram2.rootIds.size).toBe(6);
        expect(newDiagram2.selectedIds.size).toBe(2);
    });
    it('should not throw when pasting invalid json to diagram', function () {
        var json = 'invalid json';
        var action = (0, model_1.pasteItems)(diagram, json);
        var state = model_1.EditorState.create();
        expect(function () { return reducer(state, action); }).not.toThrow();
    });
    it('should return empty array of items when items array is null', function () {
        var itemIds = (0, model_1.calculateSelection)(null, diagram);
        expect(itemIds).toEqual([]);
    });
    it('should return empty array of item ids when selecting invalid items', function () {
        var itemIds = (0, model_1.calculateSelection)([null], diagram, true);
        expect(itemIds).toEqual([]);
    });
    it('should not handle grouped shapes when shape is not in group', function () {
        var itemIds = (0, model_1.calculateSelection)([diagram.items.get(groupId)], diagram, true);
        expect(itemIds).toEqual([groupId]);
    });
    it('should return group id when selecting grouped items', function () {
        var itemIds = (0, model_1.calculateSelection)([shape1, shape2], diagram);
        expect(itemIds).toEqual([groupId]);
    });
    it('should Select grouped shape when group is selected', function () {
        var selectedDiagram = diagram.selectItems([groupId]);
        var itemIds = (0, model_1.calculateSelection)([shape1], selectedDiagram, true);
        expect(itemIds).toEqual([shape1.id]);
    });
    it('should add item to selection list', function () {
        var selectedDiagram = diagram.selectItems([groupId]);
        var itemIds = (0, model_1.calculateSelection)([shape3], selectedDiagram, true, true);
        expect(itemIds).toEqual([shape3.id, groupId]);
    });
    it('should remove item from selection list', function () {
        var selectedDiagram = diagram.selectItems([groupId, shape3.id]);
        var itemIds = (0, model_1.calculateSelection)([shape3], selectedDiagram, true, true);
        expect(itemIds).toEqual([groupId]);
    });
});
