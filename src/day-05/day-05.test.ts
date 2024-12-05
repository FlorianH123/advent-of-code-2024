import { describe, it } from 'jsr:@std/testing/bdd';
import { expect } from 'jsr:@std/expect';
import { readInput } from '../utils/puzzle-input-utils.ts';
import { firstPuzzle, secondPuzzle } from './day-05.ts';

describe('day 05', () => {
    describe('first puzzle', () => {
        it('should return 143', async () => {
            const path = new URL(
                '../../resources/day-05/puzzle-1-example-input.txt',
                import.meta.url,
            );
            const input = await readInput(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('143');
        });
    });
    describe('second puzzle', () => {
        it('should return 123', async () => {
            const path = new URL(
                '../../resources/day-05/puzzle-2-example-input.txt',
                import.meta.url,
            );
            const input = await readInput(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('123');
        });
    });
});
