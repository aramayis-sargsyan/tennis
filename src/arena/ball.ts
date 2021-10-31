import { Graphics } from 'pixi.js';
import { AreaConfig } from '../config';
import { Circle } from './circle';
export class Ball extends Graphics {
    velocity: number[];
    constructor() {
        super();
    }

    _build() {
        const { ball_radius } = AreaConfig;

        this.beginFill(0xffffff);
        this.drawCircle(0, 0, ball_radius);
        this.endFill();
        this.velocity = [0, 0];
    }
}
