"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useUI = void 0;
var icons_1 = require("@ant-design/icons");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useUI() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var zoom = (0, model_1.useStore)(function (x) { return x.ui.zoom; });
    var canZoomIn = zoom < 2;
    var canZoomOut = zoom > 0.25;
    var doZoomOut = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.setZoom)(zoom - 0.25));
    });
    var doZoomIn = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.setZoom)(zoom + 0.25));
    });
    var zoomOut = React.useMemo(function () { return ({
        disabled: !canZoomOut,
        icon: <icons_1.MinusCircleOutlined />,
        label: texts_1.texts.common.zoomOut,
        shortcut: 'ALT + MINUS',
        tooltip: texts_1.texts.common.zoomOut,
        onAction: doZoomOut
    }); }, [canZoomOut, doZoomOut]);
    var zoomIn = React.useMemo(function () { return ({
        disabled: !canZoomIn,
        icon: <icons_1.PlusCircleOutlined />,
        label: texts_1.texts.common.zoomIn,
        shortcut: 'ALT + PLUS',
        tooltip: texts_1.texts.common.zoomIn,
        onAction: doZoomIn
    }); }, [canZoomIn, doZoomIn]);
    return { zoomOut: zoomOut, zoomIn: zoomIn };
}
exports.useUI = useUI;
