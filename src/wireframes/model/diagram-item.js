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
exports.DiagramItem = void 0;
var core_1 = require("@app/core");
var interface_1 = require("@app/wireframes/interface");
var diagram_item_set_1 = require("./diagram-item-set");
var transform_1 = require("./transform");
var DiagramItem = /** @class */ (function (_super) {
    __extends(DiagramItem, _super);
    function DiagramItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cachedBounds = {};
        return _this;
    }
    Object.defineProperty(DiagramItem.prototype, "id", {
        get: function () {
            return this.get('id');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "type", {
        get: function () {
            return this.get('type');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "name", {
        get: function () {
            return this.get('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "appearance", {
        get: function () {
            return this.get('appearance');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "childIds", {
        get: function () {
            return this.get('childIds');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "configurables", {
        get: function () {
            return this.get('configurables');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "constraint", {
        get: function () {
            return this.get('constraint');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "isLocked", {
        get: function () {
            return this.get('isLocked');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "rotation", {
        get: function () {
            return this.get('rotation');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "renderCache", {
        get: function () {
            return this.get('renderCache');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "renderer", {
        get: function () {
            return this.get('renderer');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "transform", {
        get: function () {
            return this.get('transform');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "fontSize", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.FONT_SIZE) || 10;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "fontFamily", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.FONT_FAMILY) || 'inherit';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "backgroundColor", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.BACKGROUND_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "foregroundColor", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.FOREGROUND_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "iconFontFamily", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.ICON_FONT_FAMILY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "link", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.LINK);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "opacity", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.OPACITY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "strokeColor", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.STROKE_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "strokeThickness", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "text", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.TEXT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "textAlignment", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.TEXT_ALIGNMENT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramItem.prototype, "textDisabled", {
        get: function () {
            return this.getAppearance(interface_1.DefaultAppearance.TEXT_DISABLED);
        },
        enumerable: false,
        configurable: true
    });
    DiagramItem.prototype.getAppearance = function (key) {
        return this.appearance.get(key);
    };
    DiagramItem.createGroup = function (setup) {
        if (setup === void 0) { setup = {}; }
        var id = setup.id, childIds = setup.childIds, isLocked = setup.isLocked, name = setup.name, rotation = setup.rotation;
        var props = {
            id: id || core_1.MathHelper.nextId(),
            childCache: {},
            childIds: core_1.ImmutableList.of(childIds),
            isLocked: isLocked,
            name: name,
            rotation: rotation || core_1.Rotation.ZERO,
            type: 'Group'
        };
        return new DiagramItem(props);
    };
    DiagramItem.createShape = function (setup) {
        var id = setup.id, appearance = setup.appearance, configurables = setup.configurables, constraint = setup.constraint, isLocked = setup.isLocked, name = setup.name, renderer = setup.renderer, transform = setup.transform;
        var props = {
            id: id || core_1.MathHelper.nextId(),
            appearance: core_1.ImmutableMap.of(appearance),
            configurables: configurables,
            constraint: constraint,
            isLocked: isLocked,
            name: name,
            renderCache: {},
            renderer: renderer,
            transform: transform || transform_1.Transform.ZERO,
            type: 'Shape'
        };
        return new DiagramItem(props);
    };
    DiagramItem.prototype.lock = function () {
        return this.set('isLocked', true);
    };
    DiagramItem.prototype.unlock = function () {
        return this.set('isLocked', undefined);
    };
    DiagramItem.prototype.rename = function (name) {
        return this.set('name', name);
    };
    DiagramItem.prototype.replaceAppearance = function (appearance) {
        if (this.type === 'Group' || !appearance) {
            return this;
        }
        return this.set('appearance', appearance);
    };
    DiagramItem.prototype.setAppearance = function (key, value) {
        if (this.type === 'Group') {
            return this;
        }
        var appearance = this.appearance.set(key, value);
        return this.set('appearance', appearance);
    };
    DiagramItem.prototype.transformWith = function (transformer) {
        if (this.type === 'Group' || !transformer) {
            return this;
        }
        var newTransform = transformer(this.transform);
        if (!newTransform) {
            return this;
        }
        return this.set('transform', newTransform);
    };
    DiagramItem.prototype.bounds = function (diagram) {
        if (this.type === 'Group') {
            this.cachedBounds || (this.cachedBounds = {});
            var cacheId = diagram.instanceId;
            var cached = this.cachedBounds[cacheId];
            if (!cached) {
                var set = diagram_item_set_1.DiagramItemSet.createFromDiagram([this.id], diagram);
                if (set.allShapes.length === 0) {
                    return transform_1.Transform.ZERO;
                }
                var transforms = set.allShapes.map(function (x) { return x.transform; });
                this.cachedBounds[cacheId] = cached = transform_1.Transform.createFromTransformationsAndRotation(transforms, this.rotation);
            }
            return cached;
        }
        else {
            return this.transform;
        }
    };
    DiagramItem.prototype.transformByBounds = function (oldBounds, newBounds) {
        if (!oldBounds || !newBounds || oldBounds.equals(newBounds)) {
            return this;
        }
        if (this.type === 'Group') {
            var rotation = this.rotation.add(newBounds.rotation).sub(oldBounds.rotation);
            return this.set('rotation', rotation);
        }
        else {
            var transform = this.transform.transformByBounds(oldBounds, newBounds, undefined);
            return this.set('transform', transform);
        }
    };
    DiagramItem.prototype.afterClone = function (values, prev) {
        if (this.constraint) {
            var size = this.constraint.updateSize(this, this.transform.size, prev);
            if (size.x > 0 && size.y > 0) {
                values.transform = this.transform.resizeTopLeft(size);
            }
        }
        return values;
    };
    return DiagramItem;
}(core_1.Record));
exports.DiagramItem = DiagramItem;
