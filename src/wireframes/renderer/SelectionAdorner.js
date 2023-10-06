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
exports.SelectionAdorner = void 0;
var React = require("react");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var SELECTION_STROKE_COLOR = '#080';
var SELECTION_STROKE_LOCK_COLOR = '#f00';
var SelectionAdorner = /** @class */ (function (_super) {
    __extends(SelectionAdorner, _super);
    function SelectionAdorner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionMarkers = [];
        _this.dragStart = null;
        return _this;
    }
    SelectionAdorner.prototype.componentDidMount = function () {
        var _this = this;
        this.props.interactionService.addHandler(this);
        // Use a stream of preview updates to bypass react for performance reasons.
        this.props.previewStream.subscribe(function (event) {
            if (event.type === 'Update') {
                _this.markItems(event.items);
            }
            else {
                _this.markItems();
            }
        });
        this.selectionShape =
            this.props.adorners.rect(1, 1)
                .stroke({ color: '#0a0', width: 1 })
                .scale(1, 1)
                .fill('#00aa0044')
                .hide();
    };
    SelectionAdorner.prototype.componentWillUnmount = function () {
        this.props.interactionService.removeHandler(this);
        this.selectionMarkers = [];
    };
    SelectionAdorner.prototype.componentDidUpdate = function () {
        this.markItems();
    };
    SelectionAdorner.prototype.onMouseDown = function (event) {
        if (!event.event.shiftKey) {
            var selection = this.selectSingle(event, this.props.selectedDiagram);
            this.props.onSelectItems(this.props.selectedDiagram, selection);
        }
        if (!event.element) {
            this.dragStart = event.position;
        }
    };
    SelectionAdorner.prototype.onMouseDrag = function (event, next) {
        if (!this.dragStart) {
            next(event);
            return;
        }
        var rect = core_1.Rect2.fromVecs([this.dragStart, event.position]);
        this.transformShape(this.selectionShape, new core_1.Vec2(rect.x, rect.y), new core_1.Vec2(rect.w, rect.h), 0);
        // Use the inverted zoom level as stroke width to have a constant stroke style.
        this.selectionShape.stroke({ width: 1 / this.props.zoom });
    };
    SelectionAdorner.prototype.onMouseUp = function (event, next) {
        if (!this.dragStart) {
            next(event);
            return;
        }
        try {
            var rect = core_1.Rect2.fromVecs([this.dragStart, event.position]);
            if (rect.area < 100) {
                return;
            }
            var selection = this.selectMultiple(rect, this.props.selectedDiagram);
            if (selection) {
                this.props.onSelectItems(this.props.selectedDiagram, selection);
            }
        }
        finally {
            this.stopDrag();
        }
    };
    SelectionAdorner.prototype.onBlur = function (event, next) {
        if (!this.dragStart) {
            next(event);
            return;
        }
        this.stopDrag();
    };
    SelectionAdorner.prototype.stopDrag = function () {
        this.selectionShape.hide();
        this.dragStart = null;
    };
    SelectionAdorner.prototype.selectMultiple = function (rect, diagram) {
        var selectedItems = diagram.rootItems.filter(function (i) { return rect.contains(i.bounds(diagram).aabb); });
        return (0, model_1.calculateSelection)(selectedItems, diagram, false);
    };
    SelectionAdorner.prototype.selectSingle = function (event, diagram) {
        var _a;
        var isMod = (0, core_1.isModKey)(event.event);
        if (isMod) {
            event.event.preventDefault();
        }
        var aabb = (_a = event.shape) === null || _a === void 0 ? void 0 : _a.bounds(diagram).aabb;
        if ((aabb === null || aabb === void 0 ? void 0 : aabb.contains(event.position)) && event.shape) {
            return (0, model_1.calculateSelection)([event.shape], diagram, true, isMod);
        }
        else {
            return [];
        }
    };
    SelectionAdorner.prototype.markItems = function (preview) {
        var _this = this;
        for (var _i = 0, _a = this.selectionMarkers; _i < _a.length; _i++) {
            var adorner = _a[_i];
            adorner.hide();
        }
        var selection = this.props.selectedItems;
        // Add more markers if we do not have enough.
        while (this.selectionMarkers.length < selection.length) {
            var marker = this.props.adorners.rect(1, 1).fill('none');
            this.selectionMarkers.push(marker);
        }
        // Use the inverted zoom level as stroke width.
        var strokeWidth = 1 / this.props.zoom;
        this.props.selectedItems.forEach(function (item, i) {
            var marker = _this.selectionMarkers[i];
            var color = item.isLocked ?
                SELECTION_STROKE_LOCK_COLOR :
                SELECTION_STROKE_COLOR;
            // Use the inverted zoom level as stroke width to have a constant stroke style.
            marker.stroke({ color: color, width: strokeWidth });
            var actualItem = (preview === null || preview === void 0 ? void 0 : preview[item.id]) || item;
            var actualBounds = actualItem.bounds(_this.props.selectedDiagram);
            // Also adjust the bounds by the border width, to show the border outside of the shape.
            _this.transformShape(marker, actualBounds.position.sub(actualBounds.halfSize), actualBounds.size, strokeWidth, actualBounds.rotation.degree);
        });
    };
    SelectionAdorner.prototype.transformShape = function (shape, position, size, offset, rotation) {
        if (rotation === void 0) { rotation = 0; }
        // We have to disable the adjustment mode to turn off the rounding.
        core_1.SVGHelper.transformBy(shape, {
            x: position.x - 0.5 * offset,
            y: position.y - 0.5 * offset,
            w: size.x + offset,
            h: size.y + offset,
            rotation: rotation
        }, false);
        if (size.x > 2 && size.y > 2) {
            shape.show();
        }
    };
    SelectionAdorner.prototype.render = function () {
        return null;
    };
    return SelectionAdorner;
}(React.Component));
exports.SelectionAdorner = SelectionAdorner;
