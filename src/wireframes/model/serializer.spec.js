"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var checkbox_1 = require("@app/wireframes/shapes/neutral/checkbox");
var abstract_control_1 = require("../shapes/utils/abstract-control");
describe('Serializer', function () {
    var checkbox = new abstract_control_1.AbstractControl(new checkbox_1.Checkbox());
    var groupId = 'group-1';
    var oldShape1 = model_1.DiagramItem.createShape(checkbox.createDefaultShape()).transformWith(function (t) { return t.moveTo(new core_1.Vec2(100, 20)); }).rename('Named');
    var oldShape2 = model_1.DiagramItem.createShape(checkbox.createDefaultShape()).transformWith(function (t) { return t.moveTo(new core_1.Vec2(100, 20)); }).lock();
    var brokenShape = model_1.DiagramItem.createShape({ renderer: null });
    beforeEach(function () {
        model_1.RendererService.addRenderer(checkbox);
    });
    it('should serialize and deserialize set', function () {
        var original = model_1.DiagramItemSet.createFromDiagram([groupId], createDiagram('1'));
        var newValue = model_1.Serializer.deserializeSet(model_1.Serializer.serializeSet(original));
        compareSets(newValue, original);
    });
    it('should serialize and deserialize set when set has no types', function () {
        var original = model_1.DiagramItemSet.createFromDiagram([groupId], createDiagram('1'));
        var serialized = model_1.Serializer.serializeSet(original);
        for (var _i = 0, _a = serialized.visuals; _i < _a.length; _i++) {
            var visual = _a[_i];
            delete visual.type;
        }
        for (var _b = 0, _c = serialized.groups; _b < _c.length; _b++) {
            var group = _c[_b];
            delete group.type;
        }
        var newValue = model_1.Serializer.deserializeSet(serialized);
        compareSets(newValue, original);
    });
    it('should compute new ids', function () {
        var original = model_1.DiagramItemSet.createFromDiagram([groupId], createDiagram('1'));
        var serialized = model_1.Serializer.serializeSet(original);
        var updated = JSON.parse(model_1.Serializer.generateNewIds(JSON.stringify(serialized)));
        var i = 0;
        for (var _i = 0, _a = serialized.visuals; _i < _a.length; _i++) {
            var visual = _a[_i];
            expect(visual.id).not.toEqual(updated.visuals[i].id);
            i++;
        }
        i = 0;
        for (var _b = 0, _c = serialized.groups; _b < _c.length; _b++) {
            var group = _c[_b];
            expect(group.id).not.toEqual(updated.groups[i].id);
            expect(group.childIds).not.toEqual(updated.groups[i].childIds);
            i++;
        }
    });
    it('should not deserialize broken shape into set', function () {
        var original = model_1.DiagramItemSet.createFromDiagram([groupId], createDiagram('1').addShape(brokenShape));
        var newValue = model_1.Serializer.deserializeSet(model_1.Serializer.serializeSet(original));
        expect(newValue.allItems.length).toEqual(3);
    });
    it('should serialize and deserialize editor', function () {
        var original = model_1.EditorState.create()
            .addDiagram(createDiagram('1'))
            .addDiagram(createDiagram('2'));
        var newValue = model_1.Serializer.deserializeEditor(model_1.Serializer.serializeEditor(original));
        compareEditors(newValue, original);
    });
    it('should deserialize broken shape into editor editor', function () {
        var original = model_1.EditorState.create()
            .addDiagram(createDiagram('1').addShape(brokenShape))
            .addDiagram(createDiagram('2'));
        var newValue = model_1.Serializer.deserializeEditor(model_1.Serializer.serializeEditor(original));
        expect(newValue.diagrams.values[0].items.size).toEqual(3);
    });
    function createDiagram(id) {
        var diagram = model_1.Diagram.create({ id: id })
            .addShape(oldShape1)
            .addShape(oldShape2)
            .group(groupId, [oldShape1.id, oldShape2.id]);
        return diagram;
    }
    function compareEditors(newValue, original) {
        expect(newValue).toBeDefined();
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.diagrams.size).toEqual(original.diagrams.size);
        for (var _i = 0, _a = original.diagrams.values; _i < _a.length; _i++) {
            var item = _a[_i];
            compareDiagrams(newValue === null || newValue === void 0 ? void 0 : newValue.diagrams.get(item.id), item);
        }
    }
    function compareDiagrams(newValue, original) {
        expect(newValue).toBeDefined();
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.items.size).toEqual(original.items.size);
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.title).toEqual(original === null || original === void 0 ? void 0 : original.title);
        for (var _i = 0, _a = original.items.values; _i < _a.length; _i++) {
            var item = _a[_i];
            compareShapes(newValue === null || newValue === void 0 ? void 0 : newValue.items.get(item.id), item);
        }
    }
    function compareSets(newValue, original) {
        expect(newValue).toBeDefined();
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.allItems.length).toEqual(original.allItems.length);
        var _loop_1 = function (item) {
            compareShapes(newValue === null || newValue === void 0 ? void 0 : newValue.allItems.find(function (x) { return x.id === item.id; }), item);
        };
        for (var _i = 0, _a = original.allItems; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_1(item);
        }
    }
    function compareShapes(newValue, original) {
        var _a, _b;
        expect(newValue).toBeDefined();
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.type).toEqual(original.type);
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.name).toEqual(original === null || original === void 0 ? void 0 : original.name);
        expect(newValue === null || newValue === void 0 ? void 0 : newValue.isLocked).toEqual(original === null || original === void 0 ? void 0 : original.isLocked);
        if (original.type === 'Group') {
            expect(newValue === null || newValue === void 0 ? void 0 : newValue.childIds.equals(original.childIds)).toBeTrue();
            expect(newValue === null || newValue === void 0 ? void 0 : newValue.rotation.equals(original.rotation)).toBeTrue();
        }
        else {
            expect(newValue === null || newValue === void 0 ? void 0 : newValue.appearance.size).toBe(original.appearance.size);
            expect((_a = newValue === null || newValue === void 0 ? void 0 : newValue.configurables) === null || _a === void 0 ? void 0 : _a.length).toBe((_b = original.configurables) === null || _b === void 0 ? void 0 : _b.length);
            expect(newValue === null || newValue === void 0 ? void 0 : newValue.renderer).toBe(original.renderer);
            expect(newValue === null || newValue === void 0 ? void 0 : newValue.transform.equals(original.transform)).toBeTrue();
        }
    }
});
