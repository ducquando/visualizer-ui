/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import type { MenuProps } from 'antd';
import * as React from 'react';
import { texts } from '@app/texts';
import { useAlignment, useClipboard, useGrouping, useRemove } from '../actions';
import { MenuIcon } from '@app/style/icomoon/icomoon_icon';

const forAlignment = useAlignment();
const forClipboard = useClipboard();
const forGrouping = useGrouping();
const forRemove = useRemove();

export const ContextMenuEvt: MenuProps['onClick'] = ({key}) => {
    switch (key) {
        case forClipboard.cut.label:
            forClipboard.cut.onAction;
            break;
        case forClipboard.copy.label:
            forClipboard.copy.onAction;
            break;
        case forClipboard.paste.label:
            forClipboard.paste.onAction;
            break;
        case forAlignment.alignHorizontalLeft.label:
            forAlignment.alignHorizontalLeft.onAction;
            break;
        case forAlignment.alignHorizontalCenter.label:
            forAlignment.alignHorizontalCenter.onAction;
            break;
        case forAlignment.alignHorizontalRight.label:
            forAlignment.alignHorizontalRight.onAction;
            break;
        case forAlignment.alignVerticalTop.label:
            forAlignment.alignVerticalTop.onAction;
            break;
        case forAlignment.alignVerticalCenter.label:
            forAlignment.alignVerticalCenter.onAction;
            break;
        case forAlignment.alignVerticalBottom.label:
            forAlignment.alignVerticalBottom.onAction;
            break;
        case forAlignment.distributeHorizontally.label:
            forAlignment.distributeHorizontally.onAction;
            break;
        case forAlignment.distributeVertically.label:
            forAlignment.distributeVertically.onAction;
            break;
        case forAlignment.bringToFront.label:
            forAlignment.bringToFront.onAction;
            break;
        case forAlignment.bringForwards.label:
            forAlignment.bringForwards.onAction;
            break;
        case forAlignment.sendBackwards.label:
            forAlignment.sendBackwards.onAction;
            break;
        case forAlignment.sendToBack.label:
            forAlignment.sendToBack.onAction;
            break;
        case forGrouping.group.label:
            forGrouping.group.onAction;
            break;
        case forGrouping.ungroup.label:
            forGrouping.ungroup.onAction;
            break;
        default:
            break;
    }   
};

export const ContextMenu: MenuProps['items'] = [
    {
        key: forClipboard.cut.label,
        label: forClipboard.cut.label,
        icon: <MenuIcon icon={forClipboard.cut.icon} />,
        disabled: forClipboard.cut.disabled,
    },
    {
        key: forClipboard.copy.label,
        label: forClipboard.copy.label,
        icon: <MenuIcon icon={forClipboard.copy.icon} />,
        disabled: forClipboard.copy.disabled,
    },
    {
        key: forClipboard.paste.label,
        label: forClipboard.paste.label,
        icon: <MenuIcon icon={forClipboard.paste.icon} />,
        disabled: forClipboard.paste.disabled,
    },
    {
        type: 'divider',
    },
    {
        key: forRemove.remove.label,
        label: forRemove.remove.label,
        icon: <MenuIcon icon={forRemove.remove.icon} />,
        disabled: forRemove.remove.disabled,
    },
    {
        type: 'divider',
    },
    {
        key: 'alignment',
        label: texts.common.alignment,
        className: 'force-color',
        children: [
            {
                key: forAlignment.alignHorizontalLeft.label,
                label: forAlignment.alignHorizontalLeft.label,
                icon: <MenuIcon icon={forAlignment.alignHorizontalLeft.icon} />,
                disabled: forAlignment.alignHorizontalLeft.disabled,
            },
            {
                key: forAlignment.alignHorizontalCenter.label,
                label: forAlignment.alignHorizontalCenter.label,
                icon: <MenuIcon icon={forAlignment.alignHorizontalCenter.icon} />,
                disabled: forAlignment.alignHorizontalCenter.disabled,
            },
            {
                key: forAlignment.alignHorizontalRight.label,
                label: forAlignment.alignHorizontalRight.label,
                icon: <MenuIcon icon={forAlignment.alignHorizontalRight.icon} />,
                disabled: forAlignment.alignHorizontalRight.disabled,
            },

            {
                key: forAlignment.alignVerticalTop.label,
                label: forAlignment.alignVerticalTop.label,
                icon: <MenuIcon icon={forAlignment.alignVerticalTop.icon} />,
                disabled: forAlignment.alignVerticalTop.disabled,
            },
            {
                key: forAlignment.alignVerticalCenter.label,
                label: forAlignment.alignVerticalCenter.label,
                icon: <MenuIcon icon={forAlignment.alignVerticalCenter.icon} />,
                disabled: forAlignment.alignVerticalCenter.disabled,
            },
            {
                key: forAlignment.alignVerticalBottom.label,
                label: forAlignment.alignVerticalBottom.label,
                icon: <MenuIcon icon={forAlignment.alignVerticalBottom.icon} />,
                disabled: forAlignment.alignVerticalBottom.disabled,
            },

            {
                key: forAlignment.distributeHorizontally.label,
                label: forAlignment.distributeHorizontally.label,
                icon: <MenuIcon icon={forAlignment.distributeHorizontally.icon} />,
                disabled: forAlignment.distributeHorizontally.disabled,
            },
            {
                key: forAlignment.distributeVertically.label,
                label: forAlignment.distributeVertically.label,
                icon: <MenuIcon icon={forAlignment.distributeVertically.icon} />,
                disabled: forAlignment.distributeVertically.disabled,
            },
        ],
    },
    {
        key: 'ordering',
        label: texts.common.ordering,
        className: 'force-color',
        children: [
            {
                key: forAlignment.bringToFront.label,
                label: forAlignment.bringToFront.label,
                icon: <MenuIcon icon={forAlignment.bringToFront.icon} />,
                disabled: forAlignment.bringToFront.disabled,
            },
            {
                key: forAlignment.bringForwards.label,
                label: forAlignment.bringForwards.label,
                icon: <MenuIcon icon={forAlignment.bringForwards.icon} />,
                disabled: forAlignment.bringForwards.disabled,
            },
            {
                key: forAlignment.sendBackwards.label,
                label: forAlignment.sendBackwards.label,
                icon: <MenuIcon icon={forAlignment.sendBackwards.icon} />,
                disabled: forAlignment.sendBackwards.disabled,
            },
            {
                key: forAlignment.sendToBack.label,
                label: forAlignment.sendToBack.label,
                icon: <MenuIcon icon={forAlignment.sendToBack.icon} />,
                disabled: forAlignment.sendToBack.disabled,
            },
        ],
    },
    {
        key: forGrouping.group.label,
        label: forGrouping.group.label,
        icon: <MenuIcon icon={forGrouping.group.icon} />,
        disabled: forGrouping.group.disabled,
    },
    {
        key: forGrouping.ungroup.label,
        label: forGrouping.ungroup.label,
        icon: <MenuIcon icon={forGrouping.ungroup.icon} />,
        disabled: forGrouping.ungroup.disabled,
    },
];
