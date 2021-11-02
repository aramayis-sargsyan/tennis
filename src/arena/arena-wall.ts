import { ArenaConfig } from '../config';
export const arenaWall = (xStart, yStart, xMove, yMove) => {
    const { cell_width, cell_lineStyle, cell_height, row_height, wall_radius } = ArenaConfig;
    let x = xStart - wall_radius;
    let y = yStart - wall_radius;
    let xEnd = xStart;
    let yEnd = yStart;

    x = (wall_radius * (xMove - xStart)) / Math.sqrt((xMove - xStart) ** 2 + (yMove - yStart) ** 2) + xStart;
    y = (wall_radius * (yMove - yStart)) / Math.sqrt((xMove - xStart) ** 2 + (yMove - yStart) ** 2) + yStart;

    let xMLR = Math.max(
        (window.innerWidth - cell_width) / 2 + cell_lineStyle,
        Math.min(xMove, (window.innerWidth + cell_width) / 2 - cell_lineStyle),
    );
    if (xMLR > xStart) {
        xEnd = Math.min(x, xMLR);
    } else {
        xEnd = Math.max(x, xMLR);
    }

    let yMLR = Math.max(
        window.innerHeight - cell_height / 2 + row_height / 2,
        Math.min(yMove, window.innerHeight - cell_lineStyle),
    );
    if (yMLR > yStart) {
        yEnd = Math.min(y, yMLR);
    } else {
        yEnd = Math.max(y, yMLR);
    }

    return { x: xEnd, y: yEnd };
};
