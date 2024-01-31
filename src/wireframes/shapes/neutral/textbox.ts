/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ConstraintFactory, DefaultAppearance, Rect2, RenderContext, ShapePlugin } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {
    [DefaultAppearance.FONT_SIZE]: CommonTheme.CONTROL_FONT_SIZE,
    [DefaultAppearance.FOREGROUND_COLOR]: CommonTheme.CONTROL_TEXT_COLOR,
    [DefaultAppearance.TEXT_ALIGNMENT]: 'left',
    [DefaultAppearance.TEXT]: '',
};

export class Textbox implements ShapePlugin {
    private PADDING = 10;

    public identifier(): string {
        return 'Textbox';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 400, y: 100 };
    }

    public previewSize(desiredWidth: number, desiredHeight: number) {
        return { x: desiredWidth * 2, y: desiredHeight * 2 };
    }

    public render(ctx: RenderContext) {
        const autoResizeLine = Math.ceil(ctx.renderer2.getTextWidth(ctx.shape.text, ctx.shape.fontSize, ctx.shape.fontFamily) / ctx.rect.w);
        const autoResizeHeight = autoResizeLine * ctx.shape.fontSize + this.PADDING * 2;
        const autoResizeShape = new Rect2(ctx.rect.x, ctx.rect.y, ctx.rect.w, autoResizeHeight);
        ctx.renderer2.textMultiline(ctx.shape, autoResizeShape, p => {
            p.setForegroundColor(ctx.shape);
        }, true);
    }

    public constraint(factory: ConstraintFactory) {
        return factory.textHeight(this.PADDING);
    }
}
