/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 8 Nov 2023
*/

import { useDispatch } from 'react-redux';
import { Button, Dropdown, Form, Input } from 'antd';
import type { MenuProps } from 'antd';
import { getDiagramId, useStore, addShape } from '@app/wireframes/model';
import * as React from 'react';
import { CircleIcon, FunctionIcon, ImageIcon, RectangleIcon, TableIcon, TextIcon, TriangleIcon, ShapesIcon, LinkIcon, HeadingIcon, SubHeadingIcon, ParagraphIcon } from '@app/icons/icon';
import './ShapeView.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { ModalForm } from './overlay/ModalForm';

export const ShapeView = React.memo(() => {
    const dispatch = useDispatch();
    const selectedDiagramId = useStore(getDiagramId);
    const [selectedCell, setSelectedCell] = useState(0);
    const [isImageURL, setIsImageURL] = useState(false);

    const OFFSET_DROPDOWN = [45, -45];  // Place to the left
    const CELL_ATTR = { size: 16, cols: 8, rows: 8 }; // Max table creation size
    const DROPDOWN_PADD = 16 * 2;
    const dropdownWidth = (CELL_ATTR.size + 4) * CELL_ATTR.cols - 4;
    const numRow = Math.floor(selectedCell / CELL_ATTR.cols) + 1;
    const numCol = selectedCell % CELL_ATTR.cols + 1;
    

    const handleImageURLOk = (values: any) => {
        createNewShape('Image', { 'TEXT': values.image_url })
        setIsImageURL(false);
    };

    const createNewShape = (renderer: string, appearance?: any) => {
        if (selectedDiagramId) {
            dispatch(addShape(selectedDiagramId, renderer, { position: { x: 10, y: 10 }, appearance: appearance }));
        }
    };

    const textMenu: MenuProps['items'] = [
        { key: 'Heading', label: 'Heading', icon: <HeadingIcon />, className: 'menu-shape', },
        { key: 'Subheading', label: 'Subheading', icon: <SubHeadingIcon />, className: 'menu-shape', },
        { key: 'Paragraph', label: 'Paragraph', icon: <ParagraphIcon />, className: 'menu-shape', },
        { type: 'divider' },
        { key: 'Equation', label: 'Equation', icon: <FunctionIcon />, className: 'menu-shape', }
    ];

    const cellMenu: MenuProps['items'] = [
        { key: 'Cell', className:'menu-table', label: <>
            <div className='menu-table' style={{ width: dropdownWidth }} >
                {[...Array(CELL_ATTR.rows * CELL_ATTR.cols)].map((e, i) =>
                    <div
                        key={i}
                        className={classNames('menu-cell', { active: (i <= selectedCell) && ((i % CELL_ATTR.cols) < numCol) })}
                        style={{ width: CELL_ATTR.size, height: CELL_ATTR.size }}
                        onMouseEnter={() => setSelectedCell(i)} />
                )}
            </div>
            <p className='menu-table-text'>
                {`${numCol} x ${numRow}`}
            </p>
        </> }
    ];

    const shapeMenu: MenuProps['items'] = [
        { key: 'Rectangle', label: 'Rectangle', icon: <RectangleIcon />, className: 'menu-shape', },
        { key: 'Ellipse', label: 'Ellipse', icon: <CircleIcon />, className: 'menu-shape', },
        { key: 'Triangle', label: 'Triangle', icon: <TriangleIcon />, className: 'menu-shape', }
    ];

    const imageMenu: MenuProps['items'] = [
        { key: 'url',  label: 'By URL', icon: <LinkIcon />, className: 'menu-shape', }
    ]

    const textMenuEvt: MenuProps['onClick'] = ({key}) => {
        if (key == 'Heading') {
            createNewShape('Textbox', { 'TEXT': 'Add a heading', 'FONT_SIZE': 60 })
        } else if (key == 'Subheading') {
            createNewShape('Textbox', { 'TEXT': 'Add a subheading', 'FONT_SIZE': 40 })
        } else if (key == 'Paragraph') {
            createNewShape('Textbox', { 'TEXT': 'Add a paragraph', 'FONT_SIZE': 24 })
        } else if (key == 'Equation') {
            createNewShape('Equation')
        }
    };

    const cellMenuEvtClick: MenuProps['onClick'] = () => {
        createNewShape('Table', { 'TEXT': Array(numRow).join(Array(numCol).join(',') + ';') });
    };

    const cellMenuEvtLeave: MenuProps['onMouseLeave'] = () => {
        setSelectedCell(0);
    };

    const shapeMenuEvt: MenuProps['onClick'] = ({key}) => { createNewShape(key) };

    const imageMenuEvt: MenuProps['onClick'] = () => { setIsImageURL(true) };    

    return (
        <>
            <Dropdown
                menu={{
                    items: textMenu,
                    onClick: textMenuEvt,
                    style: { width: dropdownWidth + DROPDOWN_PADD },
                }}
                align={{ offset: OFFSET_DROPDOWN }}
                trigger={['click']}
            >
                    <Button className='item' type='text' >
                        <TextIcon />
                    </Button>
            </Dropdown>

            <Dropdown
                menu={{
                    items: cellMenu,
                    onClick: cellMenuEvtClick, onMouseLeave: cellMenuEvtLeave,
                    className: 'menu-table',
                }}
                align={{ offset: OFFSET_DROPDOWN }}
                trigger={['click']}
            >
                    <Button className='item' type='text' >
                        <TableIcon />
                    </Button>
            </Dropdown>

            <Dropdown
                menu={{ 
                    items: shapeMenu, 
                    onClick: shapeMenuEvt,
                    style: { width: dropdownWidth + DROPDOWN_PADD }, 
                }}
                align={{ offset: OFFSET_DROPDOWN }}
                trigger={['click']}
            >
                    <Button className='item' type='text' >
                        <ShapesIcon />
                    </Button>
            </Dropdown>

            <Dropdown
                menu={{ 
                    items: imageMenu, 
                    onClick: imageMenuEvt,
                    style: { width: dropdownWidth + DROPDOWN_PADD }, 
                }}
                align={{ offset: OFFSET_DROPDOWN }}
                trigger={['click']}
            >
                    <Button className='item' type='text' >
                        <ImageIcon />
                    </Button>
            </Dropdown>

            <ModalForm
                title='Add Image'
                okText='Add'
                open={isImageURL}
                onCancel={() => setIsImageURL(false)}
                onCreate={handleImageURLOk} 
                formItems={
                    <>
                        <div style={{ height: 20 }} />
                        <Form.Item name="image_url">
                            <Input type="textarea" placeholder="Paste URL of image..." />
                        </Form.Item>
                    </>
                }
            />
        </>
    );
});
