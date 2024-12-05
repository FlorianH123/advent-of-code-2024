export function parseNumber(num: string): number {
    const number = parseInt(num, 10);

    if (isNaN(number)) {
        throw new RangeError(`Invalid number: "${num}"`);
    }

    return number;
}
