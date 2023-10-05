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
exports.mergeAction = void 0;
var core_1 = require("@app/core");
var appearance_1 = require("./appearance");
var diagrams_1 = require("./diagrams");
var items_1 = require("./items");
function mergeAction(action, prevAction) {
    if (action.type !== prevAction.type) {
        return null;
    }
    var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds, timestamp = _a.timestamp;
    if (!core_1.Types.isString(diagramId) || !core_1.Types.isNumber(timestamp)) {
        return null;
    }
    var previousTimestamp = prevAction.payload.timestamp;
    if (timestamp - previousTimestamp > 500) {
        return null;
    }
    if (!core_1.Types.equals(prevAction.payload.diagramId, diagramId)) {
        return null;
    }
    if (items_1.selectItems.match(prevAction)) {
        return action;
    }
    if (!core_1.Types.equals(prevAction.payload.itemIds, itemIds)) {
        return null;
    }
    if (appearance_1.transformItems.match(prevAction)) {
        return { type: action.type, payload: __assign(__assign({}, action.payload), { oldBounds: prevAction.payload.oldBounds }) };
    }
    if (diagrams_1.changeColor.match(prevAction) ||
        diagrams_1.changeSize.match(prevAction) ||
        diagrams_1.renameDiagram.match(prevAction) ||
        items_1.renameItems.match(prevAction)) {
        return action;
    }
    if (appearance_1.changeItemsAppearance.match(prevAction) && prevAction.payload.appearance === action.payload.appearance) {
        return action;
    }
    return null;
}
exports.mergeAction = mergeAction;
