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

    // The size for left sidebar
    sidebarLeftSize: number;

    // The size for right sidebar
    sidebarRightSize: number;

    // The selected mode for the application.
    selectedApplicationMode: ApplicationMode;

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
        selectedColorTab: 'palette',
        selectedApplicationMode: 'design',
        sidebarLeftSize: 200,
        sidebarRightSize: 0,
    };
};
