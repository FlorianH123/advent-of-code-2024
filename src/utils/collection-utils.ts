export function countByItem<T>(collection: T[]): Map<T, number> {
    return collection.reduce(
        (memo, current) => memo.set(current, (memo.get(current) ?? 0) + 1),
        new Map<T, number>(),
    );
}
