"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Tablet = void 0;
var interface_1 = require("@app/wireframes/interface");
var OFFSET = { left: 15, top: 50, right: 15, bottom: 25 };
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var Tablet = /** @class */ (function () {
    function Tablet() {
    }
    Tablet.prototype.identifier = function () {
        return 'Tablet';
    };
    Tablet.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Tablet.prototype.defaultSize = function () {
        return { x: 640, y: 480 };
    };
    Tablet.prototype.previewSize = function () {
        return { x: 320, y: 240 };
    };
    Tablet.prototype.previewOffset = function () {
        return OFFSET;
    };
    Tablet.prototype.render = function (ctx) {
        this.createHull(ctx);
        if (ctx.rect.width >= 50 && ctx.rect.height > 200) {
            this.createScreen(ctx);
            this.createSpeaker(ctx);
        }
    };
    Tablet.prototype.createHull = function (ctx) {
        var hullRect = new interface_1.Rect2(-OFFSET.left, -OFFSET.top, ctx.rect.width + OFFSET.left + OFFSET.right, ctx.rect.height + OFFSET.top + OFFSET.bottom);
        ctx.renderer2.rectangle(0, 20, hullRect, function (p) {
            p.setBackgroundColor(0);
        });
    };
    Tablet.prototype.createScreen = function (ctx) {
        ctx.renderer2.rectangle(0, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
        });
    };
    Tablet.prototype.createSpeaker = function (ctx) {
        var speakerRect = new interface_1.Rect2((ctx.rect.width - 50) * 0.5, -25, 50, 4);
        ctx.renderer2.rectangle(0, 2, speakerRect, function (p) {
            p.setBackgroundColor(0x333333);
        });
    };
    return Tablet;
}());
exports.Tablet = Tablet;
