/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { Layout } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { ClipboardContainer } from '@app/core';
import { EditorView, LoadingMenu, PresentMenu, ShapeView, TabView, ToolView, Pages } from '@app/wireframes/components';
import { getSelectedItems, getSelectedShape, loadDiagramFromServer, newDiagram, useStore } from '@app/wireframes/model';
import { CustomDragLayer } from './wireframes/components/CustomDragLayer';
import { OverlayContainer } from './wireframes/contexts/OverlayContext';

export const App = () => {
    const dispatch = useDispatch();
    const route = useRouteMatch();
    const routeToken = route.params['token'] || null;
    const routeTokenSnapshot = React.useRef(routeToken);
    const showRightSidebar = useStore(s => s.ui.showRightSidebar);
    const selectedItem = useStore(getSelectedShape);
    const selectedSet = useStore(getSelectedItems);

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

                        <ToolView item={selectedItem} set={selectedSet}/>

                        <span style={{ float: 'right' }}>
                            <PresentMenu />
                        </span>
                    </Layout.Header>

                    <Layout className='content'>
                        <Layout.Sider width={50} className='sidebar-left'>
                            <ShapeView />
                        </Layout.Sider>

                        <Layout>
                            <Layout.Content className='editor-content'>
                                <EditorView spacing={40} />
                            </Layout.Content>
                            <Layout.Footer style={{ padding: 0 }} >
                                <Pages />
                                {/* <PanelView /> */}
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
