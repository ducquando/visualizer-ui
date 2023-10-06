"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.TransformProperties = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var TransformProperties = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectedDiagram = (0, model_1.useStore)(model_1.getDiagram);
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedIds = selectedDiagram === null || selectedDiagram === void 0 ? void 0 : selectedDiagram.selectedIds;
    var selectedSet = (0, model_1.useStore)(model_1.getSelectionSet);
    var selectedSetItems = selectedSet === null || selectedSet === void 0 ? void 0 : selectedSet.allItems;
    var _a = React.useState(core_1.Rotation.ZERO), rotation = _a[0], setRotation = _a[1];
    var doTransform = (0, core_1.useEventCallback)(function (update) {
        var oldBounds = transform;
        if (!oldBounds) {
            return;
        }
        var newBounds = update(oldBounds);
        if (newBounds.equals(oldBounds)) {
            return;
        }
        dispatch((0, model_1.transformItems)(selectedDiagram, selectedSetItems, oldBounds, newBounds));
    });
    var _b = useDebounceCallback(function (value) {
        doTransform(function (oldBounds) {
            var dx = value - (oldBounds.position.x - 0.5 * oldBounds.size.x);
            // Move by the delta between new and old position, because we move relative to the bounding box.
            return oldBounds.moveBy(new core_1.Vec2(dx, 0));
        });
    }, 0), x = _b[0], setX = _b[1];
    var _c = useDebounceCallback(function (value) {
        doTransform(function (oldBounds) {
            var dy = value - (oldBounds.position.y - 0.5 * oldBounds.size.y);
            // Move by the delta between new and old position, because we move relative to the bounding box.
            return oldBounds.moveBy(new core_1.Vec2(0, dy));
        });
    }, 0), y = _c[0], setY = _c[1];
    var _d = useDebounceCallback(function (value) {
        doTransform(function (oldBounds) {
            var size = new core_1.Vec2(value, oldBounds.size.y);
            // Size by keeping the left top corner sticky.
            return oldBounds.resizeTopLeft(size);
        });
    }, 0), w = _d[0], setW = _d[1];
    var _e = useDebounceCallback(function (value) {
        doTransform(function (oldBounds) {
            var size = new core_1.Vec2(oldBounds.size.x, value);
            // Size by keeping the left top corner sticky.
            return oldBounds.resizeTopLeft(size);
        });
    }, 0), h = _e[0], setH = _e[1];
    var _f = useDebounceCallback(function (value) {
        doTransform(function (oldBounds) {
            var rotation = core_1.Rotation.fromDegree(value);
            // Rotate to the value.
            return oldBounds.rotateTo(rotation);
        });
    }, 0), r = _f[0], setR = _f[1];
    React.useEffect(function () {
        setRotation(core_1.Rotation.ZERO);
    }, [selectedIds]);
    var transform = React.useMemo(function () {
        if (!selectedSetItems) {
            return;
        }
        if (selectedSetItems.length === 0) {
            return model_1.Transform.ZERO;
        }
        else if (selectedSetItems.length === 1) {
            return selectedSetItems[0].bounds(selectedDiagram);
        }
        else {
            var bounds = selectedSetItems.map(function (x) { return x.bounds(selectedDiagram); });
            return model_1.Transform.createFromTransformationsAndRotation(bounds, rotation);
        }
    }, [rotation, selectedDiagram, selectedSetItems]);
    React.useEffect(function () {
        if (!transform) {
            return;
        }
        setX(transform.position.x - 0.5 * transform.size.x);
        setY(transform.position.y - 0.5 * transform.size.y);
        setW(transform.size.x);
        setH(transform.size.y);
        setR(transform.rotation.degree);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transform]);
    if (!selectedDiagramId) {
        return null;
    }
    return (<>
            <antd_1.Row className='property' gutter={4}>
                <antd_1.Col span={12}>
                    <antd_1.InputNumber prefix='x' value={x} onChange={setX}/>
                </antd_1.Col>
                <antd_1.Col span={12}>
                    <antd_1.InputNumber prefix='w' value={w} onChange={setW}/>
                </antd_1.Col>
            </antd_1.Row>

            <antd_1.Row className='property' gutter={4}>
                <antd_1.Col span={12}>
                    <antd_1.InputNumber prefix='y' value={y} onChange={setY}/>
                </antd_1.Col>
                <antd_1.Col span={12}>
                    <antd_1.InputNumber prefix='h' value={h} onChange={setH}/>
                </antd_1.Col>
            </antd_1.Row>

            <antd_1.Row className='property' gutter={4}>
                <antd_1.Col span={12}>
                    <antd_1.InputNumber prefix='r' value={r} onChange={setR}/>
                </antd_1.Col>
            </antd_1.Row>
        </>);
};
exports.TransformProperties = TransformProperties;
function useDebounceCallback(callback, initial) {
    var _a = React.useState(initial), state = _a[0], setState = _a[1];
    var callbackHook = (0, core_1.useEventCallback)(callback);
    React.useEffect(function () {
        var currentState = state;
        var timer = setTimeout(function () {
            callbackHook(currentState);
        }, 500);
        return function () {
            clearTimeout(timer);
        };
    }, [callbackHook, state]);
    return [state, setState];
}
