"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.loadImage = exports.loadImagesToClipboardItems = exports.useClipboard = exports.ClipboardContainer = void 0;
var React = require("react");
var types_1 = require("./../utils/types");
var hooks_1 = require("./hooks");
var ClipboardInstance = /** @class */ (function () {
    function ClipboardInstance() {
    }
    ClipboardInstance.prototype.set = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.fallback = value;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.clipboard.writeText(value)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClipboardInstance.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, navigator.clipboard.readText()];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, this.fallback];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ClipboardInstance;
}());
var DEFAULT_VALUE = {
    onCopy: [],
    onPaste: [],
    clipboard: new ClipboardInstance()
};
var ClipboardContext = React.createContext(DEFAULT_VALUE);
var ContextConnector = React.memo(function () {
    var context = React.useContext(ClipboardContext);
    (0, hooks_1.useDocumentEvent)('paste', function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var text, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isInputOrTextArea(event.target)) {
                        return [2 /*return*/];
                    }
                    if (!event.clipboardData) {
                        return [2 /*return*/];
                    }
                    text = event.clipboardData.getData('text');
                    if (types_1.Types.isString(text) && text.length > 0) {
                        emitPaste(context, { type: 'Text', text: text });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, loadImagesToClipboardItems(event.clipboardData.files)];
                case 1:
                    items = _a.sent();
                    if (items.length > 0) {
                        emitPaste.apply(void 0, __spreadArray([context], items, false));
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    (0, hooks_1.useDocumentEvent)('copy', function (event) {
        if (isInputOrTextArea(event.target)) {
            return;
        }
        for (var _i = 0, _a = context.onCopy; _i < _a.length; _i++) {
            var callback = _a[_i];
            if (callback({ isCut: false, clipboard: context.clipboard })) {
                break;
            }
        }
    });
    (0, hooks_1.useDocumentEvent)('cut', function (event) {
        if (isInputOrTextArea(event.target)) {
            return;
        }
        for (var _i = 0, _a = context.onCopy; _i < _a.length; _i++) {
            var callback = _a[_i];
            if (callback({ isCut: true, clipboard: context.clipboard })) {
                break;
            }
        }
    });
    return null;
});
var ClipboardContainer = function (_a) {
    var children = _a.children;
    return (<ClipboardContext.Provider value={DEFAULT_VALUE}>
            <ContextConnector />

            {children}
        </ClipboardContext.Provider>);
};
exports.ClipboardContainer = ClipboardContainer;
function useClipboard(props) {
    var _this = this;
    var context = React.useContext(ClipboardContext);
    var currentPaste = React.useRef(props === null || props === void 0 ? void 0 : props.onPaste);
    var currentCopy = React.useRef(props === null || props === void 0 ? void 0 : props.onCopy);
    currentPaste.current = props === null || props === void 0 ? void 0 : props.onPaste;
    currentCopy.current = props === null || props === void 0 ? void 0 : props.onCopy;
    React.useEffect(function () {
        var doCopy = function (event) {
            var _a;
            return (_a = currentCopy.current) === null || _a === void 0 ? void 0 : _a.call(currentCopy, event);
        };
        var doPaste = function (event) {
            var _a;
            return (_a = currentPaste.current) === null || _a === void 0 ? void 0 : _a.call(currentPaste, event);
        };
        context.onCopy.push(doCopy);
        context.onPaste.push(doPaste);
        return function () {
            context.onCopy.splice(context.onCopy.indexOf(doCopy), 1);
            context.onPaste.splice(context.onPaste.indexOf(doPaste), 1);
        };
    }, [context]);
    return React.useMemo(function () { return ({
        paste: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                tryEmitPaste(context);
                return [2 /*return*/];
            });
        }); },
        copy: function () {
            emitCopy(context, false);
        },
        cut: function () {
            emitCopy(context, true);
        }
    }); }, [context]);
}
exports.useClipboard = useClipboard;
function tryEmitPaste(context) {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.clipboard.get()];
                case 1:
                    text = _a.sent();
                    if (text) {
                        emitPaste(context, { type: 'Text', text: text });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function emitCopy(context, isCut) {
    var event = Object.freeze({ isCut: isCut, clipboard: context.clipboard });
    for (var _i = 0, _a = context.onCopy; _i < _a.length; _i++) {
        var callback = _a[_i];
        var shouldStop = callback(event);
        if (shouldStop) {
            break;
        }
    }
}
function emitPaste(context) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    var event = Object.freeze({ items: items });
    for (var _a = 0, _b = context.onPaste; _a < _b.length; _a++) {
        var callback = _b[_a];
        var shouldStop = callback(event);
        if (shouldStop) {
            break;
        }
    }
}
function loadImagesToClipboardItems(files) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, file, image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 4];
                    file = void 0;
                    if (types_1.Types.isArray(files)) {
                        file = files[i];
                    }
                    else {
                        file = files.item(i);
                    }
                    return [4 /*yield*/, loadImage(file)];
                case 2:
                    image = _a.sent();
                    if (image != null) {
                        items.push({ type: 'Image', image: image });
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, items];
            }
        });
    });
}
exports.loadImagesToClipboardItems = loadImagesToClipboardItems;
function loadImage(file) {
    return new Promise(function (resolve) {
        if (file === null || file.type.indexOf('image') < 0) {
            resolve(null);
            return;
        }
        var reader = new FileReader();
        reader.onload = function (loadedFile) {
            var imageSource = loadedFile.target.result;
            var imageElement = document.createElement('img');
            imageElement.onerror = function () {
                resolve(null);
            };
            imageElement.onload = function () {
                resolve({ source: imageSource, width: imageElement.width, height: imageElement.height });
            };
            imageElement.src = imageSource;
        };
        reader.onabort = function () {
            resolve(null);
        };
        reader.onerror = function () {
            resolve(null);
        };
        reader.readAsDataURL(file);
    });
}
exports.loadImage = loadImage;
function isInputOrTextArea(element) {
    var typed = element;
    return typed && (typed.nodeName === 'INPUT' || typed.nodeName === 'TEXTAREA');
}
