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
var diagram_1 = require("./diagram");
var diagram_item_1 = require("./diagram-item");
var transform_1 = require("./transform");
describe('DiagramItem', function () {
    var item_1 = diagram_item_1.DiagramItem.createShape({ id: '1', renderer: 'Button' });
    it('should instantiate with factory method', function () {
        expect(item_1).toBeDefined();
        expect(item_1.id).toBeDefined();
        expect(item_1.renderer).toBe('Button');
    });
    it('should return original item when already unlocked', function () {
        var item_2 = item_1.unlock();
        expect(item_2).toBe(item_1);
    });
    it('should set isLocked when locking', function () {
        var item_2 = item_1.lock();
        expect(item_2.isLocked).toBeTruthy();
    });
    it('should set isLocked when unlocking', function () {
        var item_2 = item_1.lock();
        var item_3 = item_2.unlock();
        expect(item_3.isLocked).toBeFalsy();
    });
    it('should return original item when already locked', function () {
        var item_2 = item_1.lock();
        var item_3 = item_2.lock();
        expect(item_3).toBe(item_2);
    });
    it('should rename item', function () {
        var item_2 = item_1.rename('Name');
        expect(item_2.name).toBe('Name');
    });
    it('should return original when renaming with same name', function () {
        var item_2 = item_1.rename('Name');
        var item_3 = item_2.rename('Name');
        expect(item_3).toBe(item_2);
    });
    it('should return transform as bounds', function () {
        expect(item_1.bounds(null)).toBe(item_1.transform);
    });
    it('should return original shape when transforming from null old bounds', function () {
        var item_2 = item_1.transformByBounds(null, item_1.transform);
        expect(item_2).toBe(item_1);
    });
    it('should return original shape when transforming to null new bounds', function () {
        var item_2 = item_1.transformByBounds(item_1.transform, null);
        expect(item_2).toBe(item_1);
    });
    it('should return original shape when transforming between equal bounds', function () {
        var item_2 = item_1.transformByBounds(item_1.transform, item_1.transform);
        expect(item_2).toBe(item_1);
    });
    it('should return original shape when transforming with null transformer', function () {
        var item_2 = item_1.transformWith(null);
        expect(item_2).toBe(item_1);
    });
    it('should return original shape when transformer returns null', function () {
        var item_2 = item_1.transformWith(function () { return null; });
        expect(item_2).toBe(item_1);
    });
    it('should return original shape when transformer returns same transform', function () {
        var item_2 = item_1.transformWith(function (t) { return t; });
        expect(item_2).toBe(item_1);
    });
    it('should resize when transforming by bounds', function () {
        var item_2 = item_1.transformByBounds(item_1.transform, item_1.transform.resizeTo(new core_1.Vec2(200, 40)));
        var actual = item_2.transform;
        var expected = new transform_1.Transform(core_1.Vec2.ZERO, new core_1.Vec2(200, 40), core_1.Rotation.ZERO);
        expect(actual.equals(expected)).toBeTrue();
    });
    it('should add appearance', function () {
        var item_2 = item_1.setAppearance('color', 33);
        expect(item_2.appearance.get('color')).toBe(33);
    });
    it('should return original shape when setting appearance with null key', function () {
        var item_2 = item_1.setAppearance(null, 13);
        expect(item_2).toBe(item_1);
    });
    it('should replace appearance', function () {
        var item_2 = item_1.setAppearance('color', 13);
        var item_3 = item_2.setAppearance('color', 42);
        expect(item_3.appearance.get('color')).toBe(42);
    });
    it('should return original shape when appearance to set has same value', function () {
        var item_2 = item_1.setAppearance('color', 13);
        var item_3 = item_2.setAppearance('color', 13);
        expect(item_3).toBe(item_2);
    });
    it('should not set appearance when item is a group', function () {
        var group_1 = diagram_item_1.DiagramItem.createGroup();
        var group_2 = group_1.setAppearance('color', 'red');
        expect(group_2).toBe(group_1);
    });
    it('should return original shape when resetting appearance to null', function () {
        var item_2 = item_1.replaceAppearance(null);
        expect(item_2).toBe(item_1);
    });
    it('should replace appearance', function () {
        var appearance = core_1.ImmutableMap.empty();
        var item_2 = item_1.replaceAppearance(appearance);
        expect(item_2.appearance).toBe(appearance);
    });
});
describe('DiagramItem', function () {
    var transform = transform_1.Transform.ZERO;
    var groupId = 'group-1';
    var shape1 = diagram_item_1.DiagramItem.createShape({
        id: '1',
        renderer: 'Button',
        transform: new transform_1.Transform(new core_1.Vec2(100, 100), new core_1.Vec2(100, 50), core_1.Rotation.ZERO)
    });
    var shape2 = diagram_item_1.DiagramItem.createShape({
        id: '2',
        renderer: 'Button',
        transform: new transform_1.Transform(new core_1.Vec2(200, 100), new core_1.Vec2(100, 50), core_1.Rotation.ZERO)
    });
    it('should instantiate with factory method', function () {
        var group = diagram_item_1.DiagramItem.createGroup({ id: groupId, childIds: [shape1.id, shape2.id] });
        expect(group).toBeDefined();
        expect(group.id).toBeDefined();
        expect(group.childIds.size).toBe(2);
        expect(group.childIds.at(0)).toBe(shape1.id);
        expect(group.childIds.at(1)).toBe(shape2.id);
    });
    it('should return original group when transforming from null old bounds', function () {
        var group_1 = diagram_item_1.DiagramItem.createGroup({ id: groupId });
        var group_2 = group_1.transformByBounds(null, transform);
        expect(group_2).toBe(group_1);
    });
    it('should return original group when transforming to null new bounds', function () {
        var group_1 = diagram_item_1.DiagramItem.createGroup({ id: groupId });
        var group_2 = group_1.transformByBounds(transform, null);
        expect(group_2).toBe(group_1);
    });
    it('should return original group when transforming between equal bounds', function () {
        var group_1 = diagram_item_1.DiagramItem.createGroup({ id: groupId });
        var group_2 = group_1.transformByBounds(transform, transform);
        expect(group_2).toBe(group_1);
    });
    it('should update roration when transforming between bounds', function () {
        var boundsNew = new transform_1.Transform(core_1.Vec2.ZERO, core_1.Vec2.ZERO, core_1.Rotation.fromDegree(90));
        var boundsOld = new transform_1.Transform(core_1.Vec2.ZERO, core_1.Vec2.ZERO, core_1.Rotation.fromDegree(215));
        var group_1 = diagram_item_1.DiagramItem.createGroup({ id: groupId });
        var group_2 = group_1.transformByBounds(boundsNew, boundsOld);
        var actual = group_2.rotation;
        var expected = core_1.Rotation.fromDegree(125);
        expect(actual).toEqual(expected);
    });
    it('should create zero bounds if child id is not in diagram', function () {
        var diagram = diagram_1.Diagram.create({ id: groupId });
        var group = diagram_item_1.DiagramItem.createGroup({ id: groupId, childIds: ['invalid'] });
        var actual = group.bounds(diagram);
        var expected = transform_1.Transform.ZERO;
        expect(actual).toEqual(expected);
    });
    it('should calculate bounds from children', function () {
        var diagram = diagram_1.Diagram.create({ id: '1' })
            .addShape(shape1)
            .addShape(shape2);
        diagram = diagram.group(groupId, [shape1.id, shape2.id]);
        var group = diagram.items.get(groupId);
        var actual = group.bounds(diagram);
        var expected = new transform_1.Transform(new core_1.Vec2(150, 100), new core_1.Vec2(200, 50), core_1.Rotation.ZERO);
        expect(actual).toEqual(expected);
    });
    it('should cache calculate bounds', function () {
        var diagram = diagram_1.Diagram.create({ id: '1' })
            .addShape(shape1)
            .addShape(shape2);
        diagram = diagram.group(groupId, [shape1.id, shape2.id]);
        var group = diagram.items.get(groupId);
        var actual1 = group.bounds(diagram);
        var actual2 = group.bounds(diagram);
        var expected = new transform_1.Transform(new core_1.Vec2(150, 100), new core_1.Vec2(200, 50), core_1.Rotation.ZERO);
        expect(actual1).toEqual(expected);
        expect(actual2).toEqual(expected);
    });
});
