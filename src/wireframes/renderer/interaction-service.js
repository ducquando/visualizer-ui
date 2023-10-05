"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.InteractionService = exports.SvgEvent = void 0;
var svg = require("@svgdotjs/svg.js");
var core_1 = require("@app/core");
var SvgEvent = /** @class */ (function () {
    function SvgEvent(event, position, element, shape) {
        this.event = event;
        this.position = position;
        this.element = element;
        this.shape = shape;
    }
    return SvgEvent;
}());
exports.SvgEvent = SvgEvent;
var ROTATION_CONFIG = [
    { angle: 45, cursor: 'ne-resize' },
    { angle: 90, cursor: 'e-resize' },
    { angle: 135, cursor: 'se-resize' },
    { angle: 180, cursor: 's-resize' },
    { angle: 215, cursor: 'sw-resize' },
    { angle: 270, cursor: 'w-resize' },
    { angle: 315, cursor: 'nw-resize' },
];
var NOOP = function () { };
var InteractionService = /** @class */ (function () {
    function InteractionService(adornerLayers, renderings, diagram) {
        var _this = this;
        this.adornerLayers = adornerLayers;
        this.diagram = diagram;
        this.interactionHandlers = [];
        this.isDragging = false;
        this.onClick = NOOP;
        this.onKeyUp = NOOP;
        this.onKeyDown = NOOP;
        this.onDoubleClick = NOOP;
        this.onMouseDown = NOOP;
        this.onMouseDrag = NOOP;
        this.onMouseMove = NOOP;
        this.onMouseUp = NOOP;
        this.onBlur = NOOP;
        this.handleMouseMove = function (event) {
            var element = event.target;
            if (element && element['cursor']) {
                document.body.style.cursor = element['cursor'];
            }
            else if (element && Number.isFinite(element['cursorAngle'])) {
                var rotation = element['cursorAngle'];
                var baseRotation = svg.adopt(element).transform().rotate;
                var totalRotation = core_1.MathHelper.toPositiveDegree((baseRotation || 0) + rotation);
                for (var _i = 0, ROTATION_CONFIG_1 = ROTATION_CONFIG; _i < ROTATION_CONFIG_1.length; _i++) {
                    var config = ROTATION_CONFIG_1[_i];
                    if (totalRotation > config.angle - 22.5 &&
                        totalRotation < config.angle + 22.5) {
                        document.body.style.cursor = config.cursor;
                        return;
                    }
                }
                document.body.style.cursor = 'n-resize';
            }
            else {
                document.body.style.cursor = 'default';
            }
        };
        renderings.dblclick(function (event) {
            _this.onDoubleClick(event);
        });
        renderings.click(function (event) {
            _this.onClick(event);
        });
        diagram.mousemove(function (event) {
            _this.handleMouseMove(event);
            _this.onMouseMove(event);
        });
        diagram.mousedown(function (event) {
            _this.isDragging = true;
            _this.onMouseDown(event);
        });
        window.addEventListener('blur', function (event) {
            _this.onBlur(event);
        });
        window.document.addEventListener('keyup', function (event) {
            _this.onKeyUp(event);
        });
        window.document.addEventListener('keydown', function (event) {
            _this.onKeyDown(event);
        });
        window.document.addEventListener('mousemove', function (event) {
            if (_this.isDragging) {
                _this.isDragging = true;
                _this.onMouseDrag(event);
            }
        });
        window.document.addEventListener('mouseup', function (event) {
            if (_this.isDragging) {
                _this.isDragging = false;
                _this.onMouseUp(event);
            }
        });
    }
    InteractionService.prototype.addHandler = function (handler) {
        this.interactionHandlers.push(handler);
        this.rebuild();
    };
    InteractionService.prototype.removeHandler = function (handler) {
        this.interactionHandlers.splice(this.interactionHandlers.indexOf(handler), 1);
        this.rebuild();
    };
    InteractionService.prototype.rebuild = function () {
        this.onBlur = this.buildEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onBlur) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onClick = this.buildMouseEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onClick) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onKeyUp = this.buildEvent(function (h) { var _a; return (_a = h.onKeyUp) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onKeyDown = this.buildEvent(function (h) { var _a; return (_a = h.onKeyDown) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onDoubleClick = this.buildMouseEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onDoubleClick) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onMouseMove = this.buildMouseEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onMouseMove) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onMouseDown = this.buildMouseEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onMouseDown) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onMouseDrag = this.buildMouseEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onMouseDrag) === null || _a === void 0 ? void 0 : _a.bind(h); });
        this.onMouseUp = this.buildMouseEvent(function (h) { var _a; return (_a = h === null || h === void 0 ? void 0 : h.onMouseUp) === null || _a === void 0 ? void 0 : _a.bind(h); });
    };
    InteractionService.prototype.setCursor = function (item, cursor) {
        item.node['cursor'] = cursor;
    };
    InteractionService.prototype.setCursorAngle = function (item, angle) {
        item.node['cursorAngle'] = angle;
    };
    InteractionService.prototype.showAdorners = function () {
        this.adornerLayers.forEach(function (l) { return l.show(); });
    };
    InteractionService.prototype.hideAdorners = function () {
        this.adornerLayers.forEach(function (l) { return l.hide(); });
    };
    InteractionService.prototype.buildEvent = function (actionProvider) {
        var result = NOOP;
        var _loop_1 = function (i) {
            var handler = actionProvider(this_1.interactionHandlers[i]);
            if (handler) {
                var next_1 = result;
                result = function (event) { return handler(event, next_1); };
            }
        };
        var this_1 = this;
        for (var i = this.interactionHandlers.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
        return result;
    };
    InteractionService.prototype.buildMouseEvent = function (actionProvider) {
        var result = NOOP;
        var inner = this.buildEvent(actionProvider);
        if (inner !== NOOP) {
            var diagram_1 = this.diagram;
            result = function (event) {
                var currentTarget = event.target;
                var currentElement = null;
                while (currentTarget && currentTarget.parentElement) {
                    currentTarget = currentTarget.parentElement;
                    if (currentTarget.shape) {
                        currentElement = currentTarget;
                        break;
                    }
                }
                var _a = diagram_1.point(event.pageX, event.pageY), x = _a.x, y = _a.y;
                var svgEvent = new SvgEvent(event, new core_1.Vec2(Math.round(x), Math.round(y)), currentElement, (currentElement === null || currentElement === void 0 ? void 0 : currentElement.shape) || null);
                inner(svgEvent);
            };
        }
        return result;
    };
    return InteractionService;
}());
exports.InteractionService = InteractionService;
