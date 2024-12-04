import { Point } from '../model/point.ts';

type XmasCoordinates = [Point, Point, Point, Point];
export async function firstPuzzle(input: string[]): Promise<string> {
    let searchResult: XmasCoordinates[] = [];

    for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
        for (let charIndex = 0; charIndex < input[lineIndex]!.length; charIndex++) {
            const char = input[lineIndex]![charIndex]!;

            if (char !== 'X') {
                continue;
            }

            const horizontal = getXmasHorizontally(input, lineIndex, charIndex);
            const vertical = getXmasVertically(input, lineIndex, charIndex);
            const diagonal = getXmasDiagonally(input, lineIndex, charIndex);
            const horizontalB = getXmasBackwardsHorizontally(input, lineIndex, charIndex);
            const verticalB = getXmasBackwardsVertically(input, lineIndex, charIndex);
            const diagonalB = getXmasBackwardsDiagonally(input, lineIndex, charIndex);

            searchResult = searchResult.concat([
                horizontal,
                vertical,
                ...diagonal,
                horizontalB,
                verticalB,
                ...diagonalB,
            ].filter((coordinate) => coordinate != null));
        }
    }

    return searchResult.length.toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    let count = 0;

    for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
        for (let charIndex = 0; charIndex < input[lineIndex]!.length; charIndex++) {
            const char = input[lineIndex]![charIndex]!;

            if (char !== 'A') {
                continue;
            }

            const upperLeftCorner = input[lineIndex - 1]?.[charIndex - 1];
            const upperRightCorner = input[lineIndex - 1]?.[charIndex + 1];
            const lowerLeftCorner = input[lineIndex + 1]?.[charIndex - 1];
            const lowerRightCorner = input[lineIndex + 1]?.[charIndex + 1];

            // bounds check
            if (
                upperLeftCorner == null ||
                upperRightCorner == null ||
                lowerLeftCorner == null ||
                lowerRightCorner == null
            ) {
                continue;
            }

            if (
                (
                    (upperLeftCorner === 'S' && lowerRightCorner === 'M') ||
                    (upperLeftCorner === 'M' && lowerRightCorner === 'S')
                ) &&
                (
                    (lowerLeftCorner === 'S' && upperRightCorner === 'M') ||
                    (lowerLeftCorner === 'M' && upperRightCorner === 'S')
                )
            ) {
                count++;
            }
        }
    }

    return count.toString();
}

function getXmasHorizontally(
    input: string[],
    lineIndex: number,
    charIndex: number,
): XmasCoordinates | undefined {
    const xCoordinate = new Point(charIndex, lineIndex);
    const possibleMCoordinate = new Point(charIndex + 1, lineIndex);
    const possibleACoordinate = new Point(charIndex + 2, lineIndex);
    const possibleSCoordinate = new Point(charIndex + 3, lineIndex);

    if (input[lineIndex]!.length <= possibleSCoordinate.x) {
        return undefined;
    }

    if (
        input[possibleMCoordinate.y]![possibleMCoordinate.x]! === 'M' &&
        input[possibleACoordinate.y]![possibleACoordinate.x]! === 'A' &&
        input[possibleSCoordinate.y]![possibleSCoordinate.x]! === 'S'
    ) {
        return [xCoordinate, possibleMCoordinate, possibleACoordinate, possibleSCoordinate];
    }

    return undefined;
}

function getXmasVertically(
    input: string[],
    lineIndex: number,
    charIndex: number,
): XmasCoordinates | undefined {
    const xCoordinate = new Point(charIndex, lineIndex);
    const possibleMCoordinate = new Point(charIndex, lineIndex + 1);
    const possibleACoordinate = new Point(charIndex, lineIndex + 2);
    const possibleSCoordinate = new Point(charIndex, lineIndex + 3);

    if (input.length <= possibleSCoordinate.y) {
        return undefined;
    }

    if (
        input[possibleMCoordinate.y]![possibleMCoordinate.x]! === 'M' &&
        input[possibleACoordinate.y]![possibleACoordinate.x]! === 'A' &&
        input[possibleSCoordinate.y]![possibleSCoordinate.x]! === 'S'
    ) {
        return [xCoordinate, possibleMCoordinate, possibleACoordinate, possibleSCoordinate];
    }

    return undefined;
}

