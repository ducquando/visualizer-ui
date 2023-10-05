"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ColorPicker = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_color_1 = require("react-color");
var texts_1 = require("@app/texts");
var color_1 = require("./../utils/color");
var color_palette_1 = require("./../utils/color-palette");
require("./ColorPicker.scss");
var ColorList_1 = require("./ColorList");
var hooks_1 = require("./hooks");
exports.ColorPicker = React.memo(function (props) {
    var activeColorTab = props.activeColorTab, disabled = props.disabled, onActiveColorTabChanged = props.onActiveColorTabChanged, onChange = props.onChange, palette = props.palette, popoverPlacement = props.popoverPlacement, recentColors = props.recentColors, value = props.value;
    var _a = React.useState(color_1.Color.BLACK), color = _a[0], setColor = _a[1];
    var _b = React.useState(color.toString()), colorHex = _b[0], setColorHex = _b[1];
    var _c = React.useState(false), visible = _c[0], setVisible = _c[1];
    var selectedPalette = React.useMemo(function () {
        return palette || color_palette_1.ColorPalette.colors();
    }, [palette]);
    React.useEffect(function () {
        setColorHex(color.toString());
    }, [color]);
    React.useEffect(function () {
        setColor(value ? color_1.Color.fromValue(value) : color_1.Color.BLACK);
    }, [value]);
    var doToggle = (0, hooks_1.useEventCallback)(function () {
        setVisible(function (x) { return !x; });
    });
    var doSelectColorResult = (0, hooks_1.useEventCallback)(function (result) {
        setColorHex(result.hex);
    });
    var doSelectTab = (0, hooks_1.useEventCallback)(function (key) {
        onActiveColorTabChanged && onActiveColorTabChanged(key);
    });
    var doSelectColor = (0, hooks_1.useEventCallback)(function (result) {
        onChange && onChange(result);
        setVisible(false);
        setColorHex(result.toString());
    });
    var doConfirmColor = (0, hooks_1.useEventCallback)(function () {
        onChange && onChange(color_1.Color.fromValue(colorHex));
        setVisible(false);
        setColorHex(colorHex);
    });
    var content = (<antd_1.Tabs size='small' className='color-picker-tabs' animated={false} activeKey={activeColorTab} onChange={doSelectTab}>
            <antd_1.Tabs.TabPane key='palette' tab={texts_1.texts.common.palette}>
                <ColorList_1.ColorList color={color} colors={selectedPalette} onClick={doSelectColor}/>

                {recentColors &&
            <div>
                        <h4>{texts_1.texts.common.recent}</h4>

                        <ColorList_1.ColorList color={color} colors={recentColors} onClick={doSelectColor}/>
                    </div>}
            </antd_1.Tabs.TabPane>
            <antd_1.Tabs.TabPane key='advanced' tab={texts_1.texts.common.advanced}>
                <react_color_1.SketchPicker color={colorHex} onChange={doSelectColorResult} disableAlpha={true} width='210px'/>

                <antd_1.Button onClick={doConfirmColor}>
                    {texts_1.texts.common.apply}
                </antd_1.Button>
            </antd_1.Tabs.TabPane>
        </antd_1.Tabs>);
    var placement = popoverPlacement || 'left';
    return (<antd_1.Popover content={content} visible={visible && !disabled} placement={placement} trigger='click' onVisibleChange={setVisible}>
            <antd_1.Button disabled={disabled} className='color-picker-button' onClick={doToggle}>
                <div className='color-picker-color'>
                    <div className='color-picker-color-inner' style={{ background: colorHex }}></div>
                </div>
            </antd_1.Button>
        </antd_1.Popover>);
});
