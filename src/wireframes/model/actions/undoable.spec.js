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
describe('Undoable', function () {
    var state_1 = model_1.UndoableState.create(13)
        .executed(14)
        .executed(15)
        .undo();
    var reducerCalled = 0;
    var reducerValue = 0;
    var inner = function (state) {
        reducerCalled++;
        reducerValue = (state || 0) + 1;
        return reducerValue;
    };
    var noopInner = function (state) {
        reducerCalled++;
        return state || 0;
    };
    beforeEach(function () {
        reducerCalled = 0;
    });
    it('should call state for undo action', function () {
        var reducer = (0, model_1.undoable)(inner, 0);
        var state_2 = reducer(state_1, (0, model_1.undo)());
        expect(state_2.present).toBe(13);
        expect(reducerCalled).toBeFalsy();
    });
    it('should call state for redo action', function () {
        var reducer = (0, model_1.undoable)(inner, 0);
        var state_2 = reducer(state_1, (0, model_1.redo)());
        expect(state_2.present).toBe(15);
        expect(reducerCalled).toBeFalsy();
    });
    it('should return original state when inner reducer makes no chance', function () {
        var reducer = (0, model_1.undoable)(noopInner, 0);
        var state_2 = reducer(state_1, { type: 'OTHER' });
        expect(state_2).toBe(state_1);
        expect(reducerCalled).toEqual(1);
    });
    it('should call inner reducer for other action', function () {
        var reducer = (0, model_1.undoable)(inner, 0);
        var state_2 = reducer(state_1, { type: 'OTHER' });
        expect(state_2.present).toEqual(reducerValue);
        expect(reducerCalled).toEqual(1);
    });
    it('should call inner reducer for ignored action', function () {
        var reducer = (0, model_1.undoable)(inner, 0, { actionsToIgnore: ['OTHER'] });
        var state_2 = reducer(state_1, { type: 'OTHER' });
        expect(state_2.present).toEqual(reducerValue);
        expect(reducerCalled).toEqual(1);
    });
    it('should not merge actions when merger returns false', function () {
        var reducer = (0, model_1.undoable)(inner, 0, { actionMerger: function () { return null; } });
        var state_2 = reducer(state_1, { type: 'OTHER' });
        var state_3 = reducer(state_2, { type: 'OTHER' });
        expect(state_3.present).toEqual(reducerValue);
        expect(state_3.actions.length).toEqual(2);
        expect(reducerCalled).toEqual(2);
    });
    it('should merge actions when merger returns merged action', function () {
        var reducer = (0, model_1.undoable)(inner, 0, { actionMerger: function () { return ({ type: 'MERGED' }); } });
        var state_2 = reducer(state_1, { type: 'OTHER' });
        var state_3 = reducer(state_2, { type: 'MERGED' });
        expect(state_3.present).toEqual(reducerValue);
        expect(state_3.actions.length).toEqual(1);
        expect(reducerCalled).toEqual(2);
    });
    it('should create valid undo action', function () {
        var action = (0, model_1.undo)();
        expect(action.type).toBe('undo');
    });
    it('should create valid redo action', function () {
        var action = (0, model_1.redo)();
        expect(action.type).toBe('redo');
    });
});
