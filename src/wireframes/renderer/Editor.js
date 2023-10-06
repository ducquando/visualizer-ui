"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Editor = void 0;
var React = require("react");
var core_1 = require("@app/core");
var OverlayContext_1 = require("./../contexts/OverlayContext");
var CanvasView_1 = require("./CanvasView");
var NavigateAdorner_1 = require("./NavigateAdorner");
var QuickbarAdorner_1 = require("./QuickbarAdorner");
var RenderLayer_1 = require("./RenderLayer");
var SelectionAdorner_1 = require("./SelectionAdorner");
var TextAdorner_1 = require("./TextAdorner");
var TransformAdorner_1 = require("./TransformAdorner");
var interaction_overlays_1 = require("./interaction-overlays");
var interaction_service_1 = require("./interaction-service");
require("./Editor.scss");
exports.Editor = React.memo(function (props) {
    var color = props.color, diagram = props.diagram, isDefaultView = props.isDefaultView, masterDiagram = props.masterDiagram, onChangeItemsAppearance = props.onChangeItemsAppearance, onNavigate = props.onNavigate, onRender = props.onRender, onSelectItems = props.onSelectItems, onTransformItems = props.onTransformItems, selectedItems = props.selectedItems, selectedItemsWithLocked = props.selectedItemsWithLocked, viewBox = props.viewBox, viewSize = props.viewSize, zoom = props.zoom, zoomedSize = props.zoomedSize;
    var adornerSelectLayer = React.useRef();
    var adornerTransformLayer = React.useRef();
    var diagramTools = React.useRef();
    var overlayContext = (0, OverlayContext_1.useOverlayContext)();
    var overlayLayer = React.useRef();
    var renderMainLayer = React.useRef();
    var renderMasterLayer = React.useRef();
    var _a = React.useState(), interactionMasterService = _a[0], setInteractionMasterService = _a[1];
    var _b = React.useState(), interactionMainService = _b[0], setInteractionMainService = _b[1];
    // Use a stream of preview updates to bypass react for performance reasons.
    var renderPreview = React.useRef(new core_1.Subscription());
    var doInit = React.useCallback(function (doc) {
        // Create these layers in the correct order.
        diagramTools.current = doc.rect().fill('transparent');
        renderMasterLayer.current = doc.group().id('masterLayer');
        renderMainLayer.current = doc.group().id('parentLayer');
        adornerSelectLayer.current = doc.group().id('selectLayer');
        adornerTransformLayer.current = doc.group().id('transformLayer');
        overlayLayer.current = doc.group().id('overlaysLayer');
        setInteractionMainService(new interaction_service_1.InteractionService([
            adornerSelectLayer.current,
            adornerTransformLayer.current
        ], renderMainLayer.current, doc));
        setInteractionMasterService(new interaction_service_1.InteractionService([
            adornerSelectLayer.current,
            adornerTransformLayer.current
        ], renderMasterLayer.current, doc));
        if (isDefaultView) {
            overlayContext.overlayManager = new interaction_overlays_1.InteractionOverlays(overlayLayer.current);
        }
    }, []);
    React.useEffect(function () {
        if (!interactionMainService) {
            return;
        }
        var w = viewSize.x;
        var h = viewSize.y;
        core_1.SVGHelper.setSize(diagramTools.current, w, h);
        core_1.SVGHelper.setSize(adornerSelectLayer.current, w, h);
        core_1.SVGHelper.setSize(adornerTransformLayer.current, w, h);
        core_1.SVGHelper.setSize(diagramTools.current, 0.5, 0.5);
        core_1.SVGHelper.setSize(renderMasterLayer.current, w, h);
        core_1.SVGHelper.setSize(renderMainLayer.current, w, h);
    }, [viewSize, interactionMainService]);
    React.useEffect(function () {
        overlayContext.snapManager.prepare(diagram, viewSize);
    }, [diagram, overlayContext.snapManager, viewSize]);
    React.useEffect(function () {
        var _a, _b;
        (_b = (_a = overlayContext.overlayManager)['setZoom']) === null || _b === void 0 ? void 0 : _b.call(_a, zoom);
    }, [diagram, overlayContext.overlayManager, zoom]);
    return (<div className='editor' style={{ background: color.toString() }} ref={function (element) { return overlayContext.element = element; }}>
            <CanvasView_1.CanvasView onInit={doInit} viewBox={viewBox} viewSize={viewSize} zoom={zoom} zoomedSize={zoomedSize}/>

            {interactionMainService && diagram && (<>
                    <RenderLayer_1.RenderLayer diagram={masterDiagram} diagramLayer={renderMasterLayer.current} onRender={onRender}/>

                    <RenderLayer_1.RenderLayer diagram={diagram} diagramLayer={renderMainLayer.current} preview={renderPreview.current} onRender={onRender}/>

                    {onTransformItems &&
                <TransformAdorner_1.TransformAdorner adorners={adornerTransformLayer.current} interactionService={interactionMainService} onTransformItems={onTransformItems} overlayManager={overlayContext.overlayManager} previewStream={renderPreview.current} selectedDiagram={diagram} selectedItems={selectedItems} snapManager={overlayContext.snapManager} viewSize={viewSize} zoom={zoom}/>}

                    {onSelectItems &&
                <SelectionAdorner_1.SelectionAdorner adorners={adornerSelectLayer.current} interactionService={interactionMainService} onSelectItems={onSelectItems} previewStream={renderPreview.current} selectedDiagram={diagram} selectedItems={selectedItemsWithLocked} zoom={zoom}/>}

                    {onChangeItemsAppearance &&
                <TextAdorner_1.TextAdorner interactionService={interactionMainService} onChangeItemsAppearance={onChangeItemsAppearance} selectedDiagram={diagram} selectedItems={selectedItems} zoom={zoom}/>}

                    {onTransformItems &&
                <QuickbarAdorner_1.QuickbarAdorner previewStream={renderPreview.current} selectedDiagram={diagram} selectedItems={selectedItems} viewSize={viewSize} zoom={zoom}/>}

                    {onNavigate &&
                <NavigateAdorner_1.NavigateAdorner interactionService={interactionMainService} onNavigate={onNavigate}/>}

                    {onNavigate && interactionMasterService &&
                <NavigateAdorner_1.NavigateAdorner interactionService={interactionMasterService} onNavigate={onNavigate}/>}
                </>)}
        </div>);
});
