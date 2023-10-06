"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.HistoryMenu = void 0;
var React = require("react");
var actions_1 = require("./../actions/");
exports.HistoryMenu = React.memo(function () {
    var forHistory = (0, actions_1.useHistory)();
    return (<>
            <actions_1.ActionMenuButton action={forHistory.undo}/>
            <actions_1.ActionMenuButton action={forHistory.redo}/>
        </>);
});
