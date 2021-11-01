import { Graphics } from 'pixi.js';
import { ArenaConfig } from '../config';

export class Cell extends Graphics {
    constructor() {
        super();
    }

    _build(width, height, lineStyle, overflow) {
        this.lineStyle(lineStyle, 0x222222, 1, 1);
        this.beginFill(0xffffff, overflow);

        this.drawRect(0, 0, width - 2 * lineStyle, height - 2 * lineStyle);
        this.endFill();
        this.pivot.set(this.width / 2, this.height / 2);
    }
}
