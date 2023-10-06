"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Default = void 0;
var React = require("react");
var Grid_1 = require("./Grid");
exports["default"] = {
    component: Grid_1.Grid
};
var items = [];
for (var i = 1; i <= 10000; i++) {
    items.push(i);
}
var renderer = function (value) {
    return (<div>{value}</div>);
};
var Template = function () {
    return (<div style={{ width: 200, height: 500, overflowX: 'hidden', overflowY: 'scroll' }}>
            <Grid_1.Grid columns={3} renderer={renderer} items={items} keyBuilder={function (x) { return x; }}/>
        </div>);
};
exports.Default = Template.bind({});
