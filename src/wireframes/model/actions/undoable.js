"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.undoable = exports.redo = exports.undo = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var internal_1 = require("./../internal");
var utils_1 = require("./utils");
exports.undo = (0, toolkit_1.createAction)('undo');
exports.redo = (0, toolkit_1.createAction)('redo');
function undoable(reducer, initialState, options) {
    var initialAction = options === null || options === void 0 ? void 0 : options.initialAction;
    var actionsToIgnore = {};
    var actionMerger = (options === null || options === void 0 ? void 0 : options.actionMerger) || (function () { return undefined; });
    if (options === null || options === void 0 ? void 0 : options.actionsToIgnore) {
        for (var _i = 0, _a = options.actionsToIgnore; _i < _a.length; _i++) {
            var type = _a[_i];
            actionsToIgnore[type] = true;
        }
    }
    return (0, utils_1.createClassReducer)(internal_1.UndoableState.create(initialState, initialAction, options === null || options === void 0 ? void 0 : options.capacity), function (builder) { return builder
        .addCase(exports.undo, function (state) {
        return state.undo();
    })
        .addCase(exports.redo, function (state) {
        return state.redo();
    })
        .addDefaultCase(function (state, action) {
        var newPresent = reducer(state.present, action);
        if (newPresent === state.present) {
            return state;
        }
        if (actionsToIgnore[action.type]) {
            return state.replacePresent(newPresent);
        }
        if (state.lastAction) {
            var merged = actionMerger(action, state.lastAction);
            if (merged) {
                return state.replacePresent(newPresent, merged);
            }
        }
        return state.executed(newPresent, action);
    }); });
}
exports.undoable = undoable;
