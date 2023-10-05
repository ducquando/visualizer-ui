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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TransformAdorner = void 0;
var React = require("react");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var svg_renderer2_1 = require("./../shapes/utils/svg-renderer2");
var Mode;
(function (Mode) {
    Mode[Mode["None"] = 0] = "None";
    Mode[Mode["Resize"] = 1] = "Resize";
    Mode[Mode["Move"] = 2] = "Move";
    Mode[Mode["Rotate"] = 3] = "Rotate";
})(Mode || (Mode = {}));
var DEBUG_SIDES = false;
var DEBUG_DISTANCES = false;
var TRANSFORMER_STROKE_COLOR = '#080';
var TRANSFORMER_FILL_COLOR = '#0f0';
var DRAG_SIZE = 12;
var TransformAdorner = /** @class */ (function (_super) {
    __extends(TransformAdorner, _super);
    function TransformAdorner(props) {
        var _this = _super.call(this, props) || this;
        _this.canResizeX = false;
        _this.canResizeY = false;
        _this.manipulated = false;
        _this.manipulationMode = Mode.None;
        _this.manipulationOffset = core_1.Vec2.ZERO;
        _this.moveShape = null;
        _this.resizeShapes = [];
        _this.rotateShape = null;
        _this.rotation = core_1.Rotation.ZERO;
        _this.startPosition = core_1.Vec2.ZERO;
        _this.startTransform = model_1.Transform.ZERO;
        _this.transform = model_1.Transform.ZERO;
        _this.createRotateShape();
        _this.createMoveShape();
        _this.createResizeShapes();
        _this.allElements = __spreadArray(__spreadArray([], _this.resizeShapes, true), [_this.moveShape, _this.rotateShape], false);
        _this.hideShapes();
        _this.props.interactionService.addHandler(_this);
        return _this;
    }
    TransformAdorner.prototype.componentWillUnmount = function () {
        this.props.interactionService.removeHandler(this);
    };
    TransformAdorner.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.selectedDiagram.selectedIds !== prevProps.selectedDiagram.selectedIds) {
            this.rotation = core_1.Rotation.ZERO;
        }
        this.manipulationMode = Mode.None;
        this.manipulated = false;
        if (this.hasSelection()) {
            this.calculateInitializeTransform();
            this.calculateResizeRestrictions();
            this.renderShapes();
        }
        else {
            this.hideShapes();
        }
    };
    TransformAdorner.prototype.hasSelection = function () {
        return this.props.selectedItems.length > 0;
    };
    TransformAdorner.prototype.calculateInitializeTransform = function () {
        var _this = this;
        var transform;
        if (this.props.selectedItems.length === 0) {
            transform = model_1.Transform.ZERO;
        }
        else if (this.props.selectedItems.length === 1) {
            transform = this.props.selectedItems[0].bounds(this.props.selectedDiagram);
        }
        else {
            var bounds = this.props.selectedItems.map(function (x) { return x.bounds(_this.props.selectedDiagram); });
            transform = model_1.Transform.createFromTransformationsAndRotation(bounds, this.rotation);
        }
        this.transform = transform;
    };
    TransformAdorner.prototype.calculateResizeRestrictions = function () {
        this.canResizeX = false;
        this.canResizeY = false;
        for (var _i = 0, _a = this.props.selectedItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.constraint) {
                if (!item.constraint.calculateSizeX()) {
                    this.canResizeX = true;
                }
                if (!item.constraint.calculateSizeY()) {
                    this.canResizeY = true;
                }
            }
            else {
                this.canResizeX = true;
                this.canResizeY = true;
            }
        }
    };
    TransformAdorner.prototype.onKeyDown = function (event, next) {
        var _this = this;
        // If the manipulation with the mouse is still in progress we do not handle the event.
        if (isInputFocused() || !this.hasSelection() || this.manipulationMode != Mode.None) {
            next(event);
            return;
        }
        var xd = 0;
        var yd = 0;
        // Calculate the movement direction from the keys.
        switch (event.key) {
            case 'ArrowLeft':
                xd = -1;
                break;
            case 'ArrowRight':
                xd = +1;
                break;
            case 'ArrowUp':
                yd = -1;
                break;
            case 'ArrowDown':
                yd = 1;
                break;
        }
        // If the wrong keys are pressed, we just stop here.
        if (xd === 0 && yd === 0) {
            next(event);
            return;
        }
        stopEvent(event);
        // If the manipulation with the mouse is still in progress we do not handle the event.
        if (this.moveTimer) {
            next(event);
            return;
        }
        var counter = 1;
        this.startManipulation(null, this.transform);
        var run = function () {
            var delta = new core_1.Vec2(xd * counter, yd * counter);
            // Reset the overlay to show all markers.
            _this.props.overlayManager.reset();
            // Show the overlay after a few movements, not the first click.
            _this.move(delta, 'None', false);
            _this.renderPreview();
            _this.renderShapes();
            // We have kept the keyboard pressed and therefore also updated at least one shape.
            _this.manipulated = true;
            counter++;
        };
        run();
        this.moveTimer = new core_1.Timer(function () { return run(); }, 200, 1000);
    };
    TransformAdorner.prototype.onKeyUp = function (event, next) {
        if (!this.moveTimer) {
            next(event);
            return;
        }
        try {
            this.props.overlayManager.reset();
            // If none the timer has never been triggered we have not moved the shape and we can just stop here.
            if (!this.manipulated) {
                return;
            }
            this.rotation = this.transform.rotation;
            this.props.onTransformItems(this.props.selectedDiagram, this.props.selectedItems, this.startTransform, this.transform);
        }
        finally {
            this.stopTransform();
        }
    };
    TransformAdorner.prototype.onMouseDown = function (event, next) {
        // If the manipulation with the keyboard is still in progress we do not handle the event.
        if (event.event.ctrlKey || this.moveTimer || this.manipulationMode != Mode.None) {
            next(event);
            return;
        }
        var hitItem = this.hitTest(event.position);
        if (!hitItem) {
            next(event);
        }
        hitItem = this.hitTest(event.position);
        if (!hitItem) {
            return;
        }
        // Reset the flag to indicate whether something has been manipulated.
        this.startManipulation(event.position, this.transform);
        if (hitItem === this.moveShape) {
            this.manipulationMode = Mode.Move;
        }
        else if (hitItem === this.rotateShape) {
            this.manipulationMode = Mode.Rotate;
        }
        else {
            this.manipulationMode = Mode.Resize;
            this.manipulationOffset = hitItem['offset'];
        }
    };
    TransformAdorner.prototype.hitTest = function (point) {
        if (!this.transform) {
            return null;
        }
        var unrotated = core_1.Vec2.rotated(point, this.transform.position, this.transform.rotation.negate());
        for (var _i = 0, _a = this.allElements; _i < _a.length; _i++) {
            var element = _a[_i];
            var box = svg_renderer2_1.SVGRenderer2.INSTANCE.getLocalBounds(element);
            if (box.contains(unrotated)) {
                return element;
            }
        }
        return null;
    };
    TransformAdorner.prototype.onMouseDrag = function (event, next) {
        if (this.manipulationMode === Mode.None || !this.startPosition) {
            next(event);
            return;
        }
        // Reset the overlay to show all markers.
        this.props.overlayManager.reset();
        var delta = event.position.sub(this.startPosition);
        // If the mouse has not been moved we can just stop here.
        if (delta.lengtSquared === 0) {
            return;
        }
        // We have moved the mouse and therefore also updated at least one shape.
        this.manipulated = true;
        if (this.manipulationMode === Mode.Move) {
            this.move(delta, getSnapMode(event.event));
        }
        else if (this.manipulationMode === Mode.Rotate) {
            this.rotate(event, getSnapMode(event.event));
        }
        else {
            this.resize(delta, getSnapMode(event.event));
        }
        this.renderPreview();
        this.renderShapes();
    };
    TransformAdorner.prototype.renderPreview = function () {
        var items = {};
        for (var _i = 0, _a = this.props.selectedItems; _i < _a.length; _i++) {
            var item = _a[_i];
            items[item.id] = item.transformByBounds(this.startTransform, this.transform);
        }
        // Use a stream of preview updates to bypass react for performance reasons.
        this.props.previewStream.next({ type: 'Update', items: items });
    };
    TransformAdorner.prototype.move = function (delta, snapMode, showOverlay) {
        if (showOverlay === void 0) { showOverlay = true; }
        var snapResult = this.props.snapManager.snapMoving(this.startTransform, delta, snapMode);
        this.transform = this.startTransform.moveBy(snapResult.delta);
        if (showOverlay) {
            this.props.overlayManager.showSnapAdorners(snapResult);
            var x = Math.floor(this.transform.aabb.x);
            var y = Math.floor(this.transform.aabb.y);
            this.props.overlayManager.showInfo(this.transform, "X: ".concat(x, ", Y: ").concat(y));
        }
        this.debug();
    };
    TransformAdorner.prototype.rotate = function (event, snapMode, showOverlay) {
        if (showOverlay === void 0) { showOverlay = true; }
        var deltaValue = this.getCummulativeRotation(event);
        var deltaRotation = this.props.snapManager.snapRotating(this.startTransform, deltaValue, snapMode);
        this.transform = this.startTransform.rotateBy(core_1.Rotation.fromDegree(deltaRotation));
        if (showOverlay) {
            this.props.overlayManager.showInfo(this.transform, "Y: ".concat(this.transform.rotation.degree, "\u00B0"));
        }
    };
    TransformAdorner.prototype.getCummulativeRotation = function (event) {
        var center = this.startTransform.position;
        var eventPoint = event.position;
        var eventStart = this.startPosition;
        var cummulativeRotation = core_1.Vec2.angleBetween(eventStart.sub(center), eventPoint.sub(center));
        return cummulativeRotation;
    };
    TransformAdorner.prototype.resize = function (delta, snapMode, showOverlay) {
        if (showOverlay === void 0) { showOverlay = true; }
        var startRotation = this.startTransform.rotation;
        var deltaSize = this.getResizeDeltaSize(startRotation, delta, snapMode);
        var deltaMove = this.getResizeDeltaPosition(startRotation, deltaSize.delta);
        // A resize is very often also a movement, because the center is in the middle.
        this.transform = this.startTransform.resizeAndMoveBy(deltaSize.delta, deltaMove);
        if (showOverlay) {
            this.props.overlayManager.showSnapAdorners(deltaSize);
            var w = Math.floor(this.transform.size.x);
            var h = Math.floor(this.transform.size.y);
            this.props.overlayManager.showInfo(this.transform, "Width: ".concat(w, ", Height: ").concat(h));
        }
        this.debug();
    };
    TransformAdorner.prototype.getResizeDeltaSize = function (angle, cummulativeTranslation, snapMode) {
        var delta = core_1.Vec2.rotated(cummulativeTranslation.mul(2), core_1.Vec2.ZERO, angle.negate()).mul(this.manipulationOffset);
        var snapResult = this.props.snapManager.snapResizing(this.startTransform, delta, snapMode, this.manipulationOffset.x, this.manipulationOffset.y);
        return snapResult;
    };
    TransformAdorner.prototype.debug = function () {
        if (DEBUG_SIDES || DEBUG_DISTANCES) {
            var _a = this.props.snapManager.getDebugLines(this.startTransform), xLines = _a.xLines, yLines = _a.yLines;
            for (var _i = 0, xLines_1 = xLines; _i < xLines_1.length; _i++) {
                var line = xLines_1[_i];
                if ((line.positions && DEBUG_DISTANCES) || DEBUG_SIDES) {
                    this.props.overlayManager.renderXLine(line);
                }
            }
            for (var _b = 0, yLines_1 = yLines; _b < yLines_1.length; _b++) {
                var line = yLines_1[_b];
                if ((line.positions && DEBUG_DISTANCES) || DEBUG_SIDES) {
                    this.props.overlayManager.renderYLine(line);
                }
            }
        }
    };
    TransformAdorner.prototype.getResizeDeltaPosition = function (angle, dSize) {
        var x = 0;
        var y = 0;
        if (this.manipulationOffset.y !== 0) {
            y += this.manipulationOffset.y * dSize.y * angle.cos;
            x -= this.manipulationOffset.y * dSize.y * angle.sin;
        }
        if (this.manipulationOffset.x !== 0) {
            y += this.manipulationOffset.x * dSize.x * angle.sin;
            x += this.manipulationOffset.x * dSize.x * angle.cos;
        }
        return new core_1.Vec2(x, y);
    };
    TransformAdorner.prototype.onMouseUp = function (event, next) {
        if (this.manipulationMode === Mode.None) {
            next(event);
            return;
        }
        try {
            this.props.overlayManager.reset();
            if (!this.manipulated) {
                return;
            }
            this.rotation = this.transform.rotation;
            this.props.onTransformItems(this.props.selectedDiagram, this.props.selectedItems, this.startTransform, this.transform);
        }
        finally {
            this.stopTransform();
        }
    };
    TransformAdorner.prototype.onBlur = function (event, next) {
        if (this.manipulationMode === Mode.None && !this.moveTimer) {
            next(event);
            return;
        }
        this.stopTransform();
    };
    TransformAdorner.prototype.startManipulation = function (position, transform) {
        var _a;
        // Use a stream of preview updates to bypass react for performance reasons.
        this.props.previewStream.next({ type: 'Start' });
        (_a = this.moveTimer) === null || _a === void 0 ? void 0 : _a.destroy();
        this.moveTimer = null;
        this.manipulationMode = Mode.None;
        this.manipulated = false;
        this.startPosition = position;
        this.startTransform = transform;
    };
    TransformAdorner.prototype.stopTransform = function () {
        var _a;
        // Use a stream of preview updates to bypass react for performance reasons.
        this.props.previewStream.next({ type: 'End' });
        (_a = this.moveTimer) === null || _a === void 0 ? void 0 : _a.destroy();
        this.moveTimer = null;
        this.manipulationMode = Mode.None;
        this.manipulated = false;
    };
    TransformAdorner.prototype.renderShapes = function () {
        if (this.resizeShapes === null) {
            return;
        }
        var stroke = { width: 1 / this.props.zoom };
        var size = this.transform.size;
        var rotation = this.transform.rotation.degree;
        var position = this.transform.position;
        var adornerSize = DRAG_SIZE / this.props.zoom;
        var adornerHalfSize = adornerSize / 2;
        for (var _i = 0, _a = this.resizeShapes; _i < _a.length; _i++) {
            var resizeShape = _a[_i];
            var offset = resizeShape['offset'];
            var visible = (offset.x === 0 || this.canResizeX) &&
                (offset.y === 0 || this.canResizeY);
            if (!visible) {
                resizeShape.hide();
                continue;
            }
            core_1.SVGHelper.transformBy(resizeShape, {
                x: position.x - adornerHalfSize + offset.x * (size.x + adornerHalfSize),
                y: position.y - adornerHalfSize + offset.y * (size.y + adornerHalfSize),
                w: adornerSize,
                h: adornerSize,
                rx: position.x,
                ry: position.y,
                rotation: rotation
            }, false, true); // Do not set the position by matrix for bounding box calculation
            resizeShape.stroke(stroke);
            resizeShape.show();
        }
        this.rotateShape.size(adornerSize, adornerSize);
        this.rotateShape.stroke(stroke);
        this.rotateShape.show();
        core_1.SVGHelper.setSize(this.rotateShape, adornerSize, adornerSize);
        core_1.SVGHelper.transformBy(this.rotateShape, {
            x: position.x - adornerHalfSize,
            y: position.y - adornerHalfSize - size.y * 0.5 - 30 / this.props.zoom,
            rx: position.x,
            ry: position.y,
            rotation: rotation
        }, false, true); // Do not set the position by matrix for bounding box calculation
        this.moveShape.stroke(stroke);
        this.moveShape.show();
        core_1.SVGHelper.transformBy(this.moveShape, {
            x: position.x - 0.5 * size.x - stroke.width + 0.5,
            y: position.y - 0.5 * size.y - stroke.width + 0.5,
            w: Math.floor(size.x) + stroke.width,
            h: Math.floor(size.y) + stroke.width,
            rx: position.x,
            ry: position.y,
            rotation: rotation
        }, false, true); // Do not set the position by matrix for bounding box calculation
    };
    TransformAdorner.prototype.hideShapes = function () {
        this.allElements.forEach(function (s) { return s.hide(); });
    };
    TransformAdorner.prototype.createMoveShape = function () {
        var moveShape = this.props.adorners.rect(1)
            .stroke({ color: TRANSFORMER_STROKE_COLOR, width: 1 }).fill('none');
        this.props.interactionService.setCursor(moveShape, 'move');
        this.moveShape = moveShape;
    };
    TransformAdorner.prototype.createRotateShape = function () {
        var rotateShape = this.props.adorners.ellipse(DRAG_SIZE, DRAG_SIZE)
            .stroke({ color: TRANSFORMER_STROKE_COLOR, width: 1 }).fill(TRANSFORMER_FILL_COLOR);
        this.props.interactionService.setCursor(rotateShape, 'pointer');
        this.rotateShape = rotateShape;
    };
    TransformAdorner.prototype.createResizeShapes = function () {
        var ys = [-0.5, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 0.5];
        var xs = [-0.5, 0.0, 0.5, -0.5, 0.5, -0.5, 0.0, 0.5];
        var as = [315, 0, 45, 270, 90, 215, 180, 135];
        for (var i = 0; i < xs.length; i++) {
            var resizeShape = this.props.adorners.rect(DRAG_SIZE, DRAG_SIZE)
                .stroke({ color: TRANSFORMER_STROKE_COLOR, width: 1 }).fill(TRANSFORMER_FILL_COLOR);
            resizeShape['offset'] = new core_1.Vec2(xs[i], ys[i]);
            this.props.interactionService.setCursorAngle(resizeShape, as[i]);
            this.resizeShapes.push(resizeShape);
        }
    };
    TransformAdorner.prototype.render = function () {
        return null;
    };
    return TransformAdorner;
}(React.PureComponent));
exports.TransformAdorner = TransformAdorner;
function isInputFocused() {
    var _a, _b;
    var focusedElement = (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    return focusedElement === 'input' || focusedElement === 'textarea';
}
function stopEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
}
function getSnapMode(event) {
    if (event.shiftKey) {
        return 'Grid';
    }
    else if (event.ctrlKey) {
        return 'None';
    }
    else {
        return 'Shapes';
    }
}
