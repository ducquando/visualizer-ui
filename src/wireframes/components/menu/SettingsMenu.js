"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.SettingsMenu = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var MenuItem_1 = require("antd/lib/menu/MenuItem");
var React = require("react");
var texts_1 = require("@app/texts");
exports.SettingsMenu = React.memo(function (props) {
    var onPrint = props.onPrint;
    var exportMenu = <antd_1.Menu>
            <MenuItem_1["default"] onClick={onPrint}>
                <icons_1.PrinterOutlined /> {texts_1.texts.common.printDiagrams}
            </MenuItem_1["default"]>
        </antd_1.Menu>;
    return (<>
            <antd_1.Dropdown overlay={exportMenu} placement='bottomRight'>
                <antd_1.Button className='menu-item' size='large'>
                    <icons_1.ExportOutlined />
                </antd_1.Button>
            </antd_1.Dropdown>
        </>);
});
