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
exports.ImmutableSet = void 0;
var types_1 = require("./types");
var ImmutableSet = /** @class */ (function () {
    function ImmutableSet(items) {
        this.items = items;
        Object.freeze(this);
        Object.freeze(items);
    }
    Object.defineProperty(ImmutableSet.prototype, "size", {
        get: function () {
            return Object.keys(this.items).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImmutableSet.prototype, "values", {
        get: function () {
            return Object.keys(this.items);
        },
        enumerable: false,
        configurable: true
    });
    ImmutableSet.prototype.has = function (item) {
        return this.items.hasOwnProperty(item);
    };
    ImmutableSet.empty = function () {
        return ImmutableSet.EMPTY;
    };
    ImmutableSet.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (!items || items.length === 0) {
            return ImmutableSet.EMPTY;
        }
        else {
            var itemMap = {};
            for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
                var item = items_1[_a];
                itemMap[item] = true;
            }
            return new ImmutableSet(itemMap);
        }
    };
    ImmutableSet.prototype.add = function (item) {
        var _a;
        if (!item || this.has(item)) {
            return this;
        }
        var items = __assign(__assign({}, this.items), (_a = {}, _a[item] = true, _a));
        return new ImmutableSet(items);
    };
    ImmutableSet.prototype.remove = function (item) {
        if (!item || !this.has(item)) {
            return this;
        }
        var items = (0, types_1.without)(this.items, item);
        return new ImmutableSet(items);
    };
    ImmutableSet.prototype.mutate = function (updater) {
        var items = __assign({}, this.items);
        var updated = false;
        updater({
            add: function (k) {
                if (k) {
                    if (!items.hasOwnProperty(k)) {
                        updated = true;
                        items[k] = true;
                    }
                }
            },
            remove: function (k) {
                if (k) {
                    if (items.hasOwnProperty(k)) {
                        updated = true;
                        delete items[k];
                    }
                }
            }
        });
        if (!updated) {
            return this;
        }
        return new ImmutableSet(items);
    };
    ImmutableSet.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        return types_1.Types.equalsObject(this.items, other.items);
    };
    ImmutableSet.EMPTY = new ImmutableSet({});
    return ImmutableSet;
}());
exports.ImmutableSet = ImmutableSet;
