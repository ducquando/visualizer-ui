"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useHistory = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useHistory() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var canRedo = (0, model_1.useStore)(function (s) { return s.editor.canRedo; });
    var canUndo = (0, model_1.useStore)(function (s) { return s.editor.canUndo; });
    var doRedo = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.redo)());
    });
    var doUndo = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.undo)());
    });
    var redoAction = React.useMemo(function () { return ({
        disabled: !canRedo,
        icon: 'icon-redo',
        label: texts_1.texts.common.redo,
        shortcut: 'MOD + Y',
        tooltip: texts_1.texts.common.redo,
        onAction: doRedo
    }); }, [canRedo, doRedo]);
    var undoAction = React.useMemo(function () { return ({
        disabled: !canUndo,
        icon: 'icon-undo',
        label: texts_1.texts.common.undo,
        shortcut: 'MOD + Z',
        tooltip: texts_1.texts.common.undo,
        onAction: doUndo
    }); }, [canUndo, doUndo]);
    return { redo: redoAction, undo: undoAction };
}
exports.useHistory = useHistory;
