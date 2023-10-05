"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.createInitialLoadingState = exports.saveRecentDiagrams = exports.loadRecentDiagrams = void 0;
function loadRecentDiagrams() {
    try {
        var recent = localStorage.getItem('recent');
        return JSON.parse(recent) || {};
    }
    catch (_a) {
        return {};
    }
}
exports.loadRecentDiagrams = loadRecentDiagrams;
function saveRecentDiagrams(recent) {
    try {
        var json = JSON.stringify(recent);
        return localStorage.setItem('recent', json);
    }
    catch (_a) {
        return false;
    }
}
exports.saveRecentDiagrams = saveRecentDiagrams;
var createInitialLoadingState = function () {
    return {
        isLoading: false,
        isSaving: false,
        recentDiagrams: loadRecentDiagrams()
    };
};
exports.createInitialLoadingState = createInitialLoadingState;
