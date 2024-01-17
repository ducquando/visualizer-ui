/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ExportOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import * as React from 'react';
import { texts } from '@app/texts';

export interface SettingsMenuProps {
    // The print callback.
    onPrint: () => void;
}

export const SettingsMenu = React.memo((props: SettingsMenuProps) => {
    const { onPrint } = props;

    const exportMenu: MenuProps['items'] = [
        { key: texts.common.printDiagrams, label: texts.common.printDiagrams, icon: <PrinterOutlined /> },
    ];

    const exportMenuEvt: MenuProps['onClick'] = ({key}) => {
        if (key == texts.common.printDiagrams)
            onPrint
    };

    return (
        <>
            <Dropdown menu={{ items: exportMenu, onClick: exportMenuEvt }} placement='bottomRight'>
                <Button className='menu-item' size='large'>
                    <ExportOutlined />
                </Button>
            </Dropdown>
        </>
    );
});
