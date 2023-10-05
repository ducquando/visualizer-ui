"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
/* eslint-disable @typescript-eslint/naming-convention */
describe('ImmutableList', function () {
    it('should instantiate without arguments', function () {
        var list = core_1.ImmutableList.empty();
        expect(list.size).toBe(0);
    });
    it('should cache empty instance', function () {
        var list = core_1.ImmutableList.of([]);
        expect(list).toBe(core_1.ImmutableList.empty());
    });
    it('should instantiate from array of items', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3]);
        expect(list_1.size).toBe(3);
        expect(list_1.at(0)).toBe(1);
        expect(list_1.at(1)).toBe(2);
        expect(list_1.at(2)).toBe(3);
    });
    it('should add values', function () {
        var list_1 = core_1.ImmutableList.empty();
        var list_2 = list_1.add(1);
        var list_3 = list_2.add(2, 3);
        expect(list_3.values).toEqual([1, 2, 3]);
    });
    it('should original list when values to add is null', function () {
        var items = null;
        var list_1 = core_1.ImmutableList.empty();
        var list_2 = list_1.add.apply(list_1, items);
        expect(list_2).toEqual(list_1);
    });
    it('should original list when values to add is empty', function () {
        var list_1 = core_1.ImmutableList.empty();
        var list_2 = list_1.add();
        expect(list_2).toEqual(list_1);
    });
    it('should return undefined for invalid index', function () {
        var list_1 = core_1.ImmutableList.of([1]);
        expect(list_1.at(-1)).toBeUndefined();
    });
    it('should remove values', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4]);
        var list_2 = list_1.remove(2, 3);
        expect(list_2.values).toEqual([1, 4]);
    });
    it('should return original list when item to remove is null', function () {
        var items = null;
        var list_1 = core_1.ImmutableList.of([1]);
        var list_2 = list_1.remove.apply(list_1, items);
        expect(list_2).toBe(list_1);
    });
    it('should return original list when item to remove is empty', function () {
        var list_1 = core_1.ImmutableList.of([1]);
        var list_2 = list_1.remove();
        expect(list_2).toBe(list_2);
    });
    it('should return original list when item to remove does not exists', function () {
        var list_1 = core_1.ImmutableList.of([1]);
        var list_2 = list_1.remove(3);
        expect(list_2).toBe(list_1);
    });
    it('should bring to front', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.bringToFront([3, 5]);
        expect(list_2.values).toEqual([1, 2, 4, 6, 3, 5]);
    });
    it('should bring forwards', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.bringForwards([3, 4]);
        expect(list_2.values).toEqual([1, 2, 5, 3, 4, 6]);
    });
    it('should send to back', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.sendToBack([4, 5]);
        expect(list_2.values).toEqual([4, 5, 1, 2, 3, 6]);
    });
    it('should send backwards', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.sendBackwards([3, 5]);
        expect(list_2.values).toEqual([1, 3, 5, 2, 4, 6]);
    });
    it('should move item', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.moveTo([3], 1);
        expect(list_2.values).toEqual([1, 3, 2, 4, 5, 6]);
    });
    it('should ignore items that are not found', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.bringToFront([3, 'not found']);
        expect(list_2.values).toEqual([1, 2, 4, 5, 6, 3]);
    });
    it('should return original list no id to sort found', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.sendBackwards(['not found']);
        expect(list_2).toBe(list_1);
    });
    it('should return original list when ids to sort is null', function () {
        var list_1 = core_1.ImmutableList.of([1, 2, 3, 4, 5, 6]);
        var list_2 = list_1.sendBackwards(null);
        expect(list_2).toBe(list_1);
    });
    it('should return true for equals when lists have same value in same order', function () {
        var list_a = core_1.ImmutableList.of([1, 2, 3]);
        var list_b = core_1.ImmutableList.of([1, 2, 3]);
        expect(list_a.equals(list_b)).toBeTruthy();
    });
    it('should return true for equals when lists are the same', function () {
        var list_a = core_1.ImmutableList.of([1, 2, 3]);
        var list_b = list_a;
        expect(list_a.equals(list_b)).toBeTruthy();
    });
    it('should return false for equals when lists have different values', function () {
        var list_a = core_1.ImmutableList.of([1, 2, 3]);
        var list_b = core_1.ImmutableList.of([1, 2, 4]);
        expect(list_a.equals(list_b)).toBeFalsy();
    });
    it('should return false for equals when lists have different lengths', function () {
        var list_a = core_1.ImmutableList.of([1, 2, 3]);
        var list_b = core_1.ImmutableList.of([1, 2]);
        expect(list_a.equals(list_b)).toBeFalsy();
    });
    it('should return false for equals when checking with undefined value', function () {
        var list_a = core_1.ImmutableList.of([1, 2, 3]);
        expect(list_a.equals(null)).toBeFalsy();
    });
});
