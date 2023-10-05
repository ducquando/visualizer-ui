"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.UserReport = void 0;
var React = require("react");
exports.UserReport = React.memo(function () {
    React.useEffect(function () {
        window['_urq'] = window['_urq'] || [];
        window['_urq'].push(['initSite', 'b64f8170-a1e3-46fa-8c63-34514d064c15']);
        setTimeout(function () {
            var script = document.createElement('script');
            script.async = true;
            script.type = 'text/javascript';
            script.src = 'https://cdn.userreport.com/userreport.js';
            document.body.appendChild(script);
        }, 1000);
    });
    return null;
});
