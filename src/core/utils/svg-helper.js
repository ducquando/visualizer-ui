"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.SVGHelper = void 0;
var svg = require("@svgdotjs/svg.js");
var color_1 = require("./color");
var react_1 = require("./react");
var rect2_1 = require("./rect2");
var types_1 = require("./types");
var vec2_1 = require("./vec2");
var SVGHelper;
(function (SVGHelper) {
    function roundedRectangleRight(rectangle, radius) {
        if (radius === void 0) { radius = 10; }
        var rad = Math.min(radius, rectangle.width * 0.5, rectangle.height * 0.5);
        var t = rectangle.top;
        var l = rectangle.left;
        var r = rectangle.right;
        var b = rectangle.bottom;
        return "M".concat(l, ",").concat(t, " L").concat(r - rad, ",").concat(t, " a").concat(rad, ",").concat(rad, " 0 0 1 ").concat(rad, ",").concat(rad, " L").concat(r, ",").concat(b - rad, " a").concat(rad, ",").concat(rad, " 0 0 1 -").concat(rad, ",").concat(rad, " L").concat(l, ",").concat(b, " z");
    }
    SVGHelper.roundedRectangleRight = roundedRectangleRight;
    function roundedRectangleLeft(rectangle, radius) {
        if (radius === void 0) { radius = 10; }
        var rad = Math.min(radius, rectangle.width * 0.5, rectangle.height * 0.5);
        var t = rectangle.top;
        var l = rectangle.left;
        var r = rectangle.right;
        var b = rectangle.bottom;
        return "M".concat(r, ",").concat(b, " L").concat(l + rad, ",").concat(b, " a").concat(rad, ",").concat(rad, " 0 0 1 -").concat(rad, ",-").concat(rad, " L").concat(l, ",").concat(t + rad, " a").concat(rad, ",").concat(rad, " 0 0 1 ").concat(rad, ",-").concat(rad, " L").concat(r, ",").concat(t, " z");
    }
    SVGHelper.roundedRectangleLeft = roundedRectangleLeft;
    function roundedRectangleTop(rectangle, radius) {
        if (radius === void 0) { radius = 10; }
        var rad = Math.min(radius, rectangle.width * 0.5, rectangle.height * 0.5);
        var t = rectangle.top;
        var l = rectangle.left;
        var r = rectangle.right;
        var b = rectangle.bottom;
        return "M".concat(l, ",").concat(b, " L").concat(l, ",").concat(t + rad, " a").concat(rad, ",").concat(rad, " 0 0 1 ").concat(rad, ",-").concat(rad, " L").concat(r - rad, ",").concat(t, " a").concat(rad, ",").concat(rad, " 0 0 1 ").concat(rad, ",").concat(rad, " L").concat(r, ",").concat(b, " z");
    }
    SVGHelper.roundedRectangleTop = roundedRectangleTop;
    function roundedRectangleBottom(rectangle, radius) {
        if (radius === void 0) { radius = 10; }
        var rad = Math.min(radius, rectangle.width * 0.5, rectangle.height * 0.5);
        var t = rectangle.top;
        var l = rectangle.left;
        var r = rectangle.right;
        var b = rectangle.bottom;
        return "M".concat(r, ",").concat(t, " L").concat(r, ",").concat(b - rad, " a").concat(rad, ",").concat(rad, " 0 0 1 -").concat(rad, ",").concat(rad, " L").concat(l + rad, ",").concat(b, " a").concat(rad, ",").concat(rad, " 0 0 1 -").concat(rad, ",-").concat(rad, " L").concat(l, ",").concat(t, "z");
    }
    SVGHelper.roundedRectangleBottom = roundedRectangleBottom;
    function createText(text, fontSize, alignment, verticalAlign) {
        fontSize = fontSize || 10;
        var element = new svg.ForeignObject();
        var div = document.createElement('div');
        div.className = 'no-select';
        div.style.textAlign = alignment || 'center';
        div.style.fontFamily = 'inherit';
        div.style.fontSize = fontSize ? (0, react_1.sizeInPx)(fontSize) : '10px';
        div.style.overflow = 'hidden';
        div.style.verticalAlign = verticalAlign || 'middle';
        div.textContent = text || null;
        element.node.appendChild(div);
        return element;
    }
    SVGHelper.createText = createText;
    function transformByRect(element, rect, adjust, move) {
        if (adjust === void 0) { adjust = true; }
        if (move === void 0) { move = false; }
        return transformBy(element, {
            x: rect.x,
            y: rect.y,
            w: rect.width,
            h: rect.height
        }, adjust, move);
    }
    SVGHelper.transformByRect = transformByRect;
    function transformBy(element, t, adjust, move) {
        if (adjust === void 0) { adjust = true; }
        if (move === void 0) { move = false; }
        var x = t.x || 0;
        var y = t.y || 0;
        var w = t.w || 0;
        var h = t.h || 0;
        var r = t.rotation || 0;
        if (adjust) {
            w = Math.round(w);
            h = Math.round(h);
        }
        if (adjust && !t.rotation) {
            x = Math.round(x);
            y = Math.round(y);
        }
        var matrix = new svg.Matrix();
        if (r !== 0) {
            matrix.rotateO(r, t.rx || (x + 0.5 * w), t.ry || (y + 0.5 * h));
        }
        if (move) {
            element.matrix(matrix);
            if (x !== 0 || y !== 0) {
                element.move(x, y);
            }
        }
        else {
            if (x !== 0 || y !== 0) {
                matrix.translateO(x, y);
            }
            element.matrix(matrix);
        }
        if (w > 0 && h > 0) {
            if (element.node.nodeName === 'foreignObject') {
                var text = element.node.children[0];
                if (text.style.verticalAlign === 'middle') {
                    text.style.lineHeight = (0, react_1.sizeInPx)(h);
                }
                else {
                    text.style.lineHeight = '1.5';
                }
                text.style.height = (0, react_1.sizeInPx)(h);
            }
            if (element.node.nodeName === 'ellipse') {
                fastSetAttribute(element.node, 'cx', w * 0.5);
                fastSetAttribute(element.node, 'cy', h * 0.5);
                fastSetAttribute(element.node, 'rx', w * 0.5);
                fastSetAttribute(element.node, 'ry', h * 0.5);
            }
            else {
                setSize(element, w, h);
            }
        }
        return element;
    }
    SVGHelper.transformBy = transformBy;
    function point2Vec(point) {
        return new vec2_1.Vec2(point.x, point.y);
    }
    SVGHelper.point2Vec = point2Vec;
    function box2Rect(box) {
        return new rect2_1.Rect2(box.x, box.y, box.w, box.h);
    }
    SVGHelper.box2Rect = box2Rect;
    function setPosition(element, x, y) {
        element.matrix(new svg.Matrix().translateO(x, y));
    }
    SVGHelper.setPosition = setPosition;
    function setSize(element, width, height) {
        fastSetAttribute(element.node, 'width', width);
        fastSetAttribute(element.node, 'height', height);
    }
    SVGHelper.setSize = setSize;
    function fastSetAttribute(element, name, value) {
        var attrs = element['__attrs'] || (element['__attrs'] = {});
        if (attrs[name] === value) {
            return;
        }
        attrs[name] = value;
        setAttribute(element, name, value);
    }
    SVGHelper.fastSetAttribute = fastSetAttribute;
    function setAttribute(element, name, value) {
        if (value === null) {
            element.removeAttribute(name);
            return;
        }
        var type = typeof value;
        switch (type) {
            case 'undefined':
                element.removeAttribute(name);
                break;
            case 'number':
                element.setAttribute(name, value.toString());
                break;
            case 'string':
                element.setAttribute(name, value);
                break;
            default:
                throw new Error('Not supported.');
        }
    }
    SVGHelper.setAttribute = setAttribute;
    function toColor(value) {
        if (types_1.Types.isString(value)) {
            return value;
        }
        else if (value) {
            return color_1.Color.fromValue(value).toString();
        }
        else {
            return 'black';
        }
    }
    SVGHelper.toColor = toColor;
})(SVGHelper = exports.SVGHelper || (exports.SVGHelper = {}));
