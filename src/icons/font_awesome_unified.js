"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.ICONS_FONT_AWESOME = void 0;
var font_awesome_1 = require("./font-awesome");
exports.ICONS_FONT_AWESOME = font_awesome_1.ICONS.icons.map(function (_a) {
    var id = _a.id, filter = _a.filter, name = _a.name, unicode = _a.unicode;
    var text = String.fromCharCode(parseInt(unicode, 16));
    var displaySearch = id;
    if (filter) {
        for (var _i = 0, filter_1 = filter; _i < filter_1.length; _i++) {
            var item = filter_1[_i];
            displaySearch += ' ';
            displaySearch += item;
        }
    }
    return {
        displayName: id || name,
        displaySearch: displaySearch,
        fontClass: 'fa',
        fontFamily: 'FontAwesome',
        name: "fa-".concat(text),
        text: text
    };
}).sort(function (l, r) { return l.displayName.localeCompare(r.displayName); });
