import { Graphics } from 'pixi.js';
import { AreaConfig } from '../config';

export class Circle extends Graphics {
    constructor() {
        super();
    }

    _build() {
        const { circle_radius: ball_radius } = AreaConfig;
        this.lineStyle(3, 0x444444);
        this.drawCircle(0, 0, ball_radius);
        this.endFill();
    }
}
