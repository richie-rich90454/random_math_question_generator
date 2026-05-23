/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
import {generatePermutation, generateProbability, generateStatistics, generateArithmeticSequence, getMaxN, factorial, nPr, nCr} from "./index.js";
import {questionArea} from "../../script.js";
vi.mock("../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("./discreteUtils.js", ()=>({
    getMaxN: vi.fn(()=>10),
    factorial: vi.fn((n: number)=>{
        if (n<0) return NaN;
        let res=1;
        for (let i=2; i<=n; i++) res*=i;
        return res;
    }),
    nPr: vi.fn((n: number, r: number)=>r>n?0:(()=>{let f=1;for(let i=n;i>n-r;i--)f*=i;return f;})()),
    nCr: vi.fn((n: number, r: number)=>r>n?0:(()=>{let f=1;for(let i=1;i<=r;i++)f=f*(n-r+i)/i;return f;})()),
    getOrdinal: vi.fn(()=>"th"),
    getDataRange: vi.fn(()=>({min:1, max:50, count:10})),
    mean: vi.fn((data: number[])=>data.reduce((a,b)=>a+b,0)/data.length),
    median: vi.fn((data: number[])=>{
        let sorted=[...data].sort((a,b)=>a-b);
        let mid=Math.floor(sorted.length/2);
        return sorted.length%2!==0?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;
    }),
    mode: vi.fn((data: number[])=>{
        let freq: Record<number,number>={};
        data.forEach(v=>freq[v]=(freq[v]||0)+1);
        let maxFreq=Math.max(...Object.values(freq));
        return Object.keys(freq).filter(k=>freq[+k]===maxFreq).map(Number);
    }),
    range: vi.fn((data: number[])=>Math.max(...data)-Math.min(...data)),
    stdDev: vi.fn((data: number[])=>{
        let m=data.reduce((a,b)=>a+b,0)/data.length;
        return Math.sqrt(data.reduce((sq,v)=>sq+(v-m)**2,0)/data.length);
    }),
}));
describe("Discrete Mathematics generators", ()=>{
    let mockDiv: HTMLDivElement;
    beforeEach(()=>{
        mockDiv=document.createElement("div");
        (questionArea as any)=mockDiv;
        window.correctAnswer={correct: "", alternate: "", display: ""};
        window.expectedFormat="";
        (window as any).MathJax={typeset: vi.fn(), typesetPromise: vi.fn(()=>Promise.resolve())};
    });
    it("returns early if questionArea is null for generatePermutation", ()=>{
        (questionArea as any)=null;
        generatePermutation("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateProbability", ()=>{
        (questionArea as any)=null;
        generateProbability("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateStatistics", ()=>{
        (questionArea as any)=null;
        generateStatistics("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("returns early if questionArea is null for generateArithmeticSequence", ()=>{
        (questionArea as any)=null;
        generateArithmeticSequence("medium");
        expect(mockDiv.innerHTML).toBe("");
        expect(window.correctAnswer).toEqual({correct: "", alternate: "", display: ""});
    });
    it("generatePermutation creates question with medium difficulty", ()=>{
        generatePermutation("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(typeof window.correctAnswer.correct).toBe("string");
        expect(window.correctAnswer.correct.length).toBeGreaterThan(0);
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
    });
    it("generateProbability creates question with medium difficulty", ()=>{
        generateProbability("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(typeof window.correctAnswer.correct).toBe("string");
        expect(window.correctAnswer.correct.length).toBeGreaterThan(0);
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
    });
    it("generateStatistics creates question with medium difficulty", ()=>{
        generateStatistics("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(typeof window.correctAnswer.correct).toBe("string");
        expect(window.correctAnswer.correct.length).toBeGreaterThan(0);
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
    });
    it("generateArithmeticSequence creates question with medium difficulty", ()=>{
        generateArithmeticSequence("medium");
        expect(window.correctAnswer.correct).toBeTruthy();
        expect(typeof window.correctAnswer.correct).toBe("string");
        expect(window.correctAnswer.correct.length).toBeGreaterThan(0);
        expect(window.correctAnswer.alternate).toBeTruthy();
        expect(window.correctAnswer.display).toBeTruthy();
        expect(window.expectedFormat).toBeTruthy();
        expect(mockDiv.innerHTML.length).toBeGreaterThan(0);
    });
    it("does not call MathJax if MathJax is missing", ()=>{
        delete (window as any).MathJax;
        generatePermutation("medium");
        expect((window as any).MathJax).toBeUndefined();
    });
    it("utility functions are exported", ()=>{
        expect(typeof getMaxN).toBe("function");
        expect(typeof factorial).toBe("function");
        expect(typeof nPr).toBe("function");
        expect(typeof nCr).toBe("function");
    });
});
