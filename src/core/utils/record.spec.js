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
var core_1 = require("@app/core");
/* eslint-disable @typescript-eslint/naming-convention */
var MockupObject = /** @class */ (function (_super) {
    __extends(MockupObject, _super);
    function MockupObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockupObject;
}(core_1.Record));
describe('ImmutableObject', function () {
    it('should create new instance on update', function () {
        var record_1 = new MockupObject({ n: 1 });
        expect(record_1.get('n')).toBe(1);
    });
    it('should update property', function () {
        var record_1 = new MockupObject({ n: 1 });
        var record_2 = record_1.set('n', 2);
        expect(record_2.get('n')).toBe(2);
    });
    it('should update property with merge', function () {
        var record_1 = new MockupObject({ n: 1 });
        var record_2 = record_1.merge({ n: 2 });
        expect(record_2.get('n')).toBe(2);
    });
    it('should return original record when value has not changed', function () {
        var record_1 = new MockupObject({ n: 1 });
        var record_2 = record_1.set('n', 1);
        expect(record_2).toBe(record_1);
    });
    it('should return original record when complex value has not changed', function () {
        var record_1 = new MockupObject({ n: 1, vec: new core_1.Vec2(1, 1) });
        var record_2 = record_1.set('vec', new core_1.Vec2(1, 1));
        expect(record_2).toBe(record_1);
    });
});
