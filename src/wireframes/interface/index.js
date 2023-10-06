"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.isPageLink = exports.getPageLinkId = exports.getPageLink = exports.DefaultAppearance = exports.Vec2 = exports.Rect2 = exports.Color = void 0;
var core_1 = require("@app/core");
__createBinding(exports, core_1, "Color");
__createBinding(exports, core_1, "Rect2");
__createBinding(exports, core_1, "Vec2");
exports.DefaultAppearance = {
    BACKGROUND_COLOR: 'FOREGROUND_COLOR',
    FONT_FAMILY: 'FONT_FAMILY',
    FONT_SIZE: 'FONT_SIZE',
    FOREGROUND_COLOR: 'BACKGROUND_COLOR',
    ICON_FONT_FAMILY: 'ICON_FONT_FAMILY',
    LINK: 'LINK',
    OPACITY: 'OPACITY',
    STROKE_COLOR: 'STROKE_COLOR',
    STROKE_THICKNESS: 'STROKE_THICKNESS',
    TEXT_ALIGNMENT: 'TEXT_ALIGNMENT',
    TEXT_DISABLED: 'TEXT_DISABLED',
    TEXT: 'TEXT'
};
function getPageLink(id) {
    return "page://".concat(id);
}
exports.getPageLink = getPageLink;
function getPageLinkId(link) {
    return link.substring(7);
}
exports.getPageLinkId = getPageLinkId;
function isPageLink(link) {
    return (link === null || link === void 0 ? void 0 : link.indexOf('page://')) === 0;
}
exports.isPageLink = isPageLink;
