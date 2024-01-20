/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { createAction, createReducer } from '@reduxjs/toolkit';
import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
import { AnyAction, Dispatch, Middleware, Reducer } from 'redux';
import { ApplicationMode } from '@app/core';
import { UIState } from './../internal';


export const showToast =
    createAction('ui/infoToast', (content: string, type?: NoticeType, key?: string, delayed = 1000) => {
        return { payload: { content, type, key, delayed } };
    });

export const setZoom =
    createAction('ui/zoom', (zoom: number) => {
        return { payload: { zoom } };
    });

export const selectColorTab =
    createAction('ui/colorTab', (tab: string) => {
        return { payload: { tab } };
    });

export const setSidebarSize =
    createAction('ui/sizebarSize', (size: number) => {
        return { payload: { size } };
    });

export const selectApplicationMode =
    createAction('ui/applicationMode', (mode: ApplicationMode) => {
        return { payload: { mode } };
    });

export const filterDiagrams =
    createAction('ui/diagrams/filter', (filter: string) => {
        return { payload: { filter } };
    });

export function toastMiddleware() {
    const middleware: Middleware = () => (next: Dispatch<AnyAction>) => (action: any) => {
        if (showToast.match(action)) {
            const { content, delayed, key, type } = action.payload;

            setTimeout(() => {
                message.open({ content, key, type: type || 'info' });
            }, delayed);
        }

        return next(action);
    };

    return middleware;
}

export function ui(initialState: UIState): Reducer<UIState> {
    return createReducer(initialState, builder => builder
        .addCase(filterDiagrams, (state, action) => {
            state.diagramsFilter = action.payload.filter;
        })
        .addCase(setZoom, (state, action) => {
            state.zoom = action.payload.zoom;
        })
        .addCase(setSidebarSize, (state, action) => {
            state.sidebarSize = action.payload.size;
        })
        .addCase(selectApplicationMode, (state, action) => {
            state.selectedApplicationMode = action.payload.mode;
        })
        .addCase(selectColorTab, (state, action) => {
            state.selectedColorTab = action.payload.tab;
        }));
}
