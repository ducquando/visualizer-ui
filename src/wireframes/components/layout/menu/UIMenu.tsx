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
import { Button, Dropdown, Menu } from 'antd';
import { Vec2 } from '@app/core';

const SPACE_VERTICAL = 255;
const SPACE_HORI = 195;

export const ZoomMenu = React.memo(() => {
    const dispatch = useDispatch();
    const editorSize = useStore(getEditor).size;
    const [zoomValue, setZoomValue] = useState('Fit');
    const [windowSize, setWindowSize] = useState(new Vec2(window.innerWidth - SPACE_HORI, window.innerHeight - SPACE_VERTICAL));

    const isZoom = (key: string) => {
        setZoomValue(key);
        dispatch(setZoom(getZoomValue(key)));
    };

    React.useEffect(() => {
        function getWindowSize() {
            setWindowSize(new Vec2(window.innerWidth - SPACE_HORI, window.innerHeight - SPACE_VERTICAL));
        }

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
                return Math.round(Math.min(windowSize.x / editorSize.x, windowSize.y / editorSize.y) * 100) / 100;
        }
    }

    const zoomMenu = (
        <Menu className='loading-action-dropdown' selectedKeys={[zoomValue]}>
            <Menu.Item key='Fit' className='loading-action-item' onClick={(e) => isZoom(e.key)}>Fit</Menu.Item>
            <hr style={{ margin: '4px 0' }} />
            <Menu.Item key='50' className='loading-action-item' onClick={(e) => isZoom(e.key)}>50%</Menu.Item>
            <Menu.Item key='75' className='loading-action-item' onClick={(e) => isZoom(e.key)}>75%</Menu.Item>
            <Menu.Item key='100' className='loading-action-item' onClick={(e) => isZoom(e.key)}>100%</Menu.Item>
            <Menu.Item key='125' className='loading-action-item' onClick={(e) => isZoom(e.key)}>125%</Menu.Item>
            <Menu.Item key='150' className='loading-action-item' onClick={(e) => isZoom(e.key)}>150%</Menu.Item>
            <Menu.Item key='200' className='loading-action-item' onClick={(e) => isZoom(e.key)}>200%</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown
                overlay={zoomMenu}
                className='loading-action-button'
                trigger={['click']}>
                <Button type="text">
                    <h4>{`${Math.round(getZoomValue(zoomValue) * 100)}%`}</h4>
                </Button>
            </Dropdown>
        </>
    );
});
