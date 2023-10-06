"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.MoreProperties = void 0;
var antd_1 = require("antd");
var React = require("react");
var texts_1 = require("@app/texts");
var interface_1 = require("@app/wireframes/interface");
var model_1 = require("@app/wireframes/model");
var actions_1 = require("./../actions");
var Text_1 = require("./Text");
exports.MoreProperties = React.memo(function () {
    var diagramsMap = (0, model_1.useStore)(function (x) { return x.editor.present.diagrams; });
    var diagramsOrdered = (0, model_1.useStore)(function (x) { return x.editor.present.orderedDiagrams; });
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var selectedItems = (0, model_1.useStore)(model_1.getSelectedItems);
    var selectedSet = (0, model_1.useStore)(model_1.getSelectionSet);
    var _a = (0, actions_1.useAppearance)(selectedDiagramId, selectedSet, interface_1.DefaultAppearance.LINK, true, true), link = _a[0], setLink = _a[1];
    var linkType = React.useMemo(function () {
        if ((0, interface_1.isPageLink)(link.value)) {
            var pageId = (0, interface_1.getPageLinkId)(link.value);
            return { isPageLink: true, validPage: !!diagramsMap.get(pageId) };
        }
        else {
            return { isPageLink: false, validPage: false };
        }
    }, [diagramsMap, link.value]);
    return (<>
            <div style={{ display: (selectedItems.length > 0 ? 'block' : 'none') }}>
                <div className='property-subsection visual-properties'>
                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.link}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <Text_1.Text disabled={link.empty} text={!linkType.isPageLink ? link.value : ''} selection={selectedSet} onTextChange={setLink}/>
                        </antd_1.Col>
                    </antd_1.Row>

                    <antd_1.Row className='property'>
                        <antd_1.Col span={12} className='property-label'>{texts_1.texts.common.page}</antd_1.Col>
                        <antd_1.Col span={12} className='property-value'>
                            <antd_1.Select disabled={link.empty} value={linkType.isPageLink && linkType.validPage ? link.value : ''} onChange={setLink}>
                                <antd_1.Select.Option value={undefined}><></></antd_1.Select.Option>

                                {diagramsOrdered.map(function (x, index) {
            return <antd_1.Select.Option key={x.id} value={(0, interface_1.getPageLink)(x.id)}>{(0, model_1.getPageName)(x, index)}</antd_1.Select.Option>;
        })}
                            </antd_1.Select>
                        </antd_1.Col>
                    </antd_1.Row>
                </div>
            </div>
        </>);
});
