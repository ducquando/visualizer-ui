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
exports.Diagram = void 0;
var core_1 = require("@app/core");
var diagram_item_1 = require("./diagram-item");
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    function Diagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parents = {};
        return _this;
    }
    Object.defineProperty(Diagram.prototype, "id", {
        get: function () {
            return this.get('id');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "title", {
        get: function () {
            return this.get('title');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "items", {
        get: function () {
            return this.get('items');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "rootIds", {
        get: function () {
            return this.get('rootIds');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "selectedIds", {
        get: function () {
            return this.get('selectedIds');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "master", {
        get: function () {
            return this.get('master');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "rootItems", {
        get: function () {
            var _this = this;
            return this.rootIds.values.map(function (x) { return _this.items.get(x); }).filter(function (x) { return !!x; });
        },
        enumerable: false,
        configurable: true
    });
    Diagram.create = function (setup) {
        if (setup === void 0) { setup = {}; }
        var id = setup.id, items = setup.items, rootIds = setup.rootIds, master = setup.master, title = setup.title;
        var props = {
            id: id || core_1.MathHelper.nextId(),
            items: core_1.ImmutableMap.of(items),
            master: master,
            rootIds: core_1.ImmutableList.of(rootIds),
            selectedIds: core_1.ImmutableSet.empty(),
            title: title
        };
        return new Diagram(props);
    };
    Diagram.prototype.children = function (item) {
        var _this = this;
        return item.childIds.values.map(function (x) { return _this.items.get(x); }).filter(function (x) { return !!x; });
    };
    Diagram.prototype.rename = function (title) {
        return this.set('title', title);
    };
    Diagram.prototype.setMaster = function (master) {
        return this.set('master', master);
    };
    Diagram.prototype.updateAllItems = function (updater) {
        return this.set('items', this.items.updateAll(updater));
    };
    Diagram.prototype.clone = function () {
        return this.set('id', core_1.MathHelper.guid());
    };
    Diagram.prototype.parent = function (id) {
        if (!id) {
            return undefined;
        }
        if (core_1.Types.is(id, diagram_item_1.DiagramItem)) {
            id = id.id;
        }
        if (!this.parents) {
            this.parents = {};
            for (var _i = 0, _a = this.items.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var item = this.items.get(key);
                if ((item === null || item === void 0 ? void 0 : item.type) === 'Group') {
                    for (var _b = 0, _c = item.childIds.values; _b < _c.length; _b++) {
                        var childId = _c[_b];
                        this.parents[childId] = item;
                    }
                }
            }
        }
        return this.parents[id];
    };
    Diagram.prototype.addShape = function (shape) {
        var _this = this;
        if (!shape || this.items.get(shape.id)) {
            return this;
        }
        return this.mutate([], function (update) {
            update.items = update.items.set(shape.id, shape);
            if (update.items !== _this.items) {
                update.itemIds = update.itemIds.add(shape.id);
            }
        });
    };
    Diagram.prototype.updateItems = function (ids, updater) {
        return this.mutate(ids, function (update) {
            update.items = update.items.mutate(function (mutator) {
                for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                    var id = ids_1[_i];
                    mutator.update(id, updater);
                }
            });
        });
    };
    Diagram.prototype.selectItems = function (ids) {
        return this.mutate(ids, function (update) {
            update.selectedIds = core_1.ImmutableSet.of.apply(core_1.ImmutableSet, ids);
        });
    };
    Diagram.prototype.moveItems = function (ids, index) {
        return this.mutate(ids, function (update) {
            update.itemIds = update.itemIds.moveTo(ids, index);
        });
    };
    Diagram.prototype.bringToFront = function (ids) {
        return this.mutate(ids, function (update) {
            update.itemIds = update.itemIds.bringToFront(ids);
        });
    };
    Diagram.prototype.bringForwards = function (ids) {
        return this.mutate(ids, function (update) {
            update.itemIds = update.itemIds.bringForwards(ids);
        });
    };
    Diagram.prototype.sendToBack = function (ids) {
        return this.mutate(ids, function (update) {
            update.itemIds = update.itemIds.sendToBack(ids);
        });
    };
    Diagram.prototype.sendBackwards = function (ids) {
        return this.mutate(ids, function (update) {
            update.itemIds = update.itemIds.sendBackwards(ids);
        });
    };
    Diagram.prototype.group = function (groupId, ids) {
        return this.mutate(ids, function (update) {
            var _a;
            update.itemIds = (_a = update.itemIds.add(groupId)).remove.apply(_a, ids);
            update.items = update.items.set(groupId, diagram_item_1.DiagramItem.createGroup({ id: groupId, childIds: ids }));
        });
    };
    Diagram.prototype.ungroup = function (groupId) {
        return this.mutate([groupId], function (update, targetItems) {
            var _a;
            var _b;
            update.itemIds = (_a = update.itemIds).add.apply(_a, (_b = targetItems[0].childIds) === null || _b === void 0 ? void 0 : _b.values).remove(groupId);
            update.items = update.items.remove(groupId);
        });
    };
    Diagram.prototype.addItems = function (set) {
        if (!set.canAdd(this)) {
            return this;
        }
        return this.mutate([], function (update) {
            var _a;
            update.items = update.items.mutate(function (mutator) {
                for (var _i = 0, _a = set.allItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    mutator.set(item.id, item);
                }
            });
            update.itemIds = (_a = update.itemIds).add.apply(_a, set.rootIds);
        });
    };
    Diagram.prototype.removeItems = function (set) {
        if (!set.canRemove(this)) {
            return this;
        }
        return this.mutate([], function (update) {
            var _a;
            update.items = update.items.mutate(function (m) {
                for (var _i = 0, _a = set.allItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    m.remove(item.id);
                }
            });
            update.selectedIds = update.selectedIds.mutate(function (m) {
                for (var _i = 0, _a = set.allItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    m.remove(item.id);
                }
            });
            update.itemIds = (_a = update.itemIds).remove.apply(_a, set.rootIds);
        });
    };
    Diagram.prototype.mutate = function (targetIds, updater) {
        if (!targetIds) {
            return this;
        }
        var resultItems = [];
        var resultParent = this.parent(targetIds[0]);
        // All items must have the same parent for the update.
        for (var _i = 0, targetIds_1 = targetIds; _i < targetIds_1.length; _i++) {
            var itemId = targetIds_1[_i];
            var item = this.items.get(itemId);
            if (!item) {
                return this;
            }
            if (this.parent(itemId) !== resultParent) {
                return this;
            }
            resultItems.push(item);
        }
        var update;
        if (resultParent) {
            update = {
                items: this.items,
                itemIds: resultParent.childIds,
                selectedIds: this.selectedIds
            };
            updater(update, resultItems);
            if (update.itemIds !== resultParent.childIds) {
                update.items = update.items || this.items;
                update.items = update.items.update(resultParent.id, function (p) { return p.set('childIds', update.itemIds); });
            }
        }
        else {
            update = {
                items: this.items,
                itemIds: this.rootIds,
                selectedIds: this.selectedIds
            };
            updater(update, resultItems);
            update['rootIds'] = update.itemIds;
        }
        delete update.itemIds;
        return this.merge(update);
    };
    return Diagram;
}(core_1.Record));
exports.Diagram = Diagram;
