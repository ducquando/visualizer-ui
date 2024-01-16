import { changeName, getEditor, useStore } from '@app/wireframes/model';
import { Button, Dropdown, Form, Input, Menu } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import { ActionMenuItem } from '../../actions';
import { texts } from '@app/texts/en';
import { useDispatch } from 'react-redux';
import { ModalForm } from '../overlay/ModalForm';

type ActionDisplayMode = 'Icon' | 'IconLabel' | 'Label';

type FileMenuProps = {
    // The UI 
    forLoading: any;

    // The icon to show, if any.
    icon?: string | JSX.Element;

    // Display mode
    displayMode?: ActionDisplayMode;
};

export const FileMenu = React.memo((props: FileMenuProps) => {
    const { icon, forLoading } = props;
    const dispatch = useDispatch();
    const editor = useStore(getEditor);
    const [label, setLabel] = useState(editor.name);
    const [isRename, setIsRename] = useState(false);

    const handleRenameOk = (values: any) => {
        dispatch(changeName(values.new_name))
        setLabel(values.new_name);
        setIsRename(false);
    };

    const menu = (
        <Menu className='loading-action-dropdown'>
            <ActionMenuItem displayMode='IconLabel' action={forLoading.newDiagram} />
            <ActionMenuItem displayMode='IconLabel' action={forLoading.openDiagramAction} />
            <Menu.Item
                key={'Rename'}
                className='force-color loading-action-item'
                disabled={false}
                onClick={() => setIsRename(true)}
                icon={
                    <>
                        <span className='anticon'>
                            <i className={'icon-file_rename'} />
                        </span>
                    </>}>
                {texts.common.rename}
            </Menu.Item>
            <ActionMenuItem displayMode='IconLabel' action={forLoading.saveDiagram} />
            <ActionMenuItem displayMode='IconLabel' action={forLoading.saveDiagramToFile} />
        </Menu>
    );

    return (
        <>
            <Dropdown
                className='loading-action-button'
                overlay={menu}
                trigger={['click']}>
                <Button type="text" icon={icon} size='middle'>
                    {<h3>{(label.length < 25) ? label : `${label.substring(0, 25)}...`}</h3>}
                </Button>
            </Dropdown>
            <ModalForm
                title={texts.common.renameTooltip}
                open={isRename}
                okText='Rename'
                onCancel={() => setIsRename(false)}
                onCreate={handleRenameOk} 
                formItems={
                    <Form.Item name="new_name" label="New name">
                        <Input type="textarea" maxLength={100} />
                    </Form.Item>
                }            
            />
        </>
    );
});