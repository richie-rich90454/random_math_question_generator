import {describe, it, expect} from "vitest";
import {topics, scopeTopics, SESSION_STORAGE_KEY} from "./constants";
describe('topics array', () => {
    it('has all required fields for every topic', () => {
        for (let t of topics){
            expect(t.id).toBeTruthy();
            expect(t.name).toBeTruthy();
            expect(t.icon).toBeTruthy();
            expect(t.category).toBeTruthy();
        }
    });
    it('has unique topic IDs', () => {
        let ids=topics.map(t=>t.id);
        let unique=new Set(ids);
        expect(unique.size).toBe(ids.length);
    });
    it('has at least 120 topics', () => {
        expect(topics.length).toBeGreaterThanOrEqual(120);
    });
});
describe('scopeTopics', () => {
    it('has all required scope keys', () => {
        expect(scopeTopics).toHaveProperty('simple');
        expect(scopeTopics).toHaveProperty('algebra');
        expect(scopeTopics).toHaveProperty('precalc');
        expect(scopeTopics).toHaveProperty('calc');
        expect(scopeTopics).toHaveProperty('all');
    });
    it('scopeTopics.all contains every topic ID', () => {
        let allIds=topics.map(t=>t.id);
        expect(scopeTopics.all.sort()).toEqual(allIds.sort());
    });
    it('scopeTopics.all length matches topics.length', () => {
        expect(scopeTopics.all.length).toBe(topics.length);
    });
});
describe('SESSION_STORAGE_KEY', () => {
    it('has correct value', () => {
        expect(SESSION_STORAGE_KEY).toBe('mentalSessionSnapshot');
    });
});
