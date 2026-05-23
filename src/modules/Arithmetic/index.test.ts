/** @vitest-environment jsdom */
import {describe, it, expect, beforeEach, vi} from "vitest";
import * as Arithmetic from "./index";
import {questionArea} from "../../script.js";
import {getRangeForDifficulty} from "./arithmeticUtils.js";
vi.mock("../../script.js", ()=>({
	questionArea: null as HTMLElement|null
}));
vi.mock("./arithmeticUtils.js", ()=>({
	getRangeForDifficulty: vi.fn(()=>({min: 1, max: 50}))
}));
describe("Arithmetic generators", ()=>{
	let mockDiv: HTMLDivElement;
	beforeEach(()=>{
		mockDiv=document.createElement("div");
		(questionArea as any)=mockDiv;
		window.correctAnswer={correct: "", alternate: "", display: ""};
		window.expectedFormat="";
		(window as any).MathJax={typeset: vi.fn()};
	});
	it("returns early if questionArea is null", ()=>{
		(questionArea as any)=null;
		Arithmetic.generateAddition("medium");
		expect(mockDiv.innerHTML).toBe("");
		expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
		expect(window.expectedFormat).toBe("");
	});
	it("generateAddition creates question", ()=>{
		Arithmetic.generateAddition("medium");
		expect(window.correctAnswer.correct).toBeTruthy();
		expect(window.correctAnswer.alternate).toBeTruthy();
		expect(window.correctAnswer.display).toBeTruthy();
		expect(window.correctAnswer.choices).toBeDefined();
		expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
		expect(window.expectedFormat).toBe("Enter a number (up to 3 decimals)");
		expect(mockDiv.innerHTML).toMatch(/\$/);
		expect((window as any).MathJax.typeset).toHaveBeenCalled();
	});
	it("generateSubtraction creates question", ()=>{
		Arithmetic.generateSubtraction("medium");
		expect(window.correctAnswer.correct).toBeTruthy();
		expect(window.correctAnswer.alternate).toBeTruthy();
		expect(window.correctAnswer.display).toBeTruthy();
		expect(window.correctAnswer.choices).toBeDefined();
		expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
		expect(window.expectedFormat).toBe("Enter a number (up to 3 decimals)");
		expect(mockDiv.innerHTML).toMatch(/\$/);
		expect((window as any).MathJax.typeset).toHaveBeenCalled();
	});
	it("generateMultiplication creates question", ()=>{
		Arithmetic.generateMultiplication("medium");
		expect(window.correctAnswer.correct).toBeTruthy();
		expect(window.correctAnswer.alternate).toBeTruthy();
		expect(window.correctAnswer.display).toBeTruthy();
		expect(window.correctAnswer.choices).toBeDefined();
		expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
		expect(window.expectedFormat).toBe("Enter a number rounded to 2 decimal places");
		expect(mockDiv.innerHTML).toMatch(/\$/);
		expect((window as any).MathJax.typeset).toHaveBeenCalled();
	});
	it("generateDivision creates question", ()=>{
		Arithmetic.generateDivision("medium");
		expect(window.correctAnswer.correct).toBeTruthy();
		expect(window.correctAnswer.alternate).toBeTruthy();
		expect(window.correctAnswer.display).toBeTruthy();
		expect(window.correctAnswer.choices).toBeDefined();
		expect(window.correctAnswer.choices!.length).toBeGreaterThanOrEqual(1);
		expect(window.expectedFormat).toBe("Enter a number rounded to 2 decimal places");
		expect(mockDiv.innerHTML).toMatch(/\$/);
		expect((window as any).MathJax.typeset).toHaveBeenCalled();
	});
	it("calls getRangeForDifficulty with provided difficulty", ()=>{
		const mockGetRange=vi.mocked(getRangeForDifficulty);
		mockGetRange.mockClear();
		mockGetRange.mockReturnValueOnce({min: 10, max: 20});
		Arithmetic.generateAddition("hard");
		expect(mockGetRange).toHaveBeenCalledWith("hard");
	});
	it("does not call MathJax.typeset if MathJax is missing", ()=>{
		delete (window as any).MathJax;
		Arithmetic.generateAddition("medium");
		expect((window as any).MathJax).toBeUndefined();
	});
});
