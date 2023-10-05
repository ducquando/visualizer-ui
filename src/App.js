"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.App = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var core_1 = require("@app/core");
var components_1 = require("@app/wireframes/components");
var model_1 = require("@app/wireframes/model");
var texts_1 = require("./texts");
var CustomDragLayer_1 = require("./wireframes/components/CustomDragLayer");
var PresentationView_1 = require("./wireframes/components/PresentationView");
var OverlayContext_1 = require("./wireframes/contexts/OverlayContext");
var logo = require('./images/logo.svg')["default"];
var App = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var route = (0, react_router_1.useRouteMatch)();
    var routeToken = route.params['token'] || null;
    var routeTokenSnapshot = React.useRef(routeToken);
    var selectedTab = (0, model_1.useStore)(function (s) { return s.ui.selectedTab; });
    var showLeftSidebar = (0, model_1.useStore)(function (s) { return s.ui.showLeftSidebar; });
    var showRightSidebar = (0, model_1.useStore)(function (s) { return s.ui.showRightSidebar; });
    var _a = React.useState(false), presenting = _a[0], setPresenting = _a[1];
    var _b = (0, core_1.usePrinter)(), print = _b[0], printReady = _b[1], isPrinting = _b[2], ref = _b[3];
    React.useEffect(function () {
        var token = routeTokenSnapshot.current;
        if (token && token.length > 0) {
            dispatch((0, model_1.loadDiagramFromServer)({ tokenToRead: token, navigate: false }));
        }
        else {
            dispatch((0, model_1.newDiagram)(false));
        }
    }, [dispatch]);
    React.useEffect(function () {
        if (isPrinting) {
            dispatch((0, model_1.showToast)(texts_1.texts.common.printingStarted));
        }
    }, [dispatch, isPrinting]);
    var doSelectTab = (0, core_1.useEventCallback)(function (key) {
        dispatch((0, model_1.selectTab)(key));
    });
    var doToggleLeftSidebar = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.toggleLeftSidebar)());
    });
    var doToggleRightSidebar = (0, core_1.useEventCallback)(function () {
        dispatch((0, model_1.toggleRightSidebar)());
    });
    var doEdit = (0, core_1.useEventCallback)(function () {
        setPresenting(false);
    });
    var doPresent = (0, core_1.useEventCallback)(function () {
        setPresenting(true);
    });
    return (<OverlayContext_1.OverlayContainer>
            <core_1.ClipboardContainer>
                <antd_1.Layout className='screen-mode'>
                    <antd_1.Layout.Header>
                        <img className='logo' src={logo} alt='mydraft.cc'/>

                        <components_1.HistoryMenu />
                        <span className='menu-separator'/>

                        <components_1.LockMenu />
                        <span className='menu-separator'/>

                        <components_1.ArrangeMenu />
                        <span className='menu-separator'/>

                        <components_1.ClipboardMenu />
                        <span className='menu-separator'/>

                        <components_1.UIMenu onPlay={doPresent}/>
                        <span className='menu-separator'/>

                        <components_1.SettingsMenu onPrint={print}/>

                        <span style={{ float: 'right' }}>
                            <components_1.LoadingMenu />
                        </span>
                    </antd_1.Layout.Header>
                    <antd_1.Layout className='content'>
                        <antd_1.Layout.Sider width={300} className='sidebar-left' collapsed={!showLeftSidebar} collapsedWidth={0}>

                            <antd_1.Tabs type='card' onTabClick={doSelectTab} activeKey={selectedTab}>
                                <antd_1.Tabs.TabPane key='shapes' tab={texts_1.texts.common.shapes}>
                                    <components_1.Shapes />
                                </antd_1.Tabs.TabPane>
                                <antd_1.Tabs.TabPane key='icons' tab={texts_1.texts.common.icons}>
                                    <components_1.Icons />
                                </antd_1.Tabs.TabPane>
                                <antd_1.Tabs.TabPane key='outline' tab={texts_1.texts.common.outline}>
                                    <components_1.Outline />
                                </antd_1.Tabs.TabPane>
                                <antd_1.Tabs.TabPane key='pages' tab={texts_1.texts.common.pages}>
                                    <components_1.Pages />
                                </antd_1.Tabs.TabPane>
                                <antd_1.Tabs.TabPane key='recent' tab={texts_1.texts.common.recent}>
                                    <components_1.Recent />
                                </antd_1.Tabs.TabPane>
                            </antd_1.Tabs>
                        </antd_1.Layout.Sider>
                        <antd_1.Layout.Content className='editor-content'>
                            <components_1.EditorView spacing={40}/>
                        </antd_1.Layout.Content>
                        <antd_1.Layout.Sider width={150} className='sidebar-right' collapsed={!showRightSidebar} collapsedWidth={0}>

                            <components_1.Properties />
                        </antd_1.Layout.Sider>

                        <antd_1.Button icon={showLeftSidebar ? <icons_1.LeftOutlined /> : <icons_1.RightOutlined />} className={(0, classnames_1["default"])('toggle-button-left', { visible: showLeftSidebar })} size='small' shape='circle' onClick={doToggleLeftSidebar}/>

                        <antd_1.Button icon={showRightSidebar ? <icons_1.RightOutlined /> : <icons_1.LeftOutlined />} className={(0, classnames_1["default"])('toggle-button-right', { visible: showRightSidebar })} size='small' shape='circle' onClick={doToggleRightSidebar}/>
                    </antd_1.Layout>
                    <components_1.AnimationView />
                </antd_1.Layout>

                {presenting &&
            <PresentationView_1.PresentationView onClose={doEdit}/>}

                {isPrinting &&
            <div className='print-mode' ref={ref}>
                        <components_1.PrintView onRender={printReady}/>
                    </div>}

                <CustomDragLayer_1.CustomDragLayer />
            </core_1.ClipboardContainer>
        </OverlayContext_1.OverlayContainer>);
};
exports.App = App;
