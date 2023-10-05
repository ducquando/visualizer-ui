"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.TextSizeConstraint = void 0;
var core_1 = require("@app/core");
var TextSizeConstraint = /** @class */ (function () {
    function TextSizeConstraint(renderer, paddingX, paddingY, lineHeight, resizeWidth, minWidth) {
        if (paddingX === void 0) { paddingX = 0; }
        if (paddingY === void 0) { paddingY = 0; }
        if (lineHeight === void 0) { lineHeight = 1.2; }
        if (resizeWidth === void 0) { resizeWidth = false; }
        if (minWidth === void 0) { minWidth = 0; }
        this.renderer = renderer;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        this.lineHeight = lineHeight;
        this.resizeWidth = resizeWidth;
        this.minWidth = minWidth;
    }
    TextSizeConstraint.prototype.updateSize = function (shape, size, prev) {
        var fontSize = shape.fontSize;
        var fontFamily = shape.fontFamily;
        var finalWidth = size.x;
        var text = shape.text;
        var prevText = '';
        var prevFontSize = 0;
        var prevFontFamily = '';
        if (prev) {
            prevText = prev.text;
            prevFontSize = prev.fontSize;
            prevFontFamily = prev.fontFamily;
        }
        if (prevText !== text || prevFontSize !== fontSize || prevFontFamily !== fontFamily) {
            var textWidth = this.renderer.getTextWidth(text, fontSize, fontFamily);
            if (textWidth) {
                textWidth += 2 * this.paddingX;
                if (finalWidth < textWidth || !this.resizeWidth) {
                    finalWidth = textWidth;
                }
                finalWidth = Math.max(this.minWidth, finalWidth);
            }
        }
        return new core_1.Vec2(finalWidth, fontSize * this.lineHeight + this.paddingY * 2).roundToMultipleOfTwo();
    };
    TextSizeConstraint.prototype.calculateSizeX = function () {
        return !this.resizeWidth;
    };
    TextSizeConstraint.prototype.calculateSizeY = function () {
        return true;
    };
    return TextSizeConstraint;
}());
exports.TextSizeConstraint = TextSizeConstraint;
