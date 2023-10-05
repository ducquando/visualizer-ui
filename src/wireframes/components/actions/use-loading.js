"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useLoading = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function useLoading() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var diagrams = (0, model_1.useStore)(model_1.getDiagrams);
    var canSave = React.useMemo(function () {
        for (var _i = 0, _a = diagrams.values; _i < _a.length; _i++) {
            var diagram = _a[_i];
            if (diagram.items.size > 0) {
                return true;
            }
        }
        return false;
    }, [diagrams]);
    var openHandler = (0, core_1.useOpenFile)('.json', function (file) {
        dispatch((0, model_1.loadDiagramFromFile)({ file: file }));
    });
    var doNew = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.newDiagram)(true));
    });
    var doSave = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.saveDiagramToServer)({ navigate: true }));
    });
    var doSaveToFile = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.saveDiagramToFile)());
    });
    var newDiagramAction = React.useMemo(function () { return ({
        disabled: false,
        icon: 'icon-new',
        label: texts_1.texts.common.newDiagram,
        shortcut: 'MOD + N',
        tooltip: texts_1.texts.common.newDiagramTooltip,
        onAction: doNew
    }); }, [doNew]);
    var saveDiagram = React.useMemo(function () { return ({
        disabled: !canSave,
        icon: 'icon-save',
        label: texts_1.texts.common.saveDiagramTooltip,
        shortcut: 'MOD + S',
        tooltip: texts_1.texts.common.saveDiagramTooltip,
        onAction: doSave
    }); }, [doSave, canSave]);
    var saveDiagramToFileAction = React.useMemo(function () { return ({
        disabled: !canSave,
        icon: 'icon-save',
        label: texts_1.texts.common.saveDiagramToFileTooltip,
        tooltip: texts_1.texts.common.saveDiagramToFileTooltip,
        onAction: doSaveToFile
    }); }, [doSaveToFile, canSave]);
    var openDiagramAction = React.useMemo(function () { return ({
        disabled: false,
        icon: 'icon-folder-open',
        label: texts_1.texts.common.openFromFile,
        tooltip: texts_1.texts.common.openFromFileTooltip,
        onAction: openHandler
    }); }, [openHandler]);
    return { newDiagram: newDiagramAction, openDiagramAction: openDiagramAction, saveDiagram: saveDiagram, saveDiagramToFile: saveDiagramToFileAction };
}
exports.useLoading = useLoading;
