"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.assets = exports.selectIcons = exports.filterIcons = exports.filterShapes = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.filterShapes = (0, toolkit_1.createAction)('shapes/shapes', function (filter) {
    return { payload: { filter: filter } };
});
exports.filterIcons = (0, toolkit_1.createAction)('icons/shapes', function (filter) {
    return { payload: { filter: filter } };
});
exports.selectIcons = (0, toolkit_1.createAction)('icons/select', function (iconSet) {
    return { payload: { iconSet: iconSet } };
});
function assets(initialState) {
    return (0, toolkit_1.createReducer)(initialState, function (builder) { return builder
        .addCase(exports.filterShapes, function (state, action) {
        state.shapesFilter = action.payload.filter;
    })
        .addCase(exports.filterIcons, function (state, action) {
        state.iconsFilter = action.payload.filter;
    })
        .addCase(exports.selectIcons, function (state, action) {
        state.iconSet = action.payload.iconSet;
    }); });
}
exports.assets = assets;
