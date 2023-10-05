"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.OutlineItem = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var React = require("react");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var OutlineItem = function (props) {
    var diagram = props.diagram, diagramItem = props.diagramItem, level = props.level, isFirst = props.isFirst, isLast = props.isLast, onAction = props.onAction;
    var _a = React.useState(''), editName = _a[0], setEditName = _a[1];
    var _b = React.useState(false), editing = _b[0], setEditing = _b[1];
    var _c = React.useState(true), expanded = _c[0], setExpanded = _c[1];
    var isGroup = diagramItem.type === 'Group';
    var itemName = diagramItem.id || (isGroup ? texts_1.texts.common.group : diagramItem.renderer);
    var setText = (0, core_1.useEventCallback)(function (event) {
        setEditName(event.target.value);
    });
    var doRenameStart = (0, core_1.useEventCallback)(function () {
        setEditName(itemName);
        setEditing(true);
    });
    var doRenameCancel = (0, core_1.useEventCallback)(function () {
        setEditing(false);
    });
    var doDelete = (0, core_1.useEventCallback)(function () {
        onAction(diagramItem.id, 'Delete');
    });
    var doSelect = (0, core_1.useEventCallback)(function () {
        onAction(diagramItem.id, 'Select');
    });
    var doMove = (0, core_1.useEventCallback)(function (event) {
        onAction(diagramItem.id, 'Move', event.key);
    });
    var doEnter = (0, core_1.useEventCallback)(function (event) {
        if (core_1.Keys.isEnter(event) || core_1.Keys.isEscape(event)) {
            setEditing(false);
        }
        if (core_1.Keys.isEnter(event)) {
            onAction(diagramItem.id, 'Rename', editName);
        }
    });
    var initInput = React.useCallback(function (event) {
        event === null || event === void 0 ? void 0 : event.focus();
    }, []);
    var selected = diagram.selectedIds.has(diagramItem.id);
    return (<div className='tree-item'>
            <div className='tree-item-header-container'>
                {editing ? (<antd_1.Input value={editName} onChange={setText} onBlur={doRenameCancel} onKeyUp={doEnter} ref={initInput}/>) : (<antd_1.Dropdown overlay={<antd_1.Menu selectable={false}>
                            <antd_1.Menu.Item key='rename' onClick={doRenameStart}>
                                {texts_1.texts.common.rename}
                            </antd_1.Menu.Item>

                            <antd_1.Menu.Divider />

                            {level === 0 &&
                    <>
                                    <antd_1.Menu.Item key={model_1.OrderMode.BringToFront} onClick={doMove} disabled={isLast}>
                                        {texts_1.texts.common.bringToFront}
                                    </antd_1.Menu.Item>
        
                                    <antd_1.Menu.Item key={model_1.OrderMode.BringForwards} onClick={doMove} disabled={isLast}>
                                        {texts_1.texts.common.bringForwards}
                                    </antd_1.Menu.Item>
        
                                    <antd_1.Menu.Item key={model_1.OrderMode.SendBackwards} onClick={doMove} disabled={isFirst}>
                                        {texts_1.texts.common.sendBackwards}
                                    </antd_1.Menu.Item>
        
                                    <antd_1.Menu.Item key={model_1.OrderMode.SendToBack} onClick={doMove} disabled={isFirst}>
                                        {texts_1.texts.common.sendToBack}
                                    </antd_1.Menu.Item>
        
                                    <antd_1.Menu.Divider />
                                </>}

                            <antd_1.Menu.Item key='delete' icon={<icons_1.DeleteOutlined />} onClick={doDelete}>
                                {texts_1.texts.common["delete"]}
                            </antd_1.Menu.Item>
                        </antd_1.Menu>} trigger={['contextMenu']}>
                        <antd_1.Row className={(0, classnames_1["default"])('tree-item-header', { selected: selected })} wrap={false} style={{ marginLeft: level * 20 }} onDoubleClick={doRenameStart} onClick={doSelect}>
                            <antd_1.Col flex='none'>
                                {isGroup ? (<span onClick={function () { return setExpanded(function (x) { return !x; }); }}>
                                        {expanded ? (<icons_1.CaretDownOutlined />) : (<icons_1.CaretRightOutlined />)}
                                    </span>) : (<icons_1.FileOutlined />)}
                            </antd_1.Col>
                            <antd_1.Col flex='auto' className='tree-item-title no-select'>
                                {itemName}
                            </antd_1.Col>
                        </antd_1.Row>
                    </antd_1.Dropdown>)}
            </div>

            {expanded && isGroup &&
            <>{renderChildren(props)}</>}
        </div>);
};
exports.OutlineItem = OutlineItem;
function renderChildren(props) {
    var children = props.diagram.children(props.diagramItem);
    if (children.length === 0) {
        return null;
    }
    var newLevel = props.level + 1;
    return (<div>
            {children.map(function (item, index) {
            return <exports.OutlineItem key={item.id} diagram={props.diagram} diagramItem={item} isFirst={index === 0} isLast={index === children.length - 1} level={newLevel} onAction={props.onAction}/>;
        })}
        </div>);
}
