"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a;
exports.__esModule = true;
exports.Grid = void 0;
var interface_1 = require("@app/wireframes/interface");
var _theme_1 = require("./_theme");
var HEADER_BACKGROUND_COLOR = 'HEADER_BACKGROUND_COLOR';
var HEADER_FOREGROUND_COLOR = 'HEADER_FOREGROUND_COLOR';
var HEADER_HIDDEN = 'HEADER_HIDDEN';
var DEFAULT_APPEARANCE = (_a = {},
    _a[interface_1.DefaultAppearance.BACKGROUND_COLOR] = '#fff',
    _a[interface_1.DefaultAppearance.FONT_SIZE] = _theme_1.CommonTheme.CONTROL_FONT_SIZE,
    _a[interface_1.DefaultAppearance.FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_COLOR] = _theme_1.CommonTheme.CONTROL_BORDER_COLOR,
    _a[interface_1.DefaultAppearance.STROKE_THICKNESS] = _theme_1.CommonTheme.CONTROL_BORDER_THICKNESS,
    _a[interface_1.DefaultAppearance.TEXT_ALIGNMENT] = 'center',
    _a[interface_1.DefaultAppearance.TEXT] = 'hello<1>, every<7>, nyan<4>\n how<3>, are<9>, you<8>\ndoing<6>, fine<5>, sanku<2>',
    _a[HEADER_BACKGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_BACKGROUND_COLOR,
    _a[HEADER_FOREGROUND_COLOR] = _theme_1.CommonTheme.CONTROL_TEXT_COLOR,
    _a[HEADER_HIDDEN] = true,
    _a);
var Grid = /** @class */ (function () {
    function Grid() {
    }
    Grid.prototype.identifier = function () {
        return 'Grid';
    };
    Grid.prototype.defaultAppearance = function () {
        return DEFAULT_APPEARANCE;
    };
    Grid.prototype.defaultSize = function () {
        return { x: 260, y: 200 };
    };
    Grid.prototype.configurables = function (factory) {
        return [
            factory.color(HEADER_BACKGROUND_COLOR, 'Header Background'),
            factory.color(HEADER_FOREGROUND_COLOR, 'Header Text'),
            factory.toggle(HEADER_HIDDEN, 'Hide Header'),
        ];
    };
    Grid.prototype.render = function (ctx) {
        var w = ctx.rect.width;
        var h = ctx.rect.height;
        var _a = this.parseText(ctx.shape), rows = _a.rows, columnCount = _a.columnCount;
        var cellWidth = w / columnCount;
        var cellHeight = h / rows.length;
        this.createFrame(ctx);
        this.createHeader(ctx, cellHeight);
        this.createBorders(ctx, columnCount, cellWidth, h, rows, cellHeight, w);
        this.createTexts(rows, cellWidth, cellHeight, ctx);
    };
    Grid.prototype.createTexts = function (rows, cellWidth, cellHeight, ctx) {
        // render cell by cell & increment anchor point of each cell 
        // similar to how an array is made by docking cells in Tikz
        var y = 0;
        var headerForeground = ctx.shape.getAppearance(HEADER_FOREGROUND_COLOR);
        var _loop_1 = function (row) {
            var x = 0;
            var isFirstRow = y === 0;
            var _loop_2 = function (cell) {
                var rect = new interface_1.Rect2(x, y, cellWidth, cellHeight);
                ctx.renderer2.text(ctx.shape, rect, function (p) {
                    // shape properties function 
                    // but actually just building cell appearance & inserting cell content 
                    p.setText(cell);
                    if (isFirstRow) {
                        p.setForegroundColor(headerForeground);
                    }
                    else {
                        p.setForegroundColor(ctx.shape);
                    }
                });
                x += cellWidth;
            };
            for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
                var cell = row_1[_a];
                _loop_2(cell);
            }
            y += cellHeight;
        };
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            _loop_1(row);
        }
    };
    Grid.prototype.createBorders = function (ctx, columnCount, cellWidth, h, rows, cellHeight, w) {
        var stokeColor = ctx.shape.getAppearance(interface_1.DefaultAppearance.STROKE_COLOR);
        var strokeWidth = ctx.shape.getAppearance(interface_1.DefaultAppearance.STROKE_THICKNESS);
        var strokeHalf = strokeWidth * 0.5;
        for (var x = 1; x < columnCount; x++) {
            var offset = Math.round(x * cellWidth - strokeHalf);
            var rect = new interface_1.Rect2(offset, 0, strokeWidth, h);
            ctx.renderer2.rectangle(0, 0, rect, function (p) {
                p.setBackgroundColor(stokeColor);
            });
        }
        for (var y = 2; y < rows.length; y++) {
            var offset = Math.round(y * cellHeight - strokeHalf);
            var rect = new interface_1.Rect2(0, offset, w, strokeWidth);
            ctx.renderer2.rectangle(0, 0, rect, function (p) {
                p.setBackgroundColor(stokeColor);
            });
        }
    };
    Grid.prototype.createHeader = function (ctx, height) {
        var rect = new interface_1.Rect2(ctx.rect.x, ctx.rect.y, ctx.rect.w, height);
        ctx.renderer2.roundedRectangleTop(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, rect, function (p) {
            if (!ctx.shape.getAppearance(HEADER_HIDDEN)) {
                p.setBackgroundColor(ctx.shape.getAppearance(HEADER_BACKGROUND_COLOR));
            }
            p.setStrokeColor(ctx.shape);
        });
    };
    Grid.prototype.createFrame = function (ctx) {
        ctx.renderer2.rectangle(ctx.shape, _theme_1.CommonTheme.CONTROL_BORDER_RADIUS, ctx.rect, function (p) {
            p.setBackgroundColor(ctx.shape);
            p.setStrokeColor(ctx.shape);
        });
    };
    Grid.prototype.parseText = function (shape) {
        var key = shape.text;
        // implicit type inference, 'result' is of type 'any' then
        // inferred to be 'Parsed'. this is causing some mf problems that 
        // can only be suppressed by line 21 in tsconfig.json
        // this feature is no longer supported in latest typescript :) 
        var result = shape.renderCache['PARSED'];
        if (!result || result.key !== key) {
            var rows = key.split('\n').map(function (x) { return x.split(',').map(function (c) { return c.trim(); }); });
            var columnCount = 0;
            for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                var row = rows_2[_i];
                columnCount = Math.max(columnCount, row.length);
            }
            // we allow single row table, so disable this 
            // while (rows.length < 2) {
            //     rows.push([]);
            // }
            for (var _a = 0, rows_3 = rows; _a < rows_3.length; _a++) {
                var row = rows_3[_a];
                while (row.length < columnCount) {
                    row.push('<0>');
                }
            }
            // break into a table of only content and a table of only queue number 
            var contentOnly = [];
            var queueOnly = [];
            for (var i = 0; i < rows.length; i++) {
                var tmpContentRow = [];
                var tmpQueueRow = [];
                for (var j = 0; j < rows[0].length; j++) {
                    var tmpStr = rows[i][j];
                    var tmpContent = tmpStr.slice(0, tmpStr.length - 3);
                    tmpContentRow.push(tmpContent);
                    var tmpQueueNum = +tmpStr.slice(tmpStr.length - 2, tmpStr.length - 1);
                    tmpQueueRow.push(tmpQueueNum);
                }
                contentOnly.push(tmpContentRow);
                queueOnly.push(tmpQueueRow);
            }
            // console.log(queueOnly); // debug, it's working :)
            // now constructing the queue list 
            // then, sort queueList by firs element in each tuple 
            var queueList = [];
            for (var i = 0; i < queueOnly.length; i++) {
                for (var j = 0; j < queueOnly[0].length; j++) {
                    var tmpTup = [queueOnly[i][j], i, j];
                    queueList.push(tmpTup);
                }
            }
            queueList.sort(function (a, b) { return a[0] - b[0]; });
            // console.log(queueList); // debug, it's working :) 
            // making the 
            result = { parsed: { rows: contentOnly, columnCount: columnCount }, key: key };
            shape.renderCache['PARSED'] = result;
        }
        return result.parsed;
    };
    return Grid;
}());
exports.Grid = Grid;