function getXmasDiagonally(
    input: string[],
    lineIndex: number,
    charIndex: number,
): XmasCoordinates[] {
    const xCoordinate = new Point(charIndex, lineIndex);
    const possibleMDownCoordinate = new Point(charIndex + 1, lineIndex + 1);
    const possibleADownCoordinate = new Point(charIndex + 2, lineIndex + 2);
    const possibleSDownCoordinate = new Point(charIndex + 3, lineIndex + 3);
    const possibleMUpCoordinate = new Point(charIndex + 1, lineIndex - 1);
    const possibleAUpCoordinate = new Point(charIndex + 2, lineIndex - 2);
    const possibleSUpCoordinate = new Point(charIndex + 3, lineIndex - 3);
    const searchResult: XmasCoordinates[] = [];

    if (
        input.length > possibleSDownCoordinate.y &&
        input[lineIndex]!.length > possibleSDownCoordinate.x
    ) {
        if (
            input[possibleMDownCoordinate.y]![possibleMDownCoordinate.x]! === 'M' &&
            input[possibleADownCoordinate.y]![possibleADownCoordinate.x]! === 'A' &&
            input[possibleSDownCoordinate.y]![possibleSDownCoordinate.x]! === 'S'
        ) {
            searchResult.push([
                xCoordinate,
                possibleMDownCoordinate,
                possibleADownCoordinate,
                possibleSDownCoordinate,
            ]);
        }
    }

    if (possibleSUpCoordinate.y >= 0 && input[lineIndex]!.length > possibleSUpCoordinate.y) {
        if (
            input[possibleMUpCoordinate.y]![possibleMUpCoordinate.x]! === 'M' &&
            input[possibleAUpCoordinate.y]![possibleAUpCoordinate.x]! === 'A' &&
            input[possibleSUpCoordinate.y]![possibleSUpCoordinate.x]! === 'S'
        ) {
            searchResult.push([
                xCoordinate,
                possibleMUpCoordinate,
                possibleAUpCoordinate,
                possibleSUpCoordinate,
            ]);
        }
    }

    return searchResult;
}

function getXmasBackwardsHorizontally(
    input: string[],
    lineIndex: number,
    charIndex: number,
): XmasCoordinates | undefined {
    const xCoordinate = new Point(charIndex, lineIndex);
    const possibleMCoordinate = new Point(charIndex - 1, lineIndex);
    const possibleACoordinate = new Point(charIndex - 2, lineIndex);
    const possibleSCoordinate = new Point(charIndex - 3, lineIndex);

    if (possibleSCoordinate.x < 0) {
        return undefined;
    }

    if (
        input[possibleMCoordinate.y]![possibleMCoordinate.x]! === 'M' &&
        input[possibleACoordinate.y]![possibleACoordinate.x]! === 'A' &&
        input[possibleSCoordinate.y]![possibleSCoordinate.x]! === 'S'
    ) {
        return [xCoordinate, possibleMCoordinate, possibleACoordinate, possibleSCoordinate];
    }

    return undefined;
}

function getXmasBackwardsVertically(
    input: string[],
    lineIndex: number,
    charIndex: number,
): XmasCoordinates | undefined {
    const xCoordinate = new Point(charIndex, lineIndex);
    const possibleMCoordinate = new Point(charIndex, lineIndex - 1);
    const possibleACoordinate = new Point(charIndex, lineIndex - 2);
    const possibleSCoordinate = new Point(charIndex, lineIndex - 3);

    if (possibleSCoordinate.y < 0) {
        return undefined;
    }

    if (
        input[possibleMCoordinate.y]![possibleMCoordinate.x]! === 'M' &&
        input[possibleACoordinate.y]![possibleACoordinate.x]! === 'A' &&
        input[possibleSCoordinate.y]![possibleSCoordinate.x]! === 'S'
    ) {
        return [xCoordinate, possibleMCoordinate, possibleACoordinate, possibleSCoordinate];
    }

    return undefined;
}

function getXmasBackwardsDiagonally(
    input: string[],
    lineIndex: number,
    charIndex: number,
): XmasCoordinates[] {
    const xCoordinate = new Point(charIndex, lineIndex);
    const possibleMDownCoordinate = new Point(charIndex - 1, lineIndex + 1);
    const possibleADownCoordinate = new Point(charIndex - 2, lineIndex + 2);
    const possibleSDownCoordinate = new Point(charIndex - 3, lineIndex + 3);
    const possibleMUpCoordinate = new Point(charIndex - 1, lineIndex - 1);
    const possibleAUpCoordinate = new Point(charIndex - 2, lineIndex - 2);
    const possibleSUpCoordinate = new Point(charIndex - 3, lineIndex - 3);
    const searchResult: XmasCoordinates[] = [];

    if (input.length > possibleSDownCoordinate.y && possibleSDownCoordinate.x >= 0) {
        if (
            input[possibleMDownCoordinate.y]![possibleMDownCoordinate.x]! === 'M' &&
            input[possibleADownCoordinate.y]![possibleADownCoordinate.x]! === 'A' &&
            input[possibleSDownCoordinate.y]![possibleSDownCoordinate.x]! === 'S'
        ) {
            searchResult.push([
                xCoordinate,
                possibleMDownCoordinate,
                possibleADownCoordinate,
                possibleSDownCoordinate,
            ]);
        }
    }

    if (possibleSUpCoordinate.y >= 0 && possibleSUpCoordinate.x >= 0) {
        if (
            input[possibleMUpCoordinate.y]![possibleMUpCoordinate.x]! === 'M' &&
            input[possibleAUpCoordinate.y]![possibleAUpCoordinate.x]! === 'A' &&
            input[possibleSUpCoordinate.y]![possibleSUpCoordinate.x]! === 'S'
        ) {
            searchResult.push([
                xCoordinate,
                possibleMUpCoordinate,
                possibleAUpCoordinate,
                possibleSUpCoordinate,
            ]);
        }
    }

    return searchResult;
}
