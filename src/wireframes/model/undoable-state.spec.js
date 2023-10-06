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
describe('UndoableState', function () {
    it('should create new state', function () {
        var state_1 = model_1.UndoableState.create(13);
        expect(state_1.canRedo).toBeFalsy();
        expect(state_1.canUndo).toBeFalsy();
        expect(state_1.present).toBe(13);
    });
    it('should limit history', function () {
        var state_1 = model_1.UndoableState.create(13, undefined, 2);
        var state_2 = state_1.executed(14);
        var state_3 = state_2.executed(15);
        var state_4 = state_3.executed(16);
        var state_5 = state_4.undo();
        expect(state_5.present).toBe(15);
        var state_6 = state_5.undo();
        expect(state_6.present).toBe(14);
        expect(state_6.canUndo).toBeFalsy();
    });
    it('should return original state when cannot undo or redo', function () {
        var state_1 = model_1.UndoableState.create(13);
        var state_2 = state_1.undo();
        var state_3 = state_2.redo();
        expect(state_3).toBe(state_1);
    });
    it('should undo and redo execution', function () {
        var state_1 = model_1.UndoableState.create(13);
        var state_2 = state_1.executed(15);
        expect(state_2.canRedo).toBeFalsy();
        expect(state_2.canUndo).toBeTruthy();
        expect(state_2.present).toBe(15);
        var state_3 = state_2.undo();
        expect(state_3.canRedo).toBeTruthy();
        expect(state_3.canUndo).toBeFalsy();
        expect(state_3.present).toBe(13);
        var state_4 = state_3.redo();
        expect(state_4.canRedo).toBeFalsy();
        expect(state_4.canUndo).toBeTruthy();
        expect(state_4.present).toBe(15);
    });
    it('should keep past and future when replacing present', function () {
        var state_1 = model_1.UndoableState.create(13);
        var state_2 = state_1.executed(14);
        var state_3 = state_2.executed(15);
        var state_4 = state_3.undo();
        var state_5 = state_4.replacePresent(19);
        expect(state_5.canRedo).toBeTruthy();
        expect(state_5.canUndo).toBeTruthy();
        expect(state_5.present).toBe(19);
    });
    it('should provide history of actions', function () {
        var state_1 = model_1.UndoableState.create(13, { type: 'Initial' });
        var state_2 = state_1.executed(14, { type: 'action1' });
        var state_3 = state_2.executed(15, { type: 'action2' });
        var state_4 = state_3.executed(16, { type: 'action3' });
        expect(state_4.actions).toEqual([
            { type: 'Initial' },
            { type: 'action1' },
            { type: 'action2' },
            { type: 'action3' },
        ]);
    });
    it('should skip invalid actions', function () {
        var state_1 = model_1.UndoableState.create(13);
        var state_2 = state_1.executed(14, { type: 'action1' });
        var state_3 = state_2.executed(15);
        var state_4 = state_3.executed(16, { type: 'action3' });
        expect(state_4.actions).toEqual([
            { type: 'action1' },
            { type: 'action3' },
        ]);
    });
    it('should replace present without action', function () {
        var state_1 = model_1.UndoableState.create(13);
        var state_2 = state_1.executed(14, { type: 'action1' });
        var state_3 = state_2.executed(15, { type: 'action2' });
        var state_4 = state_3.replacePresent(16);
        expect(state_4.actions).toEqual([
            { type: 'action1' },
            { type: 'action2' },
        ]);
        expect(state_4.present).toEqual(16);
    });
    it('should replace present with action', function () {
        var state_1 = model_1.UndoableState.create(13);
        var state_2 = state_1.executed(14, { type: 'action1' });
        var state_3 = state_2.executed(15, { type: 'action2' });
        var state_4 = state_3.replacePresent(16, { type: 'action3' });
        expect(state_4.actions).toEqual([
            { type: 'action1' },
            { type: 'action3' },
        ]);
        expect(state_4.present).toEqual(16);
    });
});
