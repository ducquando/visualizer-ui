"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Icon = void 0;
var React = require("react");
var react_dnd_1 = require("react-dnd");
exports.Icon = React.memo(function (props) {
    var icon = props.icon;
    var _a = (0, react_dnd_1.useDrag)({
        item: { text: icon.text, fontFamily: icon.fontFamily },
        previewOptions: {
            anchorX: 0,
            anchorY: 0
        },
        type: 'DND_ICON'
    }), drag = _a[1];
    return (<i ref={drag} className={icon.fontClass}>{icon.text}</i>);
});
