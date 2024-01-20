/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ConfigProvider, Layout } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { ClipboardContainer } from '@app/core';
import { EditorView, ShapeView, ToolView, PagesView, HeaderView, TabView } from '@app/wireframes/components';
import { getSelectedItems, getSelectedShape, loadDiagramFromServer, newDiagram, useStore } from '@app/wireframes/model';
import { CustomDragLayer } from './wireframes/components/CustomDragLayer';
import { OverlayContainer } from './wireframes/contexts/OverlayContext';

export const App = () => {
    const dispatch = useDispatch();
    const route = useRouteMatch();
    // @ts-ignore
    const routeToken = route.params['token'] || null;
    const routeTokenSnapshot = React.useRef(routeToken);
    const selectedItem = useStore(getSelectedShape);
    const selectedSet = useStore(getSelectedItems);
    const applicationMode = useStore(s => s.ui.selectedApplicationMode);
    const sidebarWidth = useStore(s => s.ui.sidebarSize);

    const SHAPE_WIDTH = 38;
    const PREVIEW_WIDTH = 128;
    const PREVIEW_HEIGHT = 72;
    const EDITOR_MARGIN = 20;
    const designBarVisibility = applicationMode != 'animation';

    React.useEffect(() => {
        const token = routeTokenSnapshot.current;

        if (token && token.length > 0) {
            dispatch(loadDiagramFromServer({ tokenToRead: token, navigate: false }));
        } else {
            dispatch(newDiagram(false));
        }
    }, [dispatch]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Dropdown: {
                        paddingBlock: 7,
                    },
                    Layout: {
                        headerHeight: 56,
                    },
                    Tabs: {
                        horizontalItemGutter: 16,
                    }
                },
                token: {
                    borderRadiusLG: 16,
                    borderRadiusSM: 12,
                },
            }}
        >
            <OverlayContainer>
                <ClipboardContainer>
                    <Layout className='screen-mode'>
                        <Layout.Header>
                            <HeaderView />
                        </Layout.Header>

                        <Layout className='content'>
                            { designBarVisibility
                                ? <Layout>
                                    <Layout.Header className='header-toolbar'>
                                        <ToolView item={selectedItem} set={selectedSet} />
                                    </Layout.Header>
                                    <Layout>
                                        <Layout.Sider width={SHAPE_WIDTH} className='sidebar-left'>
                                            <ShapeView />
                                        </Layout.Sider>
                                        <Layout className='editor-content'>
                                            <EditorView spacing={EDITOR_MARGIN} />
                                        </Layout>
                                    </Layout>
                                </Layout>
                                
                                : <Layout className='editor-content'>
                                    <EditorView spacing={EDITOR_MARGIN} />
                                </Layout>
                            }

                            <Layout.Sider 
                                width={sidebarWidth} 
                                className='sidebar-right'>
                                    <TabView />
                            </Layout.Sider>
                        </Layout>

                        <Layout.Footer style={{ padding: 0 }} >
                            <PagesView prevWidth={PREVIEW_WIDTH} prevHeight={PREVIEW_HEIGHT} />
                        </Layout.Footer>
                    </Layout>
                    <CustomDragLayer />
                </ClipboardContainer>
            </OverlayContainer>
        </ConfigProvider>
    );
};
