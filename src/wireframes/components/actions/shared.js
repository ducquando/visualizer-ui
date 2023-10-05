"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useAppearanceCore = exports.useAppearance = exports.useColorAppearance = void 0;
/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var DEFAULT_CONVERTER = {
    parse: function (value) {
        return value;
    },
    write: function (value) {
        return value;
    }
};
var COLOR_CONVERTER = {
    parse: function (value) {
        return core_1.Color.fromValue(value);
    },
    write: function (value) {
        return value.toString();
    }
};
function useColorAppearance(selectedDiagramId, selectedSet, key) {
    return useAppearanceCore(selectedDiagramId, selectedSet, key, COLOR_CONVERTER);
}
exports.useColorAppearance = useColorAppearance;
function useAppearance(selectedDiagramId, selectedSet, key, allowUndefined, force) {
    if (allowUndefined === void 0) { allowUndefined = false; }
    if (force === void 0) { force = false; }
    return useAppearanceCore(selectedDiagramId, selectedSet, key, DEFAULT_CONVERTER, allowUndefined, force);
}
exports.useAppearance = useAppearance;
function useAppearanceCore(selectedDiagramId, selectedSet, key, converter, allowUndefined, force) {
    if (allowUndefined === void 0) { allowUndefined = false; }
    if (force === void 0) { force = false; }
    var dispatch = (0, react_redux_1.useDispatch)();
    var value = React.useMemo(function () {
        if (!selectedSet) {
            return { empty: true };
        }
        var value, empty = true;
        for (var _i = 0, _a = selectedSet.allShapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            var appearance = shape.appearance.get(key);
            if (!core_1.Types.isUndefined(appearance) || allowUndefined) {
                empty = false;
                var parsed = converter.parse(appearance);
                if (parsed && value && !core_1.Types.equals(value, parsed)) {
                    value = undefined;
                }
                else {
                    value = parsed;
                }
            }
        }
        return { value: value, empty: empty };
    }, [allowUndefined, converter, key, selectedSet]);
    var doChangeAppearance = (0, core_1.useEventCallback)(function (value) {
        if (selectedDiagramId && selectedSet) {
            dispatch((0, model_1.changeItemsAppearance)(selectedDiagramId, selectedSet.allShapes, key, converter.write(value), force));
        }
    });
    return [value, doChangeAppearance];
}
exports.useAppearanceCore = useAppearanceCore;
