"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.CustomSlider = void 0;
var antd_1 = require("antd");
var React = require("react");
exports.CustomSlider = React.memo(function (_a) {
    var max = _a.max, min = _a.min, onChange = _a.onChange, value = _a.value;
    var _b = React.useState(value), sliderValue = _b[0], setSliderValue = _b[1];
    React.useEffect(function () {
        setSliderValue(value);
    }, [value]);
    return (<antd_1.Slider value={sliderValue} min={min} max={max} onChange={setSliderValue} onAfterChange={onChange}/>);
});
