"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Icons = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var Icon_1 = require("./Icon");
require("./Icons.scss");
var keyBuilder = function (icon) {
    return icon.name;
};
exports.Icons = React.memo(function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var iconSet = (0, model_1.useStore)(model_1.getIconSet);
    var iconSets = (0, model_1.useStore)(model_1.getIconSets);
    var iconsFilter = (0, model_1.useStore)(model_1.getIconsFilter);
    var iconsFiltered = (0, model_1.useStore)(model_1.getFilteredIcons);
    var store = (0, react_redux_1.useStore)();
    var cellRenderer = React.useCallback(function (icon) {
        var doAdd = function () {
            var selectedDiagramId = (0, model_1.getDiagramId)(store.getState());
            if (selectedDiagramId) {
                var shapes = model_1.RendererService.createShapes([__assign({ type: 'Icon' }, icon)]);
                for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
                    var _a = shapes_1[_i], size = _a.size, appearance = _a.appearance, renderer = _a.renderer;
                    dispatch((0, model_1.addShape)(selectedDiagramId, renderer, { position: { x: 100, y: 100 }, size: size, appearance: appearance }));
                }
            }
        };
        return (<div className='asset-icon'>
                <div className='asset-icon-preview' onDoubleClick={doAdd}>
                    <Icon_1.Icon icon={icon}/>
                </div>

                <div className='asset-icon-title'>{icon.displayName}</div>
            </div>);
    }, [dispatch, store]);
    var doFilterIcons = (0, core_1.useEventCallback)(function (event) {
        dispatch((0, model_1.filterIcons)(event.target.value));
    });
    var doSelectIcons = (0, core_1.useEventCallback)(function (iconSet) {
        dispatch((0, model_1.selectIcons)(iconSet));
    });
    return (<>
            <div className='asset-icons-search'>
                <antd_1.Input value={iconsFilter} onChange={doFilterIcons} placeholder={texts_1.texts.common.findIcon} prefix={<icons_1.SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}/>

                <antd_1.Select value={iconSet} onChange={doSelectIcons}>
                    {iconSets.map(function (x) {
            return <antd_1.Select.Option key={x} value={x}>{x}</antd_1.Select.Option>;
        })}
                </antd_1.Select>
            </div>

            <core_1.Grid className='asset-icons-list' renderer={cellRenderer} columns={4} items={iconsFiltered} keyBuilder={keyBuilder}/>
        </>);
});
