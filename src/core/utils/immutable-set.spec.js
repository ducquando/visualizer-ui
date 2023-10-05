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
describe('ImmutableSet', function () {
    it('should instantiate instance from array', function () {
        var set_1 = core_1.ImmutableSet.of('1', '1', '2', '3');
        expect(set_1.size).toBe(3);
        expect(set_1.has('1')).toBeTruthy();
        expect(set_1.has('2')).toBeTruthy();
        expect(set_1.has('3')).toBeTruthy();
    });
    it('should return empty instance if creating map from empty array', function () {
        var list = core_1.ImmutableSet.of();
        expect(list).toBe(core_1.ImmutableSet.empty());
    });
    it('should add items', function () {
        var set_1 = core_1.ImmutableSet.empty();
        var set_2 = set_1.add('1');
        var set_3 = set_2.add('1');
        var set_4 = set_3.add('2');
        var set_5 = set_4.add('3');
        expect(set_5.size).toBe(3);
        expect(set_5.has('1')).toBeTruthy();
        expect(set_5.has('2')).toBeTruthy();
        expect(set_5.has('3')).toBeTruthy();
    });
    it('should convert to aray', function () {
        var set_1 = core_1.ImmutableSet.of('a', 'b');
        var array = set_1.values;
        expect(array.length).toBe(2);
        expect(array).toContain('a');
        expect(array).toContain('b');
    });
    it('should return original set when item to add is null', function () {
        var set_1 = core_1.ImmutableSet.empty();
        var set_2 = set_1.add(null);
        expect(set_2).toBe(set_1);
    });
    it('should return original set when item to add already exists', function () {
        var set_1 = core_1.ImmutableSet.empty();
        var set_2 = set_1.add('1');
        var set_3 = set_2.add('1');
        expect(set_3).toBe(set_2);
    });
    it('should remove item', function () {
        var set_1 = core_1.ImmutableSet.empty();
        var set_2 = set_1.add('1');
        var set_3 = set_2.remove('1');
        expect(set_3.size).toBe(0);
    });
    it('should return original set when item to remove is not found', function () {
        var set_1 = core_1.ImmutableSet.empty();
        var set_2 = set_1.add('1');
        var set_3 = set_2.remove('unknown');
        expect(set_3).toBe(set_2);
    });
    it('should remove item', function () {
        var set_1 = core_1.ImmutableSet.of('1', '2', '3');
        var set_2 = set_1.remove('2');
        expect(set_2.size).toBe(2);
        expect(set_2.has('1')).toBeTruthy();
        expect(set_2.has('3')).toBeTruthy();
    });
    it('should return original set when item to remove is null', function () {
        var set_1 = core_1.ImmutableSet.of('1', '2', '3', '4');
        var set_2 = set_1.remove(null);
        expect(set_2).toBe(set_1);
    });
    it('should mutate set', function () {
        var set_1 = core_1.ImmutableSet.of('1', '2', '3');
        var set_2 = set_1.mutate(function (m) {
            m.add('4');
            m.remove('2');
            m.remove('3');
        });
        expect(set_2.size).toBe(2);
        expect(set_2.has('1')).toBeTruthy();
        expect(set_2.has('4')).toBeTruthy();
    });
    it('should return orginal set when nothing has been mutated', function () {
        var set_1 = core_1.ImmutableSet.of('1', '2', '3');
        var set_2 = set_1.mutate(function () { return false; });
        expect(set_2).toBe(set_1);
    });
    it('should return true for equals when sets have same value in same order', function () {
        var set_a = core_1.ImmutableSet.of('1', '2', '3');
        var set_b = core_1.ImmutableSet.of('1', '2', '3');
        expect(set_a.equals(set_b)).toBeTruthy();
    });
    it('should return true for equals when sets have same value in different order', function () {
        var set_a = core_1.ImmutableSet.of('1', '2', '3');
        var set_b = core_1.ImmutableSet.of('1', '3', '2');
        expect(set_a.equals(set_b)).toBeTruthy();
    });
    it('should return for equals when sets are the same', function () {
        var set_a = core_1.ImmutableSet.of('1', '2', '3');
        var set_b = set_a;
        expect(set_a.equals(set_b)).toBeTruthy();
    });
    it('should return false for equals when sets have different values', function () {
        var set_a = core_1.ImmutableSet.of('1', '2', '3');
        var set_b = core_1.ImmutableSet.of('1', '2', '4');
        expect(set_a.equals(set_b)).toBeFalsy();
    });
    it('should return false for equals when checking with undefined value', function () {
        var set_a = core_1.ImmutableSet.of('1', '2', '3');
        expect(set_a.equals(null)).toBeFalsy();
    });
});
