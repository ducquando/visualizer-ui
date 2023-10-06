"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Comment = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = 1,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'Lorem ipsum dolor sit amet, alii rebum postea eam ex. Et mei laoreet officiis, summo sensibus id mei.',
    _a);
var Comment = /** @class */ (function () {
    function Comment() {
    }
    Comment.prototype.identifier = function () {
        return 'Comment';
    };
    Comment.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Comment.prototype.defaultSize = function () {
        return { x: 180, y: 170 };
    };
    Comment.prototype.render = function (ctx) {
        var corner = Math.min(14.5, ctx.rect.width, ctx.rect.height) - 0.5;
        this.createBorder(ctx, corner);
        this.createText(ctx);
    };
    Comment.prototype.createBorder = function (ctx, c) {
        var outerBounds = ctx.renderer2.getOuterBounds(ctx.shape, ctx.rect);
        var l = outerBounds.left;
        var r = outerBounds.right;
        var t = outerBounds.top;
        var b = outerBounds.bottom;
        var path = "M".concat(l + c, ",").concat(t, " L").concat(r, ",").concat(t, " L").concat(r, ",").concat(b, " L").concat(l, ",").concat(b, " L").concat(l, ",").concat(t + c, " L").concat(l + c, ",").concat(t, " z M").concat(l + c, ",").concat(t, " L").concat(l + c, ",").concat(t + c, " L").concat(l, ",").concat(t + c);
        ctx.renderer2.path(ctx.shape, path, function (p) {
            p.setBackgroundColor(0xfff9b7);
            p.setStrokeColor(0);
            p.setStrokeStyle('round', 'round');
        });
    };
    Comment.prototype.createText = function (ctx) {
        ctx.renderer2.textMultiline(ctx.shape, ctx.rect.deflate(10, 20));
    };
    return Comment;
}());
exports.Comment = Comment;
