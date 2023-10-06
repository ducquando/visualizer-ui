"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.UIMenu = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var React = require("react");
var actions_1 = require("../actions");
exports.UIMenu = React.memo(function (props) {
    var onPlay = props.onPlay;
    var forUI = (0, actions_1.useUI)();
    return (<>
            <actions_1.ActionMenuButton action={forUI.zoomOut}/>
            <actions_1.ActionMenuButton action={forUI.zoomIn}/>

            <antd_1.Button className='menu-item' size='large' onClick={onPlay}>
                <icons_1.PlayCircleOutlined />
            </antd_1.Button>
        </>);
});
