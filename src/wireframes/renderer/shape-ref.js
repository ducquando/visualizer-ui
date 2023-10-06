"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ShapeRef = void 0;
var ShapeRef = /** @class */ (function () {
    function ShapeRef(doc, renderer, showDebugMarkers) {
        this.doc = doc;
        this.renderer = renderer;
        this.showDebugMarkers = showDebugMarkers;
        this.previewShape = null;
        this.currentShape = null;
        this.currentIndex = -1;
        this.renderedElement = null;
    }
    ShapeRef.prototype.remove = function () {
        var _a;
        // Always remove them so we can add the shapes back in the right order.
        (_a = this.renderedElement) === null || _a === void 0 ? void 0 : _a.remove();
    };
    ShapeRef.prototype.checkIndex = function (index) {
        var result = this.currentIndex >= 0 && this.currentIndex !== index;
        this.currentIndex = index;
        return result;
    };
    ShapeRef.prototype.setPreview = function (previewShape) {
        if (this.previewShape !== previewShape) {
            var shapeToRender = previewShape || this.currentShape;
            if (!shapeToRender) {
                return;
            }
            this.renderer.setContext(this.doc);
            this.renderer.render(shapeToRender, this.renderedElement, { debug: this.showDebugMarkers });
            this.previewShape = previewShape;
        }
    };
    ShapeRef.prototype.render = function (shape) {
        var previousElement = this.renderedElement;
        if (this.currentShape === shape && previousElement) {
            this.doc.add(this.renderedElement);
            return;
        }
        this.renderer.setContext(this.doc);
        this.renderedElement = this.renderer.render(shape, previousElement, { debug: this.showDebugMarkers });
        // Always update shape to keep a reference to the actual object, not the old object.
        this.renderedElement.node['shape'] = shape;
        // For new elements we might have to add them.
        if (!this.renderedElement.parent()) {
            this.doc.add(this.renderedElement);
        }
        this.currentShape = shape;
    };
    return ShapeRef;
}());
exports.ShapeRef = ShapeRef;
