import { Container, Graphics, LineStyle } from 'pixi.js';
import { Cell } from './cell';
import { Row } from './pathLine';
import { ArenaConfig } from '../config';
import { Ball } from './ball';
import { checkWorldBounds } from './arena-utills';
import { arenaWall } from './arena-wall';
import { ballLine, ballLineColition } from './line-circle';

export class Arena extends Container {
    ball: Ball;
    cell: Cell;
    mouseStart: { x: number; y: number };
    mouseEnd: { x: number; y: number };
    endCordinate: { x: number; y: number };
    count: number;
    wall: Row;
    constructor() {
        super();
        this.mouseStart = {
            x: 0,
            y: 0,
        };
        this.endCordinate = {
            x: 0,
            y: 0,
        };
        this.count = 1;
    }

    buildBoard() {
        const { cell_width, cell_height, cell_lineStyle, row_height } = ArenaConfig;
        this.cell = new Cell();
        this.cell._build(
            cell_width - 2 * cell_lineStyle,
            (cell_height - 2 * cell_lineStyle) / 2 - row_height / 2,
            0,
            Number.MIN_VALUE,
        );
        this.cell.position.set(
            window.innerWidth / 2,
            window.innerHeight - cell_height / 4 - cell_lineStyle / 2 + row_height / 4,
        );
        this.cell.tint = 0xffffff;
        this.addChild(this.cell);
        this.cell.interactive = true;
        this.cell
            .on('pointerdown', this._onClickStart, this)
            .on('pointerup', this._onClickEnd, this)
            .on('pointerupoutside', this._onClickOutcide, this);
    }

    buildBall() {
        const { cell_height } = ArenaConfig;
        this.ball = new Ball();
        this.ball.build();
        this.ball.position.set(window.innerWidth / 2, window.innerHeight - cell_height / 2);
        this.ball.tint = 0xff0000;
        this.ball.setVelosity();
        this.addChild(this.ball);
    }

    moveBall() {
        const { cell_height, ball_radius } = ArenaConfig;
        this.ball.position.set(
            (this.ball.position.x += this.ball.velocity.x),
            (this.ball.position.y += this.ball.velocity.y),
        );

        if (this.ball.position.y === window.innerHeight - cell_height / 2) {
            this.count = 1;
        }

        checkWorldBounds(this.ball);
        if (
            ballLine(
                this.mouseStart.x,
                this.mouseStart.y,
                this.endCordinate.x,
                this.endCordinate.y,
                this.ball.position.x,
                this.ball.position.y,
                ball_radius,
            )
        ) {
            ballLineColition(this.ball, this.mouseStart.x, this.mouseStart.y, this.endCordinate.x, this.endCordinate.y);
        }
    }

    _onClickStart(e) {
        const { cell_height, cell_lineStyle } = ArenaConfig;

        this.mouseStart.x = e.data.global.x;
        this.mouseStart.y = e.data.global.y;

        if (this.mouseStart.y > window.innerHeight - cell_height / 2) {
            this.cell.on('pointermove', this._onClickMove, this);
        }
    }

    _onClickEnd(e) {
        this.count = 0;
    }

    _onClickOutcide() {
        this.count = 0;
    }

    _onClickMove(e) {
        const { wall_height } = ArenaConfig;
        this.endCordinate = arenaWall(this.mouseStart.x, this.mouseStart.y, e.data.global.x, e.data.global.y);

        if (this.count) {
            if (this.wall) {
                this.wall.destroy();
            }
            this.wall = new Row();
            this.wall._build(wall_height);
            this.wall.moveTo(this.mouseStart.x, this.mouseStart.y);
            this.wall.lineTo(this.endCordinate.x, this.endCordinate.y);
            this.addChild(this.wall);
        }
    }
}
