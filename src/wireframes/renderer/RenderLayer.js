"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.RenderLayer = void 0;
var React = require("react");
var model_1 = require("@app/wireframes/model");
var shape_ref_1 = require("./shape-ref");
var showDebugOutlines = process.env.NODE_ENV === 'false';
exports.RenderLayer = React.memo(function (props) {
    var diagram = props.diagram, diagramLayer = props.diagramLayer, preview = props.preview, onRender = props.onRender;
    var shapesRendered = React.useRef(onRender);
    var shapeRefsById = React.useRef({});
    var itemIds = diagram === null || diagram === void 0 ? void 0 : diagram.rootIds;
    var items = diagram === null || diagram === void 0 ? void 0 : diagram.items;
    var orderedShapes = React.useMemo(function () {
        var flattenShapes = [];
        if (items && itemIds) {
            var handleContainer_1;
            // eslint-disable-next-line prefer-const
            handleContainer_1 = function (itemIds) {
                for (var _i = 0, _a = itemIds.values; _i < _a.length; _i++) {
                    var id = _a[_i];
                    var item = items.get(id);
                    if (item) {
                        if (item.type === 'Shape') {
                            flattenShapes.push(item);
                        }
                        if (item.type === 'Group') {
                            handleContainer_1(item.childIds);
                        }
                    }
                }
            };
            handleContainer_1(itemIds);
        }
        return flattenShapes;
    }, [itemIds, items]);
    React.useEffect(function () {
        var allShapesById = {};
        var allShapes = orderedShapes;
        allShapes.forEach(function (item) {
            allShapesById[item.id] = true;
        });
        var references = shapeRefsById.current;
        // Delete old shapes.
        for (var _i = 0, _a = Object.entries(references); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], ref = _b[1];
            if (!allShapesById[id]) {
                ref.remove();
                delete references[id];
            }
        }
        // Create missing shapes.
        for (var _c = 0, allShapes_1 = allShapes; _c < allShapes_1.length; _c++) {
            var shape = allShapes_1[_c];
            if (!references[shape.id]) {
                var renderer = model_1.RendererService.get(shape.renderer);
                references[shape.id] = new shape_ref_1.ShapeRef(diagramLayer, renderer, showDebugOutlines);
            }
        }
        var hasIdChanged = false;
        for (var i = 0; i < allShapes.length; i++) {
            if (!references[allShapes[i].id].checkIndex(i)) {
                hasIdChanged = true;
                break;
            }
        }
        // If the index of at least once shape has changed we have to remove them all to render them in the correct order.
        if (hasIdChanged) {
            for (var _d = 0, _e = Object.values(references); _d < _e.length; _d++) {
                var ref = _e[_d];
                ref.remove();
            }
        }
        for (var _f = 0, allShapes_2 = allShapes; _f < allShapes_2.length; _f++) {
            var shape = allShapes_2[_f];
            references[shape.id].render(shape);
        }
        if (shapesRendered.current) {
            shapesRendered.current();
        }
    }, [diagramLayer, orderedShapes]);
    React.useEffect(function () {
        return preview === null || preview === void 0 ? void 0 : preview.subscribe(function (event) {
            var _a;
            if (event.type === 'Update') {
                for (var _i = 0, _b = Object.values(event.items); _i < _b.length; _i++) {
                    var item = _b[_i];
                    (_a = shapeRefsById.current[item.id]) === null || _a === void 0 ? void 0 : _a.setPreview(item);
                }
            }
            else {
                for (var _c = 0, _d = Object.values(shapeRefsById.current); _c < _d.length; _c++) {
                    var reference = _d[_c];
                    reference.setPreview(null);
                }
            }
        });
    }, [preview]);
    return null;
});
