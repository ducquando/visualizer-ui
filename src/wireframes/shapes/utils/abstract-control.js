"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.AbstractControl = exports.DefaultConfigurableFactory = exports.DefaultConstraintFactory = void 0;
var svg = require("@svgdotjs/svg.js");
var core_1 = require("@app/core");
var model_1 = require("@app/wireframes/model");
var svg_renderer2_1 = require("./svg-renderer2");
var text_size_contraint_1 = require("./text-size-contraint");
var DefaultConstraintFactory = /** @class */ (function () {
    function DefaultConstraintFactory() {
    }
    DefaultConstraintFactory.prototype.size = function (width, height) {
        return new model_1.SizeConstraint(width, height);
    };
    DefaultConstraintFactory.prototype.minSize = function () {
        return new model_1.MinSizeConstraint();
    };
    DefaultConstraintFactory.prototype.textHeight = function (padding) {
        return new model_1.TextHeightConstraint(padding);
    };
    DefaultConstraintFactory.prototype.textSize = function (paddingX, paddingY, lineHeight, resizeWidth, minWidth) {
        return new text_size_contraint_1.TextSizeConstraint(svg_renderer2_1.SVGRenderer2.INSTANCE, paddingX, paddingY, lineHeight, resizeWidth, minWidth);
    };
    DefaultConstraintFactory.INSTANCE = new DefaultConstraintFactory();
    return DefaultConstraintFactory;
}());
exports.DefaultConstraintFactory = DefaultConstraintFactory;
var DefaultConfigurableFactory = /** @class */ (function () {
    function DefaultConfigurableFactory() {
    }
    DefaultConfigurableFactory.prototype.selection = function (name, label, options) {
        return new model_1.SelectionConfigurable(name, label, options);
    };
    DefaultConfigurableFactory.prototype.slider = function (name, label, min, max) {
        return new model_1.SliderConfigurable(name, label, min, max);
    };
    DefaultConfigurableFactory.prototype.number = function (name, label, min, max) {
        return new model_1.NumberConfigurable(name, label, min, max);
    };
    DefaultConfigurableFactory.prototype.color = function (name, label) {
        return new model_1.ColorConfigurable(name, label);
    };
    DefaultConfigurableFactory.prototype.text = function (name, label) {
        return new model_1.TextConfigurable(name, label);
    };
    DefaultConfigurableFactory.prototype.toggle = function (name, label) {
        return new model_1.ToggleConfigurable(name, label);
    };
    DefaultConfigurableFactory.INSTANCE = new DefaultConfigurableFactory();
    return DefaultConfigurableFactory;
}());
exports.DefaultConfigurableFactory = DefaultConfigurableFactory;
var GLOBAL_CONTEXT = { renderer2: svg_renderer2_1.SVGRenderer2.INSTANCE };
var AbstractControl = /** @class */ (function () {
    function AbstractControl(shapePlugin) {
        this.shapePlugin = shapePlugin;
    }
    AbstractControl.prototype.identifier = function () {
        return this.shapePlugin.identifier();
    };
    AbstractControl.prototype.plugin = function () {
        return this.shapePlugin;
    };
    AbstractControl.prototype.defaultAppearance = function () {
        var _a, _b;
        return (_b = (_a = this.shapePlugin).defaultAppearance) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AbstractControl.prototype.setContext = function (context) {
        svg_renderer2_1.SVGRenderer2.INSTANCE.setContainer(context);
        return this;
    };
    AbstractControl.prototype.createDefaultShape = function () {
        var _a, _b, _c, _d;
        var appearance = this.shapePlugin.defaultAppearance();
        var constraint = (_b = (_a = this.shapePlugin).constraint) === null || _b === void 0 ? void 0 : _b.call(_a, DefaultConstraintFactory.INSTANCE);
        var configurables = (_d = (_c = this.shapePlugin).configurables) === null || _d === void 0 ? void 0 : _d.call(_c, DefaultConfigurableFactory.INSTANCE);
        var renderer = this.identifier();
        var size = this.shapePlugin.defaultSize();
        return { renderer: renderer, size: size, appearance: appearance, configurables: configurables, constraint: constraint };
    };
    AbstractControl.prototype.render = function (shape, existing, options) {
        GLOBAL_CONTEXT.shape = shape;
        GLOBAL_CONTEXT.rect = new core_1.Rect2(0, 0, shape.transform.size.x, shape.transform.size.y);
        var container = svg_renderer2_1.SVGRenderer2.INSTANCE.getContainer();
        // Use full color codes here to avoid the conversion in svg.js
        if (!existing) {
            existing = new svg.G();
            existing.add(new svg.Rect().fill('#ffffff').opacity(0.001));
            if (options === null || options === void 0 ? void 0 : options.debug) {
                existing.rect().fill('#ffffff').stroke({ color: '#ff0000' });
            }
        }
        var index = 1;
        if (options === null || options === void 0 ? void 0 : options.debug) {
            index = 2;
        }
        for (var i = 0; i < index; i++) {
            core_1.SVGHelper.transformByRect(existing.get(i), GLOBAL_CONTEXT.rect);
        }
        svg_renderer2_1.SVGRenderer2.INSTANCE.setContainer(existing, index);
        this.shapePlugin.render(GLOBAL_CONTEXT);
        if (!(options === null || options === void 0 ? void 0 : options.noTransform)) {
            var to = shape.transform;
            core_1.SVGHelper.transformBy(existing, {
                x: to.position.x - 0.5 * to.size.x,
                y: to.position.y - 0.5 * to.size.y,
                w: to.size.x,
                h: to.size.y,
                rx: to.position.x,
                ry: to.position.y,
                rotation: to.rotation.degree
            });
        }
        if (!(options === null || options === void 0 ? void 0 : options.noOpacity)) {
            existing.opacity(shape.opacity);
        }
        svg_renderer2_1.SVGRenderer2.INSTANCE.cleanupAll();
        svg_renderer2_1.SVGRenderer2.INSTANCE.setContainer(container);
        return existing;
    };
    return AbstractControl;
}());
exports.AbstractControl = AbstractControl;
