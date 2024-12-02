import { parseNumber } from '../utils/number-utils.ts';
import { distance } from '../utils/math-utils.ts';

export async function firstPuzzle(input: string[]): Promise<string> {
    const reports = parse(input);

    const safeReports = reports.filter((report) => isReportSafe(report));
    return safeReports.length.toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const reports = parse(input);

    const safeReports = reports.filter((report) => isReportSafeWithDampener(report));
    return safeReports.length.toString();
}

function parse(input: string[]): number[][] {
    return input.map((report) => report.split(' ').map((level) => parseNumber(level)));
}

function isReportSafe(
    levels: number[],
): boolean {
    const overallSortOrder = getSortOrder(levels[0]!, levels[1]!);

    for (let i = 0; i < levels.length - 1; i++) {
        const lhsLevel = levels[i]!;
        const rhsLevel = levels[i + 1]!;
        const pairSortOrder = getSortOrder(lhsLevel, rhsLevel);
        const pairDistance = distance(lhsLevel, rhsLevel);

        if (
            pairDistance > 3 ||
            pairDistance < 1 ||
            pairSortOrder !== overallSortOrder
        ) {
            return false;
        }
    }

    return true;
}

function isReportSafeWithDampener(levels: number[]): boolean {
    for (let i = 0; i < levels.length; i++) {
        if (isReportSafe(levels.toSpliced(i, 1))) {
            return true;
        }
    }

    return false;
}

function getSortOrder(lhs: number, rhs: number): 'ascending' | 'descending' | 'neither' {
    const sign = Math.sign(rhs - lhs);

    if (sign === -1) {
        return 'descending';
    } else if (sign === 1) {
        return 'ascending';
    } else {
        return 'neither';
    }
}
