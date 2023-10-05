"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.buildOrdering = exports.moveItems = exports.orderItems = exports.OrderMode = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var utils_1 = require("./utils");
var OrderMode;
(function (OrderMode) {
    OrderMode["BringToFront"] = "BRING_TO_FRONT";
    OrderMode["BringForwards"] = "BRING_FORWARDS";
    OrderMode["SendBackwards"] = "SEND_BACKWARDS";
    OrderMode["SendToBack"] = "SEND_TO_BACK";
})(OrderMode = exports.OrderMode || (exports.OrderMode = {}));
exports.orderItems = (0, toolkit_1.createAction)('items/order', function (mode, diagram, items) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items, { mode: mode }) };
});
exports.moveItems = (0, toolkit_1.createAction)('items/move', function (diagram, items, index) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items, { index: index }) };
});
function buildOrdering(builder) {
    return builder
        .addCase(exports.moveItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds, index = _a.index;
        return state.updateDiagram(diagramId, function (diagram) {
            return diagram.moveItems(itemIds, index);
        });
    })
        .addCase(exports.orderItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds, mode = _a.mode;
        return state.updateDiagram(diagramId, function (diagram) {
            switch (mode) {
                case OrderMode.BringToFront:
                    return diagram.bringToFront(itemIds);
                case OrderMode.BringForwards:
                    return diagram.bringForwards(itemIds);
                case OrderMode.SendToBack:
                    return diagram.sendToBack(itemIds);
                case OrderMode.SendBackwards:
                    return diagram.sendBackwards(itemIds);
                default:
                    return diagram;
            }
        });
    });
}
exports.buildOrdering = buildOrdering;
