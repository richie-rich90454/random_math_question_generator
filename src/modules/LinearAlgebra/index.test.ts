/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
import {generateMatrix, generateVector, generateSystem3x3, generateVector3D, getRange} from "./index.js";
import {questionArea} from "../../script.js";
vi.mock("../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("./linearAlgebraUtils.js", ()=>({
    getRange: vi.fn(()=>5),
    matrixToString: vi.fn(()=>"\\begin{bmatrix}1 & 2 \\\\ 3 & 4\\end{bmatrix}"),
}));
describe("Linear Algebra generators", ()=>{
    let mockDiv: HTMLDivElement;
    beforeEach(()=>{
        mockDiv=document.createElement("div");
        (questionArea as any)=mockDiv;
        window.correctAnswer={correct: "", alternate: "", display: ""};
        window.expectedFormat="";
        (window as any).MathJax={typesetPromise: vi.fn(()=>Promise.resolve())};
    });
    it("returns early if questionArea is null for generateMatrix", ()=>{
        (questionArea as any)=null;
        generateMatrix("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateVector", ()=>{
        (questionArea as any)=null;
        generateVector("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateSystem3x3", ()=>{
        (questionArea as any)=null;
        generateSystem3x3("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateVector3D", ()=>{
        (questionArea as any)=null;
        generateVector3D("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("generateMatrix creates question with medium difficulty", ()=>{
        generateMatrix("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateVector creates question with medium difficulty", ()=>{
        generateVector("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateSystem3x3 creates question with medium difficulty", ()=>{
        generateSystem3x3("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("generateVector3D creates question with medium difficulty", ()=>{
        generateVector3D("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.correctAnswer.choices).toBeDefined();
        expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
        expect((window as any).MathJax.typesetPromise).toHaveBeenCalled();
    });
    it("does not call MathJax.typesetPromise if MathJax is missing", ()=>{
        vi.mocked(getRange).mockReturnValue(5);
        delete (window as any).MathJax;
        generateMatrix("medium");
        expect((window as any).MathJax).toBeUndefined();
    });
    it("uses getRange with provided difficulty", ()=>{
        let mockGetRange=vi.mocked(getRange);
        mockGetRange.mockClear();
        mockGetRange.mockReturnValueOnce(10);
        generateMatrix("hard");
        expect(mockGetRange).toHaveBeenCalledWith("hard");
    });
});
