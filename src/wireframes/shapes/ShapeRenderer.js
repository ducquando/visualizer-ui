"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getViewBox = exports.ShapeRenderer = void 0;
var svg = require("@svgdotjs/svg.js");
var React = require("react");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var abstract_control_1 = require("./utils/abstract-control");
exports.ShapeRenderer = React.memo(React.forwardRef(function (props, ref) {
    var appearance = props.appearance, desiredHeight = props.desiredHeight, desiredWidth = props.desiredWidth, plugin = props.plugin, usePreviewOffset = props.usePreviewOffset, usePreviewSize = props.usePreviewSize;
    var _a = React.useState(), document = _a[0], setDocument = _a[1];
    var innerRef = React.useRef(null);
    var viewBox = getViewBox(plugin, desiredWidth, desiredHeight, usePreviewSize, usePreviewOffset);
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
        document.viewbox(viewBox.x, viewBox.y, viewBox.outerSize.x, viewBox.outerSize.y);
    }, [document, viewBox]);
    React.useEffect(function () {
        if (!document) {
            return;
        }
        if (desiredWidth && desiredHeight) {
            var aspectRatio = viewBox.outerSize.x / viewBox.outerSize.y;
            if (aspectRatio > desiredWidth / desiredHeight) {
                document.width(desiredWidth);
            }
            else {
                document.height(desiredHeight);
            }
        }
        else {
            document.width(viewBox.outerSize.x).height(viewBox.outerSize.y);
        }
    }, [desiredHeight, desiredWidth, document, viewBox]);
    React.useEffect(function () {
        var _a;
        if (!document) {
            return;
        }
        document.clear();
        var svgControl = new abstract_control_1.AbstractControl(plugin);
        var svgGroup = document.group();
        core_1.SVGHelper.setPosition(svgGroup, 0.5, 0.5);
        var item = model_1.DiagramItem.createShape({
            renderer: plugin.identifier(),
            transform: new model_1.Transform(new core_1.Vec2(viewBox.size.x * 0.5, viewBox.size.y * 0.5), new core_1.Vec2(viewBox.size.x, viewBox.size.y), core_1.Rotation.ZERO),
            appearance: __assign(__assign({}, plugin.defaultAppearance()), appearance || {}),
            configurables: [],
            constraint: (_a = plugin === null || plugin === void 0 ? void 0 : plugin.constraint) === null || _a === void 0 ? void 0 : _a.call(plugin, abstract_control_1.DefaultConstraintFactory.INSTANCE)
        });
        svgControl.setContext(svgGroup);
        var newElement = svgControl.render(item, undefined);
        if (!newElement.parent()) {
            svgGroup.add(newElement);
        }
    }, [appearance, document, plugin, viewBox]);
    return (<div ref={ref} style={{ lineHeight: 0 }}>
            <svg ref={innerRef}/>
        </div>);
}));
function getViewBox(plugin, desiredWidth, desiredHeight, usePreviewSize, usePreviewOffset) {
    var _a, _b;
    var x = 0;
    var y = 0;
    var size = usePreviewSize ?
        ((_a = plugin.previewSize) === null || _a === void 0 ? void 0 : _a.call(plugin, desiredWidth || 0, desiredHeight || 0)) || plugin.defaultSize() :
        plugin.defaultSize();
    var outerSize = { x: size.x, y: size.y };
    if (usePreviewOffset) {
        var offset = (_b = plugin.previewOffset) === null || _b === void 0 ? void 0 : _b.call(plugin);
        if (offset) {
            outerSize.x += offset.left;
            outerSize.x += offset.right;
            outerSize.y += offset.top;
            outerSize.y += offset.bottom;
            x -= offset.left;
            y -= offset.top;
        }
    }
    return { x: x, y: y, size: size, outerSize: outerSize };
}
exports.getViewBox = getViewBox;
