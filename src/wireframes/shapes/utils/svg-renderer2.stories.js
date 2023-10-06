"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Ellipse = exports.RoundedRectBottom = exports.RoundedRectTop = exports.RoundedRectRight = exports.RoundedRectLeft = exports.Rect = void 0;
var svg = require("@svgdotjs/svg.js");
var React = require("react");
var core_1 = require("@app/core");
var svg_renderer2_1 = require("./svg-renderer2");
var RendererHelper = function (_a) {
    var render = _a.render;
    var _b = React.useState(), document = _b[0], setDocument = _b[1];
    var innerRef = React.useRef(null);
    React.useEffect(function () {
        if (!innerRef.current) {
            return;
        }
        setDocument(svg.SVG(innerRef.current).css({ overflow: 'visible' }));
    }, []);
    React.useEffect(function () {
        if (!document) {
            return;
        }
        var itemCount = 10;
        var itemHeight = 50;
        document.viewbox(0, 0, itemCount * itemHeight, 100);
        document.clear();
        core_1.SVGHelper.setSize(document, itemCount * itemHeight, 100);
        var renderer2 = new svg_renderer2_1.SVGRenderer2();
        for (var i = 0; i < itemCount; i++) {
            var group = document.group();
            var color = core_1.Color.fromHsv((360 / itemCount) * i, 1, 0.75);
            core_1.SVGHelper.setSize(group, itemHeight, 100);
            core_1.SVGHelper.setPosition(group, 0.5, (i * itemHeight) + 0.5);
            renderer2.setContainer(group);
            render(renderer2, i, color.toString());
        }
    }, [document, render]);
    return (<div style={{ lineHeight: 0 }}>
            <svg ref={innerRef}/>
        </div>);
};
exports["default"] = {
    component: RendererHelper
};
var Rect = function () {
    return (<RendererHelper render={function (renderer, strokeWidth, color) {
            return renderer.rectangle(strokeWidth, 0, new core_1.Rect2(0, 0, 100, 60), function (p) { return p
                .setBackgroundColor('#aaa')
                .setStrokeColor(color); });
        }}/>);
};
exports.Rect = Rect;
var RoundedRectLeft = function () {
    return (<RendererHelper render={function (renderer, strokeWidth, color) {
            return renderer.roundedRectangleLeft(strokeWidth, 20, new core_1.Rect2(0, 0, 100, 60), function (p) { return p
                .setBackgroundColor('#aaa')
                .setStrokeColor(color); });
        }}/>);
};
exports.RoundedRectLeft = RoundedRectLeft;
var RoundedRectRight = function () {
    return (<RendererHelper render={function (renderer, strokeWidth, color) {
            return renderer.roundedRectangleRight(strokeWidth, 20, new core_1.Rect2(0, 0, 100, 60), function (p) { return p
                .setBackgroundColor('#aaa')
                .setStrokeColor(color); });
        }}/>);
};
exports.RoundedRectRight = RoundedRectRight;
var RoundedRectTop = function () {
    return (<RendererHelper render={function (renderer, strokeWidth, color) {
            return renderer.roundedRectangleTop(strokeWidth, 20, new core_1.Rect2(0, 0, 100, 60), function (p) { return p
                .setBackgroundColor('#aaa')
                .setStrokeColor(color); });
        }}/>);
};
exports.RoundedRectTop = RoundedRectTop;
var RoundedRectBottom = function () {
    return (<RendererHelper render={function (renderer, strokeWidth, color) {
            return renderer.roundedRectangleBottom(strokeWidth, 20, new core_1.Rect2(0, 0, 100, 60), function (p) { return p
                .setBackgroundColor('#aaa')
                .setStrokeColor(color); });
        }}/>);
};
exports.RoundedRectBottom = RoundedRectBottom;
var Ellipse = function () {
    return (<RendererHelper render={function (renderer, strokeWidth, color) {
            return renderer.ellipse(strokeWidth, new core_1.Rect2(0, 0, 100, 60), function (p) { return p
                .setBackgroundColor('#aaa')
                .setStrokeColor(color); });
        }}/>);
};
exports.Ellipse = Ellipse;
