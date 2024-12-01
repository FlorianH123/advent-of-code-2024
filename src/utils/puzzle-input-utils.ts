import { readLines } from './file-utils.ts';
import { isNotEmpty } from './string-utils.ts';

export async function readInputLines(
    path: URL,
    options?: ReadInputLinesOptions,
): Promise<string[]> {
    const defaultOptions: Required<ReadInputLinesOptions> = { removeEmptyLines: true };
    const { removeEmptyLines } = { ...defaultOptions, ...options };

    const lines = await readLines(path);

    if (removeEmptyLines) {
        return lines.filter(isNotEmpty);
    }

    return lines;
}

interface ReadInputLinesOptions {
    removeEmptyLines?: boolean;
}
