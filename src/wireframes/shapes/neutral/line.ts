/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import SVGPathCommander from 'svg-path-commander';
import { ConfigurableFactory, DefaultAppearance, RenderContext, ShapePlugin } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

type LineType = 'Line' | 'Arrow' | 'Triangle';
const START_LINE = 'START_LINE';
const END_LINE = 'END_LINE';
const LINE_STYLE: { [index: string]: LineType } = {
    Line: 'Line',
    Arrow: 'Arrow',
    Triangle: 'Triangle',
};

const DEFAULT_APPEARANCE = {
    [DefaultAppearance.BACKGROUND_COLOR]: 0xEEEEEE,
    [DefaultAppearance.FONT_SIZE]: CommonTheme.CONTROL_FONT_SIZE,
    [DefaultAppearance.FOREGROUND_COLOR]: 0,
    [DefaultAppearance.STROKE_COLOR]: CommonTheme.CONTROL_BORDER_COLOR,
    [DefaultAppearance.STROKE_THICKNESS]: CommonTheme.CONTROL_BORDER_THICKNESS,
    [DefaultAppearance.TEXT_ALIGNMENT]: 'center',
    [DefaultAppearance.TEXT]: '',
    [START_LINE]: 'Line',
    [END_LINE]: 'Line',
};

export class Line implements ShapePlugin {
    public identifier(): string {
        return 'Line';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 100, y: 10 };
    }

    public configurables(factory: ConfigurableFactory) {
        return [
            factory.selection(START_LINE, 'Start', [
                LINE_STYLE.Line,
                LINE_STYLE.Arrow,
                LINE_STYLE.Triangle,
            ]),
            factory.selection(END_LINE, 'End', [
                LINE_STYLE.Line,
                LINE_STYLE.Arrow,
                LINE_STYLE.Triangle,
            ]),
        ];
    }

    public render(ctx: RenderContext) {
        const b = ctx.rect;
        const shapeHeight = ctx.shape.strokeThickness * 6;
        const shapeWidth = ctx.shape.strokeThickness * 4.5;
        const rotatingRadian = Math.atan2(b.height, b.width);   // Radian

        const startX = b.left + shapeHeight * Math.cos(rotatingRadian);
        const startY = b.top + shapeHeight * Math.sin(rotatingRadian);
        const endX = b.right - shapeHeight * Math.cos(rotatingRadian);
        const endY = b.bottom - shapeHeight * Math.sin(rotatingRadian);

        this.createLine(ctx, startX, startY, endX, endY);
        this.createShape(ctx, startX, startY, endX, endY, shapeHeight, shapeWidth, rotatingRadian);
        this.createText(ctx);
    }

    private createText(ctx: RenderContext) {
        ctx.renderer2.text(ctx.shape, ctx.rect.deflate(10, 10), p => {
            p.setForegroundColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
    }

    private createLine(ctx: RenderContext, startX: number, startY: number, endX: number, endY: number) {
        const path = `M${startX} ${startY} L${endX} ${endY} z`;
        ctx.renderer2.path(ctx.shape, path, p => {
            p.setStrokeColor(ctx.shape);
        });
    }

    private createShape(ctx: RenderContext, startX: number, startY: number, endX: number, endY: number, height: number, width: number, rotatingRadian: number) {
        const startType = ctx.shape.getAppearance('START_LINE');
        const endType = ctx.shape.getAppearance('END_LINE');

        const rotatingDegree = (radian: number) => {
            return 90 + Math.round(radian * 180 / Math.PI);
        };

        const shapeEdge = (x: number, y: number, rotating: number, type: LineType) => {
            const SHAPES: Record<LineType, string> = {
                'Triangle': `M${x} ${y} l-${width / 2} 0 l${width / 2}-${height} l${width / 2} ${height} z`,
                'Arrow': `M${x} ${y} c-${width / 4} 0-${width / 2} ${height / 4}-${width / 2} ${height / 4} l${width / 2}-${height} l${width / 2} ${height} c0 0-${width / 4}-${height / 4}-${width / 2}-${height / 4} z`,
                'Line': `M${x} ${y} l0-${height} z`,
            };

            const transformedPath = new SVGPathCommander(SHAPES[type])
                .transform({ rotate: rotatingDegree(rotating),  origin: [x, y] })
                .toString();
    
            ctx.renderer2.path(ctx.shape, transformedPath, p => {
                p.setBackgroundColor(ctx.shape.strokeColor);
                p.setStrokeColor(ctx.shape.strokeColor);
            });
        };

        shapeEdge(startX, startY, rotatingRadian - Math.PI, startType);
        shapeEdge(endX, endY, rotatingRadian, endType);
    }

    
}
