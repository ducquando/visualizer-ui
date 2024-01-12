/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 8 Nov 2023
*/

import { useDispatch } from 'react-redux';
import { Button, Dropdown, Form, Input, Modal, Tooltip } from 'antd';
import { getDiagramId, useStore, addShape } from '@app/wireframes/model';
import * as React from 'react';
import { CircleIcon, FunctionIcon, ImageIcon, RectangleIcon, TableIcon, TextIcon, TriangleIcon, ShapesIcon, LinkIcon, HeadingIcon, SubHeadingIcon, ParagraphIcon } from '@app/icons/icon';
import './ShapeView.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const ShapeView = React.memo(() => {
    const dispatch = useDispatch();
    const selectedDiagramId = useStore(getDiagramId);
    const [selectedCell, setSelectedCell] = useState(0);
    const [isImageURL, setIsImageURL] = useState(false);

    const cellAttr = { size: 16, cols: 8, rows: 8 };
    const dropdownWidth = (cellAttr.size + 4) * cellAttr.cols - 4;

    interface ButtonHelperProps {
        shape: string;
        icon?: JSX.Element;
        title?: string;
        appearance?: any;
    }

    interface ModalFormProps {
        open: boolean;
        onCreate: (values: any) => void;
        onCancel: () => void;
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
            <div className='menu-dropdown'>
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
                onClick={() => createNewShape('Table', { 'TEXT': Array(numRow).join(Array(numCol).join(',') + ';') })}
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
            <div className='menu-dropdown'>
                <ButtonHelper shape='Rectangle' icon={<RectangleIcon />} />
                <ButtonHelper shape='Ellipse' icon={<CircleIcon />} />
                <ButtonHelper shape='Triangle' icon={<TriangleIcon />} />
            </div>
        )
    }

    const ImageButton: React.FC = () => {
        const ModalForm: React.FC<ModalFormProps> = (props: ModalFormProps) => {
            const { open, onCreate, onCancel } = props;
            const [form] = Form.useForm();
            return (
                <Modal
                    visible={open}
                    title="Add Image by URL"
                    okText='Add'
                    cancelText="Cancel"
                    centered={true}
                    onCancel={onCancel}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                onCreate(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item name="image_url" label="URL">
                            <Input type="textarea" placeholder="Paste URL of image..." />
                        </Form.Item>
                    </Form>
                </Modal>
            );
        };

        return (
            <>
                <div className='menu-dropdown'>
                    <Button block type='text'
                        className='menu-shape'
                        style={{ display: 'flex', width: dropdownWidth }}
                        icon={<LinkIcon />}
                        onClick={() => setIsImageURL(true)}
                    > By URL </Button>
                </div>
                <ModalForm
                    open={isImageURL}
                    onCancel={() => setIsImageURL(false)}
                    onCreate={handleImageURLOk}
                />
            </>
        )
    }

    return (
        <>
            <Tooltip title='Add text' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={<TextButton />} trigger={['click']} >
                    <Button className='item' type='text' >
                        <TextIcon />
                    </Button>
                </Dropdown>
            </Tooltip>

            <Tooltip title='Add table' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={<CellButton />} trigger={['click']} >
                    <Button className='item' type='text' >
                        <TableIcon />
                    </Button>
                </Dropdown>
            </Tooltip>

            <Tooltip title='Add shape' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={<ShapeButton />} trigger={['click']} >
                    <Button className='item' type='text' >
                        <ShapesIcon />
                    </Button>
                </Dropdown>
            </Tooltip>

            <Tooltip title='Add image' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={<ImageButton />} trigger={['click']} >
                    <Button className='item' type='text' >
                        <ImageIcon />
                    </Button>
                </Dropdown>
            </Tooltip>
        </>
    );
});
