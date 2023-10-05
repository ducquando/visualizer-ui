"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Tabs = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var TAB_COLOR = 'TAB_COLOR';
var TAB_ALIGNMENT = 'TAB_ALIGNMENT';
var TAB_ALIGNMENT_LEFT = 'Left';
var TAB_ALIGNMENT_RIGHT = 'Right';
var TAB_POSITION = 'TAB_POSITION';
var TAB_POSITION_TOP = 'Top';
var TAB_POSITION_BOTTOM = 'Bottom';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = 0xffffff,
    _a[interface_1.DefaultAppearance.TEXT] = 'left,middle*,right',
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[TAB_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[TAB_ALIGNMENT] = TAB_ALIGNMENT_LEFT,
    _a[TAB_POSITION] = TAB_POSITION_TOP,
    _a);
var Tabs = /** @class */ (function () {
    function Tabs() {
    }
    Tabs.prototype.identifier = function () {
        return 'Tabs';
    };
    Tabs.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Tabs.prototype.defaultSize = function () {
        return { x: 200, y: 150 };
    };
    Tabs.prototype.configurables = function (factory) {
        return [
            factory.selection(TAB_ALIGNMENT, 'Tab Alignment', [
                TAB_ALIGNMENT_LEFT,
                TAB_ALIGNMENT_RIGHT,
            ]),
            factory.selection(TAB_POSITION, 'Tab Position', [
                TAB_POSITION_TOP,
                TAB_POSITION_BOTTOM,
            ]),
            factory.color(TAB_COLOR, 'Tab Color'),
        ];
    };
    Tabs.prototype.render = function (ctx) {
        var strokeThickness = ctx.shape.strokeThickness;
        var isBottom = ctx.shape.getAppearance(TAB_POSITION) === TAB_POSITION_BOTTOM;
        var fontSize = ctx.shape.fontSize;
        var fontFamily = ctx.shape.fontFamily;
        var parts = this.parseText(ctx, fontFamily, fontSize, strokeThickness);
        var padding = fontSize * 0.5;
        var heightTotal = ctx.rect.height;
        var heightHeader = fontSize + 2 * padding;
        this.createHeader(ctx, parts, heightHeader, isBottom);
        if (heightTotal > heightHeader) {
            this.createContent(ctx, heightHeader, strokeThickness, isBottom);
        }
    };
    Tabs.prototype.createContent = function (ctx, heightHeader, strokeThickness, isBottom) {
        var w = ctx.rect.width;
        var h = ctx.rect.height - heightHeader + strokeThickness;
        var y = isBottom ? 0 : heightHeader - strokeThickness;
        var bounds = new interface_1.Rect2(0, y, w, h);
        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, bounds, function (p) {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        });
    };
    Tabs.prototype.createHeader = function (ctx, parts, heightHeader, isBottom) {
        var _this = this;
        var h = heightHeader;
        var y = isBottom ? ctx.rect.height - heightHeader : 0;
        var tabColor = interface_1.Color.fromValue(ctx.shape.getAppearance(TAB_COLOR));
        var _loop_1 = function (part) {
            var bounds = new interface_1.Rect2(part.x, y, part.width, h);
            if (isBottom) {
                // Bar button
                ctx.renderer2.roundedRectangleBottom(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, bounds, function (p) {
                    _this.stylePart(part, ctx, tabColor, p);
                });
            }
            else {
                // Bar button
                ctx.renderer2.roundedRectangleTop(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, bounds, function (p) {
                    _this.stylePart(part, ctx, tabColor, p);
                });
            }
            // Bar button text.
            ctx.renderer2.text(ctx.shape, bounds.deflate(4), function (p) {
                p.setForegroundColor(ctx.shape);
                p.setText(part.text);
            });
        };
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            _loop_1(part);
        }
    };
    Tabs.prototype.stylePart = function (part, ctx, tabColor, p) {
        if (part.selected) {
            p.setBackgroundColor(ctx.shape);
        }
        else {
            p.setBackgroundColor(tabColor);
        }
        p.setStrokeColor(ctx.shape);
    };
    Tabs.prototype.parseText = function (ctx, fontFamily, fontSize, strokeThickness) {
        var key = "".concat(ctx.shape.text, "_").concat(fontFamily, "_").concat(fontSize, "_").concat(strokeThickness);
        var result = ctx.shape.renderCache['PARSED'];
        if (!result || result.key !== key) {
            var w = ctx.rect.width - 2 * PADDING;
            var parsed = [];
            var x = 0;
            for (var _i = 0, _a = ctx.shape.text.split(','); _i < _a.length; _i++) {
                var text = _a[_i];
                var selected = text.endsWith('*');
                if (selected) {
                    text = text.substring(0, text.length - 1).trim();
                }
                var width = ctx.renderer2.getTextWidth(text, fontSize, fontFamily) + fontSize;
                if (x + width > w) {
                    break;
                }
                parsed.push({ text: text, selected: selected, x: x, width: width });
                x += width - strokeThickness;
            }
            var isRight = ctx.shape.getAppearance(TAB_ALIGNMENT) === TAB_ALIGNMENT_RIGHT;
            var offset = PADDING;
            if (isRight) {
                var last = parsed[parsed.length - 1];
                offset += (w - (last.x + last.width));
            }
            for (var _b = 0, parsed_1 = parsed; _b < parsed_1.length; _b++) {
                var part = parsed_1[_b];
                part.x += offset;
            }
            result = { parsed: parsed, key: key };
            ctx.shape.renderCache['PARSED'] = result;
        }
        return result.parsed;
    };
    return Tabs;
}());
exports.Tabs = Tabs;
var PADDING = 20;
