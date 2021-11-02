import { Graphics } from 'pixi.js';
import { ArenaConfig } from '../config';

export class Ball extends Graphics {
    velocity: { x: number; y: number };

    constructor() {
        super();
    }

    build() {
        const { ball_radius } = ArenaConfig;
        this.beginFill(0xffffff);
        this.drawCircle(0, 0, ball_radius);
        this.endFill();
    }

    setVelosity() {
        this.velocity = {
            x: 2,
            y: 2,
        };
    }
}
