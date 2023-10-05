"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Outline = void 0;
var React = require("react");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var OutlineItem_1 = require("./OutlineItem");
require("./Outline.scss");
var Outline = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var diagram = (0, model_1.useStore)(model_1.getDiagram);
    var doAction = (0, core_1.useEventCallback)(function (itemId, action, arg) {
        switch (action) {
            case 'Delete':
                dispatch((0, model_1.removeItems)(diagram, [itemId]));
                break;
            case 'Move':
                dispatch((0, model_1.orderItems)(arg, diagram, [itemId]));
                break;
            case 'Rename':
                dispatch((0, model_1.renameItems)(diagram, [itemId], arg));
                break;
            case 'Select':
                dispatch((0, model_1.selectItems)(diagram, [itemId]));
                break;
        }
    });
    var doSort = (0, core_1.useEventCallback)(function (result) {
        dispatch((0, model_1.moveItems)(diagram, [result.draggableId], result.destination.index));
    });
    if (!diagram) {
        return null;
    }
    var rootItems = diagram.rootItems;
    if (rootItems.length === 0) {
        return null;
    }
    return (<>
            <react_beautiful_dnd_1.DragDropContext onDragEnd={doSort}>
                <react_beautiful_dnd_1.Droppable droppableId='droppable'>
                    {function (provided) { return (<div className='pages-list' {...provided.droppableProps} ref={provided.innerRef}>
                            {rootItems.map(function (item, index) {
                return <react_beautiful_dnd_1.Draggable key={item.id} draggableId={item.id} index={index}>
                                    {function (provided) { return (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <OutlineItem_1.OutlineItem diagram={diagram} diagramItem={item} isFirst={index === 0} isLast={index === rootItems.length - 1} level={0} onAction={doAction}/>
                                        </div>); }}
                                </react_beautiful_dnd_1.Draggable>;
            })}
                        </div>); }}
                </react_beautiful_dnd_1.Droppable>
            </react_beautiful_dnd_1.DragDropContext>
        </>);
};
exports.Outline = Outline;
