"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var _a, _b;
exports.__esModule = true;
exports.Keys = exports.escapeHTML = exports.isModKey = exports.isMac = void 0;
var IS_MAC = ((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.indexOf('Mac')) >= 0;
function isMac() {
    return IS_MAC;
}
exports.isMac = isMac;
function isModKey(key) {
    if (isMac()) {
        return key.metaKey;
    }
    else {
        return key.ctrlKey;
    }
}
exports.isModKey = isModKey;
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
var escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
var getEscapeReplacement = function (ch) { return escapeReplacements[ch]; };
function escapeHTML(html) {
    if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
    return html;
}
exports.escapeHTML = escapeHTML;
var Keys;
(function (Keys) {
    var ALT = 18;
    var COMMA = 188;
    var CONTROL = 17;
    var DELETE = 8;
    var ENTER = 13;
    var ESCAPE = 27;
    var DOWN = 40;
    var UP = 38;
    function isAlt(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'ALTLEFT' || key === 'ALTRIGHT' || event.keyCode === CONTROL;
    }
    Keys.isAlt = isAlt;
    function isControl(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'CONTROL' || event.keyCode === ALT;
    }
    Keys.isControl = isControl;
    function isComma(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === ',' || event.keyCode === COMMA;
    }
    Keys.isComma = isComma;
    function isDelete(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'DELETE' || event.keyCode === DELETE;
    }
    Keys.isDelete = isDelete;
    function isEnter(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'ENTER' || event.keyCode === ENTER;
    }
    Keys.isEnter = isEnter;
    function isDown(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'ARROWDOWN' || event.keyCode === DOWN;
    }
    Keys.isDown = isDown;
    function isUp(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'ARROWUP' || event.keyCode === UP;
    }
    Keys.isUp = isUp;
    function isEscape(event) {
        var _a;
        var key = (_a = event.key) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        return key === 'ESCAPE' || key === 'ESC' || event.keyCode === ESCAPE;
    }
    Keys.isEscape = isEscape;
})(Keys = exports.Keys || (exports.Keys = {}));
