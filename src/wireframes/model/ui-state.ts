/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ApplicationMode } from '@app/core';

export interface UIState {
    // The current zoom level.
    zoom: number;

    // The error toast from any loading operation.
    errorToast?: string;

    // The info toast from any loading operation.
    infoToast?: string;

    // Indicates if the left sidebar is open.
    showPanel: boolean;

    // The selected panel on the bottom layout.
    selectedTab: ApplicationMode;

    // The color tab.
    selectedColorTab: string;

    // The filter for the diagram.
    diagramsFilter?: string;
}

export interface UIStateInStore {
    ui: UIState;
}

export const createInitialUIState: () => UIState = () => {
    return {
        zoom: 1,
        showPanel: true,
        selectedColorTab: 'palette',
        selectedTab: 'design',
    };
};
