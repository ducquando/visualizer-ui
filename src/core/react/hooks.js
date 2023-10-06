"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.useEventCallback = exports.useWindowEvent = exports.useDocumentEvent = exports.usePrinter = exports.useFullscreen = exports.useDetectPrint = exports.useOpenFile = void 0;
/* eslint-disable no-lonely-if */
var React = require("react");
var react_to_print_1 = require("react-to-print");
function useOpenFile(fileType, onOpened) {
    var fileInputRef = React.useRef();
    var fileCallback = React.useRef(onOpened);
    React.useEffect(function () {
        var invisibleInput = document.createElement('input');
        invisibleInput.type = 'file';
        invisibleInput.style.visibility = 'hidden';
        invisibleInput.accept = fileType;
        invisibleInput.addEventListener('change', function () {
            if (invisibleInput.files && invisibleInput.files.length > 0) {
                var file = invisibleInput.files[0];
                fileCallback.current(file);
            }
        });
        document.body.appendChild(invisibleInput);
        fileInputRef.current = invisibleInput;
        return function () {
            document.body.removeChild(invisibleInput);
            fileInputRef.current = null;
        };
    }, [fileType]);
    React.useEffect(function () {
        if (fileInputRef.current) {
            fileInputRef.current.accept = fileType;
        }
    }, [fileType]);
    var doClick = (0, exports.useEventCallback)(function () {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    });
    return doClick;
}
exports.useOpenFile = useOpenFile;
function useDetectPrint() {
    var _a = React.useState(false), isPrinting = _a[0], toggleStatus = _a[1];
    React.useEffect(function () {
        var printMq = window.matchMedia && window.matchMedia('print');
        toggleStatus(!!printMq.matches);
        var eventListener = function (mqList) {
            toggleStatus(!!mqList.matches);
        };
        printMq.addEventListener('change', eventListener);
        return function () {
            printMq.removeEventListener('change', eventListener);
        };
    }, []);
    return isPrinting;
}
exports.useDetectPrint = useDetectPrint;
function useFullscreen() {
    var _a = React.useState(!!document.fullscreenElement), fullscreen = _a[0], setFullscreenValue = _a[1];
    React.useEffect(function () {
        var listener = function () {
            setFullscreenValue(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', listener);
        return function () {
            document.removeEventListener('fullscreenchange', listener);
        };
    }, []);
    var setFullScreen = (0, exports.useEventCallback)(function (value) {
        if (value) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            }
        }
        else {
            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    return [fullscreen, setFullScreen];
}
exports.useFullscreen = useFullscreen;
function usePrinter() {
    var _a = React.useState(false), isPrinting = _a[0], setIsPrinting = _a[1];
    var _b = React.useState(false), isPrintingReady = _b[0], setIsPrintingReady = _b[1];
    var printMode = useDetectPrint();
    var printRef = React.useRef();
    var printer = (0, react_to_print_1.useReactToPrint)({
        content: function () { return printRef.current; },
        onAfterPrint: function () {
            setIsPrinting(false);
            setIsPrintingReady(false);
        }
    });
    React.useEffect(function () {
        if (!printMode) {
            setIsPrinting(false);
        }
    }, [printMode]);
    React.useEffect(function () {
        var timer = 0;
        if (isPrintingReady) {
            timer = setTimeout(function () {
                printer && printer();
            }, 2000);
        }
        return function () {
            clearTimeout(timer);
        };
    }, [isPrintingReady, printer]);
    var doPrint = (0, exports.useEventCallback)(function () {
        setIsPrinting(true);
    });
    var doMakeReady = (0, exports.useEventCallback)(function () {
        setIsPrintingReady(true);
    });
    return [doPrint, doMakeReady, isPrinting, printRef];
}
exports.usePrinter = usePrinter;
var useDocumentEvent = function (type, listener) {
    var listenerRef = React.useRef(listener);
    listenerRef.current = listener;
    React.useEffect(function () {
        var callback = function (event) {
            listenerRef.current(event);
        };
        document.addEventListener(type, callback);
        return function () {
            document.removeEventListener(type, callback);
        };
    }, [type]);
};
exports.useDocumentEvent = useDocumentEvent;
var useWindowEvent = function (type, listener) {
    var listenerRef = React.useRef(listener);
    listenerRef.current = listener;
    React.useEffect(function () {
        var callback = function (event) {
            listenerRef.current(event);
        };
        window.addEventListener(type, callback);
        return function () {
            window.removeEventListener(type, callback);
        };
    }, [type]);
};
exports.useWindowEvent = useWindowEvent;
var useEventCallback = function (fn) {
    var ref = React.useRef(fn);
    React.useLayoutEffect(function () {
        ref.current = fn;
    });
    return React.useMemo(function () { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ref.current.apply(ref, args);
    }; }, []);
};
exports.useEventCallback = useEventCallback;
