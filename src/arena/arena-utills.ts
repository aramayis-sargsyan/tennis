import { ArenaConfig } from '../config';

export const checkWorldBounds = (ball) => {
    const { cell_lineStyle, cell_width, cell_height } = ArenaConfig;
    if (ball.position.x >= (window.innerWidth + cell_width) / 2 - cell_lineStyle - ball.width / 2) {
        ball.velocity.x = -Math.abs(ball.velocity.x);
    } else if (ball.position.x <= (window.innerWidth - cell_width) / 2 + cell_lineStyle + ball.width / 2) {
        ball.velocity.x = Math.abs(ball.velocity.x);
    } else if (ball.position.y >= window.innerHeight - ball.height / 2 - cell_lineStyle) {
        ball.velocity.y = -Math.abs(ball.velocity.y);
    } else if (ball.position.y <= window.innerHeight - cell_height + ball.width / 2 + cell_lineStyle) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    }
};
