"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ArrangeMenu = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var actions_1 = require("./../actions");
exports.ArrangeMenu = React.memo(function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var forRemvoe = (0, actions_1.useRemove)();
    var forGrouping = (0, actions_1.useGrouping)();
    var selectedDiagram = (0, model_1.useStore)(model_1.getDiagram);
    var doSelectAll = (0, core_1.useEventCallback)(function () {
        if (selectedDiagram) {
            var selection = (0, model_1.calculateSelection)(selectedDiagram.items.values, selectedDiagram);
            dispatch((0, model_1.selectItems)(selectedDiagram, selection));
        }
    });
    return (<>
            <actions_1.ActionMenuButton action={forGrouping.group}/>
            <actions_1.ActionMenuButton action={forGrouping.ungroup}/>

            <core_1.Shortcut disabled={forRemvoe.remove.disabled} onPressed={forRemvoe.remove.onAction} keys='del'/>
            <core_1.Shortcut disabled={forRemvoe.remove.disabled} onPressed={forRemvoe.remove.onAction} keys='backspace'/>

            <core_1.Shortcut disabled={!selectedDiagram} onPressed={doSelectAll} keys='MOD + A'/>
        </>);
});
