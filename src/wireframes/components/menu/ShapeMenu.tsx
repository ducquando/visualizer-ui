/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 8 Nov 2023
*/

import { useDispatch } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { getDiagramId, useStore,addShape } from '@app/wireframes/model';
import * as React from 'react';
import { CircleIcon, FunctionIcon, ImageIcon, RectangleIcon, TableIcon, TextIcon, TriangleIcon } from '@app/icons/icon';

export const ShapeMenu = React.memo(() => {
    const dispatch = useDispatch();
    const selectedDiagramId = useStore(getDiagramId);

    const createNewShape = (renderer: string) => {
        if (selectedDiagramId) {
            dispatch(addShape(selectedDiagramId, renderer, { position: { x: 10, y: 10 } }));
        }
    };

    return (
        <>
            <Tooltip mouseEnterDelay={1} title={ 'Textbox' }>
                <Button className='item' onClick={ () => createNewShape('Textbox') }>
                    <TextIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Latex' }>
                <Button className='item' onClick={ () => createNewShape('Equation') }>
                    <FunctionIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Table' }>
                <Button className='item' onClick={ () => createNewShape('Table') }>
                    <TableIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Rectangle' }>
                <Button className='item' onClick={ () => createNewShape('Rectangle') }>
                    <RectangleIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Ellipse' }>
                <Button className='item' onClick={ () => createNewShape('Ellipse') }>
                    <CircleIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Triangle' }>
                <Button className='item' onClick={ () => createNewShape('Triangle') }>
                    <TriangleIcon />
                </Button>
            </Tooltip>
            <Tooltip mouseEnterDelay={1} title={ 'Image' }>
                <Button className='item' onClick={ () => createNewShape('Image') }>
                    <ImageIcon />
                </Button>
            </Tooltip>
        </>
    );
});
