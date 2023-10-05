"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.moveItems = void 0;
function moveItems(source, items, target, relative) {
    if (relative === void 0) { relative = false; }
    if (source.length === 0 || !items || items.length === 0 || items.filter(function (x) { return !x; }).length > 0) {
        return source;
    }
    var itemsToStay = [];
    var itemsToMove = [];
    var allItems = __spreadArray([], source, true);
    for (var i = 0; i < allItems.length; i++) {
        var item = allItems[i];
        var itemToAdd = { isInItems: items && items.indexOf(item) >= 0, index: i, value: item };
        if (itemToAdd.isInItems) {
            itemsToMove.push(itemToAdd);
        }
        else {
            itemsToStay.push(itemToAdd);
        }
    }
    if (itemsToMove.length === 0) {
        return source;
    }
    var isBackwards = false;
    var newIndex = 0;
    if (relative) {
        isBackwards = target <= 0;
        var currentIndex = target > 0 ?
            Number.MIN_VALUE :
            Number.MAX_VALUE;
        for (var _i = 0, itemsToMove_1 = itemsToMove; _i < itemsToMove_1.length; _i++) {
            var itemFromIds = itemsToMove_1[_i];
            if (target > 0) {
                currentIndex = Math.max(itemFromIds.index, currentIndex);
            }
            else {
                currentIndex = Math.min(itemFromIds.index, currentIndex);
            }
        }
        newIndex = currentIndex + target;
    }
    else {
        newIndex = target;
        if (itemsToMove[0].index > newIndex) {
            isBackwards = true;
        }
    }
    var newItems = [];
    for (var _a = 0, itemsToStay_1 = itemsToStay; _a < itemsToStay_1.length; _a++) {
        var item = itemsToStay_1[_a];
        if ((isBackwards && item.index >= newIndex) || item.index > newIndex) {
            break;
        }
        newItems.push(item.value);
    }
    for (var _b = 0, itemsToMove_2 = itemsToMove; _b < itemsToMove_2.length; _b++) {
        var item = itemsToMove_2[_b];
        newItems.push(item.value);
    }
    for (var _c = 0, itemsToStay_2 = itemsToStay; _c < itemsToStay_2.length; _c++) {
        var item = itemsToStay_2[_c];
        if ((isBackwards && item.index >= newIndex) || item.index > newIndex) {
            newItems.push(item.value);
        }
    }
    return newItems;
}
exports.moveItems = moveItems;
