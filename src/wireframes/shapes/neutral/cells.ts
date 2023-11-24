import { ConfigurableFactory, Rect2, RenderContext, ShapePlugin } from '@app/wireframes/interface';
import { Cell } from './cell';

const ROW = 'ROW';
const COL = 'COLUMN';
const DEFAULT_SIZE = 3;

const DEFAULT_APPEARANCE = {
    [COL]: DEFAULT_SIZE,
    [ROW]: DEFAULT_SIZE,
    
};

export class Cells implements ShapePlugin {
    public identifier(): string {
        return 'Cells';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 300, y: 120 };
    }

    public configurables(factory: ConfigurableFactory) {
        return [
            factory.number(ROW, 'Number of rows', 0, 20),
            factory.number(COL, 'Number of columns', 0, 20),
        ];
    }

    public render(ctx: RenderContext) {
        const rows = DEFAULT_APPEARANCE[ROW];
        const cols = DEFAULT_APPEARANCE[COL];
        const cellWidth = ctx.rect.width / cols;
        const cellHeight = ctx.rect.height / rows;

        let y = 0;
        for (let i = 0; i < rows; i++) {
            let x = 0;
            for (let j = 0; j < cols; j++) {
                const rect = new Rect2(x, y, cellWidth, cellHeight);
                console.log(rect);
                new Cell().render(ctx);
                x += cellWidth;
            }
            y += cellHeight;
        }
    }
}
