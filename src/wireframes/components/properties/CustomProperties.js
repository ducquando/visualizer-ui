"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.CustomProperties = exports.CustomProperty = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var CustomSlider_1 = require("./CustomSlider");
var Text_1 = require("./Text");
var CustomProperty = function (props) {
    var configurable = props.configurable, onChange = props.onChange, onColorTabChange = props.onColorTabChange, recentColors = props.recentColors, selectedColorTab = props.selectedColorTab, value = props.value;
    var doChangeValue = (0, core_1.useEventCallback)(function (newValue) {
        onChange(configurable.name, newValue);
    });
    var doChangeColor = (0, core_1.useEventCallback)(function (color) {
        onChange(configurable.name, color.toNumber());
    });
    var doChangeBoolean = (0, core_1.useEventCallback)(function (event) {
        onChange(configurable.name, event.target.checked);
    });
    return (<antd_1.Row className='property'>
            <antd_1.Col span={12} className='property-label'>
                {configurable.label}
            </antd_1.Col>
            <antd_1.Col span={12} className='property-value'>
                {configurable instanceof model_1.SliderConfigurable &&
            <CustomSlider_1.CustomSlider value={value} min={configurable.min} max={configurable.max} onChange={doChangeValue}/>}

                {configurable instanceof model_1.NumberConfigurable &&
            <antd_1.InputNumber value={value} min={configurable.min} max={configurable.max} onChange={doChangeValue}/>}

                {configurable instanceof model_1.TextConfigurable &&
            <Text_1.Text text={value} onTextChange={doChangeValue}/>}

                {configurable instanceof model_1.ToggleConfigurable &&
            <antd_1.Checkbox checked={value} onChange={doChangeBoolean}/>}

                {configurable instanceof model_1.SelectionConfigurable &&
            <antd_1.Select value={value} onChange={doChangeValue}>
                        {configurable.options.map(function (o) {
                    return <antd_1.Select.Option key={o} value={o}>{o}</antd_1.Select.Option>;
                })}
                    </antd_1.Select>}

                {configurable instanceof model_1.ColorConfigurable &&
            <core_1.ColorPicker activeColorTab={selectedColorTab} value={value} onChange={doChangeColor} onActiveColorTabChanged={onColorTabChange} recentColors={recentColors}/>}
            </antd_1.Col>
        </antd_1.Row>);
};
exports.CustomProperty = CustomProperty;
var CustomProperties = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var recentColors = (0, model_1.useStore)(model_1.getColors);
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedColorTab = (0, model_1.useStore)(function (s) { return s.ui.selectedColorTab; });
    var selectedConfigurables = (0, model_1.useStore)(model_1.getSelectedConfigurables);
    var selectedShape = (0, model_1.useStore)(model_1.getSelectedShape);
    var doSelectColorTab = (0, core_1.useEventCallback)(function (key) {
        dispatch((0, model_1.selectColorTab)(key));
    });
    var doChange = (0, core_1.useEventCallback)(function (key, value) {
        if (selectedDiagramId && selectedShape) {
            dispatch((0, model_1.changeItemsAppearance)(selectedDiagramId, [selectedShape], key, value));
        }
    });
    if (!selectedShape || !selectedDiagramId) {
        return null;
    }
    return (<>
            {selectedDiagramId && selectedConfigurables && selectedConfigurables.map(function (c) {
            return <exports.CustomProperty key={c.name} selectedColorTab={selectedColorTab} configurable={c} onChange={doChange} onColorTabChange={doSelectColorTab} recentColors={recentColors} value={selectedShape.appearance.get(c.name)}/>;
        })}
        </>);
};
exports.CustomProperties = CustomProperties;
