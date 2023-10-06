"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.NavigateAdorner = void 0;
var React = require("react");
var NavigateAdorner = /** @class */ (function (_super) {
    __extends(NavigateAdorner, _super);
    function NavigateAdorner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigateAdorner.prototype.componentDidMount = function () {
        this.props.interactionService.addHandler(this);
    };
    NavigateAdorner.prototype.componentWillUnmount = function () {
        this.props.interactionService.removeHandler(this);
    };
    NavigateAdorner.prototype.onClick = function (event, next) {
        var target = getShapeWithLink(event);
        if (target) {
            this.props.onNavigate(target.shape, target.link);
        }
        next(event);
        return false;
    };
    NavigateAdorner.prototype.onMouseMove = function (event, next) {
        if (getShapeWithLink(event)) {
            document.body.style.cursor = 'pointer';
        }
        else {
            document.body.style.cursor = 'inherit';
        }
        next(event);
    };
    NavigateAdorner.prototype.render = function () {
        return null;
    };
    return NavigateAdorner;
}(React.PureComponent));
exports.NavigateAdorner = NavigateAdorner;
function getShapeWithLink(event) {
    var _a;
    var link = (_a = event.shape) === null || _a === void 0 ? void 0 : _a.link;
    if (link) {
        return { shape: event.shape, link: link };
    }
    else {
        return null;
    }
}
