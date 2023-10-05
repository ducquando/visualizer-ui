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
exports.ImmutableMap = void 0;
var types_1 = require("./types");
var ImmutableMap = /** @class */ (function () {
    function ImmutableMap(items) {
        this.items = items;
        Object.freeze(this);
        Object.freeze(items);
    }
    Object.defineProperty(ImmutableMap.prototype, "size", {
        get: function () {
            return Object.keys(this.items).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImmutableMap.prototype, "keys", {
        get: function () {
            return Object.keys(this.items);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImmutableMap.prototype, "values", {
        get: function () {
            var _this = this;
            return this.keys.map(function (k) { return _this.items[k]; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImmutableMap.prototype, "raw", {
        get: function () {
            return this.items;
        },
        enumerable: false,
        configurable: true
    });
    ImmutableMap.prototype.get = function (key) {
        return this.items[key];
    };
    ImmutableMap.prototype.has = function (key) {
        return key && this.items.hasOwnProperty(key);
    };
    ImmutableMap.empty = function () {
        return ImmutableMap.EMPTY;
    };
    ImmutableMap.of = function (items) {
        if (!items) {
            return ImmutableMap.EMPTY;
        }
        else if (items instanceof ImmutableMap) {
            return items;
        }
        else if (Object.keys(items).length === 0) {
            return ImmutableMap.EMPTY;
        }
        else {
            return new ImmutableMap(items);
        }
    };
    ImmutableMap.prototype.update = function (key, updater) {
        if (!this.has(key)) {
            return this;
        }
        return this.set(key, updater(this.get(key)));
    };
    ImmutableMap.prototype.updateAll = function (updater) {
        if (this.size === 0) {
            return this;
        }
        var updatedItems = undefined;
        for (var _i = 0, _a = Object.entries(this.items); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], current = _b[1];
            var newValue = updater(current);
            if (types_1.Types.equals(current, newValue)) {
                continue;
            }
            updatedItems || (updatedItems = __assign({}, this.items));
            updatedItems[key] = newValue;
        }
        if (!updatedItems) {
            return this;
        }
        return new ImmutableMap(updatedItems);
    };
    ImmutableMap.prototype.set = function (key, value) {
        var _a;
        if (!key) {
            return this;
        }
        var current = this.items[key];
        if (types_1.Types.equals(current, value)) {
            return this;
        }
        var items = __assign(__assign({}, this.items), (_a = {}, _a[key] = value, _a));
        return new ImmutableMap(items);
    };
    ImmutableMap.prototype.remove = function (key) {
        if (!key || !this.has(key)) {
            return this;
        }
        var items = (0, types_1.without)(this.items, key);
        return new ImmutableMap(items);
    };
    ImmutableMap.prototype.mutate = function (updater) {
        var _this = this;
        var updatedItems = undefined;
        var updateCount = 0;
        var mutator = {
            set: function (k, v) {
                if (k) {
                    updatedItems || (updatedItems = __assign({}, _this.items));
                    var current = _this.items[k];
                    if (!types_1.Types.equals(current, v)) {
                        updateCount++;
                        updatedItems[k] = v;
                    }
                }
            },
            remove: function (k) {
                if (k) {
                    updatedItems || (updatedItems = __assign({}, _this.items));
                    if (updatedItems.hasOwnProperty(k)) {
                        updateCount++;
                        delete updatedItems[k];
                    }
                }
            },
            update: function (k, updater) {
                if (k) {
                    updatedItems || (updatedItems = __assign({}, _this.items));
                    if (updatedItems.hasOwnProperty(k)) {
                        mutator.set(k, updater(updatedItems[k]));
                    }
                }
            }
        };
        updater(mutator);
        if (!updateCount || !updatedItems) {
            return this;
        }
        return new ImmutableMap(updatedItems);
    };
    ImmutableMap.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        return types_1.Types.equalsObject(this.items, other.items);
    };
    ImmutableMap.EMPTY = new ImmutableMap([]);
    return ImmutableMap;
}());
exports.ImmutableMap = ImmutableMap;
