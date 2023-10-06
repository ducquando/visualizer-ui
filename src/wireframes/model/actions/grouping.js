"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.buildGrouping = exports.ungroupItems = exports.groupItems = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var core_1 = require("@app/core");
var utils_1 = require("./utils");
exports.groupItems = (0, toolkit_1.createAction)('grouping/group', function (diagram, items, groupId) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items, { groupId: groupId || core_1.MathHelper.nextId() }) };
});
exports.ungroupItems = (0, toolkit_1.createAction)('grouping/ungroup', function (diagram, groups) {
    return { payload: (0, utils_1.createItemsAction)(diagram, groups) };
});
function buildGrouping(builder) {
    return builder
        .addCase(exports.groupItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, groupId = _a.groupId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            return diagram.group(groupId, itemIds).selectItems([groupId]);
        });
    })
        .addCase(exports.ungroupItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            var childIds = [];
            for (var _i = 0, itemIds_1 = itemIds; _i < itemIds_1.length; _i++) {
                var groupId = itemIds_1[_i];
                var target = diagram.items.get(groupId);
                if (target) {
                    childIds.push.apply(childIds, target.childIds.values);
                    diagram = diagram.ungroup(groupId);
                }
            }
            diagram = diagram.selectItems(childIds);
            return diagram;
        });
    });
}
exports.buildGrouping = buildGrouping;
