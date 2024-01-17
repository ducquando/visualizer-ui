/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 8 Nov 2023
*/

import { useDispatch } from 'react-redux';
import { Button, Dropdown, Form, Input } from 'antd';
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
    const [isDropdownOpen, setIsDropdownOpen] = useState({'image': false, 'textbox': false, 'shape': false, 'cell': false});

    const cellAttr = { size: 16, cols: 8, rows: 8 };
    const dropdownWidth = (cellAttr.size + 4) * cellAttr.cols - 4;

    interface ButtonHelperProps {
        shape: string;
        icon?: JSX.Element;
        title?: string;
        appearance?: any;
    }

    const handleImageURLOk = (values: any) => {
        createNewShape('Image', { 'TEXT': values.image_url })
        setIsImageURL(false);
    };

    const createNewShape = (renderer: string, appearance?: any) => {
        if (selectedDiagramId) {
            dispatch(addShape(selectedDiagramId, renderer, { position: { x: 10, y: 10 }, appearance: appearance }));
        }
    };

    const ButtonHelper: React.FC<ButtonHelperProps> = (props: ButtonHelperProps) => (
        <Button block type='text'
            className='menu-shape'
            icon={props.icon}
            style={{ display: 'flex', width: dropdownWidth }}
            onClick={() => createNewShape(props.shape, props.appearance)}
        >
            <p>{(!props.title) ? props.shape : props.title}</p>
        </Button>
    )

    const TextButton: React.FC = () => {
        return (
            <div className='menu-dropdown' onClick={() => setIsDropdownOpen({...isDropdownOpen, textbox: false})}>
                <ButtonHelper
                    shape='Textbox'
                    icon={<HeadingIcon />}
                    title='Heading'
                    appearance={{ 'TEXT': 'Add a heading', 'FONT_SIZE': 60 }} />
                <ButtonHelper
                    shape='Textbox'
                    icon={<SubHeadingIcon />}
                    title='Subheading'
                    appearance={{ 'TEXT': 'Add a subheading', 'FONT_SIZE': 40 }} />
                <ButtonHelper
                    shape='Textbox'
                    icon={<ParagraphIcon />}
                    title='Paragraph'
                    appearance={{ 'TEXT': 'Add a paragraph', 'FONT_SIZE': 24 }} />
                <hr style={{ margin: '4px 0' }} />
                <ButtonHelper
                    shape='Equation'
                    icon={<FunctionIcon />} />
            </div>
        )
    }

    const CellButton: React.FC = () => {
        const numRow = Math.floor(selectedCell / cellAttr.cols) + 1;
        const numCol = selectedCell % cellAttr.cols + 1;
        return (
            <div className='menu-dropdown'
                onMouseLeave={() => setSelectedCell(0)}
                onClick={() => {
                    createNewShape('Table', { 'TEXT': Array(numRow).join(Array(numCol).join(',') + ';') });
                    setIsDropdownOpen({...isDropdownOpen, cell: false});
                }}
            >
                <div className='menu-table' style={{ width: dropdownWidth }} >
                    {[...Array(cellAttr.rows * cellAttr.cols)].map((e, i) =>
                        <div
                            key={i}
                            className={classNames('menu-cell', { active: (i <= selectedCell) && ((i % cellAttr.cols) < numCol) })}
                            style={{ width: cellAttr.size, height: cellAttr.size }}
                            onMouseEnter={() => setSelectedCell(i)} />
                    )}
                </div>
                <p className='menu-table-text'>
                    {`${numCol} x ${numRow}`}
                </p>
            </div>
        )
    }

    const ShapeButton: React.FC = () => {
        return (
            <div className='menu-dropdown' onClick={() => {setIsDropdownOpen({...isDropdownOpen, shape: false});}}>
                <ButtonHelper shape='Rectangle' icon={<RectangleIcon />} />
                <ButtonHelper shape='Ellipse' icon={<CircleIcon />} />
                <ButtonHelper shape='Triangle' icon={<TriangleIcon />} />
            </div>
        )
    }

    const ImageButton: React.FC = () => (
        <>
            <div className='menu-dropdown' onClick={() => {setIsDropdownOpen({...isDropdownOpen, image: false});}}>
                <Button block type='text'
                    className='menu-shape'
                    style={{ display: 'flex', width: dropdownWidth }}
                    icon={<LinkIcon />}
                    onClick={() => setIsImageURL(true)}
                > By URL </Button>
            </div>
            <ModalForm
                title='Add Image'
                okText='Add'
                open={isImageURL}
                onCancel={() => setIsImageURL(false)}
                onCreate={handleImageURLOk} 
                formItems={
                    <Form.Item name="image_url" label="URL">
                        <Input type="textarea" placeholder="Paste URL of image..." />
                    </Form.Item>
                }
            />
        </>
    )

    return (
        <>
            <Dropdown
                overlay={<TextButton />}
                trigger={['click']}
                open={isDropdownOpen.textbox}
                onOpenChange={(e) => {
                    setIsDropdownOpen({...isDropdownOpen, textbox: e.valueOf()});
                }} >
                    <Button className='item' type='text' >
                        <TextIcon />
                    </Button>
            </Dropdown>

            <Dropdown
                overlay={<CellButton />}
                trigger={['click']}
                open={isDropdownOpen.cell}
                onOpenChange={(e) => {
                    setIsDropdownOpen({...isDropdownOpen, cell: e.valueOf()});
                }} >
                    <Button className='item' type='text' >
                        <TableIcon />
                    </Button>
            </Dropdown>

            <Dropdown
                overlay={<ShapeButton />}
                trigger={['click']}
                open={isDropdownOpen.shape}
                onOpenChange={(e) => {
                    setIsDropdownOpen({...isDropdownOpen, shape: e.valueOf()});
                }} >
                    <Button className='item' type='text' >
                        <ShapesIcon />
                    </Button>
            </Dropdown>

            <Dropdown
                overlay={<ImageButton />}
                trigger={['click']}
                open={isDropdownOpen.image}
                onOpenChange={(e) => {
                    setIsDropdownOpen({...isDropdownOpen, image: e.valueOf()});
                }} >
                    <Button className='item' type='text' >
                        <ImageIcon />
                    </Button>
            </Dropdown>
        </>
    );
});
