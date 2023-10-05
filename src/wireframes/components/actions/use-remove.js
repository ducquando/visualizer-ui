"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useRemove = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useRemove() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedItems = (0, model_1.useStore)(model_1.getSelectedItems);
    var canRemove = selectedItems.length > 0;
    var doRemove = (0, core_1.useEventCallback)(function () {
        if (selectedDiagramId) {
            dispatch((0, model_1.removeItems)(selectedDiagramId, selectedItems));
        }
    });
    var remove = React.useMemo(function () { return ({
        disabled: !canRemove,
        icon: 'icon-delete',
        label: texts_1.texts.common.remove,
        shortcut: 'DELETE',
        tooltip: texts_1.texts.common.removeTooltip,
        onAction: doRemove
    }); }, [canRemove, doRemove]);
    return { remove: remove };
}
exports.useRemove = useRemove;
