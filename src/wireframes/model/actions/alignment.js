"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.buildAlignment = exports.alignItems = exports.AlignmentMode = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var core_1 = require("@app/core");
var utils_1 = require("./utils");
var AlignmentMode;
(function (AlignmentMode) {
    AlignmentMode["DistributeHorizontal"] = "DISTRIBUTE_H";
    AlignmentMode["DistributeVertical"] = "DISTRIBUTE_V";
    AlignmentMode["HorizontalCenter"] = "ALIGN_H_CENTER";
    AlignmentMode["HorizontalLeft"] = "ALIGN_H_LEFT";
    AlignmentMode["HorizontalRight"] = "ALIGN_H_RIGHT";
    AlignmentMode["VerticalBottom"] = "ALIGN_V_BOTTOM";
    AlignmentMode["VerticalCenter"] = "ALIGN_V_CENTER";
    AlignmentMode["VerticalTop"] = "ALIGN_V_TOP";
})(AlignmentMode = exports.AlignmentMode || (exports.AlignmentMode = {}));
exports.alignItems = (0, toolkit_1.createAction)('items/align', function (mode, diagram, items) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items, { mode: mode }) };
});
function buildAlignment(builder) {
    builder
        .addCase(exports.alignItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds, mode = _a.mode;
        return state.updateDiagram(diagramId, function (diagram) {
            switch (mode) {
                case AlignmentMode.HorizontalLeft:
                    return alignShapes(itemIds, diagram, function (b, i) { return new core_1.Vec2(b.left, i.y); });
                case AlignmentMode.HorizontalRight:
                    return alignShapes(itemIds, diagram, function (b, i) { return new core_1.Vec2(b.right - i.width, i.y); });
                case AlignmentMode.HorizontalCenter:
                    return alignShapes(itemIds, diagram, function (b, i) { return new core_1.Vec2(b.left + (b.width - i.width) * 0.5, i.y); });
                case AlignmentMode.VerticalTop:
                    return alignShapes(itemIds, diagram, function (b, i) { return new core_1.Vec2(i.x, b.top); });
                case AlignmentMode.VerticalBottom:
                    return alignShapes(itemIds, diagram, function (b, i) { return new core_1.Vec2(i.x, b.bottom - i.height); });
                case AlignmentMode.VerticalCenter:
                    return alignShapes(itemIds, diagram, function (b, i) { return new core_1.Vec2(i.x, b.top + (b.height - i.height) * 0.5); });
                case AlignmentMode.DistributeHorizontal:
                    return distributeHorizontally(itemIds, diagram);
                case AlignmentMode.DistributeVertical:
                    return distributeVertically(itemIds, diagram);
                default:
                    return diagram;
            }
        });
    });
}
exports.buildAlignment = buildAlignment;
function distributeHorizontally(itemIds, diagram) {
    var targetItems = findTargets(itemIds, diagram);
    var targetBounds = core_1.Rect2.fromRects(targetItems.map(function (t) { return t.aabb; }));
    var totalWidth = 0;
    for (var _i = 0, targetItems_1 = targetItems; _i < targetItems_1.length; _i++) {
        var target = targetItems_1[_i];
        totalWidth += target.aabb.width;
    }
    var margin = (targetBounds.width - totalWidth) / (targetItems.length - 1);
    var x = targetBounds.left;
    var i = 0;
    var sortedTargets = targetItems.sort(function (a, b) { return a.aabb.x - b.aabb.x; });
    var sortedTargetIds = sortedTargets.map(function (x) { return x.itemId; });
    return diagram.updateItems(sortedTargetIds, function (item) {
        var target = sortedTargets[i++];
        if (x !== target.aabb.x) {
            var newPosition = new core_1.Vec2(x, target.aabb.y);
            var dx = newPosition.x - target.aabb.x;
            var dy = newPosition.y - target.aabb.y;
            item = item.transformByBounds(target.transform, target.transform.moveBy(new core_1.Vec2(dx, dy)));
        }
        x += target.aabb.width + margin;
        return item;
    });
}
function distributeVertically(itemIds, diagram) {
    var targetItems = findTargets(itemIds, diagram);
    var targetBounds = core_1.Rect2.fromRects(targetItems.map(function (t) { return t.aabb; }));
    var totalHeight = 0;
    for (var _i = 0, targetItems_2 = targetItems; _i < targetItems_2.length; _i++) {
        var target = targetItems_2[_i];
        totalHeight += target.aabb.height;
    }
    var margin = (targetBounds.height - totalHeight) / (targetItems.length - 1);
    var y = targetBounds.top;
    var i = 0;
    var sortedTargets = targetItems.sort(function (a, b) { return a.aabb.y - b.aabb.y; });
    var sortedTargetIds = sortedTargets.map(function (x) { return x.itemId; });
    return diagram.updateItems(sortedTargetIds, function (item) {
        var target = sortedTargets[i++];
        if (y !== target.aabb.y) {
            var newPosition = new core_1.Vec2(target.aabb.x, y);
            var dx = newPosition.x - target.aabb.x;
            var dy = newPosition.y - target.aabb.y;
            item = item.transformByBounds(target.transform, target.transform.moveBy(new core_1.Vec2(dx, dy)));
        }
        y += target.aabb.height + margin;
        return item;
    });
}
function alignShapes(itemIds, diagram, transformer) {
    var targetItems = findTargets(itemIds, diagram);
    var targetBounds = core_1.Rect2.fromRects(targetItems.map(function (t) { return t.aabb; }));
    var i = 0;
    return diagram.updateItems(targetItems.map(function (x) { return x.itemId; }), function (item) {
        var target = targetItems[i++];
        var newPosition = transformer(targetBounds, target.aabb);
        var dx = newPosition.x - target.aabb.x;
        var dy = newPosition.y - target.aabb.y;
        if (dx !== 0 || dy !== 0) {
            item = item.transformByBounds(target.transform, target.transform.moveBy(new core_1.Vec2(dx, dy)));
        }
        return item;
    });
}
function findTargets(itemIds, diagram) {
    return itemIds.map(function (id) {
        var transform = diagram.items.get(id).bounds(diagram);
        return { transform: transform, aabb: transform.aabb, itemId: id };
    });
}
