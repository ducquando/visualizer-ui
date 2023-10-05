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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EditorViewInner = exports.EditorView = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var Editor_1 = require("@app/wireframes/renderer/Editor");
var ContextMenu_1 = require("./context-menu/ContextMenu");
require("./EditorView.scss");
var EditorView = function (props) {
    var diagram = (0, model_1.useStore)(model_1.getDiagram);
    if (!diagram) {
        return null;
    }
    return (<exports.EditorViewInner {...props} diagram={diagram}/>);
};
exports.EditorView = EditorView;
var EditorViewInner = function (_a) {
    var diagram = _a.diagram, spacing = _a.spacing;
    var dispatch = (0, react_redux_1.useDispatch)();
    var editor = (0, model_1.useStore)(model_1.getEditor);
    var editorColor = editor.color;
    var editorSize = editor.size;
    var masterDiagram = (0, model_1.useStore)(model_1.getMasterDiagram);
    var renderRef = React.useRef();
    var selectedPoint = React.useRef({ x: 0, y: 0 });
    var selectedDiagramId = (0, model_1.useStore)(model_1.getDiagramId);
    var state = (0, model_1.useStore)(function (s) { return s; });
    var zoom = (0, model_1.useStore)(function (s) { return s.ui.zoom; });
    var zoomedSize = editorSize.mul(zoom);
    var _b = React.useState(false), menuVisible = _b[0], setMenuVisible = _b[1];
    var doChangeItemsAppearance = (0, core_1.useEventCallback)(function (diagram, visuals, key, value) {
        dispatch((0, model_1.changeItemsAppearance)(diagram, visuals, key, value));
    });
    var doSelectItems = (0, core_1.useEventCallback)(function (diagram, items) {
        dispatch((0, model_1.selectItems)(diagram, items));
    });
    var doTransformItems = (0, core_1.useEventCallback)(function (diagram, items, oldBounds, newBounds) {
        dispatch((0, model_1.transformItems)(diagram, items, oldBounds, newBounds));
    });
    var doHide = (0, core_1.useEventCallback)(function () {
        setMenuVisible(false);
    });
    var doSetPosition = (0, core_1.useEventCallback)(function (event) {
        selectedPoint.current = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
    });
    var doPaste = (0, core_1.useEventCallback)(function (sources, x, y) {
        if (!selectedDiagramId) {
            return;
        }
        var shapes = model_1.RendererService.createShapes(sources);
        for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var _a = shapes_1[_i], appearance = _a.appearance, renderer = _a.renderer, size = _a.size;
            dispatch((0, model_1.addShape)(selectedDiagramId, renderer, { position: { x: x, y: y }, size: size, appearance: appearance }));
            x += 40;
            y += 40;
        }
    });
    (0, core_1.useClipboard)({
        onPaste: function (event) {
            if (!selectedDiagramId) {
                return;
            }
            var x = selectedPoint.current.x;
            var y = selectedPoint.current.y;
            doPaste(event.items, x, y);
        }
    });
    var _c = (0, react_dnd_1.useDrop)({
        accept: [
            react_dnd_html5_backend_1.NativeTypes.URL,
            react_dnd_html5_backend_1.NativeTypes.FILE,
            react_dnd_html5_backend_1.NativeTypes.TEXT,
            'DND_ASSET',
            'DND_ICON',
        ],
        drop: function (item, monitor) { return __awaiter(void 0, void 0, void 0, function () {
            var offset, componentRect, x, y, itemType, _a, urls, files, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!monitor || !renderRef.current || !selectedDiagramId) {
                            return [2 /*return*/];
                        }
                        offset = monitor.getSourceClientOffset();
                        if (!offset) {
                            offset = monitor.getClientOffset();
                        }
                        if (!offset) {
                            return [2 /*return*/];
                        }
                        componentRect = (0, react_dom_1.findDOMNode)(renderRef.current).getBoundingClientRect();
                        x = (((offset === null || offset === void 0 ? void 0 : offset.x) || 0) - spacing - componentRect.left) / zoom;
                        y = (((offset === null || offset === void 0 ? void 0 : offset.y) || 0) - spacing - componentRect.top) / zoom;
                        itemType = monitor.getItemType();
                        _a = itemType;
                        switch (_a) {
                            case 'DND_ASSET': return [3 /*break*/, 1];
                            case 'DND_ICON': return [3 /*break*/, 2];
                            case react_dnd_html5_backend_1.NativeTypes.TEXT: return [3 /*break*/, 3];
                            case react_dnd_html5_backend_1.NativeTypes.URL: return [3 /*break*/, 4];
                            case react_dnd_html5_backend_1.NativeTypes.FILE: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        dispatch((0, model_1.addShape)(selectedDiagramId, item['name'], { position: { x: x, y: y } }));
                        return [3 /*break*/, 7];
                    case 2:
                        doPaste([__assign({ type: 'Icon' }, item)], x, y);
                        return [3 /*break*/, 7];
                    case 3:
                        doPaste([__assign({ type: 'Text' }, item)], x, y);
                        return [3 /*break*/, 7];
                    case 4:
                        {
                            urls = item.urls;
                            doPaste(urls.map(function (url) { return ({ type: 'Url', url: url }); }), x, y);
                            return [3 /*break*/, 7];
                        }
                        _c.label = 5;
                    case 5:
                        files = item.files;
                        _b = doPaste;
                        return [4 /*yield*/, (0, core_1.loadImagesToClipboardItems)(files)];
                    case 6:
                        _b.apply(void 0, [_c.sent(), x, y]);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); }
    }), drop = _c[1];
    drop(renderRef);
    var zoomedOuterWidth = 2 * spacing + zoomedSize.x;
    var zoomedOuterHeight = 2 * spacing + zoomedSize.y;
    var w = (0, core_1.sizeInPx)(zoomedOuterWidth);
    var h = (0, core_1.sizeInPx)(zoomedOuterHeight);
    var padding = (0, core_1.sizeInPx)(spacing);
    return (<antd_1.Dropdown overlay={<ContextMenu_1.ContextMenu onClick={doHide}/>} trigger={['contextMenu']} visible={menuVisible} onVisibleChange={setMenuVisible}>            
            <div className='editor-view' onClick={doSetPosition}>
                <div className='editor-diagram' style={{ width: w, height: h, padding: padding }} ref={renderRef}>
                    <Editor_1.Editor color={editorColor} diagram={diagram} masterDiagram={masterDiagram} onChangeItemsAppearance={doChangeItemsAppearance} onSelectItems={doSelectItems} onTransformItems={doTransformItems} selectedItems={(0, model_1.getSelectedItems)(state)} selectedItemsWithLocked={(0, model_1.getSelectedItemsWithLocked)(state)} viewSize={editor.size} zoom={zoom} zoomedSize={zoomedSize} isDefaultView={true}/>
                </div>
            </div>
        </antd_1.Dropdown>);
};
exports.EditorViewInner = EditorViewInner;
