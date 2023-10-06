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
exports.__esModule = true;
exports.rootLoading = exports.loading = exports.loadingMiddleware = exports.saveDiagramToServer = exports.saveDiagramToFile = exports.loadDiagramInternal = exports.loadDiagramFromServer = exports.loadDiagramFromFile = exports.newDiagram = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var connected_react_router_1 = require("connected-react-router");
var file_saver_1 = require("file-saver");
var texts_1 = require("@app/texts");
var internal_1 = require("./../internal");
var api_1 = require("./api");
var diagrams_1 = require("./diagrams");
var items_1 = require("./items");
var obsolete_1 = require("./obsolete");
var ui_1 = require("./ui");
exports.newDiagram = (0, toolkit_1.createAction)('diagram/new', function (navigate) {
    return { payload: { navigate: navigate } };
});
exports.loadDiagramFromFile = (0, toolkit_1.createAsyncThunk)('diagram/load/file', function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var stored, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, args.file.text()];
            case 1:
                stored = _b.apply(_a, [_c.sent()]);
                return [2 /*return*/, { stored: stored }];
        }
    });
}); });
exports.loadDiagramFromServer = (0, toolkit_1.createAsyncThunk)('diagram/load/server', function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var stored;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, api_1.getDiagram)(args.tokenToRead)];
            case 1:
                stored = _a.sent();
                return [2 /*return*/, { tokenToRead: args.tokenToRead, tokenToWrite: args.tokenToWrite, stored: stored }];
        }
    });
}); });
exports.loadDiagramInternal = (0, toolkit_1.createAction)('diagram/load/actions', function (stored, requestId) {
    return { payload: { stored: stored, requestId: requestId } };
});
exports.saveDiagramToFile = (0, toolkit_1.createAsyncThunk)('diagram/save/file', function (_, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var state, bodyText, bodyBlob;
    return __generator(this, function (_a) {
        state = thunkAPI.getState();
        bodyText = JSON.stringify(getSaveState(state), undefined, 4);
        bodyBlob = new Blob([bodyText], { type: 'application/json' });
        (0, file_saver_1.saveAs)(bodyBlob, 'diagram.json');
        return [2 /*return*/];
    });
}); });
exports.saveDiagramToServer = (0, toolkit_1.createAsyncThunk)('diagram/save/server', function (args, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var state, tokenToWrite, tokenToRead, _a, readToken, writeToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                state = thunkAPI.getState();
                tokenToWrite = state.loading.tokenToWrite;
                tokenToRead = state.loading.tokenToRead;
                if (!(tokenToRead && tokenToWrite)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, api_1.putDiagram)(tokenToRead, tokenToWrite, getSaveState(state))];
            case 1:
                _b.sent();
                return [2 /*return*/, { tokenToRead: tokenToRead, tokenToWrite: tokenToWrite, update: true, navigate: args.navigate }];
            case 2: return [4 /*yield*/, (0, api_1.postDiagram)(getSaveState(state))];
            case 3:
                _a = _b.sent(), readToken = _a.readToken, writeToken = _a.writeToken;
                return [2 /*return*/, { tokenToRead: readToken, tokenToWrite: writeToken, navigate: args.navigate }];
        }
    });
}); });
function loadingMiddleware() {
    var middleware = function (store) { return function (next) { return function (action) {
        if (exports.loadDiagramFromServer.pending.match(action) || exports.loadDiagramFromFile.pending.match(action)) {
            store.dispatch((0, ui_1.showToast)(texts_1.texts.common.loadingDiagram, 'loading', action.meta.requestId));
        }
        else if (exports.saveDiagramToServer.pending.match(action) || exports.saveDiagramToFile.pending.match(action)) {
            store.dispatch((0, ui_1.showToast)(texts_1.texts.common.savingDiagram, 'loading', action.meta.requestId));
        }
        try {
            var result = next(action);
            if (exports.newDiagram.match(action)) {
                if (action.payload.navigate) {
                    store.dispatch((0, connected_react_router_1.push)(''));
                }
            }
            else if (exports.loadDiagramFromServer.fulfilled.match(action)) {
                if (action.meta.arg.navigate) {
                    store.dispatch((0, connected_react_router_1.push)(action.payload.tokenToRead));
                }
                store.dispatch((0, exports.loadDiagramInternal)(action.payload.stored, action.meta.requestId));
            }
            else if (exports.loadDiagramFromFile.fulfilled.match(action)) {
                store.dispatch((0, exports.loadDiagramInternal)(action.payload.stored, action.meta.requestId));
            }
            else if (exports.loadDiagramFromServer.rejected.match(action) || exports.loadDiagramFromFile.rejected.match(action)) {
                store.dispatch((0, ui_1.showToast)(texts_1.texts.common.loadingDiagramFailed, 'error', action.meta.requestId));
            }
            else if (exports.loadDiagramInternal.match(action)) {
                store.dispatch((0, ui_1.showToast)(texts_1.texts.common.loadingDiagramDone, 'success', action.payload.requestId));
            }
            else if (exports.saveDiagramToServer.fulfilled.match(action)) {
                if (action.meta.arg.navigate) {
                    store.dispatch((0, connected_react_router_1.push)(action.payload.tokenToRead));
                }
                (0, internal_1.saveRecentDiagrams)(store.getState().loading.recentDiagrams);
                var content = action.payload.update ?
                    texts_1.texts.common.savingDiagramDone :
                    texts_1.texts.common.savingDiagramDoneUrl("".concat(window.location.protocol, "//").concat(window.location.host, "/").concat(action.payload.tokenToRead));
                store.dispatch((0, ui_1.showToast)(content, 'success', action.meta.requestId, 1000));
            }
            else if (exports.saveDiagramToFile.fulfilled.match(action)) {
                store.dispatch((0, ui_1.showToast)(texts_1.texts.common.savingDiagramDone, 'success', action.meta.requestId));
            }
            else if (exports.saveDiagramToServer.rejected.match(action) || exports.saveDiagramToFile.rejected.match(action)) {
                store.dispatch((0, ui_1.showToast)(texts_1.texts.common.savingDiagramFailed, 'error', action.meta.requestId));
            }
            return result;
        }
        catch (ex) {
            if (exports.loadDiagramInternal.match(action)) {
                store.dispatch((0, ui_1.showToast)(texts_1.texts.common.loadingDiagramFailed, 'error', action.payload.requestId));
            }
            console.error(ex);
            throw ex;
        }
    }; }; };
    return middleware;
}
exports.loadingMiddleware = loadingMiddleware;
function loading(initialState) {
    return (0, toolkit_1.createReducer)(initialState, function (builder) { return builder
        .addCase(exports.newDiagram, function (state) {
        state.isLoading = false;
        state.tokenToRead = null;
        state.tokenToWrite = null;
    })
        .addCase(exports.loadDiagramFromServer.pending, function (state) {
        state.isLoading = true;
    })
        .addCase(exports.loadDiagramFromServer.rejected, function (state) {
        state.isLoading = false;
    })
        .addCase(exports.loadDiagramFromServer.fulfilled, function (state, action) {
        var _a, _b;
        state.isLoading = false;
        state.tokenToRead = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.tokenToRead;
        state.tokenToWrite = (_b = action.payload) === null || _b === void 0 ? void 0 : _b.tokenToWrite;
    })
        .addCase(exports.saveDiagramToServer.pending, function (state) {
        state.isLoading = true;
    })
        .addCase(exports.saveDiagramToServer.rejected, function (state) {
        state.isLoading = false;
    })
        .addCase(exports.saveDiagramToServer.fulfilled, function (state, action) {
        var _a = action.payload, tokenToRead = _a.tokenToRead, tokenToWrite = _a.tokenToWrite;
        state.isLoading = false;
        state.tokenToRead = tokenToRead;
        state.tokenToWrite = tokenToWrite;
        state.recentDiagrams[tokenToRead] = { date: new Date().getTime(), tokenToWrite: tokenToWrite };
    }); });
}
exports.loading = loading;
function rootLoading(undoableReducer, editorReducer) {
    return function (state, action) {
        if (exports.newDiagram.match(action)) {
            var initialAction = (0, diagrams_1.addDiagram)();
            var initialState = editorReducer(internal_1.EditorState.create(), initialAction);
            state = internal_1.UndoableState.create(initialState, initialAction);
        }
        else if (exports.loadDiagramInternal.match(action)) {
            var stored = action.payload.stored;
            var initialState = void 0;
            if (stored.initial) {
                initialState = internal_1.Serializer.deserializeEditor(stored.initial);
            }
            else {
                initialState = internal_1.EditorState.create();
            }
            var actions = stored.actions || stored;
            var firstAction = actions[0];
            if (!firstAction) {
                firstAction = (0, diagrams_1.addDiagram)();
            }
            var editor = internal_1.UndoableState.create(editorReducer(initialState, firstAction), firstAction);
            for (var _i = 0, _a = actions.slice(1).filter(handleAction); _i < _a.length; _i++) {
                var loadedAction = _a[_i];
                editor = undoableReducer(editor, (0, obsolete_1.migrateOldAction)(loadedAction));
            }
            var selectedDiagram = editor.present.diagrams.get(editor.present.selectedDiagramId);
            if (!selectedDiagram) {
                var firstDiagram = editor.present.orderedDiagrams[0];
                if (firstDiagram) {
                    editor = undoableReducer(editor, (0, diagrams_1.selectDiagram)(firstDiagram));
                }
            }
            state = editor;
        }
        return undoableReducer(state, action);
    };
}
exports.rootLoading = rootLoading;
function getSaveState(state) {
    var initial = internal_1.Serializer.serializeEditor(state.editor.firstState);
    var actions = state.editor.actions.slice(1).filter(handleAction);
    return { initial: initial, actions: actions };
}
function handleAction(action) {
    return !items_1.selectItems.match(action) && !diagrams_1.selectDiagram.match(action);
}
