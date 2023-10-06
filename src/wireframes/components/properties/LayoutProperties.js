"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.LayoutProperties = void 0;
var React = require("react");
var model_1 = require("@app/wireframes/model");
var actions_1 = require("../actions");
require("./LayoutProperties.scss");
exports.LayoutProperties = React.memo(function () {
    var forAlignment = (0, actions_1.useAlignment)();
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    if (!selectedDiagramId) {
        return null;
    }
    return (<>
            <div className='properties-subsection layout-properties'>
                <actions_1.ActionButton action={forAlignment.alignHorizontalLeft}/>
                <actions_1.ActionButton action={forAlignment.alignHorizontalCenter}/>
                <actions_1.ActionButton action={forAlignment.alignHorizontalRight}/>

                <actions_1.ActionButton action={forAlignment.alignVerticalTop}/>
                <actions_1.ActionButton action={forAlignment.alignVerticalCenter}/>
                <actions_1.ActionButton action={forAlignment.alignVerticalBottom}/>

                <actions_1.ActionButton action={forAlignment.distributeHorizontally}/>
                <actions_1.ActionButton action={forAlignment.distributeVertically}/>
            </div>

            <div className='properties-subsection layout-properties'>
                <actions_1.ActionButton action={forAlignment.bringToFront}/>
                <actions_1.ActionButton action={forAlignment.bringForwards}/>
                <actions_1.ActionButton action={forAlignment.sendBackwards}/>
                <actions_1.ActionButton action={forAlignment.sendToBack}/>
            </div>
        </>);
});
