"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.unregister = exports.registerServiceWorker = void 0;
var texts_1 = require("@app/texts");
var model_1 = require("@app/wireframes/model");
function registerServiceWorker(store) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            var url = '/service-worker2.js';
            navigator.serviceWorker.register(url)
                .then(function (registration) {
                registration.onupdatefound = function () {
                    var installingWorker = registration.installing;
                    if (!installingWorker) {
                        return;
                    }
                    installingWorker.onstatechange = function () {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                store.dispatch((0, model_1.showToast)(texts_1.texts.common.newVersion));
                                console.log('New content is available; please refresh.');
                            }
                            else {
                                console.log('Content is cached for offline use.');
                            }
                        }
                    };
                };
            })["catch"](function (error) {
                console.error('Error during service worker registration:', error);
            });
        });
    }
}
exports.registerServiceWorker = registerServiceWorker;
function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.unregister();
        });
    }
}
exports.unregister = unregister;
