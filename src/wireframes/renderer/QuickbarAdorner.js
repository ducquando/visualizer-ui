"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.QuickbarAdorner = void 0;
var React = require("react");
var core_1 = require("@app/core");
var actions_1 = require("@app/wireframes/components/actions");
require("./QuickbarAdorner.scss");
var QuickbarAdorner = function (props) {
    var previewStream = props.previewStream, selectedDiagram = props.selectedDiagram, selectedItems = props.selectedItems, zoom = props.zoom;
    var forAlignment = (0, actions_1.useAlignment)();
    var toolbarRoot = React.useRef(null);
    var toolbarTimer = React.useRef();
    var _a = React.useState(), selectionRect = _a[0], setSelectionRect = _a[1];
    React.useEffect(function () {
        // Use a stream of preview updates to bypass react for performance reasons.
        previewStream.subscribe(function (event) {
            var toolbar = toolbarRoot.current;
            if (!toolbar) {
                return;
            }
            clearTimeout(toolbarTimer.current);
            if (event.type === 'End') {
                toolbarTimer.current = setTimeout(function () {
                    toolbar.style.display = 'block';
                }, 500);
            }
            else if (event.type === 'Start') {
                toolbar.style.display = 'none';
            }
        });
    }, [previewStream]);
    React.useEffect(function () {
        if (selectedItems.length >= 2) {
            setSelectionRect(core_1.Rect2.fromRects(selectedItems.map(function (x) { return x.bounds(selectedDiagram).aabb; })));
        }
        else {
            setSelectionRect(undefined);
        }
    }, [selectedDiagram, selectedItems]);
    if (!selectionRect) {
        return null;
    }
    var x = (0, core_1.sizeInPx)(Math.round(zoom * Math.max(0, selectionRect.x)));
    var y = (0, core_1.sizeInPx)(Math.round(zoom * selectionRect.y - 100));
    return (<div ref={toolbarRoot}>
            <div className='quickbar' style={{ left: x, top: y }}>
                <actions_1.ActionButton action={forAlignment.alignHorizontalLeft}/>
                <actions_1.ActionButton action={forAlignment.alignHorizontalCenter}/>
                <actions_1.ActionButton action={forAlignment.alignHorizontalRight}/>
                <actions_1.ActionButton action={forAlignment.alignVerticalTop}/>
                <actions_1.ActionButton action={forAlignment.alignVerticalCenter}/>
                <actions_1.ActionButton action={forAlignment.alignVerticalBottom}/>
                <actions_1.ActionButton action={forAlignment.distributeHorizontally} hideWhenDisabled/>
                <actions_1.ActionButton action={forAlignment.distributeVertically} hideWhenDisabled/>
            </div>
        </div>);
};
exports.QuickbarAdorner = QuickbarAdorner;
