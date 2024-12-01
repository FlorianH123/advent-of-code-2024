import { parseNumber } from '../utils/number-utils.ts';
import { numberCompare, sum } from '../utils/math-utils.ts';
import assert from 'node:assert';
import { countByItem } from '../utils/collection-utils.ts';

export async function firstPuzzle(input: string[]): Promise<string> {
    const [leftLocationIds, rightLocationIds] = parseInput(input);
    const leftLocationIdsSorted = leftLocationIds.toSorted(numberCompare);
    const rightLocationIdsSorted = rightLocationIds.toSorted(numberCompare);
    const distances: number[] = [];

    for (let i = 0; i < leftLocationIdsSorted.length; i++) {
        const leftLocationId = leftLocationIdsSorted[i];
        const rightLocationId = rightLocationIdsSorted[i];

        assert(leftLocationId != null);
        assert(rightLocationId != null);

        const distance = Math.abs(leftLocationId - rightLocationId);
        distances.push(distance);
    }

    return distances.reduce(sum, 0).toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const [leftLocationIds, rightLocationIds] = parseInput(input);
    const idCountMap = countByItem(rightLocationIds);

    return leftLocationIds.map((leftLocationId) =>
        leftLocationId * (idCountMap.get(leftLocationId) ?? 0)
    )
        .reduce(sum, 0).toString();
}

function parseInput(input: string[]): [number[], number[]] {
    const leftLocationIds: number[] = [];
    const rightLocationIds: number[] = [];

    for (const line of input) {
        const [leftLocationId, rightLocationId] = line.split('   ');

        if (leftLocationId == null || rightLocationId == null) {
            throw new Error(`Invalid input line: ${line}`);
        }

        leftLocationIds.push(parseNumber(leftLocationId));
        rightLocationIds.push(parseNumber(rightLocationId));
    }

    if (leftLocationIds.length !== rightLocationIds.length) {
        throw new Error('The two list have not the same length');
    }

    return [leftLocationIds, rightLocationIds];
}
