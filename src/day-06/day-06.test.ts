import { describe, it } from 'jsr:@std/testing/bdd';
import { expect } from 'jsr:@std/expect';
import { readInputLines } from '../utils/puzzle-input-utils.ts';
import { firstPuzzle, secondPuzzle } from './day-06.ts';

describe('day 06', () => {
    describe('first puzzle', () => {
        it('should return 41', async () => {
            const path = new URL(
                '../../resources/day-06/puzzle-1-example-input.txt',
                import.meta.url,
            );
            const input = await readInputLines(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('41');
        });
    });
    describe('second puzzle', () => {
        it('should return 6', async () => {
            const path = new URL(
                '../../resources/day-06/puzzle-2-example-input.txt',
                import.meta.url,
            );
            const input = await readInputLines(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('6');
        });
    });
});
