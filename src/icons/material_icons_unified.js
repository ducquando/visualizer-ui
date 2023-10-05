"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ICONS_MATERIAL_DESIGN = void 0;
var material_icons_1 = require("./material_icons");
exports.ICONS_MATERIAL_DESIGN = material_icons_1.ICONS.map(function (icon) {
    var parts = icon.trim().split(' ');
    var text = String.fromCharCode(parseInt(parts[1], 16));
    return {
        displayName: parts[0],
        displaySearch: parts[0],
        fontClass: 'material-icons',
        fontFamily: 'Material Icons',
        name: "mat-".concat(text),
        text: text
    };
}).filter(function (x) { return x.name.length > 0; });
