import { Container, Graphics } from 'pixi.js';
import { Cell } from './cell';
import { Row } from './pathLine';
import { AreaConfig } from '../config';
import { Ball } from './ball';
import { getRandomInRange } from '../utils';

export class Arena extends Container {
    cell: Cell;
    ball: Ball;
    mouseStart: number[];
    wall: Row;
    constructor() {
        super();
        this.mouseStart = [0, 0];
        this.mouseStart = [null, null];
    }

    build() {
        this.cell = new Cell();
        const { cell_width, cell_height, cell_lineStyle } = AreaConfig;
        this.cell._build();
        this.cell.position.set(
            cell_lineStyle + ((1 - cell_width) * window.innerWidth) / 2,
            cell_lineStyle + window.innerHeight * (1 - cell_height),
        );
        this.addChild(this.cell);
        this.cell.on('pointerdown', this._onClickStart, this).on('pointerup', this._onClickEnd, this);
        // .on('pointerupoutside', this._onClickOutside, this)
    }

    buildRow() {
        const { cell_lineStyle, cell_width, cell_height } = AreaConfig;
        const row = new Row();
        row._build();
        row.moveTo(
            cell_lineStyle + ((1 - cell_width) * window.innerWidth) / 2,
            window.innerHeight * (1 - cell_height / 2),
        );
        row.lineTo(
            window.innerWidth - ((1 - cell_width) * window.innerWidth) / 2 - cell_lineStyle,
            window.innerHeight * (1 - cell_height / 2),
        );
        this.addChild(row);
    }

    buildBall() {
        const { cell_width, cell_height } = AreaConfig;
        this.ball = new Ball();
        this.ball._build();
        this.ball.position.set(window.innerWidth / 2, window.innerHeight * (1 - cell_height / 2));
        this.ball.interactive = true;
        this.ball.on('pointerup', this._onClickBallEnd, this);
        this.addChild(this.ball);
    }

    _onClickBallEnd() {
        let x = 2;
        let y = 2;
        this.ball.velocity[0] = x;
        this.ball.velocity[1] = y;
        this.ball.interactive = false;
        this.cell.interactive = true;
    }

    moveBall() {
        const { cell_height } = AreaConfig;
        this.ball.position.set(
            this.ball.position.x + this.ball.velocity[0],
            this.ball.position.y + this.ball.velocity[1],
        );

        if (this.ball.position.y < window.innerHeight * (1 - cell_height / 2)) {
            this.cell.interactive = true;
        }
        this.checkWorldBounds();
    }

    checkWorldBounds() {
        const { cell_lineStyle, cell_width, cell_height } = AreaConfig;
        if (this.ball.position.x >= (window.innerWidth * (1 + cell_width)) / 2 - this.ball.width / 2 - cell_lineStyle) {
            this.ball.velocity[0] = -Math.abs(this.ball.velocity[0]);
        } else if (
            this.ball.position.x <=
            (window.innerWidth * (1 - cell_width)) / 2 + this.ball.width / 2 + cell_lineStyle
        ) {
            this.ball.velocity[0] = Math.abs(this.ball.velocity[0]);
        } else if (this.ball.position.y >= window.innerHeight - this.ball.height / 2 - cell_lineStyle) {
            this.ball.velocity[1] = -Math.abs(this.ball.velocity[1]);
        } else if (
            this.ball.position.y <=
            window.innerHeight * (1 - cell_height) + this.ball.width / 2 + cell_lineStyle
        ) {
            this.ball.velocity[1] = Math.abs(this.ball.velocity[1]);
        }
    }

    _onClickStart(e) {
        const { cell_height } = AreaConfig;

        this.mouseStart[0] = e.data.global.x;
        this.mouseStart[1] = e.data.global.y;
        console.log(this.mouseStart);

        console.log(this.mouseStart[1]);

        if (this.mouseStart[1] > window.innerHeight * (1 - cell_height / 2)) {
            console.log(117);

            this.cell.on('pointermove', this._onClickMove, this);
        }

        // this.ball.on('pointermove', this._onClickMove, this);
        // this._drawLine();
        // this._drawArrow();
    }

    _onClickEnd(e) {
        // this.ball.off('pointermove', this._onClickMove, this);
        // this.pathLine.clear();
        // this.pathLineArrow.clear();
        // this.mouseStart[0] = e.data.global.x;
        // this.mouseStart[1] = e.data.global.y;
        this.cell.interactive = false;
        console.log(this.mouseStart);
    }

    _onClickOutside() {
        console.log('outside');

        // this.ball.interactive = false;
        // this.ball.off('pointermove', this._onClickMove, this);
        // this.pathLine.clear();
        // this.pathLineArrow.clear();
        // this._calculateVelocity();
        // this._moveCircle();
        // this._checkballlision();
    }

    _onClickMove(e) {
        const { cell_lineStyle, cell_width, cell_height } = AreaConfig;

        console.log('move');
        if (this.wall) {
            this.wall.destroy();
        }
        this.wall = new Row();
        this.wall._build();

        this.wall.moveTo(this.mouseStart[0], this.mouseStart[1]);
        this.wall.lineTo(e.data.global.x, e.data.global.y);
        this.addChild(this.wall);

        // this.mouseEnd.x = e.data.global.x;
        // this.mouseEnd.y = e.data.global.y;
        // this.pathLine.clear();
        // this.pathLineArrow.clear();
        // this._drawLine();
        // this._drawArrow();
    }
}
