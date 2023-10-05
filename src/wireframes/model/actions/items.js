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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.calculateSelection = exports.buildItems = exports.pasteItems = exports.renameItems = exports.removeItems = exports.selectItems = exports.unlockItems = exports.lockItems = exports.addShape = void 0;
/* eslint-disable @typescript-eslint/no-loop-func */
var toolkit_1 = require("@reduxjs/toolkit");
var core_1 = require("@app/core");
var internal_1 = require("./../internal");
var utils_1 = require("./utils");
exports.addShape = (0, toolkit_1.createAction)('items/addShape', function (diagram, renderer, props, id) {
    if (props === void 0) { props = {}; }
    return { payload: (0, utils_1.createDiagramAction)(diagram, __assign({ id: id || core_1.MathHelper.nextId(), renderer: renderer }, props)) };
});
exports.lockItems = (0, toolkit_1.createAction)('items/lock', function (diagram, items) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items) };
});
exports.unlockItems = (0, toolkit_1.createAction)('items/unlock', function (diagram, items) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items) };
});
exports.selectItems = (0, toolkit_1.createAction)('items/select', function (diagram, items) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items) };
});
exports.removeItems = (0, toolkit_1.createAction)('items/remove', function (diagram, items) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items) };
});
exports.renameItems = (0, toolkit_1.createAction)('items/rename', function (diagram, items, name) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items, { name: name }) };
});
exports.pasteItems = (0, toolkit_1.createAction)('items/paste', function (diagram, json, offset) {
    if (offset === void 0) { offset = 0; }
    return { payload: (0, utils_1.createDiagramAction)(diagram, { json: internal_1.Serializer.tryGenerateNewIds(json), offset: offset }) };
});
function buildItems(builder) {
    return builder
        .addCase(exports.selectItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            return diagram.selectItems(itemIds);
        });
    })
        .addCase(exports.removeItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            var set = internal_1.DiagramItemSet.createFromDiagram(itemIds, diagram);
            return diagram.removeItems(set);
        });
    })
        .addCase(exports.lockItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            var set = internal_1.DiagramItemSet.createFromDiagram(itemIds, diagram);
            return diagram.updateItems(set.allItems.map(function (x) { return x.id; }), function (item) {
                return item.lock();
            });
        });
    })
        .addCase(exports.unlockItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            var set = internal_1.DiagramItemSet.createFromDiagram(itemIds, diagram);
            return diagram.updateItems(set.allItems.map(function (x) { return x.id; }), function (item) {
                return item.unlock();
            });
        });
    })
        .addCase(exports.renameItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds, name = _a.name;
        return state.updateDiagram(diagramId, function (diagram) {
            return diagram.updateItems(itemIds, function (item) {
                return item.rename(name);
            });
        });
    })
        .addCase(exports.pasteItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, json = _a.json, offset = _a.offset;
        return state.updateDiagram(diagramId, function (diagram) {
            var set = internal_1.Serializer.deserializeSet(JSON.parse(json));
            diagram = diagram.addItems(set);
            diagram = diagram.updateItems(set.allShapes.map(function (x) { return x.id; }), function (item) {
                var boundsOld = item.bounds(diagram);
                var boundsNew = boundsOld.moveBy(new core_1.Vec2(offset, offset));
                return item.transformByBounds(boundsOld, boundsNew);
            });
            diagram = diagram.selectItems(set.rootIds);
            return diagram;
        });
    })
        .addCase(exports.addShape, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, appearance = _a.appearance, id = _a.id, position = _a.position, renderer = _a.renderer, size = _a.size;
        return state.updateDiagram(diagramId, function (diagram) {
            var rendererInstance = internal_1.RendererService.get(renderer);
            var _a = rendererInstance.createDefaultShape(), defaultSize = _a.size, defaultAppearance = _a.appearance, other = __rest(_a, ["size", "appearance"]);
            var initialSize = size || defaultSize;
            var initialProps = __assign(__assign({}, other), { id: id, transform: new internal_1.Transform(new core_1.Vec2(((position === null || position === void 0 ? void 0 : position.x) || 0) + 0.5 * initialSize.x, ((position === null || position === void 0 ? void 0 : position.y) || 0) + 0.5 * initialSize.y), new core_1.Vec2(initialSize.x, initialSize.y), core_1.Rotation.ZERO), appearance: __assign(__assign({}, defaultAppearance || {}), appearance) });
            var shape = internal_1.DiagramItem.createShape(initialProps);
            return diagram.addShape(shape).selectItems([id]);
        });
    });
}
exports.buildItems = buildItems;
function calculateSelection(items, diagram, isSingleSelection, isCtrl) {
    if (!items) {
        return [];
    }
    var selectedItems = [];
    function resolveGroup(item, stop) {
        while (true) {
            var group = diagram.parent(item.id);
            if (!group || group === stop) {
                break;
            }
            else {
                item = group;
            }
        }
        return item;
    }
    if (isSingleSelection) {
        if (items.length === 1) {
            var single = items[0];
            if (single) {
                var singleId = single.id;
                if (isCtrl) {
                    if (!single.isLocked) {
                        if (diagram.selectedIds.has(singleId)) {
                            return diagram.selectedIds.remove(singleId).values;
                        }
                        else {
                            return diagram.selectedIds.add(resolveGroup(single).id).values;
                        }
                    }
                    else {
                        return diagram.selectedIds.values;
                    }
                }
                else {
                    var group = diagram.parent(single.id);
                    if (group && diagram.selectedIds.has(group.id)) {
                        selectedItems.push(resolveGroup(single, group));
                    }
                    else {
                        selectedItems.push(resolveGroup(single));
                    }
                }
            }
        }
    }
    else {
        var selection = {};
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item) {
                item = resolveGroup(item);
                if (!selection[item.id]) {
                    selection[item.id] = item;
                    selectedItems.push(item);
                }
            }
        }
    }
    if (selectedItems.length > 1) {
        selectedItems = selectedItems.filter(function (i) { return !i.isLocked; });
    }
    return selectedItems.map(function (i) { return i.id; });
}
exports.calculateSelection = calculateSelection;
