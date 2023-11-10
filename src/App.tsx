/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout, Tabs } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { ClipboardContainer, useEventCallback } from '@app/core';
import { ArrangeMenu, AnimationView, ClipboardMenu, EditorView, ErrorView, HistoryMenu, LoadingMenu, LockMenu,  PresentView, Properties, ShapeMenu, TableMenu, Pages, Outline } from '@app/wireframes/components';
import { loadDiagramFromServer, newDiagram, selectTab, toggleRightSidebar, useStore } from '@app/wireframes/model';
import { texts } from './texts';
import { CustomDragLayer } from './wireframes/components/CustomDragLayer';
import { OverlayContainer } from './wireframes/contexts/OverlayContext';

export const App = () => {
    const dispatch = useDispatch();
    const selectedTab = useStore(s => s.ui.selectedTab);
    const route = useRouteMatch();
    const routeToken = route.params['token'] || null;
    const routeTokenSnapshot = React.useRef(routeToken);
    const showRightSidebar = useStore(s => s.ui.showRightSidebar);

    React.useEffect(() => {
        const token = routeTokenSnapshot.current;

        if (token && token.length > 0) {
            dispatch(loadDiagramFromServer({ tokenToRead: token, navigate: false }));
        } else {
            dispatch(newDiagram(false));
        }
    }, [dispatch]);

    const doSelectTab = useEventCallback((key: string) => {
        dispatch(selectTab(key));
    });

    const doToggleRightSidebar = useEventCallback(() => {
        dispatch(toggleRightSidebar());
    });

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

                        <Layout.Content className='editor-content'>
                            <EditorView spacing={40} />
                        </Layout.Content>
                        <Layout.Sider width={330} className='sidebar-right'
                            collapsed={!showRightSidebar}
                            collapsedWidth={0}>

                            <Properties />
                        </Layout.Sider>

                        <Button icon={showRightSidebar ? <RightOutlined /> : <LeftOutlined />}
                            className={classNames('toggle-button-right', { visible: showRightSidebar })}
                            size='small'
                            shape='circle'
                            onClick={doToggleRightSidebar} />
                    </Layout>

                    <Layout.Footer style={{ padding: 0 }}>
                        <Tabs className="animation-view" type='card' onTabClick={doSelectTab} activeKey={selectedTab}>
                            <Tabs.TabPane key='pages' tab={texts.common.pages}>
                                <Pages />
                            </Tabs.TabPane>
                            <Tabs.TabPane key='outline' tab={texts.common.outline}>
                                <Outline />
                            </Tabs.TabPane>
                            <Tabs.TabPane key='animation' tab={texts.common.animation}>
                                <AnimationView />
                            </Tabs.TabPane>
                            <Tabs.TabPane key='error' tab={texts.common.error}>
                                <ErrorView />
                            </Tabs.TabPane>
                        </Tabs>
                    </Layout.Footer>
                </Layout>

                <CustomDragLayer />
            </ClipboardContainer>
        </OverlayContainer>
    );
};
