"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.CanvasView = void 0;
var svg = require("@svgdotjs/svg.js");
var React = require("react");
var core_1 = require("@app/core");
var CanvasView = function (props) {
    var className = props.className, onInit = props.onInit, viewBox = props.viewBox, viewSize = props.viewSize, zoom = props.zoom, zoomedSize = props.zoomedSize;
    var _a = React.useState(), document = _a[0], setDocument = _a[1];
    var doInit = React.useCallback(function (ref) {
        if (!ref) {
            return;
        }
        var doc = svg.SVG().addTo(ref).css({ position: 'relative', overflow: 'visible' }).attr('tabindex', 0);
        setDocument(doc);
    }, []);
    React.useEffect(function () {
        if (document && onInit) {
            onInit(document);
        }
    }, [document, onInit]);
    React.useEffect(function () {
        if (document) {
            var x = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.x) || 0;
            var y = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.y) || 0;
            var w_1 = viewBox ? viewBox.w : viewSize.x;
            var h_1 = viewBox ? viewBox.h : viewSize.y;
            document.size(zoomedSize.x, zoomedSize.y).viewbox(x, y, w_1, h_1);
        }
    }, [viewSize, viewBox, zoom, zoomedSize, document]);
    var w = (0, core_1.sizeInPx)(zoomedSize.x);
    var h = (0, core_1.sizeInPx)(zoomedSize.y);
    return (<div className={className} style={{ width: w, height: h }} ref={doInit}/>);
};
exports.CanvasView = CanvasView;
