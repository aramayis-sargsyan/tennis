import * as PIXI from 'pixi.js';
import { Board } from './board/board';
import { BoardConfig } from './config';
import { LoseGame } from './loseGame';
import { Queue } from './queue';
import { Score } from './score';

export class Game extends PIXI.Application {
    board: Board;
    queue: Queue;
    score: Score;
    score1: Score;
    los: LoseGame;

    x: number[];
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x444444,
        });

        document.body.appendChild(this.view);

        this.ticker.add(this._update, this);
        this.ticker.start();
        this.loader.onComplete.add(this._onLoadComplete, this);
        this.loader.load();
    }

    _onLoadComplete() {
        console.warn('load complete');
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
