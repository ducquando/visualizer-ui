"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useStore = exports.getPageName = exports.getColors = exports.getSelectedConfigurables = exports.getSelectedShape = exports.getSelectedItemWithLocked = exports.getSelectedGroups = exports.getSelectedItems = exports.getSelectedItemsWithLocked = exports.getSelectedIds = exports.getSelectionSet = exports.getMasterDiagram = exports.getDiagram = exports.getFilteredDiagrams = exports.getFilteredShapes = exports.getFilteredIcons = exports.getSelectedIcons = exports.getIconSets = exports.getDiagramsFilterRegex = exports.getShapesFilterRegex = exports.getIconsFilterRegex = exports.getShapesFilter = exports.getShapes = exports.getOrderedDiagrams = exports.getIconsFilter = exports.getIconSet = exports.getIcons = exports.getEditor = exports.getEditorRoot = exports.getDiagramsFilter = exports.getDiagrams = exports.getDiagramId = void 0;
var react_redux_1 = require("react-redux");
var reselect_1 = require("reselect");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var actions_1 = require("./actions");
var diagram_item_set_1 = require("./diagram-item-set");
var EMPTY_STRING_ARRAY = [];
var EMPTY_ITEMS_ARRAY = [];
var EMPTY_CONFIGURABLES = [];
var getDiagramId = function (state) { return state.editor.present.selectedDiagramId; };
exports.getDiagramId = getDiagramId;
var getDiagrams = function (state) { return state.editor.present.diagrams; };
exports.getDiagrams = getDiagrams;
var getDiagramsFilter = function (state) { return state.ui.diagramsFilter; };
exports.getDiagramsFilter = getDiagramsFilter;
var getEditorRoot = function (state) { return state.editor; };
exports.getEditorRoot = getEditorRoot;
var getEditor = function (state) { return state.editor.present; };
exports.getEditor = getEditor;
var getIcons = function (state) { return state.assets.icons; };
exports.getIcons = getIcons;
var getIconSet = function (state) { return state.assets.iconSet; };
exports.getIconSet = getIconSet;
var getIconsFilter = function (state) { return state.assets.iconsFilter; };
exports.getIconsFilter = getIconsFilter;
var getOrderedDiagrams = function (state) { return state.editor.present.orderedDiagrams; };
exports.getOrderedDiagrams = getOrderedDiagrams;
var getShapes = function (state) { return state.assets.shapes; };
exports.getShapes = getShapes;
var getShapesFilter = function (state) { return state.assets.shapesFilter; };
exports.getShapesFilter = getShapesFilter;
exports.getIconsFilterRegex = (0, reselect_1.createSelector)(exports.getIconsFilter, function (filter) { return new RegExp(filter || '.*', 'i'); });
exports.getShapesFilterRegex = (0, reselect_1.createSelector)(exports.getShapesFilter, function (filter) { return new RegExp(filter || '.*', 'i'); });
exports.getDiagramsFilterRegex = (0, reselect_1.createSelector)(exports.getDiagramsFilter, function (filter) { return new RegExp(filter || '.*', 'i'); });
exports.getIconSets = (0, reselect_1.createSelector)(exports.getIcons, function (icons) { return Object.keys(icons); });
exports.getSelectedIcons = (0, reselect_1.createSelector)(exports.getIcons, exports.getIconSet, function (icons, set) { return icons[set]; });
exports.getFilteredIcons = (0, reselect_1.createSelector)(exports.getSelectedIcons, exports.getIconsFilterRegex, function (icons, filter) { return icons.filter(function (x) { return filter.test(x.displaySearch); }); });
exports.getFilteredShapes = (0, reselect_1.createSelector)(exports.getShapes, exports.getShapesFilterRegex, function (shapes, filter) { return shapes.filter(function (x) { return filter.test(x.displaySearch); }); });
exports.getFilteredDiagrams = (0, reselect_1.createSelector)(exports.getOrderedDiagrams, exports.getDiagramsFilterRegex, function (diagrams, filter) { return diagrams.filter(function (x, index) { return filter.test(getPageName(x, index)); }); });
exports.getDiagram = (0, reselect_1.createSelector)(exports.getDiagrams, exports.getDiagramId, function (diagrams, id) { return diagrams.get(id); });
exports.getMasterDiagram = (0, reselect_1.createSelector)(exports.getDiagrams, exports.getDiagram, function (diagrams, diagram) { return diagrams.get(diagram === null || diagram === void 0 ? void 0 : diagram.master); });
exports.getSelectionSet = (0, reselect_1.createSelector)(exports.getDiagram, function (diagram) { return (diagram ? diagram_item_set_1.DiagramItemSet.createFromDiagram(diagram.selectedIds.values, diagram) : null); });
exports.getSelectedIds = (0, reselect_1.createSelector)(exports.getDiagram, function (diagram) { return (diagram === null || diagram === void 0 ? void 0 : diagram.selectedIds.values) || EMPTY_STRING_ARRAY; });
exports.getSelectedItemsWithLocked = (0, reselect_1.createSelector)(exports.getDiagram, function (diagram) { return (diagram === null || diagram === void 0 ? void 0 : diagram.selectedIds.values.map(function (i) { return diagram.items.get(i); }).filter(function (x) { return !!x; })) || EMPTY_ITEMS_ARRAY; });
exports.getSelectedItems = (0, reselect_1.createSelector)(exports.getSelectedItemsWithLocked, function (items) { return items.filter(function (x) { return !x.isLocked; }); });
exports.getSelectedGroups = (0, reselect_1.createSelector)(exports.getSelectedItems, function (items) { return items.filter(function (i) { return i.type === 'Group'; }); });
exports.getSelectedItemWithLocked = (0, reselect_1.createSelector)(exports.getSelectedItemsWithLocked, function (items) { return (items.length === 1 ? items[0] : null); });
exports.getSelectedShape = (0, reselect_1.createSelector)(exports.getSelectedItems, function (items) { return (items.length === 1 && items[0].type === 'Shape' ? items[0] : null); });
exports.getSelectedConfigurables = (0, reselect_1.createSelector)(exports.getSelectedShape, function (shape) { return (shape ? shape.configurables : EMPTY_CONFIGURABLES); });
exports.getColors = (0, reselect_1.createSelector)(exports.getEditorRoot, function (editor) {
    var colors = {};
    var addColor = function (value) {
        var color = core_1.Color.fromValue(value);
        var colorKey = color.toString();
        var colorEntry = colors[colorKey];
        if (!colorEntry) {
            colorEntry = { count: 1, color: color };
            colors[colorKey] = colorEntry;
        }
        else {
            colorEntry.count++;
        }
    };
    addColor(editor.present.color.toNumber());
    for (var _i = 0, _a = editor.present.diagrams.values; _i < _a.length; _i++) {
        var diagram = _a[_i];
        for (var _b = 0, _c = diagram.items.values; _b < _c.length; _b++) {
            var shape = _c[_b];
            if (shape.type === 'Group') {
                continue;
            }
            for (var _d = 0, _e = Object.entries(shape.appearance.raw); _d < _e.length; _d++) {
                var _f = _e[_d], key = _f[0], value = _f[1];
                if (key.endsWith('COLOR')) {
                    addColor(value);
                }
            }
        }
    }
    var sorted = Object.entries(colors).sort(function (x, y) { return y[1].count - x[1].count; });
    return new core_1.ColorPalette(sorted.map(function (x) { return x[1].color; }));
}, {
    memoizeOptions: {
        equalityCheck: function (current, previous) {
            function shouldChange() {
                if (current === previous) {
                    return false;
                }
                if (current.present.id !== previous.present.id) {
                    return true;
                }
                var lastAction = previous.lastAction;
                return (actions_1.addDiagram.match(lastAction) ||
                    actions_1.addShape.match(lastAction) ||
                    actions_1.changeColor.match(lastAction) ||
                    actions_1.changeColors.match(lastAction) ||
                    actions_1.changeItemsAppearance.match(lastAction) ||
                    actions_1.pasteItems.match(lastAction) ||
                    actions_1.removeDiagram.match(lastAction) ||
                    actions_1.removeItems.match(lastAction));
            }
            return !shouldChange();
        }
    }
});
function getPageName(diagram, index) {
    var title;
    if (core_1.Types.isString(diagram)) {
        title = diagram;
    }
    else {
        title = diagram.title;
    }
    return title || "".concat(texts_1.texts.common.page, " ").concat(index + 1);
}
exports.getPageName = getPageName;
function useStore(selector) {
    return (0, react_redux_1.useSelector)(function (p) { return selector(p); });
}
exports.useStore = useStore;
