/** @vitest-environment jsdom */
import {describe, it, expect} from "vitest";
import * as dom from "./dom";
describe('dom references', () => {
    it('all exported values are defined', () => {
        for (let key of Object.keys(dom)){
            expect((dom as any)[key]).toBeDefined();
        }
    });
    it('all are null in jsdom without real DOM', () => {
        for (let key of Object.keys(dom)){
            expect((dom as any)[key]).toBeNull();
        }
    });
    it('module loads without error', () => {
        expect(Object.keys(dom).length).toBeGreaterThan(0);
    });
});
