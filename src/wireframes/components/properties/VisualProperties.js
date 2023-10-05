"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.VisualProperties = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var interface_1 = require("@app/wireframes/interface");
var model_1 = require("@app/wireframes/model");
var actions_1 = require("./../actions");
require("./VisualProperties.scss");
exports.VisualProperties = React.memo(function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var recentColors = (0, model_1.useStore)(model_1.getColors);
    var selectedColorTab = (0, model_1.useStore)(function (s) { return s.ui.selectedColorTab; });
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedItems = (0, model_1.useStore)(model_1.getSelectedItems);
    var selectedSet = (0, model_1.useStore)(model_1.getSelectionSet);
    var _a = (0, actions_1.useColorAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.BACKGROUND_COLOR), backgroundColor = _a[0], setBackgroundColor = _a[1];
    var _b = (0, actions_1.useAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.FONT_SIZE), fontSize = _b[0], setFontSize = _b[1];
    var _c = (0, actions_1.useColorAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.FOREGROUND_COLOR), foregroundColor = _c[0], setForegroundColor = _c[1];
    var _d = (0, actions_1.useColorAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.STROKE_COLOR), strokeColor = _d[0], setStrokeColor = _d[1];
    var _e = (0, actions_1.useAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.STROKE_THICKNESS), strokeThickness = _e[0], setStrokeThickness = _e[1];
    var _f = (0, actions_1.useAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.TEXT_ALIGNMENT), textAlignment = _f[0], setTextAlignment = _f[1];
    var doSelectColorTab = (0, core_1.useEventCallback)(function (key) {
        dispatch((0, model_1.selectColorTab)(key));
    });
    if (!selectedDiagramId) {
        return null;
    }
    return (<>
            <div style={{ display: (selectedItems.length > 0 ? 'block' : 'none') }}>
                <div className='property-subsection visual-properties'>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.fontSize}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <antd_1.Select disabled={fontSize.empty} value={fontSize.value} onChange={setFontSize}>
                                {DEFINED_FONT_SIZES.map(function (value) {
            return <antd_1.Select.Option key={value.toString()} value={value}>{value}</antd_1.Select.Option>;
        })}
                            </antd_1.Select>
                        </antd_1.Col>
                    </antd_1.Row>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.strokeThickness}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <antd_1.Select disabled={strokeThickness.empty} value={strokeThickness.value} onChange={setStrokeThickness}>
                                {DEFINED_STROKE_THICKNESSES.map(function (value) {
            return <antd_1.Select.Option key={value.toString()} value={value}>{value}</antd_1.Select.Option>;
        })}
                            </antd_1.Select>
                        </antd_1.Col>
                    </antd_1.Row>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.strokeColor}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <core_1.ColorPicker activeColorTab={selectedColorTab} disabled={strokeColor.empty} value={strokeColor.value} onChange={setStrokeColor} onActiveColorTabChanged={doSelectColorTab} recentColors={recentColors}/>
                        </antd_1.Col>
                    </antd_1.Row>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.foregroundColor}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <core_1.ColorPicker activeColorTab={selectedColorTab} disabled={foregroundColor.empty} value={foregroundColor.value} onChange={setForegroundColor} onActiveColorTabChanged={doSelectColorTab} recentColors={recentColors}/>
                        </antd_1.Col>
                    </antd_1.Row>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.backgroundColor}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <core_1.ColorPicker activeColorTab={selectedColorTab} disabled={backgroundColor.empty} value={backgroundColor.value} onChange={setBackgroundColor} onActiveColorTabChanged={doSelectColorTab} recentColors={recentColors}/>
                        </antd_1.Col>
                    </antd_1.Row>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.textAlignment}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <antd_1.Button.Group className='text-alignment'>
                                <TextButton value={textAlignment} onClick={setTextAlignment} mode='left' icon='icon-align-left'/>

                                <TextButton value={textAlignment} onClick={setTextAlignment} mode='center' icon='icon-align-center'/>

                                <TextButton value={textAlignment} onClick={setTextAlignment} mode='right' icon='icon-align-right'/>
                            </antd_1.Button.Group>
                        </antd_1.Col>
                    </antd_1.Row>
                </div>
            </div>
        </>);
});
var TextButton = React.memo(function (_a) {
    var value = _a.value, mode = _a.mode, icon = _a.icon, onClick = _a.onClick;
    var type = mode === value.value ? 'primary' : undefined;
    return (<antd_1.Button disabled={value.empty} type={type} onClick={function () { return onClick(mode); }}>
            <i className={icon}/>
        </antd_1.Button>);
});
var DEFINED_STROKE_THICKNESSES = [0, 1, 2, 4, 6, 8];
var DEFINED_FONT_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60];
