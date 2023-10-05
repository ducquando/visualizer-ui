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
exports.__esModule = true;
exports.Recent = void 0;
var antd_1 = require("antd");
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var RecentItem_1 = require("./RecentItem");
require("./Recent.scss");
var Recent = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var recent = (0, model_1.useStore)(function (x) { return x.loading.recentDiagrams; });
    var doLoad = (0, core_1.useEventCallback)(function (item) {
        dispatch((0, model_1.loadDiagramFromServer)({ tokenToRead: item.tokenToRead, tokenToWrite: item.tokenToWrite, navigate: true }));
    });
    var orderedRecent = React.useMemo(function () {
        var result = Object.entries(recent).map(function (_a) {
            var tokenToRead = _a[0], value = _a[1];
            return __assign(__assign({}, value), { tokenToRead: tokenToRead });
        });
        result.sort(function (lhs, rhs) { return rhs.date - lhs.date; });
        return result;
    }, [recent]);
    return (<>
            <div className='recent-list'>
                {orderedRecent.map(function (item) {
            return <RecentItem_1.RecentItem item={item} onLoad={doLoad}/>;
        })}

                {orderedRecent.length === 0 &&
            <antd_1.Empty image={antd_1.Empty.PRESENTED_IMAGE_SIMPLE} description={texts_1.texts.common.noRecentDocument}/>}
            </div>
        </>);
};
exports.Recent = Recent;
