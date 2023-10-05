"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.List = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var ACCENT_COLOR = 'ACCENT_COLOR';
var DEFAULT_APPEARANCE = (_a = {},
    _a[ACCENT_COLOR] = 0x2171b5,
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xffffff,
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'left',
    _a[interface_1.DefaultAppearance.TEXT] = 'item1\nitem2\nitem3*\nitem4',
    _a);
var List = /** @class */ (function () {
    function List() {
    }
    List.prototype.identifier = function () {
        return 'List';
    };
    List.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    List.prototype.defaultSize = function () {
        return { x: 120, y: 130 };
    };
    List.prototype.configurables = function (factory) {
        return [
            factory.color(ACCENT_COLOR, 'Accent Color'),
        ];
    };
    List.prototype.render = function (ctx) {
        var w = ctx.rect.width;
        var h = ctx.rect.height;
        this.createBorder(ctx);
        var parts = this.parseText(ctx.shape);
        var y = _theme_1.CommonTheme.CONTROL_BORDER_RADIUS;
        var itemsHeight = h - 2 * _theme_1.CommonTheme.CONTROL_BORDER_RADIUS;
        var itemHeight = itemsHeight / parts.length;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            var rect = new interface_1.Rect2(0, y, w, itemHeight);
            if (part.selected) {
                this.createSelection(ctx, rect);
                this.createText(ctx, rect.deflate(10, 0), 0xffffff, part.text);
            }
            else {
                this.createText(ctx, rect.deflate(10, 0), ctx.shape, part.text);
            }
            y += itemHeight;
        }
    };
    List.prototype.createSelection = function (ctx, rect) {
        ctx.renderer2.rectangle(ctx.shape, 0, rect, function (p) {
            p.setBackgroundColor(ctx.shape.getAppearance(ACCENT_COLOR));
            p.setStrokeColor(ctx.shape.getAppearance(ACCENT_COLOR));
        });
    };
    List.prototype.createText = function (ctx, rect, color, text) {
        ctx.renderer2.text(ctx.shape, rect, function (p) {
            p.setForegroundColor(color);
            p.setText(text);
        });
    };
    List.prototype.createBorder = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, ctx.rect, function (p) {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
    };
    List.prototype.parseText = function (shape) {
        var key = shape.text;
        var result = shape.renderCache['PARSED'];
        if (!result || result.key !== key) {
            var parts = key.split('\n');
            var parsed = parts.map(function (t) {
                var selected = t.endsWith('*');
                if (selected) {
                    return { text: t.substring(0, t.length - 1).trim(), selected: selected };
                }
                else {
                    return { text: t, selected: false };
                }
            });
            result = { parsed: parsed, key: key };
            shape.renderCache['PARSED'] = result;
        }
        return result.parsed;
    };
    return List;
}());
exports.List = List;
