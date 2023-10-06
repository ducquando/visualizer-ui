"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Image = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var IMAGE_URL = 'URL';
var IMAGE_ASPECT_RATIO = 'ASPECT_RATIO';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a[IMAGE_ASPECT_RATIO] = true,
    _a[IMAGE_URL] = '',
    _a);
var Image = /** @class */ (function () {
    function Image() {
    }
    Image.prototype.identifier = function () {
        return 'Image';
    };
    Image.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Image.prototype.defaultSize = function () {
        return { x: 100, y: 100 };
    };
    Image.prototype.configurables = function (factory) {
        return [
            factory.text(IMAGE_URL, 'Url'),
            factory.toggle(IMAGE_ASPECT_RATIO, 'Preserve aspect ratio'),
        ];
    };
    Image.prototype.render = function (ctx) {
        var url = ctx.shape.getAppearance(IMAGE_URL);
        if (url) {
            var aspectRatio = ctx.shape.getAppearance(IMAGE_ASPECT_RATIO);
            ctx.renderer2.raster(url, ctx.rect, aspectRatio);
        }
        else {
            this.createBorder(ctx);
            this.createCross(ctx);
        }
    };
    Image.prototype.createCross = function (ctx) {
        var l = ctx.rect.left + 0.5;
        var r = ctx.rect.right - 0.5;
        var t = ctx.rect.top + 0.5;
        var b = ctx.rect.bottom - 0.5;
        var path = "M".concat(l, ",").concat(t, " L").concat(r, ",").concat(b, " M").concat(l, ",").concat(b, " L").concat(r, ",").concat(t);
        ctx.renderer2.path(ctx.shape, path, function (p) {
            p.setStrokeColor(ctx.shape);
            p.setStrokeStyle('butt', 'butt');
        });
    };
    Image.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        });
    };
    return Image;
}());
exports.Image = Image;
