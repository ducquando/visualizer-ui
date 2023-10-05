"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('React Helpers', function () {
    it('should convert number to pixels', function () {
        expect((0, core_1.sizeInPx)(10)).toEqual('10px');
    });
});
