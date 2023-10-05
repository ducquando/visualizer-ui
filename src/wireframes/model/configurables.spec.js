"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var model_1 = require("@app/wireframes/model");
describe('SelectionConfigurable', function () {
    it('should instantiate', function () {
        var options = ['Option1', 'Option2'];
        var configurable = new model_1.SelectionConfigurable('MyName', 'MyLabel', options);
        expect(configurable).toBeDefined();
        expect(configurable.options).toBe(options);
    });
});
describe('SliderConfigurable', function () {
    it('should instantiate', function () {
        var configurable = new model_1.SliderConfigurable('MyName', 'MyLabel', 10, 20);
        expect(configurable).toBeDefined();
        expect(configurable.min).toBe(10);
        expect(configurable.max).toBe(20);
    });
    it('should instantiate default', function () {
        var configurable = new model_1.SliderConfigurable('MyName', 'MyLabel');
        expect(configurable).toBeDefined();
        expect(configurable.min).toBe(0);
        expect(configurable.max).toBe(100);
    });
});
describe('ColorConfigurable', function () {
    it('should instantiate', function () {
        var configurable = new model_1.ColorConfigurable('MyName', 'MyLabel');
        expect(configurable).toBeDefined();
    });
});
