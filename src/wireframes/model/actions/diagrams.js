"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.buildDiagrams = exports.changeColor = exports.changeSize = exports.setDiagramMaster = exports.renameDiagram = exports.moveDiagram = exports.duplicateDiagram = exports.removeDiagram = exports.selectDiagram = exports.addDiagram = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var core_1 = require("@app/core");
var internal_1 = require("./../internal");
var utils_1 = require("./utils");
exports.addDiagram = (0, toolkit_1.createAction)('diagram/add', function (diagramId) {
    return { payload: (0, utils_1.createDiagramAction)(diagramId || core_1.MathHelper.nextId()) };
});
exports.selectDiagram = (0, toolkit_1.createAction)('diagram/select', function (diagram) {
    return { payload: (0, utils_1.createDiagramAction)(diagram) };
});
exports.removeDiagram = (0, toolkit_1.createAction)('diagram/remove', function (diagram) {
    return { payload: (0, utils_1.createDiagramAction)(diagram) };
});
exports.duplicateDiagram = (0, toolkit_1.createAction)('diagram/diagram', function (diagram) {
    return { payload: (0, utils_1.createDiagramAction)(diagram) };
});
exports.moveDiagram = (0, toolkit_1.createAction)('diagram/move', function (diagram, index) {
    return { payload: (0, utils_1.createDiagramAction)(diagram, { index: index }) };
});
exports.renameDiagram = (0, toolkit_1.createAction)('diagram/rename', function (diagram, title) {
    return { payload: (0, utils_1.createDiagramAction)(diagram, { title: title }) };
});
exports.setDiagramMaster = (0, toolkit_1.createAction)('diagram/master', function (diagram, master) {
    return { payload: (0, utils_1.createDiagramAction)(diagram, { master: master }) };
});
exports.changeSize = (0, toolkit_1.createAction)('editor/size', function (width, height) {
    return { payload: { width: width, height: height } };
});
exports.changeColor = (0, toolkit_1.createAction)('editor/color', function (color) {
    return { payload: { color: color.toString() } };
});
function buildDiagrams(builder) {
    return builder
        .addCase(exports.selectDiagram, function (state, action) {
        var diagramId = action.payload.diagramId;
        return state.selectDiagram(diagramId);
    })
        .addCase(exports.renameDiagram, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, title = _a.title;
        return state.updateDiagram(diagramId, function (diagram) { return diagram.rename(title); });
    })
        .addCase(exports.setDiagramMaster, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, master = _a.master;
        return state.updateDiagram(diagramId, function (diagram) { return diagram.setMaster(master); });
    })
        .addCase(exports.removeDiagram, function (state, action) {
        var diagramId = action.payload.diagramId;
        return state.removeDiagram(diagramId);
    })
        .addCase(exports.moveDiagram, function (state, action) {
        var _a = action.payload, diagramId = _a.diagramId, index = _a.index;
        return state.moveDiagram(diagramId, index);
    })
        .addCase(exports.changeSize, function (state, action) {
        var _a = action.payload, width = _a.width, height = _a.height;
        return state.changeSize(new core_1.Vec2(width, height));
    })
        .addCase(exports.changeColor, function (state, action) {
        var color = action.payload.color;
        return state.changeColor(core_1.Color.fromString(color));
    })
        .addCase(exports.duplicateDiagram, function (state, action) {
        var diagramId = action.payload.diagramId;
        var diagram = state.diagrams.get(diagramId);
        if (!diagram) {
            return state;
        }
        return state.addDiagram(diagram.clone());
    })
        .addCase(exports.addDiagram, function (state, action) {
        var diagramId = action.payload.diagramId;
        var newState = state.addDiagram(internal_1.Diagram.create({ id: diagramId }));
        if (newState.diagrams.size === 1) {
            newState = newState.selectDiagram(diagramId);
        }
        return newState;
    });
}
exports.buildDiagrams = buildDiagrams;
