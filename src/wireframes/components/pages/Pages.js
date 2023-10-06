"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Pages = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var React = require("react");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var Page_1 = require("./Page");
require("./Pages.scss");
var Pages = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var diagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var diagrams = (0, model_1.useStore)(model_1.getFilteredDiagrams);
    var diagramsFilter = (0, model_1.useStore)(model_1.getDiagramsFilter);
    var diagramsOrdered = (0, model_1.useStore)(function (x) { return x.editor.present.orderedDiagrams; });
    var doAddDiagram = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.addDiagram)());
    });
    var doAction = (0, core_1.useEventCallback)(function (diagramId, action, arg) {
        switch (action) {
            case 'Delete':
                dispatch((0, model_1.removeDiagram)(diagramId));
                break;
            case 'Duplicate':
                dispatch((0, model_1.duplicateDiagram)(diagramId));
                break;
            case 'SetMaster':
                dispatch((0, model_1.setDiagramMaster)(diagramId, arg));
                break;
            case 'Rename':
                dispatch((0, model_1.renameDiagram)(diagramId, arg));
                break;
            case 'Select':
                dispatch((0, model_1.selectDiagram)(diagramId));
                break;
        }
    });
    var doFilterShapes = (0, core_1.useEventCallback)(function (event) {
        dispatch((0, model_1.filterDiagrams)(event.target.value));
    });
    var doSort = (0, core_1.useEventCallback)(function (result) {
        dispatch((0, model_1.moveDiagram)(result.draggableId, result.destination.index));
    });
    return (<>
            <antd_1.Row className='pages-search' wrap={false}>
                <antd_1.Col flex='auto'>
                    <antd_1.Input value={diagramsFilter} onChange={doFilterShapes} placeholder={texts_1.texts.common.findPage} prefix={<icons_1.SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
                </antd_1.Col>
                <antd_1.Col flex='none'>
                    <antd_1.Button type='primary' onClick={doAddDiagram}>
                        <icons_1.PlusOutlined />
                    </antd_1.Button>
                </antd_1.Col>
            </antd_1.Row>

            <react_beautiful_dnd_1.DragDropContext onDragEnd={doSort}>
                <react_beautiful_dnd_1.Droppable droppableId='droppable'>
                    {function (provided) { return (<div className='pages-list' {...provided.droppableProps} ref={provided.innerRef}>
                            {diagrams.map(function (item, index) {
                return <react_beautiful_dnd_1.Draggable key={item.id} draggableId={item.id} index={index}>
                                    {function (provided) { return (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Page_1.Page diagram={item} diagrams={diagramsOrdered} index={index} onAction={doAction} selected={item.id === diagramId}/>
                                        </div>); }}
                                </react_beautiful_dnd_1.Draggable>;
            })}
                        </div>); }}
                </react_beautiful_dnd_1.Droppable>
            </react_beautiful_dnd_1.DragDropContext>
        </>);
};
exports.Pages = Pages;
