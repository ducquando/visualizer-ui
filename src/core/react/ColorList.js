"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ColorList = void 0;
var classnames_1 = require("classnames");
var React = require("react");
var ColorList = function (props) {
    var color = props.color, colors = props.colors, onClick = props.onClick;
    return (<div className='color-picker-colors'>
            {colors.colors.map(function (c) {
            return <div className={(0, classnames_1["default"])('color-picker-color', { selected: color && c.eq(color) })} key={c.toString()}>
                    <div className='color-picker-color-inner' onClick={function () { return onClick(c); }} style={{ background: c.toString() }}></div>
                </div>;
        })}
        </div>);
};
exports.ColorList = ColorList;
