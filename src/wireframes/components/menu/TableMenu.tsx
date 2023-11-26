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
import { getAddToTable, getRemoveFrTable } from '@app/wireframes/shapes/neutral/table';
import { useDispatch } from 'react-redux';
import { texts } from '@app/texts';

export const TableMenu = React.memo(() => {
    const dispatch = useDispatch();
    const selectedItem = useStore(getSelectedShape);
    const selectedDiagram = useStore(getDiagram);

    const modifyTable = useEventCallback((mode: string, type: string) => {
        if (selectedItem && selectedDiagram) {
            let delimiter: string;
            let selectedIndex: number;
            let newText: string;

            switch (type) {
                case 'column':
                case 'left':
                default:
                    selectedIndex = selectedItem.getAppearance('SELECTED_CELL_X');
                    delimiter = texts.common.tableDelimiterCol;
                    break;
                case 'right':
                    selectedIndex = selectedItem.getAppearance('SELECTED_CELL_X');
                    delimiter = texts.common.tableDelimiterCol;
                    break;
                case 'row':
                case 'above':
                    selectedIndex = selectedItem.getAppearance('SELECTED_CELL_Y');
                    delimiter = texts.common.tableDelimiterRow;
                    break;
                case 'below':
                    selectedIndex = selectedItem.getAppearance('SELECTED_CELL_Y');
                    delimiter = texts.common.tableDelimiterRow;
                    break;
            }

            switch (mode) {
                case 'add':
                default:
                    newText = getAddToTable(selectedItem, selectedIndex, delimiter);
                case 'remove':
                    newText = getRemoveFrTable(selectedItem, selectedIndex, delimiter);
            }

            dispatch(changeItemsAppearance(selectedDiagram, [selectedItem.id], 'TEXT', newText));
        }
    });

    const addColumnLeft = useEventCallback(() => { modifyTable('add', 'left'); });
    const addColumnRight = useEventCallback(() => { modifyTable('add', 'right'); });
    const addRowAbove = useEventCallback(() => { modifyTable('add', 'above'); });
    const addRowBelow = useEventCallback(() => { modifyTable('add', 'below'); });
    const removeColumn = useEventCallback(() => { modifyTable('remove', 'column'); });
    const removeRow = useEventCallback(() => { modifyTable('remove', 'row'); });

    return (
        <>
            <Tooltip mouseEnterDelay={1} title={ 'Add Column Left' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addColumnLeft }>
                    <InsertRowLeftOutlined />
                </Button>
            </Tooltip>
            
            <Tooltip mouseEnterDelay={1} title={ 'Add Column Right' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addColumnRight }>
                    <InsertRowRightOutlined />
                </Button>
            </Tooltip>     
            <Tooltip mouseEnterDelay={1} title={ 'Add Row Above' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addRowAbove }>
                    <InsertRowAboveOutlined />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Add Row Below' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ addRowBelow }>
                    <InsertRowBelowOutlined />
                </Button>
            </Tooltip>

            <span className='menu-separator' />

            <Tooltip mouseEnterDelay={1} title={ 'Delete Column' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ removeColumn }>
                    <DeleteColumnOutlined />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Delete Row' }>
                <Button size='large' disabled={selectedItem?.renderer != 'Table'} className='menu-item' onClick={ removeRow }>
                    
                    <DeleteRowOutlined />
                </Button>
            </Tooltip>
        </>
    );
});
