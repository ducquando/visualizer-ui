"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.SnapManager = void 0;
var core_1 = require("@app/core");
var ROTATE_SNAP = 90 / 4;
var MOVE_SNAP_GRID = 10;
var MOVE_SNAP_SHAPE = 5;
var RESIZE_SNAP_SHAPE = 5;
var RESIZE_SNAP_GRID = 10;
var RESIZE_MINIMUM = 1;
var SnapManager = /** @class */ (function () {
    function SnapManager() {
    }
    SnapManager.prototype.prepare = function (diagram, view) {
        this.currentDiagram = diagram;
        this.currentView = view;
        this.xLines = undefined;
        this.yLines = undefined;
        this.grid = undefined;
    };
    SnapManager.prototype.snapRotating = function (transform, delta, snapMode) {
        var oldRotation = transform.rotation.degree;
        var total = oldRotation + delta;
        if (snapMode !== 'None') {
            return core_1.MathHelper.roundToMultipleOf(total, ROTATE_SNAP) - oldRotation;
        }
        else {
            return core_1.MathHelper.roundToMultipleOf(total, 1) - oldRotation;
        }
    };
    SnapManager.prototype.snapResizing = function (transform, delta, snapMode, xMode, yMode) {
        if (xMode === void 0) { xMode = 1; }
        if (yMode === void 0) { yMode = 1; }
        var result = { delta: delta };
        var dw = delta.x;
        var dh = delta.y;
        if (snapMode === 'Shapes' && transform.rotation.degree === 0) {
            var aabb = transform.aabb;
            var _a = this.getSnapLines(transform), xLines = _a.xLines, yLines = _a.yLines;
            // Compute the new x and y-positions once.
            var l = -delta.x + aabb.left;
            var r = +delta.x + aabb.right;
            var t = -delta.y + aabb.top;
            var b = delta.y + aabb.bottom;
            var snapX_1 = Number.MAX_VALUE;
            var isXCandidate = function (value, line) {
                var delta = Math.abs(value - line.value);
                if (delta > 0 && delta < RESIZE_SNAP_SHAPE && delta < snapX_1) {
                    snapX_1 = delta;
                    return true;
                }
                return false;
            };
            for (var _i = 0, xLines_1 = xLines; _i < xLines_1.length; _i++) {
                var line = xLines_1[_i];
                // Do not snap with center lines or distribution lines on resize.
                if (line.isCenter || line.positions) {
                    continue;
                }
                if (xMode > 0) {
                    if (isXCandidate(r, line)) {
                        dw = line.value - aabb.right;
                        result.snapX = line;
                    }
                }
                else if (xMode < 0) {
                    if (isXCandidate(l, line)) {
                        dw = aabb.left - line.value;
                        result.snapX = line;
                    }
                }
            }
            var snapY_1 = Number.MAX_VALUE;
            var isYCandidate = function (value, line) {
                var delta = Math.abs(value - line.value);
                if (delta > 0 && delta < RESIZE_SNAP_SHAPE && delta < snapY_1) {
                    snapY_1 = delta;
                    return true;
                }
                return false;
            };
            for (var _b = 0, yLines_1 = yLines; _b < yLines_1.length; _b++) {
                var line = yLines_1[_b];
                // Do not snap with center lines or distribution lines on resize.
                if (line.isCenter || line.positions) {
                    continue;
                }
                if (yMode > 0) {
                    if (isYCandidate(b, line)) {
                        dh = line.value - aabb.bottom;
                        result.snapY = line;
                    }
                }
                else if (yMode < 0) {
                    if (isYCandidate(t, line)) {
                        dh = aabb.top - line.value;
                        result.snapY = line;
                    }
                }
            }
        }
        else if (snapMode === 'Grid') {
            dw = core_1.MathHelper.roundToMultipleOf(transform.size.x + dw, RESIZE_SNAP_GRID) - transform.size.x;
            dh = core_1.MathHelper.roundToMultipleOf(transform.size.y + dh, RESIZE_SNAP_GRID) - transform.size.y;
        }
        if (transform.size.x + dw < RESIZE_MINIMUM) {
            dw = RESIZE_MINIMUM - transform.size.x;
        }
        if (transform.size.y + dh < RESIZE_MINIMUM) {
            dh = RESIZE_MINIMUM - transform.size.y;
        }
        result.delta = new core_1.Vec2(dw, dh);
        return result;
    };
    SnapManager.prototype.snapMoving = function (transform, delta, snapMode) {
        var _a, _b, _c, _d;
        var result = { delta: delta };
        var aabb = transform.aabb;
        var x = aabb.x + delta.x;
        var y = aabb.y + delta.y;
        if (snapMode === 'Shapes') {
            var _e = this.getSnapLines(transform), xLines = _e.xLines, yLines = _e.yLines, grid = _e.grid;
            // Compute the new x and y-positions once.
            var l = x;
            var r = delta.x + aabb.right;
            var t = y;
            var b = delta.y + aabb.bottom;
            var cx = delta.x + aabb.cx;
            var cy = delta.y + aabb.cy;
            var snapX_2 = Number.MAX_VALUE;
            var isXCandidate = function (value, line) {
                var delta = Math.abs(value - line.value);
                if (delta < MOVE_SNAP_SHAPE && delta < snapX_2) {
                    snapX_2 = delta;
                    return true;
                }
                return false;
            };
            for (var _i = 0, xLines_2 = xLines; _i < xLines_2.length; _i++) {
                var line = xLines_2[_i];
                // Distance lines have a bounds that must be close.
                if (((_a = line.gridItem) === null || _a === void 0 ? void 0 : _a.bound) && !isOverlapY(cy, aabb.height, (_b = line.gridItem) === null || _b === void 0 ? void 0 : _b.bound)) {
                    continue;
                }
                if (line.isCenter && isXCandidate(cx, line)) {
                    x = line.value - aabb.width * 0.5;
                    result.snapX = line;
                    break;
                }
                else if (isXCandidate(l, line)) {
                    x = line.value;
                    result.snapX = line;
                    break;
                }
                else if (isXCandidate(r, line)) {
                    x = line.value - aabb.width;
                    result.snapX = line;
                    break;
                }
            }
            var snapY_2 = Number.MAX_VALUE;
            var isYCandidate = function (value, line) {
                var delta = Math.abs(value - line.value);
                if (delta < MOVE_SNAP_SHAPE && delta < snapY_2) {
                    snapY_2 = delta;
                    return true;
                }
                return false;
            };
            for (var _f = 0, yLines_2 = yLines; _f < yLines_2.length; _f++) {
                var line = yLines_2[_f];
                // Distance lines have a bounds that must be close.
                if (((_c = line.gridItem) === null || _c === void 0 ? void 0 : _c.bound) && !isOverlapX(cx, aabb.width, (_d = line.gridItem) === null || _d === void 0 ? void 0 : _d.bound)) {
                    continue;
                }
                if (line.isCenter && isYCandidate(cy, line)) {
                    y = line.value - aabb.height * 0.5;
                    result.snapY = line;
                    break;
                }
                else if (isYCandidate(t, line)) {
                    y = line.value;
                    result.snapY = line;
                    break;
                }
                else if (isYCandidate(b, line)) {
                    y = line.value - aabb.height;
                    result.snapY = line;
                    break;
                }
            }
            result.snapX = enrichLine(result.snapX, grid);
            result.snapY = enrichLine(result.snapY, grid);
        }
        else if (snapMode === 'Grid') {
            x = core_1.MathHelper.roundToMultipleOf(x, MOVE_SNAP_GRID);
            y = core_1.MathHelper.roundToMultipleOf(y, MOVE_SNAP_GRID);
        }
        result.delta = new core_1.Vec2(x - aabb.x, y - aabb.y);
        return result;
    };
    SnapManager.prototype.getSnapLines = function (referenceTransform) {
        if (this.xLines && this.yLines && this.grid) {
            return { xLines: this.xLines, yLines: this.yLines, grid: this.grid };
        }
        var _a = this, currentDiagram = _a.currentDiagram, currentView = _a.currentView;
        var xLines = this.xLines = [];
        var yLines = this.yLines = [];
        if (!currentDiagram || !currentView || !referenceTransform) {
            // This should actually never happen, because we call prepare first.
            var grid_2 = this.grid = [];
            return { xLines: xLines, yLines: yLines, grid: grid_2 };
        }
        // Compute the bounding boxes once.
        var bounds = currentDiagram.items.values.filter(function (x) { return x.transform !== referenceTransform; }).map(function (x) { return x.bounds(currentDiagram).aabb; });
        var grid = this.grid = computeGrid(bounds);
        xLines.push({ value: 0 });
        xLines.push({ value: currentView.x });
        yLines.push({ value: 0 });
        yLines.push({ value: currentView.y });
        for (var _i = 0, bounds_1 = bounds; _i < bounds_1.length; _i++) {
            var bound = bounds_1[_i];
            xLines.push({ value: bound.left, side: 'Left' });
            xLines.push({ value: bound.right, side: 'Right' });
            xLines.push({ value: bound.cx, isCenter: true });
            yLines.push({ value: bound.top, side: 'Top' });
            yLines.push({ value: bound.bottom, side: 'Bottom' });
            yLines.push({ value: bound.cy, isCenter: true });
        }
        for (var _b = 0, grid_1 = grid; _b < grid_1.length; _b++) {
            var gridItem = grid_1[_b];
            var bound = gridItem.bound;
            if (gridItem.leftDistance != Number.MAX_VALUE) {
                xLines.push({
                    value: bound.right + gridItem.leftDistance,
                    gridSide: 'Right',
                    gridItem: gridItem
                });
            }
            if (gridItem.rightDistance != Number.MAX_VALUE) {
                xLines.push({
                    value: bound.left - gridItem.rightDistance,
                    gridSide: 'Left',
                    gridItem: gridItem
                });
            }
            if (gridItem.topDistance != Number.MAX_VALUE) {
                yLines.push({
                    value: bound.bottom + gridItem.topDistance,
                    gridSide: 'Bottom',
                    gridItem: gridItem
                });
            }
            if (gridItem.bottomDistance != Number.MAX_VALUE) {
                yLines.push({
                    value: bound.top - gridItem.bottomDistance,
                    gridSide: 'Top',
                    gridItem: gridItem
                });
            }
        }
        // Unset the values to reduce memory usage, when the diagram is not needed otherwise.
        this.currentDiagram = undefined;
        this.currentView = undefined;
        return { xLines: xLines, yLines: yLines, grid: grid };
    };
    SnapManager.prototype.getDebugLines = function (referenceTransform) {
        var _a = this.getSnapLines(referenceTransform), xLines = _a.xLines, yLines = _a.yLines;
        if (this.grid) {
            for (var _i = 0, xLines_3 = xLines; _i < xLines_3.length; _i++) {
                var line = xLines_3[_i];
                enrichLine(line, this.grid);
            }
            for (var _b = 0, yLines_3 = yLines; _b < yLines_3.length; _b++) {
                var line = yLines_3[_b];
                enrichLine(line, this.grid);
            }
        }
        return { xLines: xLines, yLines: yLines };
    };
    return SnapManager;
}());
exports.SnapManager = SnapManager;
function enrichLine(line, grid) {
    if (!line || !line.gridSide || !line.gridItem || line.positions) {
        return line;
    }
    var positions = [];
    // The initial bound to check.
    var current = line.gridItem;
    // Compute the vertical offsets once to save some compute time.
    var x = current.bound.cx;
    var y = current.bound.cy;
    switch (line.gridSide) {
        case 'Left': {
            var distance = current.rightDistance;
            // Compute the vertical offset only once to save some compute time.
            line.diff = { x: distance, y: 1 };
            // Travel to the left while the right are the same.
            while (current) {
                positions.push({ x: current.bound.left - distance, y: y });
                if (!areSimilar(current.rightDistance, distance)) {
                    break;
                }
                current = grid[current.rightIndex];
            }
            break;
        }
        case 'Right': {
            var distance = current.leftDistance;
            line.diff = { x: distance, y: 1 };
            // Travel to the left while the distances are the same.
            while (current) {
                positions.push({ x: current.bound.right, y: y });
                if (!areSimilar(current.leftDistance, distance)) {
                    break;
                }
                current = grid[current.leftIndex];
            }
            break;
        }
        case 'Top': {
            var distance = current.bottomDistance;
            // Compute the vertical offset only once to save some compute time.
            line.diff = { y: distance, x: 1 };
            // Travel to the bottom while the distances are the same.
            while (current) {
                positions.push({ y: current.bound.top - distance, x: x });
                if (!areSimilar(current.bottomDistance, distance)) {
                    break;
                }
                current = grid[current.bottomIndex];
            }
            break;
        }
        case 'Bottom': {
            var distance = current.topDistance;
            line.diff = { y: distance, x: 1 };
            // Travel to the top while the distances are the same.
            while (current) {
                positions.push({ y: current.bound.bottom, x: x });
                if (!areSimilar(current.topDistance, distance)) {
                    break;
                }
                current = grid[current.topIndex];
            }
            break;
        }
    }
    line.positions = positions;
    return line;
}
function computeGrid(bounds) {
    var grid = [];
    for (var _i = 0, bounds_2 = bounds; _i < bounds_2.length; _i++) {
        var bound = bounds_2[_i];
        // Search for the minimum distance to the left or right.
        var gridItem = {
            bound: bound,
            bottomDistance: Number.MAX_VALUE,
            bottomIndex: -1,
            leftDistance: Number.MAX_VALUE,
            leftIndex: -1,
            rightDistance: Number.MAX_VALUE,
            rightIndex: -1,
            topDistance: Number.MAX_VALUE,
            topIndex: -1
        };
        var j = -1;
        for (var _a = 0, bounds_3 = bounds; _a < bounds_3.length; _a++) {
            var other = bounds_3[_a];
            j++;
            if (other === bound) {
                continue;
            }
            if (isOverlapY(other.cy, other.height, bound)) {
                var dl = bound.left - other.right;
                // If the distance to the left is positive, the other element is on the left side.
                if (dl > 0 && dl < gridItem.leftDistance) {
                    gridItem.leftDistance = dl;
                    gridItem.leftIndex = j;
                }
                var dr = other.left - bound.right;
                // If the distance to the right is positive, the other element is on the right side.
                if (dr > 0 && dr < gridItem.rightDistance) {
                    gridItem.rightDistance = dr;
                    gridItem.rightIndex = j;
                }
            }
            if (isOverlapX(other.cx, other.width, bound)) {
                var dt = bound.top - other.bottom;
                // If the distance to the right is top, the other element is on the top side.
                if (dt > 0 && dt < gridItem.topDistance) {
                    gridItem.topDistance = dt;
                    gridItem.topIndex = j;
                }
                var db = other.top - bound.bottom;
                // If the distance to the right is bottom, the other element is on the bottom side.
                if (db > 0 && db < gridItem.bottomDistance) {
                    gridItem.bottomDistance = db;
                    gridItem.bottomIndex = j;
                }
            }
        }
        grid.push(gridItem);
    }
    return grid;
}
function isOverlapX(cx, width, rhs) {
    var minWidth = Math.min(width, rhs.width);
    return Math.abs(cx - rhs.cx) < minWidth * 0.5;
}
function isOverlapY(cy, height, rhs) {
    var minHeight = Math.min(height, rhs.height);
    return Math.abs(cy - rhs.cy) < minHeight * 0.5;
}
function areSimilar(lhs, rhs) {
    var d = Math.abs(lhs - rhs);
    return d < 1;
}
