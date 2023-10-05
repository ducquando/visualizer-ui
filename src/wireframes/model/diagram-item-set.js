"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.DiagramItemSet = void 0;
var core_1 = require("@app/core");
var DiagramItemSet = /** @class */ (function () {
    function DiagramItemSet(source) {
        this.allItems = [];
        this.allShapes = [];
        this.allGroups = [];
        this.rootIds = [];
        this.isValid = true;
        var parents = {};
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var item = source_1[_i];
            this.allItems.push(item);
            if (item.type !== 'Group') {
                this.allShapes.push(item);
            }
            else {
                this.allGroups.push(item);
                var _loop_1 = function (childId) {
                    if (!source.find(function (i) { return i.id === childId; }) || parents[childId]) {
                        this_1.isValid = false;
                    }
                    parents[childId] = true;
                };
                var this_1 = this;
                for (var _a = 0, _b = item.childIds.values; _a < _b.length; _a++) {
                    var childId = _b[_a];
                    _loop_1(childId);
                }
            }
        }
        for (var _c = 0, source_2 = source; _c < source_2.length; _c++) {
            var item = source_2[_c];
            if (!parents[item.id]) {
                this.rootIds.push(item.id);
            }
        }
        Object.freeze(this);
    }
    DiagramItemSet.createFromDiagram = function (items, diagram) {
        var allItems = [];
        flattenRootItems(items, diagram, allItems);
        return new DiagramItemSet(allItems);
    };
    DiagramItemSet.prototype.canAdd = function (diagram) {
        if (!this.isValid) {
            return false;
        }
        for (var _i = 0, _a = this.allItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (diagram.items.has(item.id)) {
                return false;
            }
        }
        return true;
    };
    DiagramItemSet.prototype.canRemove = function (diagram) {
        if (!this.isValid) {
            return false;
        }
        for (var _i = 0, _a = this.allItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!diagram.items.has(item.id)) {
                return false;
            }
        }
        return true;
    };
    return DiagramItemSet;
}());
exports.DiagramItemSet = DiagramItemSet;
function flattenRootItems(source, diagram, allItems) {
    var byRoot = [];
    var byParents = {};
    for (var _i = 0, source_3 = source; _i < source_3.length; _i++) {
        var itemOrId = source_3[_i];
        var item = itemOrId;
        if (core_1.Types.isString(itemOrId)) {
            item = diagram.items.get(itemOrId);
        }
        else {
            item = itemOrId;
        }
        if (item) {
            var parent_1 = diagram.parent(item);
            if (parent_1) {
                var byParent = byParents[parent_1.id];
                if (!byParent) {
                    byParent = [];
                    byParents[parent_1.id] = byParent;
                }
                var orderIndex = parent_1.childIds.values.indexOf(item.id);
                byParent.push({ orderIndex: orderIndex, item: item });
            }
            else {
                var orderIndex = diagram.rootIds.values.indexOf(item.id);
                byRoot.push({ orderIndex: orderIndex, item: item });
            }
        }
    }
    function handleParent(byParent, diagram, allItems) {
        if (byParent.length === 0) {
            return;
        }
        byParent.sort(function (a, b) { return a.orderIndex - b.orderIndex; });
        for (var _i = 0, byParent_1 = byParent; _i < byParent_1.length; _i++) {
            var item = byParent_1[_i].item;
            allItems.push(item);
            if (item.type === 'Group') {
                flattenItems(item.childIds.values, diagram, allItems);
            }
        }
    }
    handleParent(byRoot, diagram, allItems);
    for (var _a = 0, _b = Object.values(byParents); _a < _b.length; _a++) {
        var byParent = _b[_a];
        handleParent(byParent, diagram, allItems);
    }
}
function flattenItems(source, diagram, allItems) {
    for (var _i = 0, source_4 = source; _i < source_4.length; _i++) {
        var itemOrId = source_4[_i];
        var item = diagram.items.get(itemOrId);
        if (!item) {
            continue;
        }
        allItems.push(item);
        if (item.type === 'Group') {
            flattenItems(item.childIds.values, diagram, allItems);
        }
    }
}
