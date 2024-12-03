import { parseNumber } from '../utils/number-utils.ts';
import { sum } from '../utils/math-utils.ts';

export async function firstPuzzle(input: string): Promise<string> {
    const mulInstructionResults = extractValidInstructions(input, /mul\(\d{1,3},\d{1,3}\)/g).map(
        executeMulInstructions,
    );

    return mulInstructionResults.reduce(sum, 0).toString();
}

export async function secondPuzzle(input: string): Promise<string> {
    const instructions = extractValidInstructions(
        input,
        /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g,
    );
    let isMulEnabled = true;
    const mulInstructionResults: number[] = [];

    for (const instruction of instructions) {
        if (isMulInstruction(instruction)) {
            if (isMulEnabled) {
                mulInstructionResults.push(executeMulInstructions(instruction));
            }
        } else if (isEnableMulInstruction(instruction)) {
            isMulEnabled = true;
        } else if (isDisableMulInstruction(instruction)) {
            isMulEnabled = false;
        } else {
            throw new Error(`Invalid instruction: ${instruction}`);
        }
    }

    return mulInstructionResults.reduce(sum, 0).toString();
}

function extractValidInstructions(input: string, searchRegex: RegExp): RegExpMatchArray {
    const result = input.match(searchRegex);

    if (result == null) {
        throw new Error('Invalid input');
    }

    return result;
}

function executeMulInstructions(mulInstruction: string): number {
    const matches = mulInstruction.match(/mul\((\d{1,3}),(\d{1,3})\)/);

    if (matches == null) {
        throw new Error('Invalid input');
    }

    const [_, lhs, rhs] = matches;

    if (lhs == null || rhs == null) {
        throw new Error('Invalid input');
    }

    return parseNumber(lhs) * parseNumber(rhs);
}

function isMulInstruction(instruction: string): boolean {
    return instruction.startsWith('mul');
}

function isDisableMulInstruction(instruction: string): boolean {
    return instruction.startsWith(`don't(`);
}

function isEnableMulInstruction(instruction: string): boolean {
    return instruction.startsWith('do(');
}
