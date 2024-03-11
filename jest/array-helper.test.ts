import { expect } from '@jest/globals';
import ArrayHelper from "../src/helpers/ArrayHelper";

describe("Test Authorization", () => {
    it("returns true only when there is a non-nullish element", () => {
        expect(ArrayHelper.checkAnyNonNull(['smth', undefined, null])).toBe(true);
        expect(ArrayHelper.checkAnyNonNull([undefined])).toBe(false);
        expect(ArrayHelper.checkAnyNonNull(['smth', 'smth else'])).toBe(true);
        expect(ArrayHelper.checkAnyNonNull([null])).toBe(false);
    })
})
