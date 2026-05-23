/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, beforeEach, vi} from "vitest";
import {generateDerivative, generateIntegral, generateLimit, generateRelatedRates, generateApplicationsDiff, generateGraphicalCalculus} from "./index.js";
import {questionArea} from "../../script.js";
import {getMaxCoeff} from "./calculusUtils.js";
vi.mock("../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("./calculusUtils.js", ()=>({
    getMaxCoeff: vi.fn(()=>5),
    trigFunctions: [
        {func: "\\sin(x)", deriv: "\\cos(x)", plainDeriv: "cos(x)"},
        {func: "\\cos(x)", deriv: "-\\sin(x)", plainDeriv: "-sin(x)"},
        {func: "\\tan(x)", deriv: "\\sec^{2}(x)", plainDeriv: "sec^2(x)"},
        {func: "\\csc(x)", deriv: "-\\csc(x)\\cot(x)", plainDeriv: "-csc(x)cot(x)"},
        {func: "\\sec(x)", deriv: "\\sec(x)\\tan(x)", plainDeriv: "sec(x)tan(x)"},
        {func: "\\cot(x)", deriv: "-\\csc^{2}(x)", plainDeriv: "-csc^2(x)"}
    ],
    expFunctions: [
        {func: "e^{x}", deriv: "e^{x}", plainDeriv: "e^x"},
        {func: "2^{x}", deriv: "2^{x}\\ln(2)", plainDeriv: "2^x*ln(2)"}
    ],
    logFunctions: [
        {func: "\\ln(x)", deriv: "\\frac{1}{x}", plainDeriv: "1/x"},
        {func: "\\log_{2}(x)", deriv: "\\frac{1}{x\\ln(2)}", plainDeriv: "1/(x*ln(2))"}
    ],
    latexToPlain: vi.fn((str: string)=>str.replace(/\\/g,"").replace(/{/g,"").replace(/}/g,"").replace(/cdot/g,"*").replace(/frac{([^}]+)}{([^}]+)}/g,"($1)/($2)")),
}));
describe("Calculus generators", ()=>{
    let mockDiv: HTMLDivElement;
    beforeEach(()=>{
        mockDiv=document.createElement("div");
        (questionArea as any)=mockDiv;
        delete (window as any).correctAnswer;
        delete (window as any).expectedFormat;
        vi.mocked(window.MathJax!.typesetPromise!).mockClear();
    });
    it("returns early if questionArea is null for generateDerivative", ()=>{
        (questionArea as any)=null;
        generateDerivative("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect((window as any).correctAnswer).toBeUndefined();
        expect((window as any).expectedFormat).toBeUndefined();
    });
    it("returns early if questionArea is null for generateIntegral", ()=>{
        (questionArea as any)=null;
        generateIntegral("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect((window as any).correctAnswer).toBeUndefined();
        expect((window as any).expectedFormat).toBeUndefined();
    });
    it("returns early if questionArea is null for generateLimit", ()=>{
        (questionArea as any)=null;
        generateLimit("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect((window as any).correctAnswer).toBeUndefined();
        expect((window as any).expectedFormat).toBeUndefined();
    });
    it("returns early if questionArea is null for generateRelatedRates", ()=>{
        (questionArea as any)=null;
        generateRelatedRates("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect((window as any).correctAnswer).toBeUndefined();
        expect((window as any).expectedFormat).toBeUndefined();
    });
    it("returns early if questionArea is null for generateApplicationsDiff", ()=>{
        (questionArea as any)=null;
        generateApplicationsDiff("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect((window as any).correctAnswer).toBeUndefined();
        expect((window as any).expectedFormat).toBeUndefined();
    });
    it("returns early if questionArea is null for generateGraphicalCalculus", ()=>{
        (questionArea as any)=null;
        generateGraphicalCalculus("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect((window as any).correctAnswer).toBeUndefined();
        expect((window as any).expectedFormat).toBeUndefined();
    });
    it("generateDerivative produces valid output with medium difficulty", ()=>{
        generateDerivative("medium");
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
        expect(typeof (window as any).correctAnswer.correct).toBe("string");
        expect((window as any).correctAnswer.correct.length).toBeGreaterThan(0);
        expect((window as any).expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML).toContain("\\");
        expect(window.MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateIntegral produces valid output with medium difficulty", ()=>{
        generateIntegral("medium");
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
        expect(typeof (window as any).correctAnswer.correct).toBe("string");
        expect((window as any).correctAnswer.correct.length).toBeGreaterThan(0);
        expect((window as any).expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML).toContain("\\");
        expect(window.MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateLimit produces valid output with medium difficulty", ()=>{
        generateLimit("medium");
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
        expect(typeof (window as any).correctAnswer.correct).toBe("string");
        expect((window as any).correctAnswer.correct.length).toBeGreaterThan(0);
        expect((window as any).expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML).toContain("\\");
        expect(window.MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateRelatedRates produces valid output with medium difficulty", ()=>{
        generateRelatedRates("medium");
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
        expect(typeof (window as any).correctAnswer.correct).toBe("string");
        expect((window as any).correctAnswer.correct.length).toBeGreaterThan(0);
        expect((window as any).expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML).toContain("\\");
        expect(window.MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateApplicationsDiff produces valid output with medium difficulty", ()=>{
        generateApplicationsDiff("medium");
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
        expect(typeof (window as any).correctAnswer.correct).toBe("string");
        expect((window as any).correctAnswer.correct.length).toBeGreaterThan(0);
        expect((window as any).expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML).toContain("\\");
        expect(window.MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateGraphicalCalculus produces valid output with medium difficulty", ()=>{
        generateGraphicalCalculus("medium");
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
        expect(typeof (window as any).correctAnswer.correct).toBe("string");
        expect((window as any).correctAnswer.correct.length).toBeGreaterThan(0);
        expect((window as any).expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML).toContain("\\");
        expect(window.MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("uses getMaxCoeff with provided difficulty", ()=>{
        const mockGetMax=vi.mocked(getMaxCoeff);
        mockGetMax.mockClear();
        mockGetMax.mockReturnValueOnce(10);
        generateDerivative("hard");
        expect(mockGetMax).toHaveBeenCalledWith("hard");
        expect(mockGetMax).toHaveReturnedWith(10);
        expect((window as any).correctAnswer).toBeDefined();
        expect((window as any).correctAnswer.correct).toBeTruthy();
    });
});
