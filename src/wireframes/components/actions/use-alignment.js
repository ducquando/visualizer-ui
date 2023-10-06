"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useAlignment = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useAlignment() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedItems = (0, model_1.useStore)(model_1.getSelectedItems);
    var canAlign = selectedItems.length > 1;
    var canDistribute = selectedItems.length > 2;
    var canOrder = selectedItems.length > 0;
    var doAlign = (0, core_1.useEventCallback)(function (mode) {
        if (selectedDiagramId) {
            dispatch((0, model_1.alignItems)(mode, selectedDiagramId, selectedItems));
        }
    });
    var doOrder = (0, core_1.useEventCallback)(function (mode) {
        if (selectedDiagramId) {
            dispatch((0, model_1.orderItems)(mode, selectedDiagramId, selectedItems));
        }
    });
    function useAlign(mode, label, icon) {
        var action = React.useMemo(function () { return ({
            disabled: !canAlign,
            icon: icon,
            label: label,
            tooltip: label,
            onAction: function () { return doAlign(mode); }
        }); }, [canAlign, doAlign]);
        return action;
    }
    function useDistribute(mode, label, icon) {
        var action = React.useMemo(function () { return ({
            disabled: !canDistribute,
            icon: icon,
            label: label,
            tooltip: label,
            onAction: function () { return doAlign(mode); }
        }); }, [canAlign, doAlign]);
        return action;
    }
    function useOrder(mode, label, icon) {
        var action = React.useMemo(function () { return ({
            context: mode,
            disabled: !canOrder,
            icon: icon,
            label: label,
            tooltip: label,
            onAction: function () { return doOrder(mode); }
        }); }, [canOrder, doOrder]);
        return action;
    }
    return {
        alignHorizontalCenter: useAlign(model_1.AlignmentMode.HorizontalCenter, texts_1.texts.common.alignHorizontalCenter, 'icon-align-h-center'),
        alignHorizontalLeft: useAlign(model_1.AlignmentMode.HorizontalLeft, texts_1.texts.common.alignHorizontalLeft, 'icon-align-h-left'),
        alignHorizontalRight: useAlign(model_1.AlignmentMode.HorizontalRight, texts_1.texts.common.alignHorizontalRight, 'icon-align-h-right'),
        alignVerticalBottom: useAlign(model_1.AlignmentMode.VerticalBottom, texts_1.texts.common.alignVerticalBottom, 'icon-align-v-bottom'),
        alignVerticalCenter: useAlign(model_1.AlignmentMode.VerticalCenter, texts_1.texts.common.alignVerticalCenter, 'icon-align-v-center'),
        alignVerticalTop: useAlign(model_1.AlignmentMode.VerticalTop, texts_1.texts.common.alignVerticalTop, 'icon-align-v-top'),
        bringForwards: useOrder(model_1.OrderMode.BringForwards, texts_1.texts.common.bringForwards, 'icon-bring-forwards'),
        bringToFront: useOrder(model_1.OrderMode.BringToFront, texts_1.texts.common.bringToFront, 'icon-bring-to-front'),
        distributeHorizontally: useDistribute(model_1.AlignmentMode.DistributeHorizontal, texts_1.texts.common.distributeHorizontally, 'icon-distribute-h2'),
        distributeVertically: useDistribute(model_1.AlignmentMode.DistributeVertical, texts_1.texts.common.distributeVertically, 'icon-distribute-v2'),
        sendBackwards: useOrder(model_1.OrderMode.SendBackwards, texts_1.texts.common.sendBackwards, 'icon-send-backwards'),
        sendToBack: useOrder(model_1.OrderMode.SendToBack, texts_1.texts.common.sendToBack, 'icon-send-to-back')
    };
}
exports.useAlignment = useAlignment;
