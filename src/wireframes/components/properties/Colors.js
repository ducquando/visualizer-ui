"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Colors = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var Colors = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var recentColors = (0, model_1.useStore)(model_1.getColors);
    var doChangeColor = React.useCallback(function (oldColor, newColor) {
        dispatch((0, model_1.changeColors)(oldColor, newColor));
    }, [dispatch]);
    return (<div>
            {recentColors.colors.map(function (c) {
            return <span key={c.toString()} className='mr-2 mb-2'>
                    <core_1.ColorPicker value={c} onChange={function (color) { return doChangeColor(c, color); }}/>,
                </span>;
        })}
        </div>);
};
exports.Colors = Colors;
