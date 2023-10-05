"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var model_1 = require("@app/wireframes/model");
/* eslint-disable @typescript-eslint/naming-convention */
describe('Diagram', function () {
    var shape1 = model_1.DiagramItem.createShape({ id: '1', renderer: 'Button' });
    var shape2 = model_1.DiagramItem.createShape({ id: '2', renderer: 'Button' });
    var shape3 = model_1.DiagramItem.createShape({ id: '3', renderer: 'Button' });
    var shape4 = model_1.DiagramItem.createShape({ id: '4', renderer: 'Button' });
    var diagram_1 = model_1.Diagram.create({ id: '1' });
    it('should instantiate with factory method', function () {
        expect(diagram_1).toBeDefined();
        expect(diagram_1.id).toBeDefined();
    });
    it('should return original diagram when adding null shape', function () {
        var diagram_2 = diagram_1.addShape(null);
        expect(diagram_2).toBe(diagram_1);
    });
    it('should set titel', function () {
        var diagram_2 = diagram_1.rename('title');
        expect(diagram_2.title).toBe('title');
    });
    it('should set master diagram', function () {
        var diagram_2 = diagram_1.setMaster('master1');
        expect(diagram_2.master).toBe('master1');
    });
    it('should add shape to items', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        expect(diagram_2.items.has(shape1.id)).toBeTruthy();
    });
    it('should add items to diagram', function () {
        var diagram_2 = diagram_1.addItems(new model_1.DiagramItemSet([shape1, shape2, shape3]));
        expect(diagram_2.items.has(shape1.id)).toBeTruthy();
        expect(diagram_2.items.has(shape2.id)).toBeTruthy();
        expect(diagram_2.items.has(shape3.id)).toBeTruthy();
    });
    it('should remove shape from items', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.removeItems(model_1.DiagramItemSet.createFromDiagram([shape1.id], diagram_2));
        expect(diagram_3.items.has(shape1.id)).toBeFalsy();
    });
    it('should remove selected shape from items', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.selectItems([shape1.id]);
        var diagram_4 = diagram_3.removeItems(model_1.DiagramItemSet.createFromDiagram([shape1.id], diagram_2));
        expect(diagram_3.selectedIds.has(shape1.id)).toBeTruthy();
        expect(diagram_4.selectedIds.has(shape1.id)).toBeFalsy();
        expect(diagram_4.items.has(shape1.id)).toBeFalsy();
    });
    it('should remove children when removing group', function () {
        var groupId = 'group-1';
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.group(groupId, [shape1.id, shape2.id]);
        var diagram_5 = diagram_4.removeItems(model_1.DiagramItemSet.createFromDiagram([diagram_4.items.get(groupId)], diagram_4));
        expect(diagram_5.items.size).toBe(0);
    });
    it('should update items', function () {
        var shapeOld = shape4;
        var shapeNew = shapeOld.setAppearance('border-width', 10);
        var diagram_2 = diagram_1.addShape(shapeOld);
        var diagram_3 = diagram_2.updateItems([shapeOld.id], function () { return shapeNew; });
        expect(diagram_3.items.size).toBe(1);
        expect(diagram_3.items.get(shapeOld.id)).toEqual(shapeNew);
    });
    it('should return original diagram when items to update does not exist.', function () {
        var diagram_2 = diagram_1.updateItems([shape1.id], function (i) { return i.setAppearance('color', 0xFF00FF); });
        expect(diagram_2).toBe(diagram_1);
    });
    it('should return original diagram when updater returns same item', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.updateItems([shape1.id], function (i) { return i; });
        expect(diagram_3).toBe(diagram_2);
    });
    it('should update all items', function () {
        var shapeOld = shape4;
        var shapeNew = shapeOld.setAppearance('border-width', 10);
        var diagram_2 = diagram_1.addShape(shapeOld);
        var diagram_3 = diagram_2.updateAllItems(function () { return shapeNew; });
        expect(diagram_3.items.size).toBe(1);
        expect(diagram_3.items.get(shapeOld.id)).toEqual(shapeNew);
    });
    it('should return original diagram when all updater returns same items', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.updateAllItems(function (i) { return i; });
        expect(diagram_3).toBe(diagram_2);
    });
    it('should add item id to list when selected', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.selectItems([shape1.id]);
        expect(diagram_3.selectedIds.has(shape1.id)).toBeTruthy();
    });
    it('should return original diagram when item to select is already selected', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.selectItems([shape1.id]);
        var diagram_4 = diagram_3.selectItems([shape1.id]);
        expect(diagram_4.selectedIds.has(shape1.id)).toBeTruthy();
        expect(diagram_4.selectedIds).toBe(diagram_3.selectedIds);
    });
    it('should remove item id from list when unselected', function () {
        var diagram_2 = diagram_1.selectItems([shape1.id]);
        var diagram_3 = diagram_2.selectItems([]);
        expect(diagram_3.selectedIds.has(shape1.id)).toBeFalsy();
    });
    it('should return original diagram whwhen item to unselect is not selected', function () {
        var diagram_2 = diagram_1.selectItems([]);
        var diagram_3 = diagram_2.selectItems([]);
        expect(diagram_3.selectedIds.has(shape1.id)).toBeFalsy();
        expect(diagram_3.selectedIds).toBe(diagram_2.selectedIds);
    });
    it('should return original diagram when less than 2 shapes to be grouped are found', function () {
        var groupId = 'group-3';
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.group(groupId, [shape1.id, 'INVALID']);
        expect(diagram_4).toBe(diagram_3);
    });
    it('should create group when grouping shapes', function () {
        var groupId = 'group-3';
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.group(groupId, [shape1.id, shape2.id]);
        expect(diagram_4.items.size).toBe(3);
        var group = diagram_4.items.get(groupId);
        expect(group.childIds.at(0)).toBe(shape1.id);
        expect(group.childIds.at(1)).toBe(shape2.id);
    });
    it('should return original diagram when grouping shapes from different levels', function () {
        var groupId1 = 'group-1';
        var groupId2 = 'group-2';
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.group(groupId1, [shape1.id, shape2.id]);
        var diagram_5 = diagram_4.group(groupId2, [shape1.id, groupId1]);
        expect(diagram_5).toBe(diagram_4);
    });
    it('should remove group when ungrouping', function () {
        var groupId = 'group-1';
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.group(groupId, [shape1.id, shape2.id]);
        var diagram_5 = diagram_4.ungroup(groupId);
        expect(diagram_5.items.size).toBe(2);
    });
    it('should return original diagram when group to ungroup does not exist', function () {
        var diagram_2 = diagram_1.ungroup('not_found');
        expect(diagram_2).toBe(diagram_1);
    });
    it('should return original diagram when item to select is not in items list', function () {
        var diagram_2 = diagram_1.selectItems(['not-found']);
        expect(diagram_2.selectedIds).toBe(diagram_1.selectedIds);
    });
    it('should select shapes when they are part of the diagram', function () {
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.selectItems([shape1.id, shape2.id]);
        expect(diagram_4.selectedIds.has(shape1.id)).toBeTruthy();
    });
    it('should group nested grouped shapes', function () {
        var groupId1 = 'group-1';
        var groupId2 = 'group-2';
        var diagram_2 = diagram_1.addShape(shape1);
        var diagram_3 = diagram_2.addShape(shape2);
        var diagram_4 = diagram_3.group(groupId1, [shape1.id, shape2.id]);
        var diagram_5 = diagram_4.group(groupId2, [shape1.id, shape2.id]);
        expect(diagram_5.rootIds.values).toEqual([groupId1]);
        var group1 = diagram_5.items.get(groupId1);
        var group2 = diagram_5.items.get(groupId2);
        expect(group1.childIds.values).toEqual([groupId2]);
        expect(group2.childIds.values).toEqual([shape1.id, shape2.id]);
    });
    it('should move items', function () {
        var diagram_2 = diagram_1.addShape(shape1).addShape(shape2).addShape(shape3);
        var diagram_3 = diagram_2.moveItems([shape1.id], 2);
        expect(diagram_3.rootIds.values).toEqual([shape2.id, shape3.id, shape1.id]);
    });
    it('should bring items to front', function () {
        var diagram_2 = diagram_1.addShape(shape1).addShape(shape2).addShape(shape3);
        var diagram_3 = diagram_2.bringToFront([shape1.id]);
        expect(diagram_3.rootIds.values).toEqual([shape2.id, shape3.id, shape1.id]);
    });
    it('should bring items forwards', function () {
        var diagram_2 = diagram_1.addShape(shape1).addShape(shape2).addShape(shape3);
        var diagram_3 = diagram_2.bringForwards([shape1.id]);
        expect(diagram_3.rootIds.values).toEqual([shape2.id, shape1.id, shape3.id]);
    });
    it('should send items to back', function () {
        var diagram_2 = diagram_1.addShape(shape1).addShape(shape2).addShape(shape3);
        var diagram_3 = diagram_2.sendToBack([shape3.id]);
        expect(diagram_3.rootIds.values).toEqual([shape3.id, shape1.id, shape2.id]);
    });
    it('should send items backwards', function () {
        var diagram_2 = diagram_1.addShape(shape1).addShape(shape2).addShape(shape3);
        var diagram_3 = diagram_2.sendBackwards([shape3.id]);
        expect(diagram_3.rootIds.values).toEqual([shape1.id, shape3.id, shape2.id]);
    });
});
