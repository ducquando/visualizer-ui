"use strict";
/*
 * Notifo.io
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
 */
exports.__esModule = true;
exports.ReadableKeys = exports.Default = void 0;
var React = require("react");
var Shortcut_1 = require("./Shortcut");
exports["default"] = {
    component: Shortcut_1.Shortcut
};
var Template = function (args) {
    return (<>
            {args.keys}

            <Shortcut_1.Shortcut {...args}/>
        </>);
};
exports.Default = Template.bind({});
exports.Default['args'] = {
    keys: 'ctrl+s'
};
exports.ReadableKeys = Template.bind({});
exports.ReadableKeys['args'] = {
    keys: 'CTRL + S'
};
