"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
/* eslint-disable @typescript-eslint/naming-convention */
var model_1 = require("@app/wireframes/model");
var Reducers = require("@app/wireframes/model/actions");
var diff = require('deep-diff').diff;
var v1 = require('./diagram_v1.json');
var v2 = require('./diagram_v2.json');
var v3 = require('./diagram_v3.json');
describe('LoadingReducer', function () {
    var editorState = model_1.EditorState.create();
    var editorReducer = Reducers.createClassReducer(editorState, function (builder) {
        Reducers.buildAlignment(builder);
        Reducers.buildAppearance(builder);
        Reducers.buildDiagrams(builder);
        Reducers.buildGrouping(builder);
        Reducers.buildItems(builder);
        Reducers.buildOrdering(builder);
    });
    var ignore = function (path, key) {
        return (path.length === 1 && path[0] === 'values' && key === 'id') || ~['instanceId', 'selectedIds', 'parents', 'computed'].indexOf(key);
    };
    var undoableReducer = Reducers.undoable(editorReducer, editorState, {
        capacity: 20,
        actionMerger: Reducers.mergeAction,
        actionsToIgnore: [
            model_1.selectDiagram.name,
            model_1.selectItems.name,
        ]
    });
    var rootReducer = Reducers.rootLoading(undoableReducer, editorReducer);
    it('should load from old and new format V2', function () {
        var initial = undoableReducer(undefined, { type: 'NOOP' });
        var editorV1 = rootReducer(initial, (0, model_1.loadDiagramInternal)(v1, '1'));
        var editorV2 = rootReducer(initial, (0, model_1.loadDiagramInternal)(v2, '2'));
        expect(editorV1.present.diagrams.values[0].items.values.length).toEqual(10);
        expect(editorV2.present.diagrams.values[0].items.values.length).toEqual(10);
        var diffsV2 = diff(editorV1.present, editorV2.present, ignore);
        expect(diffsV2).toEqual(undefined);
    });
    it('should load from old and new format V3', function () {
        var initial = undoableReducer(undefined, { type: 'NOOP' });
        var editorV1 = rootReducer(initial, (0, model_1.loadDiagramInternal)(v1, '1'));
        var editorV3 = rootReducer(initial, (0, model_1.loadDiagramInternal)(v3, '2'));
        expect(editorV1.present.diagrams.values[0].items.values.length).toEqual(10);
        expect(editorV3.present.diagrams.values[0].items.values.length).toEqual(10);
        var diffsV3 = diff(editorV1.present, editorV3.present, ignore);
        expect(diffsV3).toEqual(undefined);
    });
});
