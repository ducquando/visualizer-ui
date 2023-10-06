"use strict";
/*
 * mydraft.cc
 *
 * Author: Do Duc Quan
 * Date: 26/09/2023
 * Implemented based on ./image.ts
*/
var _a;
exports.__esModule = true;
exports.Arrow = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var IMAGE_URL = 'URL';
var IMAGE_ASPECT_RATIO = 'ASPECT_RATIO';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0x000000,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a[IMAGE_ASPECT_RATIO] = true,
    _a[IMAGE_URL] = '',
    _a);
var Arrow = /** @class */ (function () {
    function Arrow() {
    }
    Arrow.prototype.identifier = function () {
        return 'Arrow';
    };
    Arrow.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Arrow.prototype.defaultSize = function () {
        return { x: 60, y: 40 };
    };
    Arrow.prototype.configurables = function (factory) {
        return [
            factory.text(IMAGE_URL, 'Url'),
            factory.toggle(IMAGE_ASPECT_RATIO, 'Preserve aspect ratio'),
        ];
    };
    Arrow.prototype.render = function (ctx) {
        var url = ctx.shape.getAppearance(IMAGE_URL);
        if (url) {
            var aspectRatio = ctx.shape.getAppearance(IMAGE_ASPECT_RATIO);
            ctx.renderer2.raster(url, ctx.rect, aspectRatio);
        }
        else {
            this.createArrow(ctx);
        }
    };
    Arrow.prototype.createArrow = function (ctx) {
        var path = 'm 56.9312 22.2158 l -14.3062 -17.6095 l 0 11.725 l -37.625 0 l 0 11.55 l 37.625 0 l 0 11.375 z';
        ctx.renderer2.path(ctx.shape, path, function (p) {
            p.setBackgroundColor(ctx.shape);
        });
    };
    return Arrow;
}());
exports.Arrow = Arrow;
