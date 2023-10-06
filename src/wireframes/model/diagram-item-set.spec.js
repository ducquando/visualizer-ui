"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var model_1 = require("@app/wireframes/model");
describe('Diagram Item Set', function () {
    var groupId = 'group-1';
    var root1 = model_1.DiagramItem.createShape({ id: '1', renderer: 'Button' });
    var root2 = model_1.DiagramItem.createShape({ id: '2', renderer: 'Button' });
    var child1 = model_1.DiagramItem.createShape({ id: '3', renderer: 'Button' });
    var child2 = model_1.DiagramItem.createShape({ id: '4', renderer: 'Button' });
    var diagram = model_1.Diagram.create()
        .addShape(root1)
        .addShape(root2)
        .addShape(child1)
        .addShape(child2)
        .group(groupId, [child1.id, child2.id]);
    it('should create from root items', function () {
        var set = model_1.DiagramItemSet.createFromDiagram([groupId], diagram);
        expect(set.allItems.map(function (x) { return x.id; })).toEqual([groupId, child1.id, child2.id]);
    });
    it('should create from child items', function () {
        var set = model_1.DiagramItemSet.createFromDiagram([child1.id], diagram);
        expect(set.allItems.map(function (x) { return x.id; })).toEqual([child1.id]);
    });
    it('should keep the order in children intact', function () {
        var set = model_1.DiagramItemSet.createFromDiagram([child2.id, child1.id], diagram);
        expect(set.allItems.map(function (x) { return x.id; })).toEqual([child1.id, child2.id]);
    });
    it('should keep the order in root intact', function () {
        var set = model_1.DiagramItemSet.createFromDiagram([root2.id, root2.id], diagram);
        expect(set.allItems.map(function (x) { return x.id; })).toEqual([root2.id, root2.id]);
    });
    it('should keep the order in mixed items intact', function () {
        var set = model_1.DiagramItemSet.createFromDiagram([root2.id, child2.id, root2.id, child1.id], diagram);
        expect(set.allItems.map(function (x) { return x.id; })).toEqual([root2.id, root2.id, child1.id, child2.id]);
    });
});
