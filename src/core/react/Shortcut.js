"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Shortcut = void 0;
var Mousetrap = require("mousetrap");
var React = require("react");
var Shortcut = function (props) {
    var currentProps = React.useRef(props);
    currentProps.current = props;
    React.useEffect(function () {
        var simplifiedKeys = props.keys.toLocaleLowerCase().replace(/[\s]/g, '');
        Mousetrap.bind(simplifiedKeys, function (event) {
            if (!currentProps.current.disabled) {
                currentProps.current.onPressed();
            }
            if (!currentProps.current.allowDefault) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
            return false;
        });
        return function () {
            Mousetrap.unbind(simplifiedKeys);
        };
    }, [props.keys]);
    return <></>;
};
exports.Shortcut = Shortcut;
