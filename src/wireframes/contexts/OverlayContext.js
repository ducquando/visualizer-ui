"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.OverlayContainer = exports.useOverlayContext = exports.OverlayContext = void 0;
var React = require("react");
var model_1 = require("./../model");
var DEFAULT_VALUE = {
    snapManager: new model_1.SnapManager(),
    overlayManager: {
        showSnapAdorners: function () {
            return;
        },
        renderXLine: function () {
            return;
        },
        renderYLine: function () {
            return;
        },
        showInfo: function () {
            return;
        },
        reset: function () {
            return;
        }
    }
};
exports.OverlayContext = React.createContext(DEFAULT_VALUE);
function useOverlayContext() {
    return React.useContext(exports.OverlayContext);
}
exports.useOverlayContext = useOverlayContext;
var OverlayContainer = function (_a) {
    var children = _a.children;
    return (<exports.OverlayContext.Provider value={DEFAULT_VALUE}>
            {children}
        </exports.OverlayContext.Provider>);
};
exports.OverlayContainer = OverlayContainer;
