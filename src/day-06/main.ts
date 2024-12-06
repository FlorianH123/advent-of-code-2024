import { firstPuzzle, secondPuzzle } from './day-06.ts';
import { readInputLines } from '../utils/puzzle-input-utils.ts';

const path = new URL('../../resources/day-06/puzzle-input.txt', import.meta.url);
const input = await readInputLines(path);

firstPuzzle(input)
    .then((result) => console.log(`1. puzzle result: ${result}`))
    .catch(console.error);

secondPuzzle(input)
    .then((result) => console.log(`2. puzzle result: ${result}`))
    .catch(console.error);
