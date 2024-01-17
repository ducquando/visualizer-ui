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
import { EditorView, LoadingMenu, PresentMenu, ShapeView, TabView, ToolView, PagesView } from '@app/wireframes/components';
import { getSelectedItems, getSelectedShape, loadDiagramFromServer, newDiagram, useStore } from '@app/wireframes/model';
import { CustomDragLayer } from './wireframes/components/CustomDragLayer';
import { OverlayContainer } from './wireframes/contexts/OverlayContext';

export const App = () => {
    const dispatch = useDispatch();
    const route = useRouteMatch();
    // @ts-ignore
    const routeToken = route.params['token'] || null;
    const routeTokenSnapshot = React.useRef(routeToken);
    const showRightSidebar = useStore(s => s.ui.showRightSidebar);
    const selectedItem = useStore(getSelectedShape);
    const selectedSet = useStore(getSelectedItems);

    const SHAPE_WIDTH = 45;
    const PREVIEW_WIDTH = 128;
    const PREVIEW_HEIGHT = 72;
    const EDITOR_MARGIN = 30;
    const TAB_WIDTH = 330;
    const TAB_MIN_WIDTH = 40;

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
                        <div className='header-left'>
                        </div>

                        <LoadingMenu />

                        <ToolView item={selectedItem} set={selectedSet}/>

                        <span style={{ float: 'right' }}>
                            <PresentMenu />
                        </span>
                    </Layout.Header>

                    <Layout className='content'>
                        <Layout.Sider width={SHAPE_WIDTH} className='sidebar-left'>
                            <ShapeView />
                        </Layout.Sider>

                        <Layout className='editor-content'>
                            <EditorView spacing={EDITOR_MARGIN} />
                        </Layout>

                        <Layout.Sider width={TAB_WIDTH} className='sidebar-right'
                            collapsed={!showRightSidebar}
                            collapsedWidth={TAB_MIN_WIDTH}>
                                <TabView collapse={!showRightSidebar}/>
                        </Layout.Sider>
                    </Layout>

                    <Layout.Footer style={{ padding: 0 }} >
                        <PagesView prevWidth={PREVIEW_WIDTH} prevHeight={PREVIEW_HEIGHT} />
                    </Layout.Footer>
                </Layout>

                <CustomDragLayer />
            </ClipboardContainer>
        </OverlayContainer>
    );
};
