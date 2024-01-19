import { useStore, DiagramItem, getDiagram } from '@app/wireframes/model';
import * as React from 'react';
import { ClipboardMenu } from './menu/ClipboardMenu';
import { TableMenu } from './menu/TableMenu';
import { GroupingMenu } from './menu/GroupingMenu';
import './styles/ToolView.scss';
import { HistoryMenu, VisualMenu, ZoomMenu } from './menu';

export interface ToolViewProps {
    item: DiagramItem | null;
    set: DiagramItem[] | null;
}

export const ToolView = (props: ToolViewProps) => {
    const { item, set } = props;
    const diagram = useStore(getDiagram);

    if (!diagram) {
        return null;
    }

    return (
        <div className='tool-menu'>
            <HistoryMenu />
            <span className='menu-separator' />
            <ZoomMenu />
            <span className='menu-separator' />

            {(set != null && set.length > 1) && 
                <>
                    <GroupingMenu />
                    <span className='menu-separator' />
                </>
            }

            <ClipboardMenu canCopy={(set != null && set.length > 1) || item != null} />

            {(item != null) && 
                <>
                    <span className='menu-separator' />
                    <VisualMenu />
                </>
            }

            {(item != null && item.renderer == 'Table') && 
                <>
                    <span className='menu-separator' />
                    <TableMenu />
                </>
            }
        </div>
    )
};