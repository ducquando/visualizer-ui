/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

export module IDHelper {
    let CURRENT_ID: { [id: string]: any } = {};

    export function nextId(renderID: string) {
        CURRENT_ID[renderID] = (renderID in CURRENT_ID) ? CURRENT_ID[renderID] + 1 : 1;
        
        return `${renderID}${CURRENT_ID[renderID]}`;
    }
}