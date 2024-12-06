import { Point } from '../model/point.ts';
import assert from 'node:assert';

const obstacle = '#';
const visited = 'X';
const playerFacingUpwards = '^';
const playerFacingDownwards = 'v';
const playerFacingLeft = '<';
const playerFacingRight = '>';
const playerDirections = [
    playerFacingUpwards,
    playerFacingRight,
    playerFacingDownwards,
    playerFacingLeft,
];
const emptyTile = '.';
const playerPathUp = '↑';
const playerPathDown = '↓';
const playerPathLeft = '←';
const playerPathRight = '→';

type PlayerFacingDirection = string;

export async function firstPuzzle(input: string[]): Promise<string> {
    const map = new GameMap(input);

    const isLoop = solve(map);
    assert(!isLoop);

    const distinctPositions = getDistinctPositionCount(map);
    return distinctPositions.toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const map = new GameMap(input);
    let loopCounter = 0;

    for (const [y, line] of map.tiles.entries()) {
        for (const [x, tile] of line.entries()) {
            if (tile === emptyTile) {
                const mapCopy = structuredClone(map);
                mapCopy.tiles[y]![x] = obstacle;
                const isLoop = solve(mapCopy);
                loopCounter += isLoop ? 1 : 0;
            }
        }
    }

    return loopCounter.toString();
}

function solve(map: GameMap): boolean {
    const startingPosition = getPlayerStartingPosition(map);
    const tileToPath = new Map<string, Set<string>>();
    return startSimulation(map, startingPosition, tileToPath);
}

function parseMap(input: string[]): string[][] {
    return input.map((line: string) => line.split(''));
}

function getPlayerFacingDirection(map: GameMap, playerPosition: Point): string {
    return map.tiles[playerPosition.y]![playerPosition.x]!;
}

function getNextPlayerDirection(direction: PlayerFacingDirection): PlayerFacingDirection {
    return playerDirections[(playerDirections.indexOf(direction) + 1) % playerDirections.length]!;
}

function getPlayerStartingPosition(map: GameMap): Point {
    for (const [y, line] of map.tiles.entries()) {
        for (const [x, tile] of line.entries()) {
            if (playerDirections.includes(tile)) {
                return new Point(x, y);
            }
        }
    }

    assert(false, 'no player position found!');
}

function getDistinctPositionCount(map: GameMap): number {
    return map.tiles.reduce(
        (acc, current) => acc + current.filter((tile) => tile === visited).length,
        0,
    );
}

function getPathSymbol(direction: PlayerFacingDirection): string {
    if (direction === playerFacingUpwards) {
        return playerPathUp;
    } else if (direction === playerFacingDownwards) {
        return playerPathDown;
    } else if (direction === playerFacingLeft) {
        return playerPathLeft;
    } else if (direction === playerFacingRight) {
        return playerPathRight;
    } else {
        assert(false, 'invalid direction');
    }
}

function checkIfLoop(
    direction: PlayerFacingDirection,
    visitedTiles: Map<string, Set<string>>,
    x: number,
    y: number,
): boolean {
    const pathSymbol = getPathSymbol(direction);

    let allPaths = visitedTiles.get([x, y].toString());

    if (allPaths == null) {
        allPaths = new Set(pathSymbol);
        visitedTiles.set([x, y].toString(), allPaths);
    } else {
        if (allPaths.has(pathSymbol)) {
            return true;
        } else {
            allPaths.add(pathSymbol);
        }
    }

    return false;
}

function startSimulation(
    locationMap: GameMap,
    playerStartingPosition: Point,
    visitedTiles: Map<string, Set<string>>,
): boolean {
    let x = playerStartingPosition.x;
    let y = playerStartingPosition.y;
    const locationTiles = locationMap.tiles;
    let isLoop = false;

    while (x >= 0 && x < locationMap.width && y >= 0 && y < locationMap.height) {
        const direction = getPlayerFacingDirection(locationMap, new Point(x, y));

        if (direction === playerFacingUpwards) {
            const tileInFrontOfPlayer = locationTiles[y - 1]?.[x];

            if (tileInFrontOfPlayer != null && tileInFrontOfPlayer === obstacle) {
                locationTiles[y]![x] = getNextPlayerDirection(direction);
            } else {
                if (checkIfLoop(direction, visitedTiles, x, y)) {
                    isLoop = true;
                    break;
                }

                locationTiles[y]![x] = visited;
                y--;

                if (tileInFrontOfPlayer != null) {
                    locationTiles[y]![x] = direction;
                }
            }
        } else if (direction === playerFacingDownwards) {
            const tileInFrontOfPlayer = locationTiles[y + 1]?.[x];

            if (tileInFrontOfPlayer != null && tileInFrontOfPlayer === obstacle) {
                locationTiles[y]![x] = getNextPlayerDirection(direction);
            } else {
                if (checkIfLoop(direction, visitedTiles, x, y)) {
                    isLoop = true;
                    break;
                }
                locationTiles[y]![x] = visited;
                y++;

                if (tileInFrontOfPlayer != null) {
                    locationTiles[y]![x] = direction;
                }
            }
        } else if (direction === playerFacingLeft) {
            const tileInFrontOfPlayer = locationTiles[y]?.[x - 1];

            if (tileInFrontOfPlayer != null && tileInFrontOfPlayer === obstacle) {
                locationTiles[y]![x] = getNextPlayerDirection(direction);
            } else {
                if (checkIfLoop(direction, visitedTiles, x, y)) {
                    isLoop = true;
                    break;
                }
                locationTiles[y]![x] = visited;
                x--;

                if (tileInFrontOfPlayer != null) {
                    locationTiles[y]![x] = direction;
                }
            }
        } else if (direction === playerFacingRight) {
            const tileInFrontOfPlayer = locationTiles[y]?.[x + 1];

            if (tileInFrontOfPlayer != null && tileInFrontOfPlayer === obstacle) {
                locationTiles[y]![x] = getNextPlayerDirection(direction);
            } else {
                if (checkIfLoop(direction, visitedTiles, x, y)) {
                    isLoop = true;
                    break;
                }
                locationTiles[y]![x] = visited;
                x++;

                if (tileInFrontOfPlayer != null) {
                    locationTiles[y]![x] = direction;
                }
            }
        } else {
            assert(false, 'invalid player direction!');
        }
    }

    return isLoop;
}

class GameMap {
    public tiles: string[][];
    public width: number;
    public height: number;

    constructor(input: string[]) {
        this.tiles = parseMap(input);
        this.width = input[0]!.length;
        this.height = input.length;
    }
}
