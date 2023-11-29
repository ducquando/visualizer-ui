/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import * as React from 'react';
import { ActionMenuButton, useUI } from '../actions';

export interface ZoomMenuProps {
}

export const ZoomMenu = React.memo((props: ZoomMenuProps) => {
    const forUI = useUI();

    return (
        <>
            <ActionMenuButton action={forUI.zoomOut} />
            <ActionMenuButton action={forUI.zoomIn} />
        </>
    );
});
