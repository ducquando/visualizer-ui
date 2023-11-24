/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { DefaultAppearance, Rect2, RenderContext, Shape, ShapePlugin } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {
    [DefaultAppearance.BACKGROUND_COLOR]: '#fff',
    [DefaultAppearance.FONT_SIZE]: CommonTheme.CONTROL_FONT_SIZE,
    [DefaultAppearance.FOREGROUND_COLOR]: CommonTheme.CONTROL_TEXT_COLOR,
    [DefaultAppearance.STROKE_COLOR]: CommonTheme.CONTROL_BORDER_COLOR,
    [DefaultAppearance.STROKE_THICKNESS]: CommonTheme.CONTROL_BORDER_THICKNESS,
    [DefaultAppearance.TEXT_ALIGNMENT]: 'center',
    [DefaultAppearance.TEXT]: 'column1,column2,column3\nrow1,row1,row1\nrow2,row2',
};

export class Table implements ShapePlugin {
    public identifier(): string {
        return 'Table';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 260, y: 200 };
    }

    public render(ctx: RenderContext) {
        const w = ctx.rect.width;
        const h = ctx.rect.height;

        const { rows, columnCount } = this.parseText(ctx.shape);

        const cellWidth = w / columnCount;
        const cellHeight = h / rows.length;

        this.createFrame(ctx);
        this.createBorders(ctx, columnCount, cellWidth, rows, cellHeight);
        this.createTexts(rows, cellWidth, cellHeight, ctx);
    }

    private createTexts(rows: string[][], cellWidth: number, cellHeight: number, ctx: RenderContext) {
        let y = 0;

        for (const row of rows) {
            let x = 0;

            for (const cell of row) {
                const rect = new Rect2(x, y, cellWidth, cellHeight);

                ctx.renderer2.text(ctx.shape, rect, p => {
                    p.setText(cell);
                    p.setForegroundColor(ctx.shape);
                });

                x += cellWidth;
            }

            y += cellHeight;
        }
    }

    private createBorders(ctx: RenderContext, columnCount: number, cellWidth: number, rows: string[][], cellHeight: number) {
        const strokeColor = ctx.shape.getAppearance(DefaultAppearance.STROKE_COLOR);
        const strokeWidth = ctx.shape.getAppearance(DefaultAppearance.STROKE_THICKNESS);

        for (let x = 0; x < columnCount; x++) {
            for (let y = 0; y < rows.length; y++) {

                const offsetX = Math.round(x * cellWidth);
                const offsetY = Math.round(y * cellHeight - strokeWidth * 0.25 - strokeWidth * 0.25);

                // Top
                const rectX = new Rect2(offsetX, offsetY, cellWidth, strokeWidth);
                ctx.renderer2.rectangle(0, 0, rectX, p => {
                    p.setBackgroundColor(strokeColor);
                });

                // Bottom
                const rectY = new Rect2(offsetX, offsetY + cellHeight, cellWidth, strokeWidth);
                ctx.renderer2.rectangle(0, 0, rectY, p => {
                    p.setBackgroundColor(strokeColor);
                });
            }
        }
    }

    private createFrame(ctx: RenderContext) {
        ctx.renderer2.rectangle(ctx.shape, CommonTheme.CONTROL_BORDER_RADIUS, ctx.rect, p => {
            p.setBackgroundColor(ctx.shape);
        });
    }

    private parseText(shape: Shape) {
        const key = shape.text;

        let result = shape.renderCache['PARSED'] as { key: string; parsed: Parsed };

        if (!result || result.key !== key) {
            const { rows, columnCount, rowCount } = parseTableText(key);
            result = { parsed: { rows, columnCount, rowCount }, key };

            shape.renderCache['PARSED'] = result;
        }

        return result.parsed;
    }
}

export function parseTableText(text: string) {
    const rows = text.split('\n').map(x => x.split(',').map(c => c.trim()));
    const rowCount = rows.length;

    let columnCount = 0;
    for (const row of rows) {
        columnCount = Math.max(columnCount, row.length);
    }

    while (rows.length < 2) {
        rows.push([]);
    }

    for (const row of rows) {
        while (row.length < columnCount) {
            row.push('');
        }
    }

    return { rows, columnCount, rowCount };
}

type Parsed = { rows: string[][]; columnCount: number; rowCount: number };