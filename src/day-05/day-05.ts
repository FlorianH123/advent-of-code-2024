import { splitInputIntoSections } from '../utils/puzzle-input-utils.ts';
import assert from 'node:assert';
import { parseNumber } from '../utils/number-utils.ts';
import { sum } from '../utils/math-utils.ts';
import { quicksort } from '../utils/collection-utils.ts';
import _ from 'lodash';

type RuleSet = { pagesBefore: string[]; pagesAfter: string[] };

export async function firstPuzzle(input: string): Promise<string> {
    const [rules, updatesString] = await splitInputIntoSections(input);
    assert(rules != null, 'rules should not be null');
    assert(updatesString != null, 'updates should not be null');
    return solve(rules, updatesString)[0];
}

export async function secondPuzzle(input: string): Promise<string> {
    const [rules, updatesString] = await splitInputIntoSections(input);
    assert(rules != null, 'rules should not be null');
    assert(updatesString != null, 'updates should not be null');
    return solve(rules, updatesString)[1];
}

function solve(rules: string[], updatesString: string[]): [string, string] {
    const updates = updatesString.map((update) => update.split(','));

    const pageToRule = parseRuleSet(rules);
    const updatesCopy = structuredClone(updates);

    for (const update of updatesCopy) {
        quicksort(
            0,
            update.length - 1,
            update,
            (lhs, rhs) => {
                if (lhs === rhs) {
                    return 0;
                }

                return pageToRule.get(lhs)?.pagesAfter.includes(rhs) ? -1 : 1;
            },
        );
    }

    const invalidUpdates: string[][] = [];
    const validUpdates: string[][] = [];

    for (const [i, update] of updates.entries()) {
        if (!_.isEqual(update, updatesCopy[i]!)) {
            invalidUpdates.push(updatesCopy[i]!);
        } else {
            validUpdates.push(updatesCopy[i]!);
        }
    }

    return [
        validUpdates.map((update) => {
            const middlePageIndex = update.length / 2;
            assert(!Number.isInteger(middlePageIndex));
            return parseNumber(update[Math.ceil(middlePageIndex) - 1]!);
        }).reduce(sum, 0).toString(),
        invalidUpdates.map((update) => {
            const middlePageIndex = update.length / 2;
            assert(!Number.isInteger(middlePageIndex));
            return parseNumber(update[Math.ceil(middlePageIndex) - 1]!);
        }).reduce(sum, 0).toString(),
    ];
}

function parseRuleSet(rules: string[]): Map<string, RuleSet> {
    const pageToRule = new Map<string, RuleSet>();

    for (const rule of rules) {
        const [lhs, rhs] = rule.split('|');
        assert(lhs != null);
        assert(rhs != null);

        {
            const page = pageToRule.get(lhs);

            if (page == null) {
                pageToRule.set(lhs, { pagesBefore: [], pagesAfter: [rhs] });
            } else {
                page.pagesAfter.push(rhs);
            }
        }

        {
            const page = pageToRule.get(rhs);

            if (page == null) {
                pageToRule.set(rhs, { pagesBefore: [lhs], pagesAfter: [] });
            } else {
                page.pagesBefore.push(lhs);
            }
        }
    }

    return pageToRule;
}
