"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Page = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var React = require("react");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var Page = function (props) {
    var diagram = props.diagram, diagrams = props.diagrams, index = props.index, onAction = props.onAction, selected = props.selected;
    var _a = React.useState(''), editName = _a[0], setEditName = _a[1];
    var _b = React.useState(false), editing = _b[0], setEditing = _b[1];
    var pageMaster = React.useMemo(function () {
        var _a;
        return (_a = diagrams.find(function (x) { return x.id === diagram.master; })) === null || _a === void 0 ? void 0 : _a.id;
    }, [diagrams, diagram.master]);
    var pageName = React.useMemo(function () {
        return (0, model_1.getPageName)(diagram, index);
    }, [diagram, index]);
    var setText = (0, core_1.useEventCallback)(function (event) {
        setEditName(event.target.value);
    });
    var doRenameStart = (0, core_1.useEventCallback)(function () {
        setEditName(pageName);
        setEditing(true);
    });
    var doRenameCancel = (0, core_1.useEventCallback)(function () {
        setEditing(false);
    });
    var doDelete = (0, core_1.useEventCallback)(function () {
        onAction(diagram.id, 'Delete');
    });
    var doDuplicate = (0, core_1.useEventCallback)(function () {
        onAction(diagram.id, 'Duplicate');
    });
    var doSelect = (0, core_1.useEventCallback)(function () {
        onAction(diagram.id, 'Select');
    });
    var doSetMaster = (0, core_1.useEventCallback)(function (master) {
        onAction(diagram.id, 'SetMaster', master);
    });
    var doEnter = (0, core_1.useEventCallback)(function (event) {
        if (core_1.Keys.isEnter(event) || core_1.Keys.isEscape(event)) {
            setEditing(false);
        }
        if (core_1.Keys.isEnter(event)) {
            onAction(diagram.id, 'Rename', editName);
        }
    });
    var initInput = React.useCallback(function (event) {
        event === null || event === void 0 ? void 0 : event.focus();
    }, []);
    return (<div className='tree-item'>
            <div className='tree-item-header-container'>
                {editing ? (<antd_1.Input value={editName} onChange={setText} onBlur={doRenameCancel} onKeyUp={doEnter} ref={initInput}/>) : (<antd_1.Dropdown overlay={<antd_1.Menu selectable={false}>
                            <antd_1.Menu.Item key='delete' icon={<icons_1.DeleteOutlined />} onClick={doDelete}>
                                {texts_1.texts.common["delete"]}
                            </antd_1.Menu.Item>

                            <antd_1.Menu.Item key='duplicate' onClick={doDuplicate}>
                                {texts_1.texts.common.duplicate}
                            </antd_1.Menu.Item>

                            <antd_1.Menu.Item key='rename' onClick={doRenameStart}>
                                {texts_1.texts.common.rename}
                            </antd_1.Menu.Item>

                            <antd_1.Menu.SubMenu title={texts_1.texts.common.masterPage}>
                                <MasterPage id={undefined} title={texts_1.texts.common.none} diagramId={diagram.id} diagramMaster={pageMaster} hide={false} onSetMaster={doSetMaster}/>

                                {diagrams.map(function (item, index) {
                    return <MasterPage key={item.id} id={item.id} title={(0, model_1.getPageName)(item, index)} diagramId={diagram.id} diagramMaster={pageMaster} hide={item.id === diagram.id} onSetMaster={doSetMaster}/>;
                })}
                            </antd_1.Menu.SubMenu>
                        </antd_1.Menu>} trigger={['contextMenu']}>
                        <antd_1.Row className={(0, classnames_1["default"])('tree-item-header', { selected: selected })} wrap={false} onDoubleClick={doRenameStart} onClick={doSelect}>
                            <antd_1.Col flex='none'>
                                {pageMaster ? (<icons_1.FileMarkdownOutlined />) : (<icons_1.FileOutlined />)}
                            </antd_1.Col>
                            <antd_1.Col flex='auto' className='tree-item-title no-select'>
                                {pageName}
                            </antd_1.Col>
                        </antd_1.Row>
                    </antd_1.Dropdown>)}
            </div>
        </div>);
};
exports.Page = Page;
var MasterPage = function (props) {
    var id = props.id, diagramMaster = props.diagramMaster, hide = props.hide, onSetMaster = props.onSetMaster, title = props.title;
    if (hide) {
        return null;
    }
    var selected = id === diagramMaster;
    return (<antd_1.Menu.Item key={id} icon={selected ? <icons_1.CheckOutlined /> : null} onClick={function () { return onSetMaster(id); }}>
            {title}
        </antd_1.Menu.Item>);
};
