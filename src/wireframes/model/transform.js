"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Transform = void 0;
/* eslint-disable no-multi-assign */
var core_1 = require("@app/core");
var EPSILON = 0.1;
var Transform = /** @class */ (function () {
    function Transform(position, size, rotation) {
        this.rotation = rotation;
        this.computed = { aabb: null };
        var hasRotation = Math.round(this.rotation.degree) > EPSILON;
        if (hasRotation) {
            this.size = size;
        }
        else {
            this.size = size.round();
        }
        if (hasRotation) {
            this.position = position;
        }
        else {
            var x = Math.floor(position.x);
            var y = Math.floor(position.y);
            if (this.size.x % 2 === 1) {
                x += 0.5;
            }
            if (this.size.y % 2 === 1) {
                y += 0.5;
            }
            this.position = new core_1.Vec2(x, y);
        }
        Object.freeze(this);
    }
    Object.defineProperty(Transform.prototype, "halfSize", {
        get: function () {
            return this.size.mul(0.5);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "left", {
        get: function () {
            return this.position.x - 0.5 * this.size.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "right", {
        get: function () {
            return this.position.x + 0.5 * this.size.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "top", {
        get: function () {
            return this.position.y - 0.5 * this.size.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "bottom", {
        get: function () {
            return this.position.y + 0.5 * this.size.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "aabb", {
        get: function () {
            var aabb = this.computed.aabb;
            if (aabb === null) {
                this.computed.aabb = aabb = core_1.Rect2.rotated(this.position.sub(this.size.mul(0.5)), this.size, this.rotation);
            }
            return aabb;
        },
        enumerable: false,
        configurable: true
    });
    Transform.fromRect = function (rect) {
        return new Transform(new core_1.Vec2(rect.cx, rect.cy), new core_1.Vec2(rect.w, rect.h), core_1.Rotation.ZERO);
    };
    Transform.fromRects = function (rects) {
        return Transform.fromRect(core_1.Rect2.fromRects(rects));
    };
    Transform.fromJS = function (js) {
        if (js.position) {
            return new Transform(new core_1.Vec2(js.position.x, js.position.y), new core_1.Vec2(js.size.x, js.size.y), core_1.Rotation.fromDegree(js.rotation));
        }
        else {
            return new Transform(new core_1.Vec2(js.x, js.y), new core_1.Vec2(js.w, js.h), core_1.Rotation.fromDegree(js.r));
        }
    };
    Transform.createFromTransformationsAndRotation = function (transforms, rotation) {
        var rect;
        if (rotation.equals(core_1.Rotation.ZERO)) {
            rect = core_1.Rect2.fromRects(transforms.map(function (x) { return x.aabb; }));
        }
        else {
            var negatedRotation_1 = rotation.negate();
            var median_1 = core_1.Vec2.median.apply(core_1.Vec2, transforms.map(function (t) { return t.position; }));
            var unrotatedTransforms = transforms.map(function (t) { return t.rotateAroundAnchor(median_1, negatedRotation_1); });
            var unrotatedBounds = core_1.Rect2.fromRects(unrotatedTransforms.map(function (x) { return x.aabb; }));
            var firstToCenterUnrotated = unrotatedTransforms[0].position.sub(unrotatedBounds.center);
            var firstToCenterRotated = core_1.Vec2.rotated(firstToCenterUnrotated, core_1.Vec2.ZERO, rotation);
            var center_1 = transforms[0].position.sub(firstToCenterRotated);
            var unrotatedTransformAabbs = transforms.map(function (t) { return t.rotateAroundAnchor(center_1, negatedRotation_1).aabb; });
            rect = core_1.Rect2.fromRects(unrotatedTransformAabbs);
        }
        return new Transform(new core_1.Vec2(rect.cx, rect.cy), new core_1.Vec2(rect.w, rect.h), rotation);
    };
    Transform.prototype.equals = function (t) {
        return Transform.equals(this, t);
    };
    Transform.equals = function (lhs, rhs) {
        return lhs.size.equals(rhs.size) && lhs.position.equals(rhs.position) && lhs.rotation.equals(rhs.rotation);
    };
    Transform.prototype.toString = function () {
        return "<position: ".concat(this.position.toString(), ", size: ").concat(this.size.toString(), ", rotation: ").concat(this.rotation.toString(), ">");
    };
    Transform.prototype.moveTo = function (position) {
        return new Transform(position, this.size, this.rotation);
    };
    Transform.prototype.moveBy = function (position) {
        return new Transform(this.position.add(position), this.size, this.rotation);
    };
    Transform.prototype.resizeTo = function (size) {
        return new Transform(this.position, size, this.rotation);
    };
    Transform.prototype.resizeBy = function (size) {
        return new Transform(this.position, this.size.add(size), this.rotation);
    };
    Transform.prototype.resizeAndMoveBy = function (size, position) {
        return new Transform(this.position.add(position), this.size.add(size), this.rotation);
    };
    Transform.prototype.rotateTo = function (rotation) {
        return new Transform(this.position, this.size, rotation);
    };
    Transform.prototype.rotateBy = function (rotation) {
        return new Transform(this.position, this.size, this.rotation.add(rotation));
    };
    Transform.prototype.rotateAroundAnchor = function (anchor, rotation) {
        var newPosition = core_1.Vec2.rotated(this.position, anchor, rotation);
        return new Transform(newPosition, this.size, this.rotation.add(rotation));
    };
    Transform.prototype.transformByBounds = function (oldBounds, newBounds, constraint) {
        // The ratio between new and old size.
        var ratioSize = newBounds.size.div(core_1.Vec2.max(core_1.Vec2.ONE, oldBounds.size));
        // Relative position to the old transform.
        var relativePosition = this.position.sub(oldBounds.position);
        // The center in the local coordination system of the transform.
        var localCenter = core_1.Vec2.rotated(relativePosition, core_1.Vec2.ZERO, oldBounds.rotation.negate());
        var newSize;
        var newLocalCenter;
        if (this.rotation.equals(oldBounds.rotation)) {
            var w = 0;
            var h = 0;
            var x = NaN;
            var y = NaN;
            if (constraint === null || constraint === void 0 ? void 0 : constraint.calculateSizeX()) {
                w = this.size.x;
            }
            else if (this.size.x === oldBounds.size.x) {
                w = newBounds.size.x;
            }
            else {
                w = Math.round(Math.max(0, this.size.x * ratioSize.x));
            }
            if (constraint === null || constraint === void 0 ? void 0 : constraint.calculateSizeY()) {
                h = this.size.y;
            }
            if (this.size.y === oldBounds.size.y) {
                h = newBounds.size.y;
            }
            else {
                h = Math.round(Math.max(0, this.size.y * ratioSize.y));
            }
            newSize = new core_1.Vec2(w, h);
            if (Math.abs(localCenter.x) < EPSILON) {
                // Center aligned.
                x = 0;
            }
            else if (Math.abs(this.right - oldBounds.right) < EPSILON) {
                // Right aligned.
                x = newBounds.size.x * 0.5 - w * 0.5;
            }
            else if (Math.abs(this.left - oldBounds.left) < EPSILON) {
                // Left aligned.
                x = -newBounds.size.x * 0.5 + w * 0.5;
            }
            else {
                x = localCenter.x * ratioSize.x;
            }
            if (Math.abs(localCenter.y) < EPSILON) {
                // Center aligned.
                y = 0;
            }
            else if (Math.abs(this.bottom - oldBounds.bottom) < EPSILON) {
                // Bottom aligned.
                y = newBounds.size.y * 0.5 - h * 0.5;
            }
            else if (Math.abs(this.top - oldBounds.top) < EPSILON) {
                // Top aligned.
                y = -newBounds.size.y * 0.5 + h * 0.5;
            }
            else {
                y = localCenter.y * ratioSize.y;
            }
            newLocalCenter = new core_1.Vec2(x, y);
        }
        else {
            var elementRot = this.rotation.sub(oldBounds.rotation);
            // Simplified cosinus and sinus that choose one side of the shape.
            var elementCos = elementRot.cos;
            var elementSin = elementRot.sin;
            var dx = ratioSize.x - 1;
            var dy = ratioSize.y - 1;
            // Compute the size relative to rotation of the delta rotation.
            var rotatedRatio = new core_1.Vec2(1 + (dx * elementCos) + (dy * elementSin), 1 + (dx * elementSin) + (dy * elementCos));
            var w = 0;
            var h = 0;
            if (constraint === null || constraint === void 0 ? void 0 : constraint.calculateSizeX()) {
                w = this.size.x;
            }
            else {
                w = Math.max(0, this.size.x * rotatedRatio.x);
            }
            if (constraint === null || constraint === void 0 ? void 0 : constraint.calculateSizeY()) {
                h = this.size.y;
            }
            else {
                h = Math.max(0, this.size.y * ratioSize.y);
            }
            newSize = new core_1.Vec2(w, h);
            // The new center in the coordination system of the transform.
            newLocalCenter = localCenter.mul(ratioSize);
        }
        // The rotated center.
        var newCenter = core_1.Vec2.rotated(newLocalCenter, core_1.Vec2.ZERO, newBounds.rotation);
        // Absolute position.
        var newPosition = newBounds.position.add(newCenter);
        var newRotation = this.rotation.add(newBounds.rotation).sub(oldBounds.rotation);
        return new Transform(newPosition, newSize, newRotation);
    };
    Transform.prototype.resizeTopLeft = function (newSize) {
        if (this.size.equals(newSize)) {
            return this;
        }
        var ratioSize = newSize.sub(this.size);
        var elementCos = Math.cos(this.rotation.radian);
        var elementSin = Math.sin(this.rotation.radian);
        var centerOffset = new core_1.Vec2(Math.round(0.5 * ((ratioSize.x * elementCos) + (ratioSize.y * elementSin))), Math.round(0.5 * ((ratioSize.x * elementSin) + (ratioSize.y * elementCos))));
        return this.resizeTo(newSize).moveBy(centerOffset);
    };
    Transform.prototype.toJS = function () {
        return {
            x: this.position.x,
            y: this.position.y,
            w: this.size.x,
            h: this.size.y,
            r: this.rotation.degree
        };
    };
    Transform.ZERO = new Transform(core_1.Vec2.ZERO, core_1.Vec2.ZERO, core_1.Rotation.ZERO);
    return Transform;
}());
exports.Transform = Transform;
