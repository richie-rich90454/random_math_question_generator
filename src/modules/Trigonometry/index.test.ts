/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
import {generateSin, generateCosine, generateInverseTrig, generateDegreesToRadians, formatPiFraction} from "./index.js";
import {questionArea} from "../../script.js";
vi.mock("../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("./trigUtils.js", ()=>({
    formatPiFraction: vi.fn((value: number)=>{
        let pi=Math.PI;
        let tolerance=1e-6;
        if (Math.abs(value) < tolerance) return "0";
        let numerator=value / pi;
        for (let den=1; den<=8; den++) {
            let num=numerator * den;
            if (Math.abs(num - Math.round(num)) < tolerance) {
                let rounded=Math.round(num);
                if (den===1) {
                    if (rounded===1) return "π";
                    if (rounded===-1) return "-π";
                    return rounded + "π";
                }
                if (rounded===1) return `π/${den}`;
                if (rounded===-1) return `-π/${den}`;
                return `${rounded}π/${den}`;
            }
        }
        return value.toFixed(4);
    }),
}));
vi.mock("../Algebra/algebraUtils.js", ()=>({
    getMaxForDifficulty: vi.fn(()=>5),
}));
describe("Trigonometry generators", ()=>{
    let mockDiv: HTMLDivElement;
    beforeEach(()=>{
        mockDiv=document.createElement("div");
        (questionArea as any)=mockDiv;
        window.correctAnswer={correct: "", alternate: "", display: ""};
        window.expectedFormat="";
        (window as any).MathJax={typeset: vi.fn()};
    });
    it("returns early if questionArea is null for generateSin", ()=>{
        (questionArea as any)=null;
        generateSin("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("generateSin creates question with medium difficulty", ()=>{
        generateSin("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeDefined();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typeset).toHaveBeenCalled();
    });
    it("generateCosine creates question with medium difficulty", ()=>{
        generateCosine("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeDefined();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typeset).toHaveBeenCalled();
    });
    it("generateInverseTrig creates question with medium difficulty", ()=>{
        generateInverseTrig("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typeset).toHaveBeenCalled();
    });
    it("generateDegreesToRadians creates question with medium difficulty", ()=>{
        generateDegreesToRadians("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typeset).toHaveBeenCalled();
    });
    it("does not call MathJax.typeset if MathJax is missing", ()=>{
        delete (window as any).MathJax;
        generateSin("medium");
        expect((window as any).MathJax).toBeUndefined();
    });
    it("formatPiFraction is a function", ()=>{
        expect(typeof formatPiFraction).toBe("function");
    });
});
