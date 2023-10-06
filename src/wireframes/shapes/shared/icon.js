"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Icon = void 0;
var interface_1 = require("@app/wireframes/interface");
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = 0,
    _a[interface_1.DefaultAppearance.TEXT_DISABLED] = true,
    _a);
var Icon = /** @class */ (function () {
    function Icon() {
    }
    Icon.prototype.identifier = function () {
        return 'Icon';
    };
    Icon.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Icon.prototype.defaultSize = function () {
        return { x: 40, y: 40 };
    };
    Icon.prototype.create = function (source) {
        var _a;
        if (source.type == 'Icon') {
            var text = source.text, fontFamily = source.fontFamily;
            return {
                renderer: this.identifier(),
                appearance: (_a = {},
                    _a[interface_1.DefaultAppearance.TEXT] = text,
                    _a[interface_1.DefaultAppearance.ICON_FONT_FAMILY] = fontFamily,
                    _a)
            };
        }
        return null;
    };
    Icon.prototype.showInGallery = function () {
        return false;
    };
    Icon.prototype.render = function (ctx) {
        var fontSize = Math.min(ctx.rect.w, ctx.rect.h) - 10;
        var config = { fontSize: fontSize, text: ctx.shape.text, alignment: 'center' };
        ctx.renderer2.text(config, ctx.rect, function (p) {
            p.setForegroundColor(ctx.shape);
            p.setFontFamily(ctx.shape.getAppearance(interface_1.DefaultAppearance.ICON_FONT_FAMILY) || 'FontAwesome');
        });
    };
    return Icon;
}());
exports.Icon = Icon;
