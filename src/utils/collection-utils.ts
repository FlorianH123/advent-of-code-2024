export function countByItem<T>(collection: T[]): Map<T, number> {
    return collection.reduce(
        (memo, current) => memo.set(current, (memo.get(current) ?? 0) + 1),
        new Map<T, number>(),
    );
}

export function quicksort<T>(
    startIndex: number,
    endIndex: number,
    data: T[],
    comparator: (lhs: T, rhs: T) => number,
) {
    if (startIndex < endIndex) {
        const divider = divide(startIndex, endIndex, data, comparator);
        quicksort(startIndex, divider - 1, data, comparator);
        quicksort(divider + 1, endIndex, data, comparator);
    }
}

function divide<T>(
    lhsIndex: number,
    rhsIndex: number,
    array: T[],
    comparator: (lhs: T, rhs: T) => number,
) {
    let i = lhsIndex;
    let j = rhsIndex - 1;
    const pivot = array[rhsIndex]!;

    while (i < j) {
        while (i < j && comparator(array[i]!, pivot) <= 0) {
            i++;
        }

        while (j > i && comparator(array[j]!, pivot) > 0) {
            j--;
        }

        if (comparator(array[i]!, array[j]!) > 0) {
            const tmp = array[i]!;
            array[i] = array[j]!;
            array[j] = tmp;
        }
    }

    if (comparator(array[i]!, pivot) > 0) {
        const tmp = array[i]!;
        array[i] = array[rhsIndex]!;
        array[rhsIndex] = tmp;
    } else {
        i = rhsIndex;
    }

    return i;
}
