/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

export module IDHelper {
    let CURRENT_ID = {};

    export function nextId(renderID: string) {
        CURRENT_ID[renderID] = (renderID in CURRENT_ID) ? CURRENT_ID[renderID] + 1 : 0;
        
        return `${renderID}${CURRENT_ID[renderID]}`;
    }
}