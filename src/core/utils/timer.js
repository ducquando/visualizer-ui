"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer(action, interval, initialDelay) {
        var _this = this;
        if (initialDelay === void 0) { initialDelay = 0; }
        if (initialDelay > 0) {
            this.timeout = setTimeout(function () {
                _this.interval = setInterval(action, interval);
            }, initialDelay);
        }
        else {
            this.interval = setInterval(action, interval);
        }
    }
    Timer.prototype.destroy = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    return Timer;
}());
exports.Timer = Timer;
