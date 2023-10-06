"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useClipboard = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@app/core");
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
var OFFSET = 50;
var PREFIX = 'my-draft:';
function useClipboard() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var offset = React.useRef(0);
    var selectedDiagram = (0, model_1.useStore)(model_1.getDiagram);
    var selectedItems = (0, model_1.useStore)(model_1.getSelectedItems);
    var canCopy = selectedItems.length > 0;
    var clipboard = (0, core_1.useClipboard)({
        onPaste: function (event) {
            var text = event.items[0]['text'];
            if (selectedDiagram && text && text.indexOf(PREFIX) === 0) {
                offset.current += OFFSET;
                dispatch((0, model_1.pasteItems)(selectedDiagram, text.substring(PREFIX.length), offset.current));
                return true;
            }
            return;
        },
        onCopy: function (event) {
            if (selectedDiagram) {
                var set = model_1.DiagramItemSet.createFromDiagram(selectedItems, selectedDiagram);
                event.clipboard.set("".concat(PREFIX).concat(JSON.stringify(model_1.Serializer.serializeSet(set))));
                if (event.isCut) {
                    dispatch((0, model_1.removeItems)(selectedDiagram, selectedItems));
                }
                offset.current = 0;
            }
            return true;
        }
    });
    var copy = React.useMemo(function () { return ({
        disabled: !canCopy,
        icon: 'icon-copy',
        label: texts_1.texts.common.copy,
        tooltip: texts_1.texts.common.copyTooltip,
        onAction: clipboard.copy
    }); }, [canCopy, clipboard]);
    var cut = React.useMemo(function () { return ({
        disabled: !canCopy,
        icon: 'icon-cut',
        label: texts_1.texts.common.cut,
        tooltip: texts_1.texts.common.cutTooltip,
        onAction: clipboard.cut
    }); }, [canCopy, clipboard]);
    var paste = React.useMemo(function () { return ({
        disabled: !clipboard,
        icon: 'icon-paste',
        label: texts_1.texts.common.paste,
        tooltip: texts_1.texts.common.pasteTooltip,
        onAction: clipboard.paste
    }); }, [clipboard]);
    return { copy: copy, cut: cut, paste: paste };
}
exports.useClipboard = useClipboard;
