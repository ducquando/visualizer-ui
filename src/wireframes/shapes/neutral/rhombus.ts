/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { DefaultAppearance, RenderContext, ShapePlugin, ShapeProperties } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {
    [DefaultAppearance.BACKGROUND_COLOR]: 0xFFFFFF,
    [DefaultAppearance.FONT_SIZE]: CommonTheme.CONTROL_FONT_SIZE,
    [DefaultAppearance.FOREGROUND_COLOR]: 0,
    [DefaultAppearance.STROKE_COLOR]: CommonTheme.CONTROL_BORDER_COLOR,
    [DefaultAppearance.STROKE_THICKNESS]: CommonTheme.CONTROL_BORDER_THICKNESS,
    [DefaultAppearance.TEXT_ALIGNMENT]: 'center',
    [DefaultAppearance.TEXT]: 'Shape',
};

export class Rhombus implements ShapePlugin {
    public identifier(): string {
        return 'Rhombus';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 100, y: 100 };
    }

    public render(ctx: RenderContext) {
        this.createShape(ctx);
        this.createText(ctx);
    }

    private createShape(ctx: RenderContext) {
        const b = ctx.rect;
        const path = `M${b.cx} ${b.top} L${b.right} ${b.cy} L${b.cx} ${b.bottom} L${b.left} ${b.cy} z`;

        ctx.renderer2.path(ctx.shape, path, p => {
            this.styleShape(ctx, p);
        });
    }

    private styleShape(ctx: RenderContext, p: ShapeProperties) {
        p.setStrokeColor(ctx.shape);
        p.setBackgroundColor(ctx.shape);
    }

    private createText(ctx: RenderContext) {
        ctx.renderer2.text(ctx.shape, ctx.rect.deflate(10, 10), p => {
            p.setForegroundColor(ctx.shape);
        });
    }
}
