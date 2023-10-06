"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
/* eslint-disable @typescript-eslint/indent */
var connected_react_router_1 = require("connected-react-router");
var history_1 = require("history");
var React = require("react");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var model_1 = require("@app/wireframes/model");
var Reducers = require("@app/wireframes/model/actions");
var shapes_1 = require("@app/wireframes/shapes");
var App_1 = require("./App");
var registerServiceWorker_1 = require("./registerServiceWorker");
var utils_1 = require("./wireframes/model/actions/utils");
require("./index.scss");
(0, shapes_1.registerRenderers)();
var editorState = model_1.EditorState.create();
var editorReducer = (0, utils_1.createClassReducer)(editorState, function (builder) {
    Reducers.buildAlignment(builder);
    Reducers.buildAppearance(builder);
    Reducers.buildDiagrams(builder);
    Reducers.buildGrouping(builder);
    Reducers.buildItems(builder);
    Reducers.buildOrdering(builder);
});
var undoableReducer = Reducers.undoable(editorReducer, editorState, {
    actionMerger: Reducers.mergeAction,
    actionsToIgnore: [
        model_1.selectDiagram.name,
        model_1.selectItems.name,
    ]
});
var history = (0, history_1.createBrowserHistory)();
var composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || redux_1.compose;
var store = (0, redux_1.createStore)((0, redux_1.combineReducers)({
    assets: Reducers.assets((0, model_1.createInitialAssetsState)()),
    editor: Reducers.rootLoading(undoableReducer, editorReducer),
    loading: Reducers.loading((0, model_1.createInitialLoadingState)()),
    router: (0, connected_react_router_1.connectRouter)(history),
    ui: Reducers.ui((0, model_1.createInitialUIState)())
}), composeEnhancers((0, redux_1.applyMiddleware)(redux_thunk_1["default"], (0, connected_react_router_1.routerMiddleware)(history), Reducers.toastMiddleware(), Reducers.loadingMiddleware())));
var Root = (<react_dnd_1.DndProvider backend={react_dnd_html5_backend_1.HTML5Backend}>
        <react_redux_1.Provider store={store}>
            <connected_react_router_1.ConnectedRouter history={history}>
                <react_router_1.Route path='/:token?' component={App_1.App}/>
            </connected_react_router_1.ConnectedRouter>
        </react_redux_1.Provider>
    </react_dnd_1.DndProvider>);
(0, registerServiceWorker_1.registerServiceWorker)(store);
ReactDOM.render(Root, document.getElementById('root-layout'));
