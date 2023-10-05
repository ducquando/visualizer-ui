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
exports.Record = void 0;
var math_helper_1 = require("./math-helper");
var types_1 = require("./types");
var Record = /** @class */ (function () {
    function Record(values) {
        this.values = values;
        this.values = this.afterClone(this.values);
        this.instanceId = math_helper_1.MathHelper.nextId();
        Object.freeze(values);
    }
    Record.prototype.get = function (key) {
        return this.values[key];
    };
    Record.prototype.set = function (key, value) {
        var current = this.values[key];
        if (types_1.Types.equals(current, value)) {
            return this;
        }
        var values = __assign({}, this.values);
        if (types_1.Types.isUndefined(value)) {
            delete values[key];
        }
        else {
            values[key] = value;
        }
        return this.makeRecord(values);
    };
    Record.prototype.merge = function (props) {
        var values = __assign({}, this.values);
        var updates = 0;
        for (var _i = 0, _a = Object.entries(props); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            var current = this.values[key];
            if (types_1.Types.equals(current, value)) {
                continue;
            }
            if (types_1.Types.isUndefined(value)) {
                delete values[key];
            }
            else {
                values[key] = value;
            }
            updates++;
        }
        if (updates === 0) {
            return this;
        }
        return this.makeRecord(values);
    };
    Record.prototype.makeRecord = function (values) {
        var record = Object.create(Object.getPrototypeOf(this));
        record.values = values;
        record.values = record.afterClone(values, this);
        record.instanceId = math_helper_1.MathHelper.nextId();
        Object.freeze(record.values);
        return record;
    };
    Record.prototype.afterClone = function (values) {
        return values;
    };
    Record.prototype.unsafeValues = function () {
        return this.values;
    };
    return Record;
}());
exports.Record = Record;
