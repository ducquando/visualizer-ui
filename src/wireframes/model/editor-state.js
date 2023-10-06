"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.EditorState = void 0;
var core_1 = require("@app/core");
var EditorState = /** @class */ (function (_super) {
    __extends(EditorState, _super);
    function EditorState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EditorState.prototype, "id", {
        get: function () {
            return this.get('id');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditorState.prototype, "selectedDiagramId", {
        get: function () {
            return this.get('selectedDiagramId');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditorState.prototype, "diagrams", {
        get: function () {
            return this.get('diagrams');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditorState.prototype, "diagramIds", {
        get: function () {
            return this.get('diagramIds');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditorState.prototype, "color", {
        get: function () {
            return this.get('color');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditorState.prototype, "size", {
        get: function () {
            return this.get('size');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditorState.prototype, "orderedDiagrams", {
        get: function () {
            var _this = this;
            return this.diagramIds.values.map(function (x) { return _this.diagrams.get(x); }).filter(function (x) { return !!x; });
        },
        enumerable: false,
        configurable: true
    });
    EditorState.create = function (setup) {
        if (setup === void 0) { setup = {}; }
        var color = setup.color, diagrams = setup.diagrams, diagramIds = setup.diagramIds, size = setup.size;
        var props = {
            color: color || core_1.Color.WHITE,
            diagrams: core_1.ImmutableMap.of(diagrams),
            diagramIds: core_1.ImmutableList.of(diagramIds),
            id: core_1.MathHelper.guid(),
            size: size || new core_1.Vec2(1000, 1000)
        };
        return new EditorState(props);
    };
    EditorState.prototype.changeSize = function (size) {
        return this.set('size', size);
    };
    EditorState.prototype.changeColor = function (color) {
        return this.set('color', color);
    };
    EditorState.prototype.moveDiagram = function (diagramId, index) {
        return this.set('diagramIds', this.diagramIds.moveTo([diagramId], index));
    };
    EditorState.prototype.updateDiagram = function (diagramId, updater) {
        return this.set('diagrams', this.diagrams.update(diagramId, updater));
    };
    EditorState.prototype.updateAllDiagrams = function (updater) {
        return this.set('diagrams', this.diagrams.updateAll(updater));
    };
    EditorState.prototype.selectDiagram = function (diagramId) {
        if (!this.diagrams.get(diagramId)) {
            return this;
        }
        return this.set('selectedDiagramId', diagramId);
    };
    EditorState.prototype.removeDiagram = function (diagramId) {
        return this.merge({
            diagrams: this.diagrams.remove(diagramId),
            diagramIds: this.diagramIds.remove(diagramId),
            selectedDiagramId: this.selectedDiagramId ? null : this.selectedDiagramId
        });
    };
    EditorState.prototype.addDiagram = function (diagram) {
        if (!diagram || this.diagrams.get(diagram.id)) {
            return this;
        }
        return this.merge({
            diagrams: this.diagrams.set(diagram.id, diagram),
            diagramIds: this.diagramIds.add(diagram.id)
        });
    };
    return EditorState;
}(core_1.Record));
exports.EditorState = EditorState;
