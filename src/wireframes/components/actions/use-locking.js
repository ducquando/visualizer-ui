"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useLocking = void 0;
var icons_1 = require("@ant-design/icons");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useLocking() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedItem = (0, model_1.useStore)(model_1.getSelectedItemWithLocked);
    var doToggle = (0, core_1.useEventCallback)(function () {
        if (selectedDiagramId && selectedItem) {
            if (selectedItem.isLocked) {
                dispatch((0, model_1.unlockItems)(selectedDiagramId, [selectedItem.id]));
            }
            else {
                dispatch((0, model_1.lockItems)(selectedDiagramId, [selectedItem.id]));
            }
        }
    });
    var lock = React.useMemo(function () {
        var icon = selectedItem && selectedItem.isLocked ? (<icons_1.LockOutlined />) : (<icons_1.UnlockOutlined />);
        return {
            disabled: !selectedItem,
            icon: icon,
            label: texts_1.texts.common.lock,
            shortcut: 'MOD + L',
            tooltip: texts_1.texts.common.lockTooltip,
            onAction: doToggle
        };
    }, [selectedItem, doToggle]);
    return { lock: lock };
}
exports.useLocking = useLocking;
