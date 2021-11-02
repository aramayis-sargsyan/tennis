import { lineCircle } from 'intersects';

export const ballLine = (x, y1, x2, y2, xc, yc, rc) => {
    return lineCircle(x, y1, x2, y2, xc, yc, rc);
};

export const ballLineColition = (ball, xS, yS, xE, yE) => {
    let tgL = ball.velocity.x / ball.velocity.y;
    let tgB = (yE - yS) / (xE - xS);

    let tgBB = (2 * tgB) / (1 - tgB ** 2);

    let tgLB = (tgBB - tgL) / (1 + tgL * tgBB);
    if (ball.velocity.x > 0 && ball.velocity.y > 0 && (xS - xE) * (yS - yE) > 0) {
        console.log(7);

        ball.velocity.x = Math.sqrt(8 / (1 + tgLB ** 2));
        ball.velocity.y = Math.sqrt((8 / (1 + tgLB ** 2)) * Math.abs(tgLB));
    }

    // ball.velocity.y *= -1;
    // console.log(ball.velocity.x);
    // console.log(ball.velocity.y);
};
