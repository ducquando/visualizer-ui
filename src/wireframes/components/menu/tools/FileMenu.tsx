import { Button, Dropdown } from 'antd';
import { DropdownButtonProps } from 'antd/lib/dropdown';
import * as React from 'react';

type ActionDisplayMode = 'Icon' | 'IconLabel' | 'Label';

type FileMenuProps = {
    // The label to show.
    label: string;

    // The icon to show, if any.
    icon?: string | JSX.Element;

    // Display mode
    displayMode?: ActionDisplayMode;
};

export const FileMenu = React.memo((props: FileMenuProps & DropdownButtonProps) => {
    const { label, icon, overlay } = props;

    return (
        <Dropdown
            className='loading-action-button'
            overlay={overlay}
            trigger={['click']}>
                <Button type="text" icon={icon} size='middle'>
                    <h3>{label}</h3>
                </Button>
        </Dropdown>
    );
});