import { Container, Graphics } from 'pixi.js';
import { Cell } from './cell';
import { Circle } from './circle';
import { Row } from './pathLine';
import { AreaConfig } from '../config';
import { Ball } from './ball';

export class Arena extends Container {
    ball: Ball;
    constructor() {
        super();
    }

    build() {
        const cell = new Cell();
        const { cell_height, cell_lineStyle } = AreaConfig;
        cell._build();
        cell.position.set(cell_lineStyle, window.innerHeight * (1 - cell_height) - cell_lineStyle);
        this.addChild(cell);
    }

    buildRow() {
        const { cell_lineStyle, cell_width, cell_height } = AreaConfig;
        const row = new Row();
        row._build();
        row.moveTo(cell_lineStyle, window.innerHeight * (1 - cell_height / 2) - 20);
        row.lineTo(cell_width - cell_lineStyle, window.innerHeight * (1 - cell_height / 2) - 20);
        this.addChild(row);
    }

    buildCircle() {
        const { cell_width, cell_height } = AreaConfig;
        const circle = new Circle();
        circle._build();
        circle.position.set(cell_width / 2, cell_height * 0.65 - 20);
        this.addChild(circle);
    }

    buildBall() {
        const { cell_width, cell_height } = AreaConfig;
        this.ball = new Ball();
        this.ball._build();
        this.ball.position.set(cell_width / 2, window.innerHeight * (1 - cell_height / 2) - 20);
        this.addChild(this.ball);
    }

    setBallListeners() {
        console.log(this.ball);
        this.ball.interactive = true;
        this.ball
            .on('pointerdown', this._onClickStart, this)
            .on('pointerup', this._onClickEnd, this)
            .on('pointerupoutside', this._onClickOutside, this);
    }

    _onClickStart() {
        console.log(7);

        // this.mouseStart.x = this.ball.position.x;
        // this.mouseStart.y = this.ball.position.y;
        // this.mouseEnd.x = e.data.global.x;
        // this.mouseEnd.y = e.data.global.y;
        // this.ball.on('pointermove', this._onClickMove, this);
        // this._drawLine();
        // this._drawArrow();
    }

    _onClickEnd(e) {
        // this.ball.off('pointermove', this._onClickMove, this);
        // this.pathLine.clear();
        // this.pathLineArrow.clear();
    }

    _onClickOutside() {
        // this.ball.interactive = false;
        // this.ball.off('pointermove', this._onClickMove, this);
        // this.pathLine.clear();
        // this.pathLineArrow.clear();
        // this._calculateVelocity();
        // this._moveCircle();
        // this._checkballlision();
    }

    _onClickMove(e) {
        // this.mouseEnd.x = e.data.global.x;
        // this.mouseEnd.y = e.data.global.y;
        // this.pathLine.clear();
        // this.pathLineArrow.clear();
        // this._drawLine();
        // this._drawArrow();
    }
}
