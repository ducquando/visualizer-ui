"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Phone = void 0;
var interface_1 = require("@app/wireframes/interface");
var OFFSET = { left: 15, top: 60, right: 15, bottom: 20 };
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var Phone = /** @class */ (function () {
    function Phone() {
    }
    Phone.prototype.identifier = function () {
        return 'Phone';
    };
    Phone.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Phone.prototype.defaultSize = function () {
        return { x: 360, y: 640 };
    };
    Phone.prototype.previewSize = function () {
        return { x: 180, y: 340 };
    };
    Phone.prototype.previewOffset = function () {
        return OFFSET;
    };
    Phone.prototype.render = function (ctx) {
        this.createHull(ctx);
        if (ctx.rect.width >= 50 && ctx.rect.height > 200) {
            this.createScreen(ctx);
            this.createSpeaker(ctx);
        }
    };
    Phone.prototype.createHull = function (ctx) {
        var hullRect = new interface_1.Rect2(-OFFSET.left, -OFFSET.top, ctx.rect.width + OFFSET.left + OFFSET.right, ctx.rect.height + OFFSET.top + OFFSET.bottom);
        ctx.renderer2.rectangle(0, 20, hullRect, function (p) {
            p.setBackgroundColor(0);
        });
    };
    Phone.prototype.createScreen = function (ctx) {
        ctx.renderer2.rectangle(0, 0, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
        });
    };
    Phone.prototype.createSpeaker = function (ctx) {
        var speakerRect = new interface_1.Rect2((ctx.rect.width - 50) * 0.5, -35, 50, 4);
        ctx.renderer2.rectangle(0, 2, speakerRect, function (p) {
            p.setBackgroundColor(0x333333);
        });
    };
    return Phone;
}());
exports.Phone = Phone;
