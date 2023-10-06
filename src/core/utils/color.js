"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.Color = void 0;
var types_1 = require("./types");
var ColorDefinitions = [
    {
        regex: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        process: function (bits) {
            return new Color(parseInt(bits[1], 10) / 255, parseInt(bits[2], 10) / 255, parseInt(bits[3], 10) / 255);
        }
    },
    {
        regex: /^(\w{2})(\w{2})(\w{2})$/,
        process: function (bits) {
            return new Color(parseInt(bits[1], 16) / 255, parseInt(bits[2], 16) / 255, parseInt(bits[3], 16) / 255);
        }
    },
    {
        regex: /^(\w{1})(\w{1})(\w{1})$/,
        process: function (bits) {
            return new Color(parseInt(bits[1] + bits[1], 16) / 255, parseInt(bits[2] + bits[2], 16) / 255, parseInt(bits[3] + bits[3], 16) / 255);
        }
    },
];
var Color = /** @class */ (function () {
    function Color(r, g, b) {
        this.r = Math.min(1, Math.max(0, r));
        this.g = Math.min(1, Math.max(0, g));
        this.b = Math.min(1, Math.max(0, b));
        Object.freeze(this);
    }
    Object.defineProperty(Color.prototype, "luminance", {
        get: function () {
            return (this.r + this.r + this.b + this.g + this.g + this.g) / 6;
        },
        enumerable: false,
        configurable: true
    });
    Color.prototype.eq = function (c) {
        return Color.eq(this, c);
    };
    Color.prototype.ne = function (c) {
        return Color.ne(this, c);
    };
    Color.eq = function (lhs, rhs) {
        return lhs.r === rhs.r && lhs.g === rhs.g && lhs.b === rhs.b;
    };
    Color.ne = function (lhs, rhs) {
        return lhs.r !== rhs.r || lhs.g !== rhs.g || lhs.b !== rhs.b;
    };
    Color.prototype.toNumber = function () {
        return ((this.r * 255) << 16) + ((this.g * 255) << 8) + (this.b * 255);
    };
    Color.prototype.toString = function () {
        var r = Math.round(this.r * 255).toString(16);
        var g = Math.round(this.g * 255).toString(16);
        var b = Math.round(this.b * 255).toString(16);
        if (r.length === 1) {
            r = '0' + r;
        }
        if (g.length === 1) {
            g = '0' + g;
        }
        if (b.length === 1) {
            b = '0' + b;
        }
        return '#' + r + g + b;
    };
    Color.fromHex = function (r, g, b) {
        return new Color(parseInt('' + r, 16) / 255, parseInt('' + g, 16) / 255, parseInt('' + b, 16) / 255);
    };
    Color.fromNumber = function (rgb) {
        return new Color(((rgb >> 16) & 0xff) / 255, ((rgb >> 8) & 0xff) / 255, ((rgb >> 0) & 0xff) / 255);
    };
    Color.fromValue = function (value) {
        if (types_1.Types.isString(value)) {
            return Color.fromString(value);
        }
        else if (types_1.Types.isNumber(value)) {
            return Color.fromNumber(value);
        }
        else {
            return value;
        }
    };
    Color.fromString = function (value) {
        if (value.charAt(0) === '#') {
            value = value.substring(1, 7);
        }
        value = value.replace(/ /g, '').toLowerCase();
        for (var _i = 0, ColorDefinitions_1 = ColorDefinitions; _i < ColorDefinitions_1.length; _i++) {
            var colorDefinition = ColorDefinitions_1[_i];
            var bits = colorDefinition.regex.exec(value);
            if (bits) {
                return colorDefinition.process(bits);
            }
        }
        throw new Error('Color is not in a valid format.');
    };
    Color.fromHsv = function (h, s, v) {
        h /= 60;
        var i = Math.floor(h);
        var f = (h - i);
        var p = (v * (1 - s));
        var q = (v * (1 - (f * s)));
        var t = (v * (1 - ((1 - f) * s)));
        switch (i % 6) {
            case 0:
                return new Color(v, t, p);
            case 1:
                return new Color(q, v, p);
            case 2:
                return new Color(p, v, t);
            case 3:
                return new Color(p, q, v);
            case 4:
                return new Color(t, p, v);
            default:
                return new Color(v, p, q);
        }
    };
    Color.fromHsl = function (h, s, l) {
        var r = 0;
        var g = 0;
        var b = 0;
        h /= 360;
        if (s === 0) {
            // eslint-disable-next-line no-multi-assign
            r = g = b = l;
        }
        else {
            var hue2rgb = function (pi, qi, ti) {
                if (ti < 0) {
                    ti += 1;
                }
                if (ti > 1) {
                    ti -= 1;
                }
                if (ti < 1 / 6) {
                    return pi + (qi - pi) * 6 * ti;
                }
                if (ti < 1 / 2) {
                    return qi;
                }
                if (ti < 2 / 3) {
                    return pi + (qi - pi) * (2 / 3 - ti) * 6;
                }
                return pi;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return new Color(r, g, b);
    };
    Color.BLACK = new Color(0, 0, 0);
    Color.WHITE = new Color(1, 1, 1);
    Color.GREEN = new Color(0, 1, 0);
    Color.BLUE = new Color(0, 0, 1);
    Color.RED = new Color(1, 0, 0);
    return Color;
}());
exports.Color = Color;
