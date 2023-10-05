"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ContextMenu = void 0;
var antd_1 = require("antd");
var React = require("react");
var texts_1 = require("@app/texts");
var actions_1 = require("../actions");
exports.ContextMenu = React.memo(function (props) {
    var forAlignment = (0, actions_1.useAlignment)();
    var forClipboard = (0, actions_1.useClipboard)();
    var forGrouping = (0, actions_1.useGrouping)();
    var forRemove = (0, actions_1.useRemove)();
    return (<antd_1.Menu onClick={props.onClick} className='context-menu' selectable={false} activeKey='none'>
            <actions_1.ActionMenuItem action={forClipboard.cut}/>
            <actions_1.ActionMenuItem action={forClipboard.copy}/>
            <actions_1.ActionMenuItem action={forClipboard.paste}/>

            <antd_1.Menu.Divider />

            <actions_1.ActionMenuItem action={forRemove.remove}/>

            <antd_1.Menu.Divider />

            <antd_1.Menu.SubMenu key='alignment' className='force-color' title={texts_1.texts.common.alignment}>
                <actions_1.ActionMenuItem action={forAlignment.alignHorizontalLeft}/>
                <actions_1.ActionMenuItem action={forAlignment.alignHorizontalCenter}/>
                <actions_1.ActionMenuItem action={forAlignment.alignHorizontalRight}/>

                <actions_1.ActionMenuItem action={forAlignment.alignVerticalTop}/>
                <actions_1.ActionMenuItem action={forAlignment.alignVerticalCenter}/>
                <actions_1.ActionMenuItem action={forAlignment.alignVerticalBottom}/>

                <actions_1.ActionMenuItem action={forAlignment.distributeHorizontally}/>
                <actions_1.ActionMenuItem action={forAlignment.distributeVertically}/>
            </antd_1.Menu.SubMenu>

            <antd_1.Menu.SubMenu key='ordering' className='force-color' title={texts_1.texts.common.ordering}>
                <actions_1.ActionMenuItem action={forAlignment.bringToFront}/>
                <actions_1.ActionMenuItem action={forAlignment.bringForwards}/>
                <actions_1.ActionMenuItem action={forAlignment.sendBackwards}/>
                <actions_1.ActionMenuItem action={forAlignment.sendToBack}/>
            </antd_1.Menu.SubMenu>

            <actions_1.ActionMenuItem action={forGrouping.group}/>
            <actions_1.ActionMenuItem action={forGrouping.ungroup}/>
        </antd_1.Menu>);
});
