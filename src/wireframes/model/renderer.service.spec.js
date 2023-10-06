"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var model_1 = require("@app/wireframes/model");
var MockupRenderer = /** @class */ (function () {
    function MockupRenderer() {
    }
    MockupRenderer.prototype.defaultAppearance = function () {
        return {};
    };
    MockupRenderer.prototype.plugin = function () {
        return null;
    };
    MockupRenderer.prototype.identifier = function () {
        return 'identifier';
    };
    MockupRenderer.prototype.showInGallery = function () {
        return false;
    };
    MockupRenderer.prototype.createDefaultShape = function () {
        return null;
    };
    MockupRenderer.prototype.createProperties = function () {
        return [];
    };
    MockupRenderer.prototype.setContext = function () {
        return this;
    };
    MockupRenderer.prototype.render = function () {
        return null;
    };
    return MockupRenderer;
}());
describe('RendererService', function () {
    it('should register renderer with identifier', function () {
        var renderer = new MockupRenderer();
        model_1.RendererService.addRenderer(renderer);
        expect(model_1.RendererService.get('identifier')).toBe(renderer);
    });
});
