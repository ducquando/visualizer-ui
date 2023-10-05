"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Shape = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var SHAPE = 'SHAPE';
var SHAPE_RECTANGLE = 'Rectangle';
var SHAPE_ROUNDED_RECTANGLE = 'Rounded Rectangle';
var SHAPE_ELLIPSE = 'Ellipse';
var SHAPE_TRIANGLE = 'Triangle';
var SHAPE_RHOMBUS = 'Rhombus';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.TEXT] = 'Shape',
    _a[SHAPE] = SHAPE_RECTANGLE,
    _a);
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.identifier = function () {
        return 'Shape';
    };
    Shape.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Shape.prototype.defaultSize = function () {
        return { x: 100, y: 100 };
    };
    Shape.prototype.configurables = function (factory) {
        return [
            factory.selection(SHAPE, 'Shape', [
                SHAPE_RECTANGLE,
                SHAPE_ROUNDED_RECTANGLE,
                SHAPE_ELLIPSE,
                SHAPE_TRIANGLE,
                SHAPE_RHOMBUS,
            ]),
        ];
    };
    Shape.prototype.render = function (ctx) {
        this.createShape(ctx);
        this.createText(ctx);
    };
    Shape.prototype.createShape = function (ctx) {
        var _this = this;
        var b = ctx.rect;
        var shapeType = ctx.shape.getAppearance(SHAPE);
        if (shapeType === SHAPE_ROUNDED_RECTANGLE) {
            ctx.renderer2.rectangle(ctx.shape, 10, ctx.rect, function (p) {
                _this.styleShape(ctx, p);
            });
        }
        else if (shapeType === SHAPE_ELLIPSE) {
            ctx.renderer2.ellipse(ctx.shape, ctx.rect, function (p) {
                _this.styleShape(ctx, p);
            });
        }
        else if (shapeType === SHAPE_TRIANGLE) {
            var path = "M0 ".concat(b.bottom, " L").concat(b.cx, " ").concat(b.top, " L").concat(b.right, " ").concat(b.bottom, " z");
            ctx.renderer2.path(ctx.shape, path, function (p) {
                _this.styleShape(ctx, p);
            });
        }
        else if (shapeType === SHAPE_RHOMBUS) {
            var path = "M".concat(b.cx, " ").concat(b.top, " L").concat(b.right, " ").concat(b.cy, " L").concat(b.cx, " ").concat(b.bottom, " L").concat(b.left, " ").concat(b.cy, " z");
            ctx.renderer2.path(ctx.shape, path, function (p) {
                _this.styleShape(ctx, p);
            });
        }
        else {
            ctx.renderer2.rectangle(ctx.shape, 0, ctx.rect, function (p) {
                _this.styleShape(ctx, p);
            });
        }
    };
    Shape.prototype.styleShape = function (ctx, p) {
        p.setStrokeColor(ctx.shape);
        p.setBackgroundColor(ctx.shape);
    };
    Shape.prototype.createText = function (ctx) {
        ctx.renderer2.text(ctx.shape, ctx.rect.deflate(10, 10), function (p) {
            p.setForegroundColor(ctx.shape);
        });
    };
    return Shape;
}());
exports.Shape = Shape;
