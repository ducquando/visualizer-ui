"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.LockMenu = void 0;
var React = require("react");
var actions_1 = require("../actions");
exports.LockMenu = React.memo(function () {
    var forLocking = (0, actions_1.useLocking)();
    return (<actions_1.ActionMenuButton action={forLocking.lock}/>);
});
