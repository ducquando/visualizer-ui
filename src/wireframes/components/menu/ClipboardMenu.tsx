/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import * as React from 'react';
import { ActionMenuButton, useClipboard } from '../actions';
import { Diagram, getDiagram, useStore } from '@app/wireframes/model';

export interface ClipboardMenuProps {
    canCopy: boolean
}

export const ClipboardMenu = (props: ClipboardMenuProps) => {
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <ClipboardMenuInner {...props} diagram={diagram} />
    );
};

export const ClipboardMenuInner = ({ diagram, canCopy }: ClipboardMenuProps & { diagram: Diagram }) => {
    const forClipboard = useClipboard();

    return (
        <>
            { (canCopy) && <ActionMenuButton action={forClipboard.cut} />  }
            { (canCopy) && <ActionMenuButton action={forClipboard.copy} />  }
            <ActionMenuButton action={forClipboard.paste} />
        </>
    );
};
