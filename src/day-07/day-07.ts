import assert from 'node:assert';
import { parseNumber } from '../utils/number-utils.ts';
import { sum } from '../utils/math-utils.ts';

export async function firstPuzzle(input: string[]): Promise<string> {
    const equations = parse(input);
    return equations.filter((equation) => isSolvable(equation, ['*', '+'])).map((equation) =>
        equation.testNumber
    ).reduce(sum, 0).toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const equations = parse(input);
    return equations.filter((equation) => isSolvable(equation, ['*', '+', '||'])).map((equation) =>
        equation.testNumber
    ).reduce(sum, 0).toString();
}

function isSolvable(equation: Equation, operators: string[]): boolean {
    return operators.some((operator) =>
        isPartialEquationSolvable(equation, equation.operands[0]!, 0, operator, operators)
    );
}

function isPartialEquationSolvable(
    equation: Equation,
    partialResult: number,
    operandIndex: number,
    operator: string,
    operators: string[],
): boolean {
    if (operandIndex === equation.operands.length - 1) {
        return equation.testNumber === partialResult;
    }

    if (partialResult > equation.testNumber) {
        return false;
    }

    let nextPartialResult = partialResult;

    switch (operator) {
        case '+':
            nextPartialResult += equation.operands[operandIndex + 1]!;
            break;
        case '*':
            nextPartialResult *= equation.operands[operandIndex + 1]!;
            break;
        case '||':
            nextPartialResult = parseNumber(
                `${partialResult}${equation.operands[operandIndex + 1]!}`,
            );
    }

    return operators.some((operator) =>
        isPartialEquationSolvable(
            equation,
            nextPartialResult,
            operandIndex + 1,
            operator,
            operators,
        )
    );
}

function parse(input: string[]): Equation[] {
    return input.map((line) => {
        const [testValueString, numbersString] = line.split(': ');
        assert(testValueString != null);
        assert(numbersString != null);

        return new Equation(
            parseNumber(testValueString),
            numbersString.split(' ').map((numberString) => parseNumber(numberString)),
        );
    });
}

class Equation {
    constructor(public testNumber: number, public operands: number[]) {
    }
}
