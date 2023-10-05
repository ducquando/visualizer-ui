"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Title = void 0;
var React = require("react");
exports.Title = React.memo(function (_a) {
    var text = _a.text;
    React.useEffect(function () {
        document.title = text;
    }, [text]);
    return null;
});
