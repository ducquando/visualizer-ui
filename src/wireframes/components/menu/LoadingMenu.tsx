/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

// import { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import * as React from 'react';
import { Title } from '@app/core';
import { texts } from '@app/texts';
import { useStore } from '@app/wireframes/model';
import { ActionMenuItem, useLoading } from './../actions';
import { ArrangeMenu, FileMenu, HistoryMenu, ZoomMenu } from './tools';
import './LoadingMenu.scss'

// const text = require('@app/legal.html');

export const LoadingMenu = React.memo(() => {
    const forLoading = useLoading();
    const editor = useStore(s => s.editor);
    const tokenToRead = useStore(s => s.loading.tokenToRead);
    const tokenToWrite = useStore(s => s.loading.tokenToWrite);
    const saveTimer = React.useRef<any>();
    const saveAction = React.useRef(forLoading.saveDiagram);

    saveAction.current = forLoading.saveDiagram;

    React.useEffect(() => {
        function clearTimer() {
            if (saveTimer.current) {
                clearInterval(saveTimer.current);
                saveTimer.current = null;
            }
        }

        if (tokenToWrite) {
            if (!saveTimer.current) {
                saveTimer.current = setInterval(() => {
                    if (!saveAction.current.disabled) {
                        saveAction.current.onAction();
                    }
                }, 30000);
            }

            const stopTimer = setTimeout(() => {
                clearTimer();
            }, 40000);

            return () => {
                clearTimeout(stopTimer);
            };
        } else {
            clearTimer();

            return undefined;
        }
    }, [tokenToWrite, editor]);

    const menu = (
        <Menu className='action-dropdown'>
            <ActionMenuItem displayMode='IconLabel' action={forLoading.newDiagram} />
            <ActionMenuItem displayMode='IconLabel' action={forLoading.openDiagramAction} />
            <ActionMenuItem displayMode='IconLabel' action={forLoading.saveDiagram} />
            <ActionMenuItem displayMode='IconLabel' action={forLoading.saveDiagramToFile} />
        </Menu>
    );

    return (
        <div className='header-left'>
            <CustomTitle token={tokenToRead} />
            <ArrangeMenu />

            <FileMenu label='File' overlay={menu} />
            <span className='menu-separator' />
            <HistoryMenu />
            <span className='menu-separator' />
            <ZoomMenu />
        </div>
    );
});

const CustomTitle = React.memo(({ token }: { token?: string | null }) => {
    const title = token && token.length > 0 ?
        `Visualizer - Diagram ${token}` :
        `Visualizer - Diagram ${texts.common.unsaved}`;

    return (
        <Title text={title} />
    );
});
