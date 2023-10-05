"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Raster = void 0;
var interface_1 = require("@app/wireframes/interface");
var MAX_IMAGE_SIZE = 300;
var SOURCE = 'SOURCE';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var Raster = /** @class */ (function () {
    function Raster() {
    }
    Raster.prototype.identifier = function () {
        return 'Raster';
    };
    Raster.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Raster.prototype.defaultSize = function () {
        return { x: 80, y: 30 };
    };
    Raster.prototype.create = function (source) {
        var _a;
        if (source.type == 'Image') {
            var _b = source.image, w = _b.width, h = _b.height, data = _b.source;
            if (w > MAX_IMAGE_SIZE || h > MAX_IMAGE_SIZE) {
                var ratio = w / h;
                if (ratio > 1) {
                    w = MAX_IMAGE_SIZE;
                    h = MAX_IMAGE_SIZE / ratio;
                }
                else {
                    h = MAX_IMAGE_SIZE;
                    w = MAX_IMAGE_SIZE * ratio;
                }
            }
            return {
                renderer: this.identifier(),
                size: {
                    x: w,
                    y: h
                },
                appearance: (_a = {},
                    _a[SOURCE] = data,
                    _a)
            };
        }
        return null;
    };
    Raster.prototype.showInGallery = function () {
        return false;
    };
    Raster.prototype.render = function (ctx) {
        ctx.renderer2.raster(ctx.shape.getAppearance(SOURCE), ctx.rect, true);
    };
    return Raster;
}());
exports.Raster = Raster;
