"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Shapes = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var ShapeImage_1 = require("./ShapeImage");
require("./Shapes.scss");
var keyBuilder = function (shape) {
    return shape.name;
};
var Shapes = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var shapesFiltered = (0, model_1.useStore)(model_1.getFilteredShapes);
    var shapesFilter = (0, model_1.useStore)(model_1.getShapesFilter);
    var store = (0, react_redux_1.useStore)();
    var cellRenderer = React.useCallback(function (shape) {
        var doAdd = function () {
            var selectedDiagramId = (0, model_1.getDiagramId)(store.getState());
            if (selectedDiagramId) {
                dispatch((0, model_1.addShape)(selectedDiagramId, shape.name, { position: { x: 100, y: 100 } }));
            }
        };
        return (<div className='asset-shape'>
                <div className='asset-shape-image-row' onDoubleClick={doAdd}>
                    <ShapeImage_1.ShapeImage shape={shape}/>
                </div>

                <div className='asset-shape-title'>{shape.displayName}</div>
            </div>);
    }, [dispatch, store]);
    var doFilterShapes = (0, core_1.useEventCallback)(function (event) {
        dispatch((0, model_1.filterShapes)(event.target.value));
    });
    return (<>
            <div className='asset-shapes-search'>
                <antd_1.Input value={shapesFilter} onChange={doFilterShapes} placeholder={texts_1.texts.common.findShape} prefix={<icons_1.SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            </div>

            <core_1.Grid className='asset-shapes-list' renderer={cellRenderer} columns={2} items={shapesFiltered} keyBuilder={keyBuilder}/>
        </>);
};
exports.Shapes = Shapes;
