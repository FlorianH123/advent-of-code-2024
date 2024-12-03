import { describe, it } from 'jsr:@std/testing/bdd';
import { expect } from 'jsr:@std/expect';
import { readInput } from '../utils/puzzle-input-utils.ts';
import { firstPuzzle, secondPuzzle } from './day-03.ts';

describe('day 03', () => {
    describe('first puzzle', () => {
        it('should return 161', async () => {
            const path = new URL(
                '../../resources/day-03/puzzle-1-example-input.txt',
                import.meta.url,
            );
            const input = await readInput(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('161');
        });
    });
    describe('second puzzle', () => {
        it('should return 48', async () => {
            const path = new URL(
                '../../resources/day-03/puzzle-2-example-input.txt',
                import.meta.url,
            );
            const input = await readInput(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('48');
        });
    });
});
