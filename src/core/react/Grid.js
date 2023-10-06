"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Grid = exports.GridList = void 0;
var React = require("react");
var react_sizeme_1 = require("react-sizeme");
var react_1 = require("./../utils/react");
var hooks_1 = require("./hooks");
var cache = {};
exports.GridList = React.memo(function (props) {
    var cellSize = props.cellSize, indexFirst = props.indexFirst, indexLast = props.indexLast, columns = props.columns, height = props.height, items = props.items, keyBuilder = props.keyBuilder, renderer = props.renderer;
    var cells = [];
    if (renderer) {
        for (var index = indexFirst; index < indexLast; index++) {
            var item = items[index];
            if (item) {
                var itemKey = keyBuilder(item);
                var cell = cache[itemKey];
                if (!cell) {
                    cell = renderer(item);
                    cache[itemKey] = cell;
                }
                var col = (0, react_1.sizeInPx)(cellSize * Math.floor(index % columns));
                var row = (0, react_1.sizeInPx)(cellSize * Math.floor(index / columns));
                var cellPx = (0, react_1.sizeInPx)(cellSize);
                cell = (<div key={index} style={{ position: 'absolute', height: cellPx, width: cellPx, top: row, left: col }}>
                        {cell}
                    </div>);
                cells.push(cell);
            }
        }
    }
    return (<div style={{ height: (0, react_1.sizeInPx)(height), position: 'relative' }}>
            {cells}
        </div>);
});
var GridComponent = function (props) {
    var className = props.className, columns = props.columns, items = props.items, size = props.size;
    var _a = React.useState(0), scrollTop = _a[0], setScrollTop = _a[1];
    var _b = React.useState(), scrollContainer = _b[0], setScrollContainer = _b[1];
    var doScroll = (0, hooks_1.useEventCallback)(function (event) {
        var div = event.target;
        setScrollTop(div.scrollTop);
    });
    var layout = React.useMemo(function () {
        if (!scrollContainer || !size || size.height === null) {
            return { cellSize: 0, indexFirst: 0, indexLast: 0, height: 0 };
        }
        var width = scrollContainer.clientWidth;
        if (width === 0 && size.width) {
            width = size.width;
        }
        if (width === 0) {
            return { cellSize: 0, indexFirst: 0, indexLast: 0, height: 0 };
        }
        width -= 1;
        var cellSize = Math.floor(width / columns);
        var scrollHeight = cellSize * items.length / columns;
        var scrollBottom = size.height + scrollTop;
        var indexFirst = Math.floor(scrollTop / cellSize) * columns;
        var indexLast = Math.floor(scrollBottom / cellSize) * columns + columns * 2;
        return { cellSize: cellSize, indexFirst: indexFirst, indexLast: indexLast, height: scrollHeight };
    }, [columns, items.length, scrollTop, scrollContainer, size]);
    return (<div className={className} onScroll={doScroll} ref={setScrollContainer}>
            <exports.GridList {...props} {...layout}/>
        </div>);
};
exports.Grid = (0, react_sizeme_1.withSize)({ monitorHeight: true })(GridComponent);
