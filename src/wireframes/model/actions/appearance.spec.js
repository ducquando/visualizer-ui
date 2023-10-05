"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
/* eslint-disable @typescript-eslint/naming-convention */
var core_1 = require("@app/core");
var interface_1 = require("@app/wireframes/interface");
var model_1 = require("@app/wireframes/model");
var button_1 = require("@app/wireframes/shapes/neutral/button");
var abstract_control_1 = require("@app/wireframes/shapes/utils/abstract-control");
describe('AppearanceReducer', function () {
    var _a, _b;
    var shape1 = model_1.DiagramItem.createShape({
        id: '1',
        renderer: 'Button',
        transform: new model_1.Transform(core_1.Vec2.ZERO, new core_1.Vec2(100, 100), core_1.Rotation.ZERO),
        appearance: (_a = {},
            _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xff0000,
            _a)
    });
    var shape2 = model_1.DiagramItem.createShape({
        id: '2',
        renderer: 'Button',
        transform: new model_1.Transform(core_1.Vec2.ZERO, new core_1.Vec2(200, 200), core_1.Rotation.ZERO),
        appearance: (_b = {},
            _b[interface_1.DefaultAppearance.BACKGROUND_COLOR] = '#ff0000',
            _b)
    });
    var diagram = model_1.Diagram.create({ id: '1' })
        .addShape(shape1)
        .addShape(shape2);
    var state = model_1.EditorState.create()
        .addDiagram(diagram);
    model_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new button_1.Button()));
    var reducer = (0, model_1.createClassReducer)(state, function (builder) { return (0, model_1.buildAppearance)(builder); });
    it('should return same state if action is unknown', function () {
        var action = { type: 'UNKNOWN' };
        var state_1 = model_1.EditorState.create();
        var state_2 = reducer(state_1, action);
        expect(state_2).toBe(state_1);
    });
    it('should change appearance of all items to new value', function () {
        var action = (0, model_1.changeItemsAppearance)(diagram, diagram.items.values, interface_1.DefaultAppearance.TEXT, 'MyValue');
        expectShapesAfterAction(action, function (newShape1, newShape2) {
            expect(newShape1.appearance.get(interface_1.DefaultAppearance.TEXT)).toEqual('MyValue');
            expect(newShape2.appearance.get(interface_1.DefaultAppearance.TEXT)).toEqual('MyValue');
        });
    });
    it('should change colors of all items to new value', function () {
        var action = (0, model_1.changeColors)(core_1.Color.RED, core_1.Color.GREEN);
        expectShapesAfterAction(action, function (newShape1, newShape2) {
            expect(newShape1.appearance.get(interface_1.DefaultAppearance.BACKGROUND_COLOR)).toEqual(0x00ff00);
            expect(newShape2.appearance.get(interface_1.DefaultAppearance.BACKGROUND_COLOR)).toEqual(0x00ff00);
        });
    });
    it('should change colors when old color does not match', function () {
        var action = (0, model_1.changeColors)(core_1.Color.BLUE, core_1.Color.GREEN);
        expectShapesAfterAction(action, function (newShape1, newShape2) {
            expect(newShape1.appearance.get(interface_1.DefaultAppearance.BACKGROUND_COLOR)).not.toEqual(0x00ff00);
            expect(newShape2.appearance.get(interface_1.DefaultAppearance.BACKGROUND_COLOR)).not.toEqual(0x00ff00);
        });
    });
    it('should not change appearance when renderer does not support it', function () {
        var action = (0, model_1.changeItemsAppearance)(diagram, diagram.items.values, '?', 'MyValue');
        expectShapesAfterAction(action, function (newShape1, newShape2) {
            expect(newShape1.appearance.get('?')).toBeUndefined();
            expect(newShape2.appearance.get('?')).toBeUndefined();
        });
    });
    it('should change appearance when renderer does not support it but it is forced', function () {
        var action = (0, model_1.changeItemsAppearance)(diagram, diagram.items.values, '?', 'MyValue', true);
        expectShapesAfterAction(action, function (newShape1, newShape2) {
            expect(newShape1.appearance.get('?')).toEqual('MyValue');
            expect(newShape2.appearance.get('?')).toEqual('MyValue');
        });
    });
    it('should transform all items from new to old bounds', function () {
        var oldBounds = new model_1.Transform(core_1.Vec2.ZERO, new core_1.Vec2(200, 200), core_1.Rotation.ZERO);
        var newBounds = new model_1.Transform(core_1.Vec2.ZERO, new core_1.Vec2(300, 300), core_1.Rotation.ZERO);
        var action = (0, model_1.transformItems)(diagram, diagram.items.values, oldBounds, newBounds);
        expectShapesAfterAction(action, function (newShape1, newShape2) {
            expect(newShape1.transform.size).toEqual(new core_1.Vec2(150, 150));
            expect(newShape2.transform.size).toEqual(new core_1.Vec2(300, 300));
        });
    });
    function expectShapesAfterAction(action, expect) {
        var state_1 = model_1.EditorState.create().addDiagram(diagram);
        var state_2 = reducer(state_1, action);
        var newDiagram = state_2.diagrams.get('1');
        var newShape1 = newDiagram.items.get(shape1.id);
        var newShape2 = newDiagram.items.get(shape2.id);
        expect(newShape1, newShape2);
    }
});
