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
describe('ImmutableMap', function () {
    it('should instantiate without arguments', function () {
        var list = core_1.ImmutableMap.empty();
        expect(list.size).toBe(0);
    });
    it('should return empty instance if creating map from empty object', function () {
        var list = core_1.ImmutableMap.of({});
        expect(list).toBe(core_1.ImmutableMap.empty());
    });
    it('should add items', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.set('1', 10);
        var set_4 = set_3.set('2', 20);
        var set_5 = set_4.set('3', 30);
        expect(set_5.size).toBe(3);
        expect(set_5.has('1')).toBeTruthy();
        expect(set_5.has('2')).toBeTruthy();
        expect(set_5.has('3')).toBeTruthy();
    });
    it('should convert to key array', function () {
        var set_1 = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        var array = set_1.keys;
        expect(array.length).toBe(2);
        expect(array).toContain('1');
        expect(array).toContain('2');
    });
    it('should convert to value array', function () {
        var set_1 = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        var array = set_1.values;
        expect(array.length).toBe(2);
        expect(array).toContain(10);
        expect(array).toContain(20);
    });
    it('should return original set when key to add is null', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set(null, 10);
        expect(set_2).toBe(set_1);
    });
    it('should return original set when item to add already has the same value', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.set('1', 10);
        expect(set_3).toBe(set_2);
    });
    it('should update item', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.update('1', function (x) { return x * x; });
        expect(set_3.get('1')).toEqual(100);
    });
    it('should return original set when item to update is not found', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.update('unknown', function (x) { return x * x; });
        expect(set_3).toBe(set_2);
    });
    it('should return original set when update returns same item', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.update('unknown', function (x) { return x; });
        expect(set_3).toBe(set_2);
    });
    it('should update items', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.updateAll(function (x) { return x * x; });
        expect(set_3.get('1')).toEqual(100);
    });
    it('should return original set when update returns same items', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.updateAll(function (x) { return x; });
        expect(set_3).toBe(set_2);
    });
    it('should remove item', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.remove('1');
        expect(set_3.size).toBe(0);
    });
    it('should return original set when item to remove is not found', function () {
        var set_1 = core_1.ImmutableMap.empty();
        var set_2 = set_1.set('1', 10);
        var set_3 = set_2.remove('unknown');
        expect(set_3).toBe(set_2);
    });
    it('should remove item', function () {
        var set_1 = core_1.ImmutableMap.of({ 1: 10, 2: 20, 3: 30 });
        var set_2 = set_1.remove('2');
        expect(set_2.size).toBe(2);
        expect(set_2.has('1')).toBeTruthy();
        expect(set_2.has('3')).toBeTruthy();
    });
    it('should return original set when item to remove is null', function () {
        var set_1 = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        var set_2 = set_1.remove(null);
        expect(set_2).toBe(set_1);
    });
    it('should mutate set', function () {
        var set_1 = core_1.ImmutableMap.of({ 1: 10, 2: 20, 3: 30 });
        var set_2 = set_1.mutate(function (m) {
            m.set('4', 4);
            m.remove('2');
            m.remove('3');
        });
        expect(set_2.size).toBe(2);
        expect(set_2.has('1')).toBeTruthy();
        expect(set_2.has('4')).toBeTruthy();
    });
    it('should return orginal set when nothing has been mutated', function () {
        var set_1 = core_1.ImmutableMap.of({ 1: 10, 2: 20, 3: 30 });
        var set_2 = set_1.mutate(function () { return false; });
        expect(set_2).toBe(set_1);
    });
    it('should return true for equals when maps have same values', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        var map_b = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        expect(map_a.equals(map_b)).toBeTruthy();
    });
    it('should return true for equals when maps have same values in different order', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        var map_b = core_1.ImmutableMap.of({ 2: 20, 1: 10 });
        expect(map_a.equals(map_b)).toBeTruthy();
    });
    it('should return for equals when maps are the same', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10, 2: 20, 3: 30 });
        var map_b = map_a;
        expect(map_a.equals(map_b)).toBeTruthy();
    });
    it('should return false for equals when maps have different keys', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10 });
        var map_b = core_1.ImmutableMap.of({ 2: 10 });
        expect(map_a.equals(map_b)).toBeFalsy();
    });
    it('should return false for equals when maps have different values', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10 });
        var map_b = core_1.ImmutableMap.of({ 1: 20 });
        expect(map_a.equals(map_b)).toBeFalsy();
    });
    it('should return false for equals when maps have different sizes', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10 });
        var map_b = core_1.ImmutableMap.of({ 1: 10, 2: 20 });
        expect(map_a.equals(map_b)).toBeFalsy();
    });
    it('should return false for equals when checking with undefined value', function () {
        var map_a = core_1.ImmutableMap.of({ 1: 10 });
        expect(map_a.equals(null)).toBeFalsy();
    });
});
