/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import { texts } from '@app/texts';
import { getDiagram, getSelectedItems, useStore } from '@app/wireframes/model';
import { Colors, CustomProperties, DiagramProperties, LayoutProperties, ShapeProperties, TransformProperties } from '../properties';

export const PropertiesMenu = () => {
    const selectedItems = useStore(getSelectedItems);
    const selectedItem = useStore(getDiagram);
    const hasSelection = selectedItems.length > 0;
    const hasDiagram = !!selectedItem;

    const diagramMenu: CollapseProps['items'] = [
        {
            key: 'diagram',
            label: texts.common.diagram,
            children: <DiagramProperties />,
        },{
            key: 'colors',
            label: texts.common.palette,
            children: <Colors />,
        },
    ];

    const objectMenu: CollapseProps['items'] = [
        {
            key: 'properties',
            label: texts.common.properties,
            children: <ShapeProperties />,
        },
        {
            key: 'transform',
            label: texts.common.transform,
            children: <TransformProperties />,
        },{
            key: 'visual',
            label: texts.common.layout,
            children: <LayoutProperties />,
        },{
            key: 'custom',
            label: texts.common.custom,
            children: <CustomProperties />,
        },
    ];
      
      

    return (
        <>
            <Collapse
                className={(classNames({ hidden: !hasSelection }))}
                bordered={false}
                items={objectMenu}
                defaultActiveKey={['properties', 'transform']} />
            <Collapse
                className={(classNames({ hidden: hasSelection || !hasDiagram }))}
                bordered={false}
                items={diagramMenu}
                defaultActiveKey={['diagram', 'colors']} />
        </>
    );
};