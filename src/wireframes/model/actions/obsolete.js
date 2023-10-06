"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.migrateOldAction = exports.addVisual = exports.addIcon = exports.addImage = void 0;
/* eslint-disable @typescript-eslint/no-loop-func */
var toolkit_1 = require("@reduxjs/toolkit");
var core_1 = require("@app/core");
var interface_1 = require("@app/wireframes/interface");
var items_1 = require("./items");
var utils_1 = require("./utils");
/**
 * @deprecated Replaced with addShape
 */
exports.addImage = (0, toolkit_1.createAction)('items/addImage', function (diagram, source, x, y, w, h, shapeId) {
    return { payload: (0, utils_1.createDiagramAction)(diagram, { shapeId: shapeId || core_1.MathHelper.nextId(), source: source, position: { x: x, y: y }, size: { w: w, h: h } }) };
});
/**
 * @deprecated Replaced with addShape
 */
exports.addIcon = (0, toolkit_1.createAction)('items/addIcon', function (diagram, text, fontFamily, x, y, shapeId) {
    return { payload: (0, utils_1.createDiagramAction)(diagram, { shapeId: shapeId || core_1.MathHelper.nextId(), text: text, fontFamily: fontFamily, position: { x: x, y: y } }) };
});
/**
 * @deprecated Replaced with addShape
 */
exports.addVisual = (0, toolkit_1.createAction)('items/addVisual', function (diagram, renderer, x, y, appearance, shapeId, width, height) {
    return { payload: (0, utils_1.createDiagramAction)(diagram, { shapeId: shapeId || core_1.MathHelper.nextId(), renderer: renderer, position: { x: x, y: y }, appearance: appearance, width: width, height: height }) };
});
var MAX_IMAGE_SIZE = 300;
function migrateOldAction(action) {
    var _a;
    if (exports.addVisual.match(action)) {
        var _b = action.payload, diagramId = _b.diagramId, appearance = _b.appearance, width = _b.width, height = _b.height, position = _b.position, renderer = _b.renderer, shapeId = _b.shapeId;
        return (0, items_1.addShape)(diagramId, renderer, {
            appearance: appearance,
            position: position,
            size: width && height ? {
                x: width,
                y: height
            } : undefined
        }, shapeId);
    }
    if (exports.addIcon.match(action)) {
        var _c = action.payload, diagramId = _c.diagramId, fontFamily = _c.fontFamily, position = _c.position, shapeId = _c.shapeId, text = _c.text;
        return (0, items_1.addShape)(diagramId, 'Icon', {
            position: position,
            appearance: (_a = {},
                _a[interface_1.DefaultAppearance.TEXT] = text,
                _a[interface_1.DefaultAppearance.FONT_FAMILY] = fontFamily,
                _a)
        }, shapeId);
    }
    else if (exports.addImage.match(action)) {
        var _d = action.payload, diagramId = _d.diagramId, position = _d.position, size = _d.size, shapeId = _d.shapeId, source = _d.source;
        var w = size.w;
        var h = size.h;
        if (w > MAX_IMAGE_SIZE || h > MAX_IMAGE_SIZE) {
            var ratio = w / h;
            if (ratio > 1) {
                w = MAX_IMAGE_SIZE;
                h = MAX_IMAGE_SIZE / ratio;
            }
            else {
                w = MAX_IMAGE_SIZE * ratio;
                h = MAX_IMAGE_SIZE;
            }
        }
        return (0, items_1.addShape)(diagramId, 'Raster', {
            position: position,
            appearance: {
                SOURCE: source
            },
            size: { x: w, y: h }
        }, shapeId);
    }
    else {
        return action;
    }
}
exports.migrateOldAction = migrateOldAction;
