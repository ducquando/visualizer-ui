"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useGrouping = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var core_2 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useGrouping() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedGroups = (0, model_1.useStore)(model_1.getSelectedGroups);
    var selectedItems = (0, model_1.useStore)(model_1.getSelectedItems);
    var canGroup = selectedItems.length > 1;
    var canUngroup = selectedGroups.length > 0;
    var doGroup = (0, core_2.useEventCallback)(function () {
        if (selectedDiagramId) {
            dispatch((0, model_1.groupItems)(selectedDiagramId, selectedItems, core_1.MathHelper.nextId()));
        }
    });
    var doUngroup = (0, core_2.useEventCallback)(function () {
        if (selectedDiagramId) {
            dispatch((0, model_1.ungroupItems)(selectedDiagramId, selectedGroups));
        }
    });
    var group = React.useMemo(function () { return ({
        disabled: !canGroup,
        icon: 'icon-group',
        label: texts_1.texts.common.group,
        shortcut: 'MOD + G',
        tooltip: texts_1.texts.common.groupTooltip,
        onAction: doGroup
    }); }, [canGroup, doGroup]);
    var ungroup = React.useMemo(function () { return ({
        disabled: !canUngroup,
        icon: 'icon-ungroup',
        label: texts_1.texts.common.ungroup,
        shortcut: 'MOD + SHIFT + G',
        tooltip: texts_1.texts.common.ungroupTooltip,
        onAction: doUngroup
    }); }, [canUngroup, doUngroup]);
    return { group: group, ungroup: ungroup };
}
exports.useGrouping = useGrouping;
