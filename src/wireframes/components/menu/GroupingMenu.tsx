/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import * as React from 'react';
import { ActionMenuButton, useGrouping } from './../actions';

export const GroupingMenu = React.memo(() => {
    const forGrouping = useGrouping();

    return (
        <>
            <ActionMenuButton action={forGrouping.group} />
            <ActionMenuButton action={forGrouping.ungroup} />
        </>
    );
});

