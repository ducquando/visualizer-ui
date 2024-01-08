import { useStore, DiagramItem, getDiagram, Diagram } from '@app/wireframes/model';
import * as React from 'react';
import { HistoryMenu } from '../menu/HistoryMenu';
import { ClipboardMenu } from '../menu/ClipboardMenu';
import { ZoomMenu } from '../menu/UIMenu';
import { ArrangeMenu } from '../menu/ArrangeMenu';
import { TableMenu } from '../menu/TableMenu';
import { GroupingMenu } from '../menu/GroupingMenu';

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
            <ArrangeMenu />
            <HistoryMenu />
            <span className='menu-separator' />
            <GroupingMenu />
            <span className='menu-separator' />
            <ClipboardMenu canCopy={true} />
        </>
    } else if (item != null && item.renderer == 'Table') {
        toolView = <>
            <ArrangeMenu />
            <HistoryMenu />
            <span className='menu-separator' />
            <ClipboardMenu canCopy={true} />
            <span className='menu-separator' />
            <TableMenu />
        </>
    } else if (item != null) {
        toolView = <>
            <ArrangeMenu />
            <HistoryMenu />
            <span className='menu-separator' />
            <ClipboardMenu canCopy={true} />
        </>
    } else {
        toolView = <>
            <ArrangeMenu />
            <HistoryMenu />
            <span className='menu-separator' />
            <ClipboardMenu canCopy={false} />
            <span className='menu-separator' />
            <ZoomMenu />
        </>
    }

    return toolView;
};