"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Serializer = void 0;
var core_1 = require("@app/core");
var diagram_1 = require("./diagram");
var diagram_item_1 = require("./diagram-item");
var diagram_item_set_1 = require("./diagram-item-set");
var editor_state_1 = require("./editor-state");
var renderer_service_1 = require("./renderer.service");
var transform_1 = require("./transform");
var Serializer;
(function (Serializer) {
    function tryGenerateNewIds(json) {
        try {
            return generateNewIds(json);
        }
        catch (_a) {
            return json;
        }
    }
    Serializer.tryGenerateNewIds = tryGenerateNewIds;
    function generateNewIds(json) {
        var input = JSON.parse(json);
        var idMap = {};
        for (var _i = 0, _a = input.visuals; _i < _a.length; _i++) {
            var jsonShape = _a[_i];
            var oldId = jsonShape.id;
            jsonShape.id = core_1.MathHelper.nextId();
            idMap[oldId] = jsonShape.id;
        }
        for (var _b = 0, _c = input.groups; _b < _c.length; _b++) {
            var jsonGroup = _c[_b];
            var oldId = jsonGroup.id;
            jsonGroup.id = core_1.MathHelper.nextId();
            idMap[oldId] = jsonGroup.id;
        }
        for (var _d = 0, _e = input.groups; _d < _e.length; _d++) {
            var jsonGroup = _e[_d];
            jsonGroup.childIds = jsonGroup.childIds.map(function (id) { return idMap[id]; });
        }
        return JSON.stringify(input);
    }
    Serializer.generateNewIds = generateNewIds;
    function deserializeSet(input) {
        var allItems = [];
        for (var _i = 0, _a = input.visuals; _i < _a.length; _i++) {
            var inputVisual = _a[_i];
            var item = readDiagramItem(inputVisual, 'Shape');
            if (item) {
                allItems.push(item);
            }
        }
        for (var _b = 0, _c = input.groups; _b < _c.length; _b++) {
            var inputGroup = _c[_b];
            var item = readDiagramItem(inputGroup, 'Group');
            if (item) {
                allItems.push(item);
            }
        }
        return new diagram_item_set_1.DiagramItemSet(allItems);
    }
    Serializer.deserializeSet = deserializeSet;
    function serializeSet(set) {
        var output = { visuals: [], groups: [] };
        for (var _i = 0, _a = Object.values(set.allItems); _i < _a.length; _i++) {
            var item = _a[_i];
            var serialized = writeDiagramItem(item);
            if (item.type === 'Shape') {
                output.visuals.push(serialized);
            }
            else {
                output.groups.push(serialized);
            }
        }
        return output;
    }
    Serializer.serializeSet = serializeSet;
    function deserializeEditor(input) {
        return readEditor(input);
    }
    Serializer.deserializeEditor = deserializeEditor;
    function serializeEditor(editor) {
        var output = writeEditor(editor);
        return output;
    }
    Serializer.serializeEditor = serializeEditor;
})(Serializer = exports.Serializer || (exports.Serializer = {}));
function writeEditor(source) {
    return writeObject(source.unsafeValues(), EDITOR_SERIALIZERS);
}
function writeDiagram(source) {
    return writeObject(source.unsafeValues(), DIAGRAM_SERIALIZERS);
}
function writeDiagramItem(source) {
    return writeObject(source.unsafeValues(), DIAGRAM_ITEM_SERIALIZERS);
}
function writeObject(source, serializers) {
    var result = {};
    for (var _i = 0, _a = Object.entries(source); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var serializer = serializers[key];
        if (serializer) {
            result[key] = serializer.get(value);
        }
    }
    return result;
}
function readEditor(source) {
    var raw = readObject(source, EDITOR_SERIALIZERS);
    return editor_state_1.EditorState.create(raw);
}
function readDiagram(source) {
    var raw = readObject(source, DIAGRAM_SERIALIZERS);
    if (!raw.rootIds) {
        raw.rootIds = source['itemIds'];
    }
    return diagram_1.Diagram.create(raw);
}
function readDiagramItem(source, type) {
    var _a;
    var raw = readObject(source, DIAGRAM_ITEM_SERIALIZERS);
    if ((raw.type || type) === 'Shape') {
        var defaults = (_a = renderer_service_1.RendererService.get(raw.renderer)) === null || _a === void 0 ? void 0 : _a.createDefaultShape();
        if (!defaults) {
            return null;
        }
        return diagram_item_1.DiagramItem.createShape(__assign(__assign({}, defaults), raw));
    }
    else {
        return diagram_item_1.DiagramItem.createGroup(raw);
    }
}
function readObject(source, serializers) {
    var result = {};
    for (var _i = 0, _a = Object.entries(source); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var serializer = serializers[key];
        if (serializer) {
            result[key] = serializer.set(value);
        }
    }
    return result;
}
var EDITOR_SERIALIZERS = {
    'id': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'diagrams': {
        get: function (source) { return source.values.map(writeDiagram); },
        set: function (source) { return buildObject(source.map(readDiagram), function (x) { return x.id; }); }
    },
    'diagramIds': {
        get: function (source) { return source.values; },
        set: function (source) { return source; }
    },
    'size': {
        get: function (source) { return ({ x: source.x, y: source.y }); },
        set: function (source) { return new core_1.Vec2(source.x, source.y); }
    }
};
var DIAGRAM_SERIALIZERS = {
    'id': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'master': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'items': {
        get: function (source) { return source.values.map(writeDiagramItem); },
        set: function (source) { return buildObject(source.map(readDiagramItem), function (x) { return x.id; }); }
    },
    'rootIds': {
        get: function (source) { return source.values; },
        set: function (source) { return source; }
    },
    'title': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    }
};
var DIAGRAM_ITEM_SERIALIZERS = {
    'appearance': {
        get: function (source) { return source.raw; },
        set: function (source) { return source; }
    },
    'childIds': {
        get: function (source) { return source.values; },
        set: function (source) { return source; }
    },
    'id': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'isLocked': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'name': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'renderer': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'rotation': {
        get: function (source) { return source.degree; },
        set: function (source) { return core_1.Rotation.fromDegree(source); }
    },
    'type': {
        get: function (source) { return source; },
        set: function (source) { return source; }
    },
    'transform': {
        get: function (source) { return source.toJS(); },
        set: function (source) { return transform_1.Transform.fromJS(source); }
    }
};
function buildObject(source, selector) {
    var result = {};
    for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
        var item = source_1[_i];
        if (item) {
            result[selector(item)] = item;
        }
    }
    return result;
}
