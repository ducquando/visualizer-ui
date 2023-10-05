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
exports.ColorConfigurable = exports.NumberConfigurable = exports.SliderConfigurable = exports.SelectionConfigurable = exports.ToggleConfigurable = exports.TextConfigurable = exports.Configurable = void 0;
var Configurable = /** @class */ (function () {
    function Configurable(name, label) {
        this.name = name;
        this.label = label;
    }
    return Configurable;
}());
exports.Configurable = Configurable;
var TextConfigurable = /** @class */ (function (_super) {
    __extends(TextConfigurable, _super);
    function TextConfigurable(name, label) {
        var _this = _super.call(this, name, label) || this;
        Object.freeze(_this);
        return _this;
    }
    return TextConfigurable;
}(Configurable));
exports.TextConfigurable = TextConfigurable;
var ToggleConfigurable = /** @class */ (function (_super) {
    __extends(ToggleConfigurable, _super);
    function ToggleConfigurable(name, label) {
        var _this = _super.call(this, name, label) || this;
        Object.freeze(_this);
        return _this;
    }
    return ToggleConfigurable;
}(Configurable));
exports.ToggleConfigurable = ToggleConfigurable;
var SelectionConfigurable = /** @class */ (function (_super) {
    __extends(SelectionConfigurable, _super);
    function SelectionConfigurable(name, label, options) {
        var _this = _super.call(this, name, label) || this;
        _this.options = options;
        Object.freeze(_this);
        return _this;
    }
    return SelectionConfigurable;
}(Configurable));
exports.SelectionConfigurable = SelectionConfigurable;
var SliderConfigurable = /** @class */ (function (_super) {
    __extends(SliderConfigurable, _super);
    function SliderConfigurable(name, label, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 100; }
        var _this = _super.call(this, name, label) || this;
        _this.min = min;
        _this.max = max;
        Object.freeze(_this);
        return _this;
    }
    return SliderConfigurable;
}(Configurable));
exports.SliderConfigurable = SliderConfigurable;
var NumberConfigurable = /** @class */ (function (_super) {
    __extends(NumberConfigurable, _super);
    function NumberConfigurable(name, label, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 100; }
        var _this = _super.call(this, name, label) || this;
        _this.min = min;
        _this.max = max;
        Object.freeze(_this);
        return _this;
    }
    return NumberConfigurable;
}(Configurable));
exports.NumberConfigurable = NumberConfigurable;
var ColorConfigurable = /** @class */ (function (_super) {
    __extends(ColorConfigurable, _super);
    function ColorConfigurable(name, label) {
        var _this = _super.call(this, name, label) || this;
        Object.freeze(_this);
        return _this;
    }
    return ColorConfigurable;
}(Configurable));
exports.ColorConfigurable = ColorConfigurable;
