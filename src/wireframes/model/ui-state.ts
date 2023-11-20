/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

export interface UIState {
    // The current zoom level.
    zoom: number;

    // The error toast from any loading operation.
    errorToast?: string;

    // The info toast from any loading operation.
    infoToast?: string;

    // Indicates if the left sidebar is open.
    showPanel: boolean;

    // Indicates if the right sidebar is open.
    showRightSidebar: boolean;

    // The selected panel on the bottom layout.
    selectedPanel: string;

    // The selected panel on the bottom layout.
    selectedTab: string;

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
        showRightSidebar: true,
        selectedColorTab: 'palette',
        selectedPanel: 'animation',
        selectedTab: 'properties',
    };
};
