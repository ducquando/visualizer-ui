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
exports.TextAdorner = void 0;
var React = require("react");
var core_1 = require("@app/core");
var interface_1 = require("@app/wireframes/interface");
var MIN_WIDTH = 150;
var MIN_HEIGHT = 30;
var TextAdorner = /** @class */ (function (_super) {
    __extends(TextAdorner, _super);
    function TextAdorner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = { display: 'none ' };
        _this.selectedShape = null;
        _this.textareaElement = null;
        _this.handleMouseDown = function (e) {
            if (e.target !== _this.textareaElement) {
                _this.hide();
            }
        };
        _this.doInitialize = function (textarea) {
            _this.textareaElement = textarea;
        };
        _this.doHide = function () {
            _this.hide();
        };
        _this.doSubmit = function (event) {
            if ((core_1.Keys.isEnter(event) && !event.shiftKey) || core_1.Keys.isEscape(event)) {
                if (core_1.Keys.isEnter(event)) {
                    _this.updateText();
                }
                else {
                    _this.hide();
                }
                _this.hide();
                event.preventDefault();
                event.stopPropagation();
            }
        };
        return _this;
    }
    TextAdorner.prototype.componentDidMount = function () {
        this.props.interactionService.addHandler(this);
        window.addEventListener('mousedown', this.handleMouseDown);
    };
    TextAdorner.prototype.componentWillUnmount = function () {
        this.props.interactionService.removeHandler(this);
        window.removeEventListener('mousedown', this.handleMouseDown);
    };
    TextAdorner.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.selectedItems !== prevProps.selectedItems) {
            this.updateText();
        }
    };
    TextAdorner.prototype.onDoubleClick = function (event) {
        if (event.shape && !event.shape.isLocked && this.textareaElement) {
            if (event.shape.textDisabled) {
                return;
            }
            var zoom = this.props.zoom;
            var transform = event.shape.transform;
            var x = (0, core_1.sizeInPx)(zoom * (transform.position.x - 0.5 * transform.size.x) - 2);
            var y = (0, core_1.sizeInPx)(zoom * (transform.position.y - 0.5 * transform.size.y) - 2);
            var w = (0, core_1.sizeInPx)(zoom * (Math.max(transform.size.x, MIN_WIDTH)) + 4);
            var h = (0, core_1.sizeInPx)(zoom * (Math.max(transform.size.y, MIN_HEIGHT)) + 4);
            this.textareaElement.value = event.shape.text;
            this.textareaElement.style.top = y;
            this.textareaElement.style.left = x;
            this.textareaElement.style.width = w;
            this.textareaElement.style.height = h;
            this.textareaElement.style.resize = 'none';
            this.textareaElement.style.display = 'block';
            this.textareaElement.style.position = 'absolute';
            this.textareaElement.focus();
            this.props.interactionService.hideAdorners();
            this.selectedShape = event.shape;
        }
    };
    TextAdorner.prototype.updateText = function () {
        if (!this.selectedShape) {
            return;
        }
        var newText = this.textareaElement.value;
        var oldText = this.selectedShape.text;
        if (newText !== oldText) {
            this.props.onChangeItemsAppearance(this.props.selectedDiagram, [this.selectedShape], interface_1.DefaultAppearance.TEXT, newText);
        }
        this.hide();
    };
    TextAdorner.prototype.hide = function () {
        this.selectedShape = null;
        this.textareaElement.style.width = '0';
        this.textareaElement.style.display = 'none';
        this.props.interactionService.showAdorners();
    };
    TextAdorner.prototype.render = function () {
        return (<textarea className='ant-input no-border-radius' style={this.style} ref={this.doInitialize} onBlur={this.doHide} onKeyDown={this.doSubmit}/>);
    };
    return TextAdorner;
}(React.PureComponent));
exports.TextAdorner = TextAdorner;
