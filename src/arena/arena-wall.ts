import { ArenaConfig } from '../config';
export const arenaWall = (xStart, yStart, xMove, yMove, xEnd, yEnd) => {
    const { cell_width, cell_lineStyle, cell_height, row_height, wall_radius } = ArenaConfig;
    let x = xStart - wall_radius;
    let y = yStart - wall_radius;
    console.log((wall_radius * (xMove - xStart)) / Math.sqrt((xMove - xStart) ** 2 + (yMove - yStart) ** 2) + xStart);

    x = (wall_radius * (xMove - xStart)) / Math.sqrt((xMove - xStart) ** 2 + (yMove - yStart) ** 2) + xStart;
    y = (wall_radius * (yMove - yStart)) / Math.sqrt((xMove - xStart) ** 2 + (yMove - yStart) ** 2) + yStart;

    xEnd = Math.min(
        Math.max(xMove, Math.max((window.innerWidth - cell_width) / 2 + cell_lineStyle), x),
        Math.min((window.innerWidth + cell_width) / 2 - cell_lineStyle, xStart + wall_radius),
    );

    yEnd = Math.min(
        Math.max(yMove, Math.max(window.innerHeight - cell_height / 2 + row_height / 2, y)),
        Math.min(window.innerHeight - cell_lineStyle, yStart + wall_radius),
    );

    return { x: xEnd, y: yEnd };
};
