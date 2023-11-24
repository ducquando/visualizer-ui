/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { RendererService } from '@app/wireframes/model/renderer.service';

import { Ellipse, Image, Latex, Rectangle, Rhombus, Shape, Table, Textbox, Triangle } from './dependencies';

import { AbstractControl } from './utils/abstract-control';

export function registerRenderers() {
    RendererService.addRenderer(new AbstractControl(new Table()));
    RendererService.addRenderer(new AbstractControl(new Ellipse()));
    RendererService.addRenderer(new AbstractControl(new Image()));
    RendererService.addRenderer(new AbstractControl(new Latex()));
    RendererService.addRenderer(new AbstractControl(new Rectangle()));
    RendererService.addRenderer(new AbstractControl(new Rhombus()));
    RendererService.addRenderer(new AbstractControl(new Shape()));
    RendererService.addRenderer(new AbstractControl(new Textbox()));
    RendererService.addRenderer(new AbstractControl(new Triangle()));
}
