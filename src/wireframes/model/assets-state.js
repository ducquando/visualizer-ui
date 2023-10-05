"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.createInitialAssetsState = void 0;
var font_awesome_unified_1 = require("./../../icons/font_awesome_unified");
var material_icons_unified_1 = require("./../../icons/material_icons_unified");
var renderer_service_1 = require("./renderer.service");
var createInitialAssetsState = function () {
    var allShapes = renderer_service_1.RendererService.all().filter(function (x) { var _a, _b; return ((_b = (_a = x[1].plugin()).showInGallery) === null || _b === void 0 ? void 0 : _b.call(_a)) !== false; })
        .map(function (_a) {
        var name = _a[0], renderer = _a[1];
        return {
            plugin: renderer.plugin(),
            displayName: name,
            displaySearch: name,
            name: name
        };
    });
    return {
        shapes: allShapes,
        shapesFilter: '',
        icons: { 'Font Awesome': font_awesome_unified_1.ICONS_FONT_AWESOME, 'Material Design': material_icons_unified_1.ICONS_MATERIAL_DESIGN },
        iconsFilter: '',
        iconSet: 'Font Awesome'
    };
};
exports.createInitialAssetsState = createInitialAssetsState;
