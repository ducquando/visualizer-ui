"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.RendererService = void 0;
var RendererService;
(function (RendererService) {
    var REGISTERED_RENDERER = {};
    function all() {
        return Object.entries(REGISTERED_RENDERER);
    }
    RendererService.all = all;
    function get(id) {
        return REGISTERED_RENDERER[id];
    }
    RendererService.get = get;
    function addRenderer(renderer) {
        REGISTERED_RENDERER[renderer.identifier()] = renderer;
    }
    RendererService.addRenderer = addRenderer;
    function createShapes(sources) {
        var result = [];
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            for (var _a = 0, _b = all(); _a < _b.length; _a++) {
                var _c = _b[_a], renderer = _c[1];
                var plugin = renderer.plugin();
                if (plugin.create) {
                    var shape = plugin.create(source);
                    if (shape) {
                        result.push(shape);
                        break;
                    }
                }
            }
        }
        return result;
    }
    RendererService.createShapes = createShapes;
})(RendererService = exports.RendererService || (exports.RendererService = {}));
