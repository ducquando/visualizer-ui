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
describe('GroupingReducer', function () {
    var state = model_1.EditorState.create();
    var reducer = (0, model_1.createClassReducer)(state, function (builder) { return (0, model_1.buildGrouping)(builder); });
    it('should return same state if action is unknown', function () {
        var action = { type: 'UNKNOWN' };
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should group shapes and select new group', function () {
        var id1 = '1';
        var id2 = '2';
        var diagram = model_1.Diagram.create({ id: '1' })
            .addShape(model_1.DiagramItem.createShape({ id: id1, renderer: 'Button' }))
            .addShape(model_1.DiagramItem.createShape({ id: id2, renderer: 'Button' }));
        var groupId = 'group-1';
        var action = (0, model_1.groupItems)(diagram, diagram.items.values, groupId);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get(diagram.id);
        expect(newDiagram.selectedIds.values).toEqual([groupId]);
        expect(newDiagram.rootIds.values).toEqual([groupId]);
    });
    it('should ungroup multiple groups and select their children', function () {
        var groupId1 = 'group-1';
        var groupId2 = 'group-2';
        var id1 = '1';
        var id2 = '2';
        var id3 = '3';
        var id4 = '4';
        var diagram = model_1.Diagram.create({ id: '1' })
            .addShape(model_1.DiagramItem.createShape({ id: id1, renderer: 'Button' }))
            .addShape(model_1.DiagramItem.createShape({ id: id2, renderer: 'Button' }))
            .addShape(model_1.DiagramItem.createShape({ id: id3, renderer: 'Button' }))
            .addShape(model_1.DiagramItem.createShape({ id: id4, renderer: 'btn' }));
        var shapes = diagram.items;
        diagram = diagram.group(groupId1, [id1, id2]);
        diagram = diagram.group(groupId2, [id3, id4]);
        var group1 = diagram.items.get(groupId1);
        var group2 = diagram.items.get(groupId2);
        var action = (0, model_1.ungroupItems)(diagram, [group1, group2, model_1.DiagramItem.createGroup({ id: '5' })]);
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get(diagram.id);
        var ids = shapes.keys;
        expect(newDiagram.selectedIds.values).toEqual(ids);
        expect(newDiagram.rootIds.values).toEqual(ids);
    });
});
