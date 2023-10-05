"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Subscription = void 0;
var Subscription = /** @class */ (function () {
    function Subscription() {
        this.subscribers = [];
    }
    Subscription.prototype.next = function (value) {
        for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
            var subscriber = _a[_i];
            subscriber(value);
        }
        this.lastValue = { value: value };
    };
    Subscription.prototype.subscribe = function (subscription) {
        var _this = this;
        this.subscribers.push(subscription);
        var lastValue = this.lastValue;
        if (lastValue) {
            subscription(lastValue.value);
        }
        return function () {
            _this.subscribers.splice(_this.subscribers.indexOf(subscription));
        };
    };
    return Subscription;
}());
exports.Subscription = Subscription;
