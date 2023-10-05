"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.DiagramProperties = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
exports.DiagramProperties = React.memo(function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var editor = (0, model_1.useStore)(model_1.getEditor);
    var editorSize = editor.size;
    var editorColor = editor.color;
    var recentColors = (0, model_1.useStore)(model_1.getColors);
    var _a = React.useState(core_1.Color.WHITE), color = _a[0], setColor = _a[1];
    var _b = React.useState(0), sizeWidth = _b[0], setWidth = _b[1];
    var _c = React.useState(0), sizeHeight = _c[0], setHeight = _c[1];
    React.useEffect(function () {
        setWidth(editorSize.x);
        setHeight(editorSize.y);
    }, [editorSize]);
    React.useEffect(function () {
        setColor(editorColor);
    }, [editorColor]);
    var doChangeSize = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.changeSize)(sizeWidth, sizeHeight));
    });
    var doChangeColor = (0, core_1.useEventCallback)(function (color) {
        dispatch((0, model_1.changeColor)(color));
    });
    return (<>
            <antd_1.Row className='property'>
                <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.width}</antd_1.Col>
                <antd_1.Col span={12} className='property-value'>
                    <antd_1.InputNumber value={sizeWidth} min={100} max={3000} onChange={setWidth} onBlur={doChangeSize}/>
                </antd_1.Col>
            </antd_1.Row>

            <antd_1.Row className='property'>
                <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.height}</antd_1.Col>
                <antd_1.Col span={12} className='property-value'>
                    <antd_1.InputNumber value={sizeHeight} min={100} max={3000} onChange={setHeight} onBlur={doChangeSize}/>
                </antd_1.Col>
            </antd_1.Row>

            <antd_1.Row className='property'>
                <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.backgroundColor}</antd_1.Col>
                <antd_1.Col span={12} className='property-value'>
                    <core_1.ColorPicker value={color} onChange={doChangeColor} recentColors={recentColors}/>
                </antd_1.Col>
            </antd_1.Row>
        </>);
});
