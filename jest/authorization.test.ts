import { expect } from '@jest/globals';
import UserHelper from "../src/helpers/UserHelper";

describe("Test Authorization", () => {
    it("returns the correct top-level role", () => {
        expect(UserHelper.getTopLevelRole(['user'])).toBe('subscriber');
        expect(UserHelper.getTopLevelRole(['user', 'developer'])).toBe('developer');
        expect(UserHelper.getTopLevelRole(['user', 'legal'])).toBe('legal_admin');
        expect(UserHelper.getTopLevelRole(['user', 'finance'])).toBe('finance_admin');
        expect(UserHelper.getTopLevelRole(['user', 'mortgage_operations'])).toBe('mortgage_ops_admin');
        expect(UserHelper.getTopLevelRole(["legal", "mortgage_operations", "finance", "user"])).toBe('super_admin');
        expect(UserHelper.getTopLevelRole(["legal", "mortgage_operations", "finance", "user", "user"])).toBe('super_admin');
    })
})
