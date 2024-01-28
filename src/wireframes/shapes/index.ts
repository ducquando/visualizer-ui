/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { RendererService } from '@app/wireframes/model/renderer.service';

import { Image, Latex, Shape, Table, Textbox } from './dependencies';

import { AbstractControl } from './utils/abstract-control';

export function registerRenderers() {
    RendererService.addRenderer(new AbstractControl(new Table()));
    RendererService.addRenderer(new AbstractControl(new Image()));
    RendererService.addRenderer(new AbstractControl(new Latex()));
    RendererService.addRenderer(new AbstractControl(new Shape()));
    RendererService.addRenderer(new AbstractControl(new Textbox()));
}
