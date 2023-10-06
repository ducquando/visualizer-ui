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
exports.UndoableState = void 0;
var UndoableState = /** @class */ (function () {
    function UndoableState(past, pastCapacity, future, presentState) {
        this.past = past;
        this.pastCapacity = pastCapacity;
        this.future = future;
        this.presentState = presentState;
        Object.freeze(this);
    }
    Object.defineProperty(UndoableState.prototype, "firstState", {
        get: function () {
            var _a;
            return ((_a = this.past[0]) === null || _a === void 0 ? void 0 : _a.state) || this.presentState.state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UndoableState.prototype, "canUndo", {
        get: function () {
            return this.past.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UndoableState.prototype, "canRedo", {
        get: function () {
            return this.future.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UndoableState.prototype, "present", {
        get: function () {
            return this.presentState.state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UndoableState.prototype, "lastAction", {
        get: function () {
            return this.presentState.action;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UndoableState.prototype, "actions", {
        get: function () {
            var results = this.past.map(function (s) { return s.action; }).filter(function (x) { return !!x; });
            if (this.presentState.action) {
                results.push(this.presentState.action);
            }
            return results;
        },
        enumerable: false,
        configurable: true
    });
    UndoableState.create = function (present, action, capacity) {
        if (capacity === void 0) { capacity = 50; }
        return new UndoableState([], capacity, [], { state: present, action: action });
    };
    UndoableState.prototype.undo = function () {
        if (!this.canUndo) {
            return this;
        }
        var newPresent = this.past[this.past.length - 1];
        var newPast = this.past.slice(0, this.past.length - 1);
        var newFuture = __spreadArray([this.presentState], this.future, true);
        return new UndoableState(newPast, this.pastCapacity, newFuture, newPresent);
    };
    UndoableState.prototype.redo = function () {
        if (!this.canRedo) {
            return this;
        }
        var newPresent = this.future[0];
        var newFuture = this.future.slice(1);
        var newPast = __spreadArray(__spreadArray([], this.past, true), [this.presentState], false);
        return new UndoableState(newPast, this.pastCapacity, newFuture, newPresent);
    };
    UndoableState.prototype.executed = function (state, action) {
        var newPresent = { state: state, action: action };
        var newPast = __spreadArray(__spreadArray([], this.past, true), [this.presentState], false);
        if (newPast.length > this.pastCapacity) {
            newPast.splice(0, 1);
        }
        return new UndoableState(newPast, this.pastCapacity, [], newPresent);
    };
    UndoableState.prototype.replacePresent = function (state, action) {
        var newPresent = { state: state, action: action || this.presentState.action };
        return new UndoableState(this.past, this.pastCapacity, this.future, newPresent);
    };
    return UndoableState;
}());
exports.UndoableState = UndoableState;
