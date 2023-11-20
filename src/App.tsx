/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { AppstoreOutlined, CloseOutlined, ControlOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
// import classNames from 'classnames';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { ClipboardContainer, useEventCallback } from '@app/core';
import { ArrangeMenu, AnimationView, ClipboardMenu, EditorView, ErrorView, HistoryMenu, LoadingMenu, LockMenu,  PresentView, Properties, ShapeMenu, TableMenu, Pages, Outline } from '@app/wireframes/components';
import { loadDiagramFromServer, newDiagram, selectPanel, selectTab, togglePanel, toggleRightSidebar, useStore } from '@app/wireframes/model';
import { texts } from './texts';
import { CustomDragLayer } from './wireframes/components/CustomDragLayer';
import { OverlayContainer } from './wireframes/contexts/OverlayContext';

export const App = () => {
    const dispatch = useDispatch();
    const selectedPanel = useStore(s => s.ui.selectedPanel);
    const selectedTab = useStore(s => s.ui.selectedTab);
    const route = useRouteMatch();
    const routeToken = route.params['token'] || null;
    const routeTokenSnapshot = React.useRef(routeToken);
    const showPanel = useStore(s => s.ui.showPanel);
    const showRightSidebar = useStore(s => s.ui.showRightSidebar);

    React.useEffect(() => {
        const token = routeTokenSnapshot.current;

        if (token && token.length > 0) {
            dispatch(loadDiagramFromServer({ tokenToRead: token, navigate: false }));
        } else {
            dispatch(newDiagram(false));
        }
    }, [dispatch]);

    const doTogglePanel = useEventCallback(() => {
        dispatch(togglePanel());
    });

    const doToggleRightSidebar = useEventCallback(() => {
        dispatch(toggleRightSidebar());
    });

    const doSelectPanel = useEventCallback((key: string) => {
        dispatch(selectPanel(key));
        if (!showPanel) {
            doTogglePanel();
        }
    });

    const doSelectTab = useEventCallback((key: string) => {
        dispatch(selectTab(key));
        if (!showRightSidebar) {
            doToggleRightSidebar();
        }
    });

    const closeSideBar = <Button onClick={doToggleRightSidebar}
        icon={<CloseOutlined />}
        type='text'
        size='small'
        shape='circle' />
    const closePanel = <Button onClick={doTogglePanel}
        icon={showPanel ? <CloseOutlined /> : <></>}
        type='text'
        size='small'
        shape='circle' />

    return (
        <OverlayContainer>
            <ClipboardContainer>
                <Layout className='screen-mode'>
                    <Layout.Header>
                        <LoadingMenu />

                        <HistoryMenu />
                        <span className='menu-separator' />

                        <LockMenu />
                        <span className='menu-separator' />

                        <ArrangeMenu />
                        <span className='menu-separator' />

                        <ClipboardMenu />
                        <span className='menu-separator' />

                        <TableMenu />

                        <span style={{ float: 'right' }}>
                            <PresentView />
                        </span>
                    </Layout.Header>
                    <Layout className='content'>
                        <Layout.Sider width={50} className='sidebar-left'>
                            <ShapeMenu />

                        </Layout.Sider>

                        <Layout>
                            <Layout.Content className='editor-content'>
                                <EditorView spacing={40} />
                            </Layout.Content>
                            <Layout.Footer style={{ padding: 0 }} >
                                <Tabs tabBarExtraContent={closePanel} className="animation-view" type='card' onTabClick={doSelectPanel} activeKey={selectedPanel}>
                                    <Tabs.TabPane key='animation' tab={texts.common.animation}>
                                        { showPanel ? <AnimationView /> : <></> }
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key='error' tab={texts.common.error}>
                                        { showPanel ? <ErrorView /> : <></> }
                                    </Tabs.TabPane>
                                </Tabs>
                            </Layout.Footer>
                        </Layout>
                        <Layout.Sider width={330} className='sidebar-right'
                            collapsed={!showRightSidebar}
                            collapsedWidth={40}>
                                <Tabs type='card' onTabClick={doSelectTab} activeKey={selectedTab} 
                                    tabPosition={showRightSidebar ? 'top' : 'left'}
                                    tabBarExtraContent={showRightSidebar ? closeSideBar : <></>} >
                                    <Tabs.TabPane
                                        key='properties'
                                        tab={showRightSidebar ? texts.common.properties : <ControlOutlined />} >
                                        <Properties />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key='pages'
                                        tab={showRightSidebar ? texts.common.pages : <AppstoreOutlined />} >
                                        <Pages />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key='outline'
                                        tab={showRightSidebar ? texts.common.outline : <ProfileOutlined />} >
                                        <Outline />
                                    </Tabs.TabPane>
                                </Tabs>
                        </Layout.Sider>
                    </Layout>
                </Layout>

                <CustomDragLayer />
            </ClipboardContainer>
        </OverlayContainer>
    );
};
