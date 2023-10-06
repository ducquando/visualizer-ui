"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ui = exports.toastMiddleware = exports.toggleRightSidebar = exports.toggleLeftSidebar = exports.filterDiagrams = exports.selectTab = exports.selectColorTab = exports.setZoom = exports.showToast = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var antd_1 = require("antd");
exports.showToast = (0, toolkit_1.createAction)('ui/infoToast', function (content, type, key, delayed) {
    if (delayed === void 0) { delayed = 1000; }
    return { payload: { content: content, type: type, key: key, delayed: delayed } };
});
exports.setZoom = (0, toolkit_1.createAction)('ui/zoom', function (zoom) {
    return { payload: { zoom: zoom } };
});
exports.selectColorTab = (0, toolkit_1.createAction)('ui/colorTab', function (tab) {
    return { payload: { tab: tab } };
});
exports.selectTab = (0, toolkit_1.createAction)('ui/tab', function (tab) {
    return { payload: { tab: tab } };
});
exports.filterDiagrams = (0, toolkit_1.createAction)('ui/diagrams/filter', function (filter) {
    return { payload: { filter: filter } };
});
exports.toggleLeftSidebar = (0, toolkit_1.createAction)('ui/toggleLeftSidebar', function () {
    return { payload: {} };
});
exports.toggleRightSidebar = (0, toolkit_1.createAction)('ui/toggleRightSidebar', function () {
    return { payload: {} };
});
function toastMiddleware() {
    var middleware = function () { return function (next) { return function (action) {
        if (exports.showToast.match(action)) {
            var _a = action.payload, content_1 = _a.content, delayed = _a.delayed, key_1 = _a.key, type_1 = _a.type;
            setTimeout(function () {
                antd_1.message.open({ content: content_1, key: key_1, type: type_1 || 'info' });
            }, delayed);
        }
        return next(action);
    }; }; };
    return middleware;
}
exports.toastMiddleware = toastMiddleware;
function ui(initialState) {
    return (0, toolkit_1.createReducer)(initialState, function (builder) { return builder
        .addCase(exports.filterDiagrams, function (state, action) {
        state.diagramsFilter = action.payload.filter;
    })
        .addCase(exports.setZoom, function (state, action) {
        state.zoom = action.payload.zoom;
    })
        .addCase(exports.selectTab, function (state, action) {
        state.selectedTab = action.payload.tab;
    })
        .addCase(exports.selectColorTab, function (state, action) {
        state.selectedColorTab = action.payload.tab;
    })
        .addCase(exports.toggleLeftSidebar, function (state) {
        state.showLeftSidebar = !state.showLeftSidebar;
    })
        .addCase(exports.toggleRightSidebar, function (state) {
        state.showRightSidebar = !state.showRightSidebar;
    }); });
}
exports.ui = ui;
