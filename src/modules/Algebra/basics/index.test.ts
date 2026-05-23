/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, beforeEach, afterEach, vi} from "vitest";
import {generateExpressionEvaluation} from "./generateExpressionEvaluation.js";
import {generateOrderOfOperations} from "./generateOrderOfOperations.js";
import {generateRatioProportion} from "./generateRatioProportion.js";
import {generateFraction} from "./generateFraction.js";
import {questionArea} from "../../../script.js";
vi.mock("../../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("../algebraUtils.js", ()=>{
    function gcd(a: number, b: number): number{
        return b===0?Math.abs(a):gcd(b,a%b);
    }
    return{
        gcd,
        getMaxForDifficulty: vi.fn(()=>5),
    };
});
describe("Algebra basics generators", ()=>{
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
    describe("generateExpressionEvaluation", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateExpressionEvaluation();
            expect(mockDiv.innerHTML).toBe("");
            expect((window as any).correctAnswer).toEqual({correct:'',alternate:'',display:''});
            expect((window as any).expectedFormat).toBe('');
        });
        it("generates linear expression question with correct answer", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type index 0 => "linear"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1); // x=1
            generateExpressionEvaluation();
            expect(mockDiv.innerHTML).toContain("1x + 1");
            expect(mockDiv.innerHTML).toContain("x=1");
            expect((window as any).correctAnswer).toEqual(expect.objectContaining({
                correct:"2",
                alternate:"2",
                display:"2",
            }));
            expect((window as any).expectedFormat).toBe("Enter a number");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates quadratic expression question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.4) // type index 1 => "quadratic"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1); // x=1
            generateExpressionEvaluation();
            expect(mockDiv.innerHTML).toContain("x^2");
            expect((window as any).correctAnswer.correct).toBe("3");
            expect((window as any).expectedFormat).toBe("Enter a number");
        });
    });
    describe("generateOrderOfOperations", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateOrderOfOperations();
            expect(mockDiv.innerHTML).toBe("");
        });
        it("generates basic order of operations question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type "basic"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1); // c=1
            generateOrderOfOperations();
            expect(mockDiv.innerHTML).toContain("1 + 1");
            expect((window as any).correctAnswer.correct).toBe("2");
            expect((window as any).expectedFormat).toBe("Enter a number");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates with_parentheses type", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.7) // type "with_parentheses"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1) // b=1
                .mockReturnValueOnce(0.1); // c=1
            generateOrderOfOperations();
            expect(mockDiv.innerHTML).toContain("(");
            expect((window as any).correctAnswer.correct).toBe("2");
        });
    });
    describe("generateRatioProportion", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateRatioProportion();
            expect(mockDiv.innerHTML).toBe("");
        });
        it("generates ratio simplification question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type "ratio"
                .mockReturnValueOnce(0.1) // a=1
                .mockReturnValueOnce(0.1); // b=1
            generateRatioProportion();
            expect(mockDiv.innerHTML).toContain("1:1");
            expect((window as any).correctAnswer.correct).toBe("1:1");
            expect((window as any).expectedFormat).toBe("Enter a number or ratio like 2:3");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates proportion question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.3) // type "proportion"
                .mockReturnValueOnce(0.1) // a=2
                .mockReturnValueOnce(0.1) // b=2
                .mockReturnValueOnce(0.1) // c=5
                .mockReturnValueOnce(0.1); // x unused in code but consumed by random
            generateRatioProportion();
            expect(mockDiv.innerHTML).toContain("frac");
            expect((window as any).correctAnswer).toBeDefined();
        });
    });
    describe("generateFraction", ()=>{
        it("returns early if questionArea is null", ()=>{
            (questionArea as any)=null;
            generateFraction();
            expect(mockDiv.innerHTML).toBe("");
        });
        it("generates fraction addition question with simplified answer", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.1) // type "add"
                .mockReturnValueOnce(0.1) // num1=1
                .mockReturnValueOnce(0.5) // den1=4
                .mockReturnValueOnce(0.1) // num2=1
                .mockReturnValueOnce(0.5); // den2=4
            generateFraction();
            expect(mockDiv.innerHTML).toContain("frac{1}{4}");
            expect((window as any).correctAnswer.correct).toBe("1/2");
            expect((window as any).expectedFormat).toBe("Enter a fraction in simplest form like 3/4");
            expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
        });
        it("generates fraction multiply question", ()=>{
            Math.random=vi.fn()
                .mockReturnValueOnce(0.4) // type "multiply" (floor(0.4*6)=2)
                .mockReturnValueOnce(0.1) // num1=1
                .mockReturnValueOnce(0.1) // den1=2
                .mockReturnValueOnce(0.1) // num2=1
                .mockReturnValueOnce(0.1); // den2=2
            generateFraction();
            expect(mockDiv.innerHTML).toContain("times");
            expect((window as any).correctAnswer).toBeDefined();
            expect((window as any).expectedFormat).toBe("Enter a fraction in simplest form like 3/4");
        });
    });
});
