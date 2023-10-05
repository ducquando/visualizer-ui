"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.PresentationView = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var React = require("react");
var core_1 = require("@app/core");
var interface_1 = require("@app/wireframes/interface");
var model_1 = require("@app/wireframes/model");
var PrintDiagram_1 = require("./PrintDiagram");
require("./PresentationView.scss");
var PresentationView = function (props) {
    var onClose = props.onClose;
    var _a = (0, core_1.useFullscreen)(), fullscreen = _a[0], setFullscreen = _a[1];
    var color = (0, model_1.useStore)(function (x) { return x.editor.present.color; });
    var diagrams = (0, model_1.useStore)(function (x) { return x.editor.present.diagrams; });
    var diagramsOrdered = (0, model_1.useStore)(function (x) { return x.editor.present.orderedDiagrams; });
    var size = (0, model_1.useStore)(function (x) { return x.editor.present.size; });
    var _b = React.useState(0), pageIndex = _b[0], setPageIndex = _b[1];
    var doGoPrev = (0, core_1.useEventCallback)(function () {
        setPageIndex(function (x) { return x - 1; });
    });
    var doGoNext = (0, core_1.useEventCallback)(function () {
        setPageIndex(function (x) { return x + 1; });
    });
    var doFullscreenEnter = (0, core_1.useEventCallback)(function () {
        setFullscreen(true);
    });
    var doFullscreenExit = (0, core_1.useEventCallback)(function () {
        setFullscreen(false);
    });
    var doNavigate = (0, core_1.useEventCallback)(function (_, link) {
        if ((0, interface_1.isPageLink)(link)) {
            var linkId_1 = (0, interface_1.getPageLinkId)(link);
            var linkIndex = diagramsOrdered.findIndex(function (x) { return x.id === linkId_1; });
            if (linkIndex >= 0) {
                setPageIndex(linkIndex);
            }
        }
        else {
            window.open(link, '_blank');
        }
    });
    var currentDiagram = React.useMemo(function () {
        return diagramsOrdered[pageIndex];
    }, [pageIndex, diagramsOrdered]);
    var w = (0, core_1.sizeInPx)(size.x);
    var h = (0, core_1.sizeInPx)(size.y);
    return (<>
            <div className='presentation-view'>
                {currentDiagram &&
            <div className='presentation-diagram' style={{ width: w, height: h }}>
                        <PrintDiagram_1.PrintDiagram color={color} diagram={currentDiagram} diagrams={diagrams} onNavigate={doNavigate} size={size}/>
                    </div>}

                <div className='presentation-tools'>
                    <antd_1.Button onClick={doGoPrev} disabled={pageIndex === 0}>
                        <icons_1.ArrowLeftOutlined />
                    </antd_1.Button>

                    <antd_1.Button onClick={doGoNext} disabled={pageIndex >= diagramsOrdered.length - 1}>
                        <icons_1.ArrowRightOutlined />
                    </antd_1.Button>

                    <antd_1.Button onClick={onClose}>
                        <icons_1.CloseOutlined />
                    </antd_1.Button>

                    {!fullscreen ? (<antd_1.Button onClick={doFullscreenEnter}>
                            <icons_1.FullscreenOutlined />
                        </antd_1.Button>) : (<antd_1.Button onClick={doFullscreenExit}>
                            <icons_1.FullscreenExitOutlined />
                        </antd_1.Button>)}
                </div>
            </div>,
        </>);
};
exports.PresentationView = PresentationView;
