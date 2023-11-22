/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { Layout } from 'antd';
// import classNames from 'classnames';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { ClipboardContainer } from '@app/core';
import { ArrangeMenu, ClipboardMenu, EditorView, PanelView, HistoryMenu, LoadingMenu, LockMenu,  PresentMenu, ShapeMenu, TableMenu, TabView } from '@app/wireframes/components';
import { loadDiagramFromServer, newDiagram, useStore } from '@app/wireframes/model';
import { CustomDragLayer } from './wireframes/components/CustomDragLayer';
import { OverlayContainer } from './wireframes/contexts/OverlayContext';

export const App = () => {
    const dispatch = useDispatch();
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
                            <PresentMenu />
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
                                <PanelView />
                            </Layout.Footer>
                        </Layout>

                        <Layout.Sider width={330} className='sidebar-right'
                            collapsed={!showRightSidebar}
                            collapsedWidth={40}>
                                <TabView collapse={!showRightSidebar}/>
                        </Layout.Sider>
                    </Layout>
                </Layout>

                <CustomDragLayer />
            </ClipboardContainer>
        </OverlayContainer>
    );
};
