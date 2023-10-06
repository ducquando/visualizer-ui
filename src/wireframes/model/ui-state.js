"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.createInitialUIState = void 0;
var createInitialUIState = function () {
    return {
        zoom: 1,
        selectedTab: 'shapes',
        showLeftSidebar: true,
        showRightSidebar: true,
        selectedColorTab: 'palette'
    };
};
exports.createInitialUIState = createInitialUIState;
