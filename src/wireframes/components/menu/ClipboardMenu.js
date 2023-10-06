"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ClipboardMenu = void 0;
var React = require("react");
var actions_1 = require("../actions");
exports.ClipboardMenu = React.memo(function () {
    var forClipboard = (0, actions_1.useClipboard)();
    return (<>
            <actions_1.ActionMenuButton action={forClipboard.cut}/>
            <actions_1.ActionMenuButton action={forClipboard.copy}/>
            <actions_1.ActionMenuButton action={forClipboard.paste}/>
        </>);
});
