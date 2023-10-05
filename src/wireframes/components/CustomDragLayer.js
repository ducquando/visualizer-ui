"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.CustomDragLayer = void 0;
var React = require("react");
var react_dnd_1 = require("react-dnd");
var ShapeRenderer_1 = require("../shapes/ShapeRenderer");
require("./CustomDragLayer.scss");
var CustomDragLayer = function () {
    var _a = (0, react_dnd_1.useDragLayer)(function (monitor) { return ({
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset()
    }); }), itemType = _a.itemType, isDragging = _a.isDragging, item = _a.item, initialOffset = _a.initialOffset, currentOffset = _a.currentOffset;
    function renderItem() {
        switch (itemType) {
            case 'DND_ASSET':
                var plugin = item['plugin'];
                return (<div style={getItemStyles(initialOffset, currentOffset, plugin)}>
                        <ShapeRenderer_1.ShapeRenderer plugin={plugin}/>
                    </div>);
            default:
                return null;
        }
    }
    if (!isDragging) {
        return null;
    }
    return (<div className='drag-layer'>
            {renderItem()}
        </div>);
};
exports.CustomDragLayer = CustomDragLayer;
function getItemStyles(initialOffset, currentOffset, plugin) {
    if (!initialOffset || !currentOffset) {
        return { display: 'none' };
    }
    var transform = "translate(".concat(currentOffset.x, "px, ").concat(currentOffset.y, "px)");
    var size = (0, ShapeRenderer_1.getViewBox)(plugin).size;
    return { transform: transform, WebkitTransform: transform, width: size.x, height: size.y };
}
