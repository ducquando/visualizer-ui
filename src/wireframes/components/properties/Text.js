"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Text = void 0;
var antd_1 = require("antd");
var React = require("react");
var core_1 = require("@app/core");
var Text = function (props) {
    var disabled = props.disabled, onTextChange = props.onTextChange, selection = props.selection, text = props.text;
    var _a = React.useState(text), value = _a[0], setValue = _a[1];
    var previousText = React.useRef(text);
    React.useEffect(function () {
        setValue(text);
        previousText.current = text;
    }, [selection, text]);
    var doSetText = (0, core_1.useEventCallback)(function (event) {
        setValue(event.target.value);
    });
    var doBlur = (0, core_1.useEventCallback)(function () {
        if (value !== previousText.current) {
            onTextChange(value);
            previousText.current = value;
        }
    });
    var doApply = (0, core_1.useEventCallback)(function (event) {
        if (value !== previousText.current && core_1.Keys.isEnter(event)) {
            onTextChange(value);
            previousText.current = value;
        }
    });
    return (<antd_1.Input disabled={disabled} value={value} onChange={doSetText} onBlur={doBlur} onKeyDown={doApply}/>);
};
exports.Text = Text;
