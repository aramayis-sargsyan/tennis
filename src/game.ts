import * as PIXI from 'pixi.js';
import { Arena } from './arena/arena';

export class Game extends PIXI.Application {
    x: number[];
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xbbbbbb,
        });

        document.body.appendChild(this.view);

        this.ticker.add(this._update, this);
        this.ticker.start();
        this.loader.onComplete.add(this._onLoadComplete, this);
        this.loader.load();
    }

    _onLoadComplete() {
        const arena = new Arena();
        arena.build();
        arena.buildRow();
        // arena.buildCircle();
        arena.buildBall();
        arena.setBallListeners();
        this.stage.addChild(arena);
    }

    _resize(width?, height?) {
        width = width || window.innerWidth;
        height = height || window.innerHeight;

        this._resizeCanvas(width, height);
        this._resizeRenderer(width, height);
    }

    _resizeCanvas(width, height) {
        const { style } = this.renderer.view;

        style.width = width + 'px';
        style.height = height + 'px';
    }

    _resizeRenderer(width, height) {
        this.renderer.resize(width, height);
    }

    _update() {
        //
    }
}
