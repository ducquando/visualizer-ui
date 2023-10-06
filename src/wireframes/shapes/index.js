"use strict";
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
exports.__esModule = true;
exports.registerRenderers = void 0;
var renderer_service_1 = require("@app/wireframes/model/renderer.service");
// import { Browser, Button, ButtonBar, Checkbox, ComboBox, Comment, Dropdown, Equation, Grid, Heading, HorizontalLine, HorizontalScrollbar, Icon, Image, Label, Link, List, Numeric, Paragraph, Phone, Progress, RadioButton, Raster, Rectangle, Shape, Slider, Tablet, Tabs, TextArea, TextInput, Toggle, VerticalLine, VerticalScrollbar, Window } from './dependencies';
var dependencies_1 = require("./dependencies");
var abstract_control_1 = require("./utils/abstract-control");
function registerRenderers() {
    renderer_service_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new dependencies_1.Arrow()));
    // RendererService.addRenderer(new AbstractControl(new Browser()));
    // RendererService.addRenderer(new AbstractControl(new Button()));
    // RendererService.addRenderer(new AbstractControl(new ButtonBar()));
    // RendererService.addRenderer(new AbstractControl(new Checkbox()));
    // RendererService.addRenderer(new AbstractControl(new ComboBox()));
    // RendererService.addRenderer(new AbstractControl(new Dropdown()));
    renderer_service_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new dependencies_1.Equation()));
    renderer_service_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new dependencies_1.Grid()));
    renderer_service_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new dependencies_1.Heading()));
    // RendererService.addRenderer(new AbstractControl(new HorizontalLine()));
    // RendererService.addRenderer(new AbstractControl(new HorizontalScrollbar()));
    // RendererService.addRenderer(new AbstractControl(new Icon()));
    // RendererService.addRenderer(new AbstractControl(new Image()));
    // RendererService.addRenderer(new AbstractControl(new Label()));
    // RendererService.addRenderer(new AbstractControl(new Link()));
    // RendererService.addRenderer(new AbstractControl(new List()));
    // RendererService.addRenderer(new AbstractControl(new Numeric()));
    renderer_service_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new dependencies_1.Paragraph()));
    // RendererService.addRenderer(new AbstractControl(new Phone()));
    // RendererService.addRenderer(new AbstractControl(new Progress()));
    // RendererService.addRenderer(new AbstractControl(new RadioButton()));
    // RendererService.addRenderer(new AbstractControl(new Raster()));
    renderer_service_1.RendererService.addRenderer(new abstract_control_1.AbstractControl(new dependencies_1.Rectangle()));
    // RendererService.addRenderer(new AbstractControl(new Shape()));
    // RendererService.addRenderer(new AbstractControl(new Slider()));
    // RendererService.addRenderer(new AbstractControl(new Tablet()));
    // RendererService.addRenderer(new AbstractControl(new Tabs()));
    // RendererService.addRenderer(new AbstractControl(new TextArea()));
    // RendererService.addRenderer(new AbstractControl(new TextInput()));
    // RendererService.addRenderer(new AbstractControl(new Toggle()));
    // RendererService.addRenderer(new AbstractControl(new VerticalLine()));
    // RendererService.addRenderer(new AbstractControl(new VerticalScrollbar()));
    // RendererService.addRenderer(new AbstractControl(new Window()));
    // RendererService.addRenderer(new AbstractControl(new Comment()));
}
exports.registerRenderers = registerRenderers;
