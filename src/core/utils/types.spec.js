"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var types_1 = require("./types");
describe('Types', function () {
    it('should make string check', function () {
        expect(types_1.Types.isString('')).toBeTruthy();
        expect(types_1.Types.isString('string')).toBeTruthy();
        expect(types_1.Types.isString(false)).toBeFalsy();
    });
    it('should make number check', function () {
        expect(types_1.Types.isNumber(0)).toBeTruthy();
        expect(types_1.Types.isNumber(1)).toBeTruthy();
        expect(types_1.Types.isNumber(NaN)).toBeFalsy();
        expect(types_1.Types.isNumber(Infinity)).toBeFalsy();
        expect(types_1.Types.isNumber(false)).toBeFalsy();
    });
    it('should make boolean check', function () {
        expect(types_1.Types.isBoolean(true)).toBeTruthy();
        expect(types_1.Types.isBoolean(false)).toBeTruthy();
        expect(types_1.Types.isBoolean(0)).toBeFalsy();
        expect(types_1.Types.isBoolean(1)).toBeFalsy();
    });
    it('should make number array check', function () {
        expect(types_1.Types.isArrayOfNumber([])).toBeTruthy();
        expect(types_1.Types.isArrayOfNumber([0, 1])).toBeTruthy();
        expect(types_1.Types.isArrayOfNumber(['0', 1])).toBeFalsy();
    });
    it('should make string array check', function () {
        expect(types_1.Types.isArrayOfString([])).toBeTruthy();
        expect(types_1.Types.isArrayOfString(['0', '1'])).toBeTruthy();
        expect(types_1.Types.isArrayOfString(['0', 1])).toBeFalsy();
    });
    it('should make array check', function () {
        expect(types_1.Types.isArray([])).toBeTruthy();
        expect(types_1.Types.isArray([0])).toBeTruthy();
        expect(types_1.Types.isArray({})).toBeFalsy();
    });
    it('should make object check', function () {
        expect(types_1.Types.isObject({})).toBeTruthy();
        expect(types_1.Types.isObject({ v: 1 })).toBeTruthy();
        expect(types_1.Types.isObject([])).toBeFalsy();
    });
    it('should make RegExp check', function () {
        expect(types_1.Types.isRegExp(/[.*]/)).toBeTruthy();
        expect(types_1.Types.isRegExp('/[.*]/')).toBeFalsy();
    });
    it('should make Date check', function () {
        expect(types_1.Types.isDate(new Date())).toBeTruthy();
        expect(types_1.Types.isDate(new Date().getDate())).toBeFalsy();
    });
    it('should make undefined check', function () {
        expect(types_1.Types.isUndefined(undefined)).toBeTruthy();
        expect(types_1.Types.isUndefined(null)).toBeFalsy();
    });
    it('should make null check', function () {
        expect(types_1.Types.isNull(null)).toBeTruthy();
        expect(types_1.Types.isNull(undefined)).toBeFalsy();
    });
    it('should make function check', function () {
        expect(types_1.Types.isFunction(function () { })).toBeTruthy();
        expect(types_1.Types.isFunction([])).toBeFalsy();
    });
    it('should make type check', function () {
        expect(types_1.Types.is(new MyClass(1), MyClass)).toBeTruthy();
        expect(types_1.Types.is(1, MyClass)).toBeFalsy();
    });
    it('should compare undefined', function () {
        expect(types_1.Types.equals(undefined, undefined)).toBeTruthy();
    });
    it('should compare null', function () {
        expect(types_1.Types.equals(null, null)).toBeTruthy();
    });
    it('should compare invalid', function () {
        expect(types_1.Types.equals(null, undefined)).toBeFalsy();
    });
    it('should compare scalars', function () {
        expect(types_1.Types.equals(1, false)).toBeFalsy();
        expect(types_1.Types.equals(1, 2)).toBeFalsy();
        expect(types_1.Types.equals(2, 2)).toBeTruthy();
    });
    it('should compare arrays', function () {
        expect(types_1.Types.equals([1, 2], [2, 3])).toBeFalsy();
        expect(types_1.Types.equals([1, 2], [1, 2])).toBeTruthy();
    });
    it('should compare objects', function () {
        expect(types_1.Types.equals({ a: 1, b: 2 }, { a: 2, b: 3 })).toBeFalsy();
        expect(types_1.Types.equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
    });
    it('should compare nested objects', function () {
        expect(types_1.Types.equals({ a: [1, 2] }, { a: [2, 3] })).toBeFalsy();
        expect(types_1.Types.equals({ a: [1, 2] }, { a: [1, 2] })).toBeTruthy();
    });
    it('should compare value objects', function () {
        var lhs = { value: 1, equals: function () { return true; } };
        var rhs = { value: 1, equals: function () { return true; } };
        expect(types_1.Types.equals(lhs, rhs)).toBeTruthy();
    });
    var FalsyValues = [false, null, 0];
    it('should compare empty string with undefined', function () {
        expect(types_1.Types.equals('', undefined, { lazyString: true })).toBeTruthy();
        expect(types_1.Types.equals('', undefined)).toBeFalsy();
        expect(types_1.Types.equals(undefined, '', { lazyString: true })).toBeTruthy();
        expect(types_1.Types.equals(undefined, '')).toBeFalsy();
    });
    FalsyValues.forEach(function (x) {
        it('should compare empty string with {x}', function () {
            expect(types_1.Types.equals('', x, { lazyString: true })).toBeFalsy();
            expect(types_1.Types.equals('', x)).toBeFalsy();
            expect(types_1.Types.equals(x, '', { lazyString: true })).toBeFalsy();
            expect(types_1.Types.equals(x, '')).toBeFalsy();
        });
    });
});
var MyClass = /** @class */ (function () {
    function MyClass(value) {
        this.value = value;
    }
    return MyClass;
}());
