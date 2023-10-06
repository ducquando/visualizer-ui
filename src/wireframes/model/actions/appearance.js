"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.buildAppearance = exports.transformItems = exports.changeItemsAppearance = exports.changeColors = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var core_1 = require("@app/core");
var internal_1 = require("./../internal");
var utils_1 = require("./utils");
exports.changeColors = (0, toolkit_1.createAction)('items/color', function (oldColor, newColor) {
    return { payload: { oldColor: oldColor.toString(), newColor: newColor.toString() } };
});
exports.changeItemsAppearance = (0, toolkit_1.createAction)('items/appearance', function (diagram, shapes, key, value, force) {
    if (force === void 0) { force = false; }
    return { payload: (0, utils_1.createItemsAction)(diagram, shapes, { appearance: { key: key, value: value }, force: force }) };
});
exports.transformItems = (0, toolkit_1.createAction)('items/transform', function (diagram, items, oldBounds, newBounds) {
    return { payload: (0, utils_1.createItemsAction)(diagram, items, { oldBounds: oldBounds.toJS(), newBounds: newBounds.toJS() }) };
});
function buildAppearance(builder) {
    return builder
        .addCase(exports.changeColors, function (state, action) {
        var oldColor = core_1.Color.fromValue(action.payload.oldColor);
        var newColorValue = core_1.Color.fromValue(action.payload.newColor);
        var newColorNumber = newColorValue.toNumber();
        return state.updateAllDiagrams(function (diagram) {
            return diagram.updateAllItems(function (item) {
                if (item.type === 'Group') {
                    return item;
                }
                var appearance = item.appearance.mutate(function (mutator) {
                    for (var _i = 0, _a = Object.entries(item.appearance.raw); _i < _a.length; _i++) {
                        var _b = _a[_i], key = _b[0], value = _b[1];
                        if (key.endsWith('COLOR')) {
                            var parsedColor = core_1.Color.fromValue(value);
                            if (parsedColor.eq(oldColor)) {
                                mutator.set(key, newColorNumber);
                            }
                        }
                    }
                });
                return item.replaceAppearance(appearance);
            });
        });
    })
        .addCase(exports.changeItemsAppearance, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, appearance = _a.appearance, itemIds = _a.itemIds, force = _a.force;
        return state.updateDiagram(diagramId, function (diagram) {
            var key = appearance.key, value = appearance.value;
            var set = internal_1.DiagramItemSet.createFromDiagram(itemIds, diagram);
            return diagram.updateItems(set.allShapes.map(function (x) { return x.id; }), function (item) {
                var rendererInstance = internal_1.RendererService.get(item.renderer);
                if (rendererInstance && (force || !core_1.Types.isUndefined(rendererInstance.defaultAppearance()[key]))) {
                    return item.setAppearance(key, value);
                }
                return item;
            });
        });
    })
        .addCase(exports.transformItems, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, itemIds = _a.itemIds;
        return state.updateDiagram(diagramId, function (diagram) {
            var boundsOld = internal_1.Transform.fromJS(action.payload.oldBounds);
            var boundsNew = internal_1.Transform.fromJS(action.payload.newBounds);
            var set = internal_1.DiagramItemSet.createFromDiagram(itemIds, diagram);
            return diagram.updateItems(set.allItems.map(function (x) { return x.id; }), function (item) {
                return item.transformByBounds(boundsOld, boundsNew);
            });
        });
    });
}
exports.buildAppearance = buildAppearance;
