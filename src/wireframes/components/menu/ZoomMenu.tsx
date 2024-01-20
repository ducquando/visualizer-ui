/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStore, getEditor, setZoom } from '@app/wireframes/model';
import { Button, Dropdown } from 'antd';
import { Vec2 } from '@app/core';
import type { MenuProps } from 'antd';

export const ZoomMenu = React.memo(() => {
    const dispatch = useDispatch();
    const editorSize = useStore(getEditor).size;

    const paddVert = 20 * 2 + 10 * 3 + 56 + 38 + (72 + 15 + 23) + 4; // EDITOR_MARGIN * 2 + INNER_PADD * 3 + headerHeight + SHAPE_HEIGHT + pagesHeight + (BORDER * 4)?
    const paddHori = 20 * 2 + 13 * 2 + 10 * 2 + 38 + 240 + 4; // EDITOR_MARGIN * 2 + OUTER_PADD * 2 + INNER_PADD * 2 + SHAPE_WIDTH + rightSidebar + (BORDER * 4)?;

    const [zoomValue, setZoomValue] = useState('Fit');
    const [windowSize, setWindowSize] = useState(new Vec2(window.innerWidth - paddHori, window.innerHeight - paddVert));

    const isZoom = (key: string) => {
        setZoomValue(key);
        dispatch(setZoom(getZoomValue(key)));
    };

    const getWindowSize = () => {
        setWindowSize(new Vec2(window.innerWidth - paddHori, window.innerHeight - paddVert));
    }

    React.useEffect(() => {
        if (zoomValue == 'Fit') {
            window.addEventListener('resize', getWindowSize);
            isZoom(zoomValue);
        }

        return () => {
            window.removeEventListener('resize', getWindowSize);
        };
    }, [isZoom])

    const getZoomValue = (value: string) => {
        switch (value) {
            case '50':
            case '75':
            case '100':
            case '125':
            case '150':
            case '200':
                return Number(value) / 100;
            case 'Fit':
            default:
                return Math.floor(Math.min(windowSize.x / editorSize.x, windowSize.y / editorSize.y) * 100) / 100;
        }
    }

    const zoomMenu: MenuProps['items'] = [
        { key: 'Fit', label: 'Fit', className: 'loading-action-item' },
        { type: 'divider' },
        { key: '50', label: '50%', className: 'loading-action-item' },
        { key: '75', label: '75%', className: 'loading-action-item' },
        { key: '100', label: '100%', className: 'loading-action-item' },
        { key: '125', label: '125%', className: 'loading-action-item' },
        { key: '150', label: '150%', className: 'loading-action-item' },
        { key: '200', label: '200%', className: 'loading-action-item' },
    ];

    const zoomEvt: MenuProps['onClick'] = ({key}) => {
        isZoom(key);
    };

    return (
        <>
            <Dropdown
                menu={{ items: zoomMenu, onClick: zoomEvt, selectable: true, defaultSelectedKeys: [zoomValue], }}
                className='tool-menu-item'
                trigger={['click']}>
                <Button type="text">
                    <h5>{`${Math.floor(getZoomValue(zoomValue) * 100)}%`}</h5>
                </Button>
            </Dropdown>
        </>
    );
});
