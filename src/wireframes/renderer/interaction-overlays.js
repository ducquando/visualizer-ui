"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.InteractionOverlays = void 0;
var svg = require("@svgdotjs/svg.js");
var core_1 = require("@app/core");
var svg_renderer2_1 = require("../shapes/utils/svg-renderer2");
var COLOR_RED = core_1.Color.RED.toString();
var COLOR_BLUE = core_1.Color.RED.toString();
var COLOR_PURPLE = '#a020f0';
var MIN_VALUE = -1000;
var MAX_VALUE = 1000;
var InteractionOverlays = /** @class */ (function () {
    function InteractionOverlays(layer) {
        this.layer = layer;
        this.lines = [];
        this.labels = [];
        this.textWidthCache = {};
        this.indexLabels = 0;
        this.indexLines = 0;
        this.zoom = 1;
    }
    InteractionOverlays.prototype.setZoom = function (zoom) {
        this.zoom = zoom;
    };
    InteractionOverlays.prototype.showSnapAdorners = function (snapResult) {
        if (snapResult.snapX) {
            this.renderXLine(snapResult.snapX);
        }
        if (snapResult.snapY) {
            this.renderYLine(snapResult.snapY);
        }
    };
    InteractionOverlays.prototype.renderXLine = function (line) {
        var lineWidth = 1 / this.zoom;
        if (!line.positions) {
            // Use rounding at the propery side and a offset of 0.5 pixels to have clear lines.
            var x = getLinePosition(line, lineWidth);
            this.renderLine(x, MIN_VALUE, x, MAX_VALUE, getLineColor(line), lineWidth);
        }
        else if (line.diff) {
            var dx = line.diff.x;
            // The label dimensions needs to be calculated based on the zoom factor.
            var labelOffset = 6 / this.zoom;
            for (var _i = 0, _a = line.positions; _i < _a.length; _i++) {
                var position = _a[_i];
                var x = Math.round(position.x);
                var y = Math.round(position.y);
                this.renderLine(x, y, x + dx, y, COLOR_PURPLE, lineWidth);
                this.renderLabel(x + 0.5 * dx, y + labelOffset, line.diff.x.toString(), COLOR_PURPLE, 10, true, false, 2);
            }
        }
    };
    InteractionOverlays.prototype.renderYLine = function (line) {
        var lineWidth = 1 / this.zoom;
        if (!line.positions) {
            // Use rounding at the propery side and a offset of 0.5 pixels to have clear lines.
            var y = getLinePosition(line, lineWidth);
            this.renderLine(MIN_VALUE, y, MAX_VALUE, y, getLineColor(line), lineWidth);
        }
        else if (line.diff) {
            var dy = line.diff.y;
            var labelOffset = 6 / this.zoom;
            for (var _i = 0, _a = line.positions; _i < _a.length; _i++) {
                var position = _a[_i];
                var x = Math.round(position.x);
                var y = Math.round(position.y);
                this.renderLine(x, y, x, y + dy, COLOR_PURPLE, lineWidth);
                this.renderLabel(x + labelOffset, y + 0.5 * dy, line.diff.y.toString(), COLOR_PURPLE, 10, false, true, 2);
            }
        }
    };
    InteractionOverlays.prototype.showInfo = function (transform, text) {
        var aabb = transform.aabb;
        this.renderLabel(aabb.right + 4, aabb.bottom + 24, text, '#000');
    };
    InteractionOverlays.prototype.renderLine = function (x1, y1, x2, y2, color, width) {
        var line = this.lines[this.indexLines];
        // Reuse the rect and text if it alreadx exists to avoid creating unnecessary DOM elements.
        if (!line) {
            line = this.layer.line();
            this.lines.push(line);
        }
        else {
            line.show();
        }
        line.plot(x1, y1, x2, y2).stroke({ width: width, color: color });
        this.indexLines++;
    };
    InteractionOverlays.prototype.renderLabel = function (x, y, text, color, fontSize, centerX, centerY, padding) {
        if (fontSize === void 0) { fontSize = 16; }
        if (centerX === void 0) { centerX = false; }
        if (centerY === void 0) { centerY = false; }
        if (padding === void 0) { padding = 4; }
        var labelGroup = this.labels[this.indexLabels];
        var labelRect;
        var labelText;
        // Reuse the rect and text if it alreadx exists to avoid creating unnecessary DOM elements.
        if (!labelGroup) {
            labelGroup = this.layer.group();
            labelRect = new svg.Rect().addTo(labelGroup);
            labelText = core_1.SVGHelper.createText(text, fontSize, 'center', 'middle').attr('color', '#fff').addTo(labelGroup);
            this.labels.push(labelGroup);
        }
        else {
            labelGroup.show();
            labelRect = labelGroup.children().at(0);
            labelText = labelGroup.children().at(1);
        }
        var characterWidthKey = fontSize.toString();
        var characterWidthValue = this.textWidthCache[characterWidthKey];
        if (!characterWidthValue) {
            // We use a monospace, so we can calculate the text width ourself, which saves a lot of performance.
            characterWidthValue = svg_renderer2_1.SVGRenderer2.INSTANCE.getTextWidth('a', fontSize, 'monospace');
            this.textWidthCache[characterWidthKey] = characterWidthValue;
        }
        // The width is just calculated by the width of a single character (therefore monospace) and the total length.
        var w = characterWidthValue * text.length / this.zoom;
        // We assume a line height of 1.5 here.
        var h = fontSize * 1.5 / this.zoom;
        if (centerX) {
            x -= 0.5 * w;
        }
        if (centerY) {
            y -= 0.5 * h;
        }
        var labelContent = labelText.node.children[0];
        labelContent.style.fontSize = (0, core_1.sizeInPx)(fontSize / this.zoom);
        labelContent.style.fontFamily = 'monospace';
        labelContent.textContent = text;
        labelRect.fill(color);
        // The label dimensions needs to be calculated based on the zoom factor.
        padding /= this.zoom;
        core_1.SVGHelper.transformBy(labelGroup, {
            x: x - padding,
            y: y - padding
        });
        core_1.SVGHelper.transformBy(labelText, {
            x: padding,
            y: padding,
            w: w,
            h: h
        });
        core_1.SVGHelper.transformBy(labelRect, {
            w: w + 2 * padding,
            h: h + 2 * padding
        });
        // Increment by one because we create one group per label.
        this.indexLabels += 1;
    };
    InteractionOverlays.prototype.reset = function () {
        this.indexLabels = 0;
        this.indexLines = 0;
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            line.hide();
        }
        for (var _b = 0, _c = this.labels; _b < _c.length; _b++) {
            var label = _c[_b];
            label.hide();
        }
    };
    return InteractionOverlays;
}());
exports.InteractionOverlays = InteractionOverlays;
function getLineColor(line) {
    return line.isCenter ? COLOR_BLUE : COLOR_RED;
}
function getLinePosition(line, lineWidth) {
    var isLeftOrTop = line.side === 'Left' || line.side === 'Top';
    return Math.floor(line.value) + (isLeftOrTop ? -0.5 : 0.5) * lineWidth;
}
