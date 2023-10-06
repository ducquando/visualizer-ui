"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.LoadingMenu = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var React = require("react");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var actions_1 = require("./../actions");
var text = require('@app/legal.html');
exports.LoadingMenu = React.memo(function () {
    var forLoading = (0, actions_1.useLoading)();
    var editor = (0, model_1.useStore)(function (s) { return s.editor; });
    var tokenToRead = (0, model_1.useStore)(function (s) { return s.loading.tokenToRead; });
    var tokenToWrite = (0, model_1.useStore)(function (s) { return s.loading.tokenToWrite; });
    var saveTimer = React.useRef();
    var saveAction = React.useRef(forLoading.saveDiagram);
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    saveAction.current = forLoading.saveDiagram;
    var doToggleInfoDialog = (0, core_1.useEventCallback)(function () {
        setIsOpen(function (x) { return !x; });
    });
    React.useEffect(function () {
        function clearTimer() {
            if (saveTimer.current) {
                clearInterval(saveTimer.current);
                saveTimer.current = null;
            }
        }
        if (tokenToWrite) {
            if (!saveTimer.current) {
                saveTimer.current = setInterval(function () {
                    if (!saveAction.current.disabled) {
                        saveAction.current.onAction();
                    }
                }, 30000);
            }
            var stopTimer_1 = setTimeout(function () {
                clearTimer();
            }, 40000);
            return function () {
                clearTimeout(stopTimer_1);
            };
        }
        else {
            clearTimer();
            return undefined;
        }
    }, [tokenToWrite, editor]);
    var menu = (<antd_1.Menu>
            <actions_1.ActionMenuItem displayMode='Label' action={forLoading.saveDiagramToFile}/>
        </antd_1.Menu>);
    return (<>
            <CustomTitle token={tokenToRead}/>

            <actions_1.ActionMenuButton displayMode='IconLabel' action={forLoading.newDiagram}/>
            <actions_1.ActionMenuButton displayMode='Icon' action={forLoading.openDiagramAction}/>

            <actions_1.ActionDropdownButton displayMode='IconLabel' action={forLoading.saveDiagram} type='primary' overlay={menu}/>

            <antd_1.Button className='menu-item' size='large' onClick={doToggleInfoDialog}>
                <icons_1.QuestionCircleOutlined />
            </antd_1.Button>

            <antd_1.Button className='menu-item' size='large' href='https://github.com/mydraft-cc/ui' target='_blank'>
                <icons_1.GithubOutlined />
            </antd_1.Button>

            <core_1.MarkerButton />

            <antd_1.Modal title={texts_1.texts.common.about} visible={isOpen} onCancel={doToggleInfoDialog} onOk={doToggleInfoDialog}>
                <div dangerouslySetInnerHTML={{ __html: text["default"] }}/>
            </antd_1.Modal>
        </>);
});
var CustomTitle = React.memo(function (_a) {
    var token = _a.token;
    var title = token && token.length > 0 ?
        "mydraft.cc - Diagram ".concat(token) :
        "mydraft.cc - Diagram ".concat(texts_1.texts.common.unsaved);
    return (<core_1.Title text={title}/>);
});
