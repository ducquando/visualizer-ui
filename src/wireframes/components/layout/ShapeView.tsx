/*
 * mydraft.cc
 *
 * Do Duc Quan
 * 8 Nov 2023
*/

import { useDispatch } from 'react-redux';
import { Button, Dropdown, Form, Input, Modal, Tooltip } from 'antd';
import { getDiagramId, useStore,addShape } from '@app/wireframes/model';
import * as React from 'react';
import { CircleIcon, FunctionIcon, ImageIcon, RectangleIcon, TableIcon, TextIcon, TriangleIcon, ShapesIcon, LinkIcon } from '@app/icons/icon';
import './ShapeView.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const ShapeView = React.memo(() => {
    const dispatch = useDispatch();
    const selectedDiagramId = useStore(getDiagramId);
    const [selectedCell, setSelectedCell] = useState(0);
    const [isImageURL, setIsImageURL] = useState(false);

    const showImageURL = () => {
        setIsImageURL(true);
    };

    const handleImageURLOk = (values: any) => {
        createNewShape('Image', {'TEXT': values.image_url})
        setIsImageURL(false);
    };
    const handleImageURLCancel = () => {
        setIsImageURL(false);
    };

    const cellAttr = { size: 16, cols: 8, rows: 8 };
    const dropdownWidth = (cellAttr.size + 4) * cellAttr.cols - 4;

    interface ShapeButtonProps {
        shape: string;
        icon?: JSX.Element;
    }

    const createNewShape = (renderer: string, appearance?: any) => {
        if (selectedDiagramId) {
            dispatch(addShape(selectedDiagramId, renderer, { position: { x: 10, y: 10 }, appearance: appearance }));
        }
    };

    const newShapeButton = (shape: string, icon?: JSX.Element) => {
        return (
            <Tooltip title={`Add ${shape}`} mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Button className='item' type='text' onClick={() => createNewShape(shape)}>
                    {icon}
                </Button>
            </Tooltip>
        )
    }

    const CellButton = () => (
        <div className='menu-dropdown'
            onMouseLeave={() => setSelectedCell(0)}
            onClick={() => createNewShape('Table', {'TEXT': Array(Math.floor(selectedCell / cellAttr.cols) + 1).join(Array(selectedCell % cellAttr.cols + 1).join(',') + ';')})}
        >    
            <div className='menu-table' style={{ width: dropdownWidth }} >
                {[...Array(cellAttr.rows * cellAttr.cols)].map((e, i) => 
                    <div
                    key={i}
                    className={classNames('menu-cell', { active: (i <= selectedCell) && ((i % cellAttr.cols) <= (selectedCell % cellAttr.cols)) })}
                    style={{ width: cellAttr.size, height: cellAttr.size }}
                    onMouseEnter={() => setSelectedCell(i)} />
                )}
            </div>
            <p className='menu-table-text'>
                {`${selectedCell % cellAttr.cols + 1} x ${Math.floor(selectedCell / cellAttr.cols) + 1}`}
            </p>
        </div>
    )

    const ShapeButtonHelper = (props: ShapeButtonProps) => (
        <Button block type='text'
            className='menu-shape'
            icon={props.icon}
            style={{ display: 'flex', width: dropdownWidth }}
            onClick={() => createNewShape(props.shape)}
        >
            <p>{props.shape}</p>
        </Button>
    )

    const ShapeButton = () => (
        <div className='menu-dropdown'>  
            <ShapeButtonHelper shape='Rectangle' icon={<RectangleIcon />} />
            <ShapeButtonHelper shape='Ellipse' icon={<CircleIcon />} />
            <ShapeButtonHelper shape='Triangle' icon={<TriangleIcon />} />
        </div>
    )

    interface CollectionCreateFormProps {
        open: boolean;
        onCreate: (values: any) => void;
        onCancel: () => void;
    }

    const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
        open,
        onCreate,
        onCancel,
      }) => {
        const [form] = Form.useForm();
        return (
          <Modal
            visible={open}
            title="Add Image by URL"
            okText='Add'
            cancelText="Cancel"
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
            centered={true}
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

    const ImageButton = () => (
        <>
            <div className='menu-dropdown'>
                <Button block type='text'
                    className='menu-shape'
                    style={{ display: 'flex', width: dropdownWidth }}
                    icon={<LinkIcon />}
                    onClick={showImageURL}
                >
                    By URL
                </Button>
                
            </div>
            <CollectionCreateForm
                open={isImageURL}
                onCancel={handleImageURLCancel}
                onCreate={handleImageURLOk}
            />
        </>
    )

    return (
        <>
            { newShapeButton('Textbox', <TextIcon />) }
            { newShapeButton('Equation', <FunctionIcon />) }

            <Tooltip title='Add table' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={ <CellButton /> } trigger={['click']} >
                    <Button className='item' type='text' >
                        <TableIcon />
                    </Button>
                </Dropdown>
            </Tooltip>

            <Tooltip title='Add shape' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={ <ShapeButton /> } trigger={['click']} >
                    <Button className='item' type='text' >
                        <ShapesIcon />
                    </Button>
                </Dropdown>
            </Tooltip>

            <Tooltip title='Add image' mouseEnterDelay={0.25} mouseLeaveDelay={0}>
                <Dropdown overlay={ <ImageButton /> } trigger={['click']} >
                    <Button className='item' type='text' >
                        <ImageIcon />
                    </Button>
                </Dropdown>
            </Tooltip>
        </>
    );
});
