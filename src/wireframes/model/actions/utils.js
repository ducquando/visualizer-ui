"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.createClassReducer = exports.createDiagramAction = exports.createItemsAction = void 0;
var core_1 = require("@app/core");
var internal_1 = require("./../internal");
function createItemsAction(diagram, items, action) {
    var result = createDiagramAction(diagram, action);
    result.itemIds = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var itemOrId = items_1[_i];
        if (core_1.Types.isString(itemOrId)) {
            result.itemIds.push(itemOrId);
        }
        else {
            result.itemIds.push(itemOrId.id);
        }
    }
    return result;
}
exports.createItemsAction = createItemsAction;
function createDiagramAction(diagram, action) {
    var result = {};
    if (core_1.Types.is(diagram, internal_1.Diagram)) {
        result.diagramId = diagram.id;
    }
    else {
        result.diagramId = diagram;
    }
    result.timestamp = new Date().getTime();
    if (action) {
        Object.assign(result, action);
    }
    return result;
}
exports.createDiagramAction = createDiagramAction;
function createClassReducer(initialState, builderCallback) {
    var builder = new Builder(initialState);
    builderCallback(builder);
    return builder.buildReducer();
}
exports.createClassReducer = createClassReducer;
var Builder = /** @class */ (function () {
    function Builder(initialState) {
        this.initialState = initialState;
        this.reducers = {};
    }
    Builder.prototype.addCase = function (action, method) {
        this.reducers[action.type] = method;
        return this;
    };
    Builder.prototype.addDefaultCase = function (action) {
        this.defaultReducer = action;
        return this;
    };
    Builder.prototype.addMatcher = function () {
        return this;
    };
    Builder.prototype.buildReducer = function () {
        var initialState = this.initialState;
        var reducers = this.reducers;
        var reducerDefault = this.defaultReducer;
        return function (state, action) {
            if (!state) {
                return initialState;
            }
            var handler = reducers[action.type];
            if (handler) {
                return handler(state, action);
            }
            else if (reducerDefault) {
                return reducerDefault(state, action);
            }
            else {
                return state;
            }
        };
    };
    return Builder;
}());
