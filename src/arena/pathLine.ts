import { Graphics } from 'pixi.js';
import { AreaConfig } from '../config';

export class Row extends Graphics {
    constructor() {
        super();
    }

    _build() {
        this.lineStyle(2, 0x444444);
    }
}
