"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.without = exports.Types = void 0;
/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
var Types;
(function (Types) {
    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    Types.isString = isString;
    function isNumber(value) {
        return typeof value === 'number' && Number.isFinite(value);
    }
    Types.isNumber = isNumber;
    function isArray(value) {
        return Array.isArray(value);
    }
    Types.isArray = isArray;
    function isFunction(value) {
        return typeof value === 'function';
    }
    Types.isFunction = isFunction;
    function isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }
    Types.isObject = isObject;
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    Types.isBoolean = isBoolean;
    function isNull(value) {
        return value === null;
    }
    Types.isNull = isNull;
    function isUndefined(value) {
        return typeof value === 'undefined';
    }
    Types.isUndefined = isUndefined;
    function isRegExp(value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }
    Types.isRegExp = isRegExp;
    function isDate(value) {
        return value instanceof Date;
    }
    Types.isDate = isDate;
    function is(x, c) {
        return x instanceof c;
    }
    Types.is = is;
    function isArrayOfNumber(value) {
        return isArrayOf(value, isNumber);
    }
    Types.isArrayOfNumber = isArrayOfNumber;
    function isArrayOfObject(value) {
        return isArrayOf(value, isObject);
    }
    Types.isArrayOfObject = isArrayOfObject;
    function isArrayOfString(value) {
        return isArrayOf(value, isString);
    }
    Types.isArrayOfString = isArrayOfString;
    function isArrayOf(value, validator) {
        if (!Array.isArray(value)) {
            return false;
        }
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var v = value_1[_i];
            if (!validator(v)) {
                return false;
            }
        }
        return true;
    }
    Types.isArrayOf = isArrayOf;
    function equals(lhs, rhs, options) {
        if (lhs === rhs || (lhs !== lhs && rhs !== rhs)) {
            return true;
        }
        if (options === null || options === void 0 ? void 0 : options.lazyString) {
            var result = (lhs === '' && Types.isUndefined(rhs) ||
                (rhs === '' && Types.isUndefined(lhs)));
            if (result) {
                return true;
            }
        }
        if (isValueObject(lhs) && isValueObject(rhs)) {
            return lhs.equals(rhs);
        }
        if (!lhs || !rhs) {
            return false;
        }
        if (Types.isArray(lhs) && Types.isArray(rhs)) {
            return equalsArray(lhs, rhs, options);
        }
        else if (Types.isObject(lhs) && Types.isObject(rhs)) {
            return equalsObject(lhs, rhs, options);
        }
        return false;
    }
    Types.equals = equals;
    function equalsArray(lhs, rhs, options) {
        if (lhs.length !== rhs.length) {
            return false;
        }
        for (var i = 0; i < lhs.length; i++) {
            if (!equals(lhs[i], rhs[i], options)) {
                return false;
            }
        }
        return true;
    }
    Types.equalsArray = equalsArray;
    function equalsObject(lhs, rhs, options) {
        var lhsKeys = Object.keys(lhs);
        if (lhsKeys.length !== Object.keys(rhs).length) {
            return false;
        }
        for (var _i = 0, lhsKeys_1 = lhsKeys; _i < lhsKeys_1.length; _i++) {
            var key = lhsKeys_1[_i];
            if (!equals(lhs[key], rhs[key], options)) {
                return false;
            }
        }
        return true;
    }
    Types.equalsObject = equalsObject;
    function isValueObject(value) {
        return value && Types.isFunction(value.equals);
    }
    Types.isValueObject = isValueObject;
})(Types = exports.Types || (exports.Types = {}));
function without(obj, key) {
    var copy = __assign({}, obj);
    delete copy[key];
    return copy;
}
exports.without = without;
