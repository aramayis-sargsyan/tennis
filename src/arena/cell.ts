import { Graphics } from 'pixi.js';
import { AreaConfig } from '../config';

export class Cell extends Graphics {
    constructor() {
        super();
    }

    _build() {
        const { cell_width, cell_height, cell_lineStyle } = AreaConfig;
        this.lineStyle(cell_lineStyle, 0x444444, 1, 1);
        this.beginFill(0x009334);

        this.drawRect(0, 0, cell_width - 2 * cell_lineStyle, cell_height * window.innerHeight);
        this.endFill();
    }
}
