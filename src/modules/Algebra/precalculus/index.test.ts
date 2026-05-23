/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, beforeEach, afterEach, vi} from "vitest";
import {generateBasicFunctions} from "./generateBasicFunctions.js";
import {generateFunctionOperations} from "./generateFunctionOperations.js";
import {generateCircleEquations} from "./generateCircleEquations.js";
import {generateSyntheticDivision} from "./generateSyntheticDivision.js";
import {questionArea} from "../../../script.js";
vi.mock("../../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("../algebraUtils.js", ()=>({
    getMaxForDifficulty: vi.fn(()=>5),
}));
describe("Algebra precalculus generators", ()=>{
    let mockDiv: HTMLDivElement;
    let originalMathRandom: ()=>number;
    beforeEach(()=>{
        originalMathRandom=Math.random;
        mockDiv=document.createElement("div");
        (questionArea as any)=mockDiv;
        window.correctAnswer={correct:'',alternate:'',display:''};
        window.expectedFormat='';
        window.hasQuestion=false;
        (window as any).MathJax={typesetPromise: vi.fn().mockResolvedValue(undefined)};
    });
    afterEach(()=>{
        Math.random=originalMathRandom;
        delete (window as any).MathJax;
    });
    describe("generateBasicFunctions", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateBasicFunctions();
            expect(mockDiv.innerHTML).toBe("");
            expect((window as any).correctAnswer).toEqual({correct:'',alternate:'',display:''});
        });
        it("generates identify question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.01) // chosen index 0 => "identity"
                .mockReturnValueOnce(0.01); // type index 0 => "identify"
            generateBasicFunctions();
            expect(mockDiv.innerHTML).toContain("f(x)=x");
            expect(mockDiv.innerHTML).toContain("Identify");
            expect((window as any).correctAnswer.correct).toBe("identity");
            expect((window as any).expectedFormat).toBe("Enter the function name");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates properties question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.01) // chosen index 0 => "identity"
                .mockReturnValueOnce(0.5); // type index 1 => "properties"
            generateBasicFunctions();
            expect(mockDiv.innerHTML).toContain("Give one key property");
            expect((window as any).correctAnswer.correct).toBe("linear, odd, increasing");
            expect((window as any).expectedFormat).toBe("Enter a property (e.g., 'even', 'increasing')");
        });
    });
    describe("generateFunctionOperations", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateFunctionOperations();
            expect(mockDiv.innerHTML).toBe("");
        });
        it("generates composition question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type "composition"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1) // c=1
                .mockReturnValueOnce(0.1); // xVal=1
            generateFunctionOperations();
            expect(mockDiv.innerHTML).toContain("circ");
            expect((window as any).correctAnswer.correct).toBe("2");
            expect((window as any).expectedFormat).toBe("Enter a number");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates sum question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.4) // type "sum"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1); // c=1
            generateFunctionOperations();
            expect(mockDiv.innerHTML).toContain("f+g");
            expect((window as any).correctAnswer.correct).toContain("x^2");
            expect((window as any).expectedFormat).toBe("Enter as polynomial");
        });
    });
    describe("generateCircleEquations", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateCircleEquations();
            expect(mockDiv.innerHTML).toBe("");
        });
        it("generates standard form question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type "standard"
                .mockReturnValueOnce(0.1) // h=-4
                .mockReturnValueOnce(0.1) // k=-4
                .mockReturnValueOnce(0.1); // r=1
            generateCircleEquations();
            expect(mockDiv.innerHTML).toContain("circle");
            expect((window as any).correctAnswer.correct).toContain("(x + 4)");
            expect((window as any).correctAnswer.correct).toContain("(y + 4)");
            expect((window as any).expectedFormat).toBe("Enter as (x-h)^2 + (y-k)^2 = r^2");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates center_radius question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.4) // type "center_radius"
                .mockReturnValueOnce(0.1) // h=-4
                .mockReturnValueOnce(0.1) // k=-4
                .mockReturnValueOnce(0.1); // r=1
            generateCircleEquations();
            expect(mockDiv.innerHTML).toContain("center");
            expect((window as any).correctAnswer.correct).toContain("radius");
            expect((window as any).expectedFormat).toBe("Enter as 'center (h,k), radius r'");
        });
    });
    describe("generateSyntheticDivision", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateSyntheticDivision();
            expect(mockDiv.innerHTML).toBe("");
        });
        it("generates divide question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type "divide"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1) // c=1
                .mockReturnValueOnce(0.1); // d=1
            generateSyntheticDivision();
            expect(mockDiv.innerHTML).toContain("synthetic division");
            expect((window as any).correctAnswer.correct).toContain("x^2");
            expect((window as any).correctAnswer.correct).toContain("2x");
            expect((window as any).expectedFormat).toBe("Enter polynomial");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates remainder question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.4) // type "remainder"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1) // c=1
                .mockReturnValueOnce(0.1); // d=1
            generateSyntheticDivision();
            expect(mockDiv.innerHTML).toContain("Remainder Theorem");
            expect((window as any).correctAnswer.correct).toBe("3");
            expect((window as any).expectedFormat).toBe("Enter a number");
        });
    });
});
