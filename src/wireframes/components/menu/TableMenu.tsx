/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 15 Oct 2023
*/

import { DeleteColumnOutlined, DeleteRowOutlined, InsertRowAboveOutlined, InsertRowBelowOutlined, InsertRowLeftOutlined, InsertRowRightOutlined } from '@ant-design/icons';
import { useEventCallback } from '@app/core';
import { Button, Tooltip } from 'antd';
import { useStore, getSelectedShape, changeItemsAppearance, getDiagram } from '@app/wireframes/model';
import * as React from 'react';
import { getAddToTable } from '@app/wireframes/shapes/neutral/table';
import { useDispatch } from 'react-redux';
import { texts } from '@app/texts';

export const TableMenu = React.memo(() => {
    const dispatch = useDispatch();
    const selectedItem = useStore(getSelectedShape);
    const selectedDiagram = useStore(getDiagram);

    const addColumn = useEventCallback(() => {
        if (selectedItem && selectedDiagram) {
            const delimiter = texts.common.tableDelimiterCol;
            const selectedIndex = selectedItem.getAppearance('SELECTED_CELL_Y');
            const newText = getAddToTable(selectedItem, selectedIndex, delimiter);
            dispatch(changeItemsAppearance(selectedDiagram, [selectedItem.id], 'TEXT', newText));
        }
    });

    const addRow = useEventCallback(() => {
        if (selectedItem && selectedDiagram) {
            const delimiter = texts.common.tableDelimiterRow;
            const selectedIndex = selectedItem.getAppearance('SELECTED_CELL_X');
            const newText = getAddToTable(selectedItem, selectedIndex, delimiter);
            dispatch(changeItemsAppearance(selectedDiagram, [selectedItem.id], 'TEXT', newText));
        }
    });

    return (
        <>
            <Tooltip mouseEnterDelay={1} title={ 'Add Column Left' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addColumn }>
                    <InsertRowLeftOutlined />
                </Button>
            </Tooltip>
            
            <Tooltip mouseEnterDelay={1} title={ 'Add Column Right' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addColumn }>
                    <InsertRowRightOutlined />
                </Button>
            </Tooltip>     
            <Tooltip mouseEnterDelay={1} title={ 'Add Row Above' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addRow }>
                    <InsertRowAboveOutlined />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Add Row Below' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addRow }>
                    <InsertRowBelowOutlined />
                </Button>
            </Tooltip>

            <span className='menu-separator' />

            <Tooltip mouseEnterDelay={1} title={ 'Delete Column' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addColumn }>
                    <DeleteColumnOutlined />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Delete Row' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addRow }>
                    
                    <DeleteRowOutlined />
                </Button>
            </Tooltip>
        </>
    );
});
