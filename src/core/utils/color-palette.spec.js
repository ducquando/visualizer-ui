"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
var core_1 = require("@app/core");
describe('ColorPalatte', function () {
    it('should generate colors', function () {
        var palette = core_1.ColorPalette.colors();
        expect(palette.colors.length).toBeGreaterThan(20);
    });
});
