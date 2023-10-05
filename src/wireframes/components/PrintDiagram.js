"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.PrintDiagram = void 0;
var React = require("react");
var core_1 = require("@app/core");
var Editor_1 = require("@app/wireframes/renderer/Editor");
var PrintDiagram = function (props) {
    var color = props.color, diagram = props.diagram, diagrams = props.diagrams, onRender = props.onRender, onNavigate = props.onNavigate, size = props.size, useBounds = props.useBounds;
    var doOnRender = (0, core_1.useEventCallback)(function () {
        onRender && onRender(diagram);
    });
    var _a = React.useMemo(function () {
        var bounds;
        if (useBounds) {
            var aabbs = diagram.items.values.map(function (x) { return x.bounds(diagram).aabb; });
            bounds = core_1.Rect2.fromRects(aabbs).inflate(20);
        }
        else {
            bounds = new core_1.Rect2(0, 0, size.x, size.y);
        }
        return { bounds: bounds, zoomedSize: new core_1.Vec2(bounds.w, bounds.h) };
    }, [diagram, size, useBounds]), bounds = _a.bounds, zoomedSize = _a.zoomedSize;
    return (<>
            <Editor_1.Editor color={color} diagram={diagram} masterDiagram={diagrams.get(diagram.master)} onNavigate={onNavigate} onRender={doOnRender} selectedItems={[]} selectedItemsWithLocked={[]} viewBox={bounds} viewSize={size} zoom={1} zoomedSize={zoomedSize} isDefaultView={false}/>
        </>);
};
exports.PrintDiagram = PrintDiagram;
