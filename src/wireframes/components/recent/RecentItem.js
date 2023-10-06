"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.RecentItem = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var date_fns_1 = require("date-fns");
var React = require("react");
exports.RecentItem = React.memo(function (props) {
    var item = props.item, onLoad = props.onLoad;
    return (<>
            <antd_1.Row className='recent-item' wrap={false}>
                <antd_1.Col flex='auto'>
                    <div>
                        <antd_1.Typography.Text strong>{item.tokenToRead}</antd_1.Typography.Text>
                    </div>
                    <div>
                        <antd_1.Typography.Text type='secondary'>{(0, date_fns_1.formatDistanceToNow)(new Date(item.date), { addSuffix: true })}</antd_1.Typography.Text>
                    </div>
                </antd_1.Col>

                <antd_1.Col flex='none'>
                    <antd_1.Button onClick={function () { return onLoad(item); }}>
                        <icons_1.DownloadOutlined />
                    </antd_1.Button>
                </antd_1.Col>
            </antd_1.Row>
        </>);
});
