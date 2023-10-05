"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Properties = void 0;
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var React = require("react");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var Colors_1 = require("./Colors");
var CustomProperties_1 = require("./CustomProperties");
var DiagramProperties_1 = require("./DiagramProperties");
var LayoutProperties_1 = require("./LayoutProperties");
var MoreProperties_1 = require("./MoreProperties");
var TransformProperties_1 = require("./TransformProperties");
var VisualProperties_1 = require("./VisualProperties");
var Properties = function () {
    var hasSelection = (0, model_1.useStore)(model_1.getSelectedItems).length > 0;
    var hasDiagram = !!(0, model_1.useStore)(model_1.getDiagram);
    return (<>
            <antd_1.Collapse className={((0, classnames_1["default"])({ hidden: !hasSelection }))} bordered={false} defaultActiveKey={['layout', 'visual', 'more', 'custom']}>
                <antd_1.Collapse.Panel key='layout' header={texts_1.texts.common.layout}>
                    <LayoutProperties_1.LayoutProperties />

                    <TransformProperties_1.TransformProperties />
                </antd_1.Collapse.Panel>
                <antd_1.Collapse.Panel key='visual' header={texts_1.texts.common.visual}>
                    <VisualProperties_1.VisualProperties />
                </antd_1.Collapse.Panel>
                <antd_1.Collapse.Panel key='more' header={texts_1.texts.common.more}>
                    <MoreProperties_1.MoreProperties />
                </antd_1.Collapse.Panel>
                <antd_1.Collapse.Panel key='custom' header={texts_1.texts.common.custom}>
                    <CustomProperties_1.CustomProperties />
                </antd_1.Collapse.Panel>
            </antd_1.Collapse>

            <antd_1.Collapse className={((0, classnames_1["default"])({ hidden: hasSelection || !hasDiagram }))} bordered={false} defaultActiveKey={['diagram', 'colors']}>
                <antd_1.Collapse.Panel key='diagram' header={texts_1.texts.common.diagram}>
                    <DiagramProperties_1.DiagramProperties />
                </antd_1.Collapse.Panel>
                <antd_1.Collapse.Panel key='colors' header={texts_1.texts.common.colors}>
                    <Colors_1.Colors />
                </antd_1.Collapse.Panel>
            </antd_1.Collapse>
        </>);
};
exports.Properties = Properties;
