"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Rect2 = void 0;
var types_1 = require("./types");
var vec2_1 = require("./vec2");
var Rect2 = /** @class */ (function () {
    function Rect2(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        Object.freeze(this);
    }
    Object.defineProperty(Rect2.prototype, "center", {
        get: function () {
            return new vec2_1.Vec2(this.x + (0.5 * this.w), this.y + (0.5 * this.h));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "area", {
        get: function () {
            return this.w * this.h;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "left", {
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "top", {
        get: function () {
            return this.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "right", {
        get: function () {
            return this.x + this.w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "bottom", {
        get: function () {
            return this.y + this.h;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "width", {
        get: function () {
            return this.w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "height", {
        get: function () {
            return this.h;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "cx", {
        get: function () {
            return this.x + (0.5 * this.w);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "cy", {
        get: function () {
            return this.y + (0.5 * this.h);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "isEmpty", {
        get: function () {
            return this.w < 0 || this.h < 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rect2.prototype, "isInfinite", {
        get: function () {
            return this.w === Number.POSITIVE_INFINITY || this.h === Number.POSITIVE_INFINITY;
        },
        enumerable: false,
        configurable: true
    });
    Rect2.fromCenter = function (center, radius) {
        return new Rect2(center.x - radius, center.y - radius, 2 * radius, 2 * radius);
    };
    Rect2.fromVecs = function (vecs) {
        if (!vecs || vecs.length === 0) {
            return Rect2.EMPTY;
        }
        var minX = Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var maxY = Number.MIN_VALUE;
        for (var _i = 0, vecs_1 = vecs; _i < vecs_1.length; _i++) {
            var v = vecs_1[_i];
            minX = Math.min(minX, v.x);
            minY = Math.min(minY, v.y);
            maxX = Math.max(maxX, v.x);
            maxY = Math.max(maxY, v.y);
        }
        return new Rect2(minX, minY, Math.max(0, maxX - minX), Math.max(0, maxY - minY));
    };
    Rect2.fromRects = function (rects) {
        if (!rects || rects.length === 0) {
            return Rect2.EMPTY;
        }
        var minX = Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var maxY = Number.MIN_VALUE;
        for (var _i = 0, rects_1 = rects; _i < rects_1.length; _i++) {
            var r = rects_1[_i];
            minX = Math.min(minX, r.left);
            minY = Math.min(minY, r.top);
            maxX = Math.max(maxX, r.right);
            maxY = Math.max(maxY, r.bottom);
        }
        return new Rect2(minX, minY, Math.max(0, maxX - minX), Math.max(0, maxY - minY));
    };
    Rect2.rotated = function (position, size, rotation) {
        var x = position.x;
        var y = position.y;
        var w = size.x;
        var h = size.y;
        if (Math.abs(rotation.sin) < Number.EPSILON) {
            return new Rect2(x, y, w, h);
        }
        var center = new vec2_1.Vec2(x + (w * 0.5), y + (h * 0.5));
        var lt = vec2_1.Vec2.rotated(new vec2_1.Vec2(x + 0, y + 0), center, rotation);
        var rt = vec2_1.Vec2.rotated(new vec2_1.Vec2(x + w, y + 0), center, rotation);
        var rb = vec2_1.Vec2.rotated(new vec2_1.Vec2(x + w, y + h), center, rotation);
        var lb = vec2_1.Vec2.rotated(new vec2_1.Vec2(x + 0, y + h), center, rotation);
        return Rect2.fromVecs([lb, lt, rb, rt]);
    };
    Rect2.prototype.equals = function (r) {
        return Rect2.equals(this, r);
    };
    Rect2.equals = function (lhs, rhs) {
        return lhs.x === rhs.x && lhs.y === rhs.y && lhs.w === rhs.w && lhs.h === rhs.h;
    };
    Rect2.prototype.toString = function () {
        return "(x: ".concat(this.x, ", y: ").concat(this.y, ", w: ").concat(this.width, ", h: ").concat(this.height, ")");
    };
    Rect2.prototype.inflateV = function (v) {
        return this.inflate(v.x, v.y);
    };
    Rect2.prototype.deflateV = function (v) {
        return this.deflate(v.x, v.y);
    };
    Rect2.prototype.inflate = function (w, h) {
        h = types_1.Types.isNumber(h) ? h : w;
        return new Rect2(this.x - w, this.y - h, this.w + (2 * w), this.h + (2 * h));
    };
    Rect2.prototype.deflate = function (w, h) {
        h = types_1.Types.isNumber(h) ? h : w;
        return new Rect2(this.x + w, this.y + h, Math.max(0, this.w - (2 * w)), Math.max(0, this.h - (2 * h)));
    };
    Rect2.prototype.contains = function (v) {
        if (v instanceof Rect2) {
            return v.x >= this.x && v.right <= this.right && v.y >= this.y && v.bottom <= this.bottom;
        }
        else {
            return v.x >= this.x && v.x - this.w <= this.x && v.y >= this.y && v.y - this.h <= this.y;
        }
    };
    Rect2.prototype.intersects = function (r) {
        return !this.isEmpty && !r.isEmpty && ((r.left <= this.right && r.right >= this.left && r.top <= this.bottom && r.bottom >= this.top) || this.isInfinite || r.isInfinite);
    };
    Rect2.prototype.intersect = function (r) {
        if (!this.intersects(r)) {
            return Rect2.EMPTY;
        }
        var minX = Math.max(this.x, r.x);
        var minY = Math.max(this.y, r.y);
        var w = Math.min(this.x + this.w, r.x + r.w) - minX;
        var h = Math.min(this.y + this.h, r.y + r.h) - minY;
        return new Rect2(minX, minY, Math.max(w, 0.0), Math.max(h, 0.0));
    };
    Rect2.ZERO = new Rect2(0, 0, 0, 0);
    Rect2.EMPTY = new Rect2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    Rect2.INFINITY = new Rect2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    return Rect2;
}());
exports.Rect2 = Rect2;
