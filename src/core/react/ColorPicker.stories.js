"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Default = void 0;
var React = require("react");
var color_palette_1 = require("./../utils/color-palette");
var ColorPicker_1 = require("./ColorPicker");
exports["default"] = {
    component: ColorPicker_1.ColorPicker
};
var Template = function (_a) {
    var _ = _a.palette, rest = __rest(_a, ["palette"]);
    var palette = color_palette_1.ColorPalette.colors();
    return (<ColorPicker_1.ColorPicker palette={palette} {...rest}/>);
};
exports.Default = Template.bind({});
exports.Default['argTypes'] = {
    palette: {
        table: {
            disable: true
        }
    }
};
