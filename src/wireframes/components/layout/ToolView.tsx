import { useStore, DiagramItem, getDiagram, Diagram } from '@app/wireframes/model';
import * as React from 'react';
import { ClipboardMenu } from './menu/ClipboardMenu';
import { TableMenu } from './menu/TableMenu';
import { GroupingMenu } from './menu/GroupingMenu';

export interface ToolViewProps {
    item: DiagramItem | null;
    set: DiagramItem[] | null;
}

export const ToolView = (props: ToolViewProps) => {
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <ToolViewInner {...props} diagram={diagram} />
    );
};

export const ToolViewInner = ({ diagram, item, set }: ToolViewProps & { diagram: Diagram }) => {
    let toolView: JSX.Element;

    if (set != null && set.length > 1) {
        toolView = <>
            <GroupingMenu />
            <span className='menu-separator' />
            <ClipboardMenu canCopy={true} />
        </>
    } else if (item != null && item.renderer == 'Table') {
        toolView = <>
            <ClipboardMenu canCopy={true} />
            <span className='menu-separator' />
            <TableMenu />
        </>
    } else if (item != null) {
        toolView = <>
            <ClipboardMenu canCopy={true} />
        </>
    } else {
        toolView = <>
            <ClipboardMenu canCopy={false} />
        </>
    }

    return toolView;
};