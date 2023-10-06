"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.ActionMenuItem = exports.ActionButton = exports.ActionDropdownButton = exports.ActionMenuButton = void 0;
var antd_1 = require("antd");
var React = require("react");
var core_1 = require("@app/core");
exports.ActionMenuButton = React.memo(function (props) {
    var action = props.action, displayMode = props.displayMode, hideWhenDisabled = props.hideWhenDisabled, type = props.type, other = __rest(props, ["action", "displayMode", "hideWhenDisabled", "type"]);
    var disabled = action.disabled, label = action.label, onAction = action.onAction, icon = action.icon, shortcut = action.shortcut, tooltip = action.tooltip;
    if (disabled && hideWhenDisabled) {
        return null;
    }
    var title = buildTitle(shortcut, tooltip);
    return (<>
            <antd_1.Tooltip mouseEnterDelay={1} title={title}>
                <antd_1.Button {...other} type={type} className={!type ? 'menu-item' : undefined} size='large' disabled={disabled} onClick={onAction}>
                    <ButtonContent icon={icon} label={label} displayMode={displayMode || 'Icon'}/>
                </antd_1.Button>
            </antd_1.Tooltip>

            {shortcut &&
            <core_1.Shortcut disabled={disabled} onPressed={onAction} keys={shortcut}/>}
        </>);
});
exports.ActionDropdownButton = React.memo(function (props) {
    var action = props.action, displayMode = props.displayMode, hideWhenDisabled = props.hideWhenDisabled, other = __rest(props, ["action", "displayMode", "hideWhenDisabled"]);
    var disabled = action.disabled, label = action.label, onAction = action.onAction, icon = action.icon, shortcut = action.shortcut, tooltip = action.tooltip;
    if (disabled && hideWhenDisabled) {
        return null;
    }
    var title = buildTitle(shortcut, tooltip);
    return (<>
            <antd_1.Dropdown.Button {...other} size='large' disabled={disabled} onClick={onAction} buttonsRender={function (_a) {
            var leftButton = _a[0], rightButton = _a[1];
            return [
                <antd_1.Tooltip mouseEnterDelay={1} title={title}>
                        {leftButton}
                    </antd_1.Tooltip>,
                React.cloneElement(rightButton),
            ];
        }}>
                <ButtonContent icon={icon} label={label} displayMode={displayMode || 'Icon'}/>
            </antd_1.Dropdown.Button>

            {shortcut &&
            <core_1.Shortcut disabled={disabled} onPressed={onAction} keys={shortcut}/>}
        </>);
});
exports.ActionButton = React.memo(function (props) {
    var action = props.action, displayMode = props.displayMode, hideWhenDisabled = props.hideWhenDisabled, other = __rest(props, ["action", "displayMode", "hideWhenDisabled"]);
    var disabled = action.disabled, label = action.label, onAction = action.onAction, icon = action.icon, shortcut = action.shortcut, tooltip = action.tooltip;
    if (disabled && hideWhenDisabled) {
        return null;
    }
    var title = buildTitle(shortcut, tooltip);
    return (<>
            <antd_1.Tooltip mouseEnterDelay={1} title={title}>
                <antd_1.Button {...other} disabled={disabled} onClick={onAction}>
                    <ButtonContent icon={icon} label={label} displayMode={displayMode || 'Icon'}/>
                </antd_1.Button>
            </antd_1.Tooltip>
        </>);
});
exports.ActionMenuItem = React.memo(function (props) {
    var action = props.action, displayMode = props.displayMode, hideWhenDisabled = props.hideWhenDisabled, other = __rest(props, ["action", "displayMode", "hideWhenDisabled"]);
    var disabled = action.disabled, label = action.label, onAction = action.onAction, icon = action.icon;
    var actualDisplayMode = displayMode || 'IconLabel';
    if (disabled && hideWhenDisabled) {
        return null;
    }
    return (<antd_1.Menu.Item {...other} key={label} className='force-color' disabled={disabled} onClick={onAction} icon={(actualDisplayMode === 'Icon' || actualDisplayMode === 'IconLabel') ? (<>
                    {core_1.Types.isString(icon) ? (<span className='anticon'>
                            <i className={icon}/>
                        </span>) : icon}
                </>) : undefined}>

            {(actualDisplayMode === 'Label' || actualDisplayMode === 'IconLabel') &&
            <>{label}</>}
        </antd_1.Menu.Item>);
});
var ButtonContent = function (_a) {
    var displayMode = _a.displayMode, label = _a.label, icon = _a.icon;
    return (<>
            {(displayMode === 'Icon' || displayMode === 'IconLabel') &&
            <>
                    {core_1.Types.isString(icon) ? (<i className={icon}/>) : icon}
                </>}

            {(displayMode === 'Label' || displayMode === 'IconLabel') &&
            <>&nbsp;{label}</>}
        </>);
};
function buildTitle(shortcut, tooltip) {
    function getModKey() {
        // Mac users expect to use the command key for shortcuts rather than the control key
        return (0, core_1.isMac)() ? 'COMMAND' : 'CTRL';
    }
    return shortcut ? "".concat(tooltip, " (").concat(shortcut.replace('MOD', getModKey()), ")") : tooltip;
}
