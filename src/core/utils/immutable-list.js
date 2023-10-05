"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ImmutableList = void 0;
var collections_1 = require("./collections");
var types_1 = require("./types");
var ImmutableList = /** @class */ (function () {
    function ImmutableList(items) {
        this.items = items;
        Object.freeze(this);
        Object.freeze(items);
    }
    Object.defineProperty(ImmutableList.prototype, "size", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImmutableList.prototype, "values", {
        get: function () {
            return this.items;
        },
        enumerable: false,
        configurable: true
    });
    ImmutableList.prototype.at = function (index) {
        return this.items[index];
    };
    ImmutableList.empty = function () {
        return ImmutableList.EMPTY;
    };
    ImmutableList.of = function (items) {
        if (!items) {
            return ImmutableList.EMPTY;
        }
        else if (items instanceof ImmutableList) {
            return items;
        }
        else if (items.length === 0) {
            return ImmutableList.EMPTY;
        }
        else {
            return new ImmutableList(items);
        }
    };
    ImmutableList.prototype.add = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (!items || items.length === 0) {
            return this;
        }
        var newItems = __spreadArray(__spreadArray([], this.items, true), items, true);
        return this.replace(newItems);
    };
    ImmutableList.prototype.remove = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (!items || items.length === 0) {
            return this;
        }
        var newItems = __spreadArray([], this.items, true);
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            var index = newItems.indexOf(item);
            if (index < 0) {
                return this;
            }
            newItems.splice(index, 1);
        }
        return this.replace(newItems);
    };
    ImmutableList.prototype.set = function (index, item) {
        if (item || index < 0 || index >= this.items.length || types_1.Types.equals(this.items[index], item)) {
            return this;
        }
        var newItems = __spreadArray([], this.items, true);
        newItems[index] = item;
        return this.replace(newItems);
    };
    ImmutableList.prototype.bringToFront = function (items) {
        return this.moveTo(items, Number.MAX_VALUE);
    };
    ImmutableList.prototype.bringForwards = function (items) {
        return this.moveTo(items, 1, true);
    };
    ImmutableList.prototype.sendBackwards = function (items) {
        return this.moveTo(items, -1, true);
    };
    ImmutableList.prototype.sendToBack = function (items) {
        return this.moveTo(items, 0);
    };
    ImmutableList.prototype.moveTo = function (items, target, relative) {
        if (relative === void 0) { relative = false; }
        return this.replace((0, collections_1.moveItems)(this.items, items, target, relative));
    };
    ImmutableList.prototype.replace = function (items) {
        if (items === this.items) {
            return this;
        }
        else {
            var newValue = Object.create(Object.getPrototypeOf(this));
            newValue.items = items;
            return newValue;
        }
    };
    ImmutableList.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        return types_1.Types.equalsArray(this.items, other.items);
    };
    ImmutableList.EMPTY = new ImmutableList([]);
    return ImmutableList;
}());
exports.ImmutableList = ImmutableList;
