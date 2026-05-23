/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, vi} from "vitest";
vi.mock("../../script.js", ()=>({
    questionArea: null as HTMLDivElement | null,
}));
vi.mock("./algebraUtils.js", ()=>({
    getMaxForDifficulty: vi.fn(()=>5),
    getOrdinal: vi.fn(()=>"th"),
    factorial: vi.fn(()=>1),
    gcd: vi.fn(()=>1),
}));
describe("Algebra barrel index", ()=>{
    it("re-exports all algebraUtils functions", async ()=>{
        const mod=await import("./index.js");
        expect(typeof mod.getMaxForDifficulty).toBe("function");
        expect(typeof mod.getOrdinal).toBe("function");
        expect(typeof mod.factorial).toBe("function");
        expect(typeof mod.gcd).toBe("function");
    });
    it("re-exports algebraBasics generators", async ()=>{
        const mod=await import("./index.js");
        expect(typeof mod.generateFraction).toBe("function");
        expect(typeof mod.generatePercent).toBe("function");
        expect(typeof mod.generateRatioProportion).toBe("function");
        expect(typeof mod.generateUnitConversion).toBe("function");
        expect(typeof mod.generateExpressionEvaluation).toBe("function");
        expect(typeof mod.generateNumberSets).toBe("function");
        expect(typeof mod.generateProperties).toBe("function");
        expect(typeof mod.generateOrderOfOperations).toBe("function");
    });
    it("re-exports algebraAdvanced generators", async ()=>{
        const mod=await import("./index.js");
        expect(typeof mod.generateComplex).toBe("function");
        expect(typeof mod.generateExponent).toBe("function");
        expect(typeof mod.generateExponentRules).toBe("function");
        expect(typeof mod.generateFactorial).toBe("function");
        expect(typeof mod.generateLinearWordProblem).toBe("function");
        expect(typeof mod.generateLogarithm).toBe("function");
        expect(typeof mod.generateRadicalEquation).toBe("function");
        expect(typeof mod.generateRadicalSimplify).toBe("function");
        expect(typeof mod.generateRationalExponents).toBe("function");
        expect(typeof mod.generateRoot).toBe("function");
        expect(typeof mod.generateScientificNotation).toBe("function");
        expect(typeof mod.generateSeries).toBe("function");
        expect(typeof mod.generateVariation).toBe("function");
    });
    it("re-exports algebraEquations generators", async ()=>{
        const mod=await import("./index.js");
        expect(typeof mod.generateLinearEquation).toBe("function");
        expect(typeof mod.generateQuadraticEquation).toBe("function");
        expect(typeof mod.generateLinearInequality).toBe("function");
        expect(typeof mod.generateQuadraticInequality).toBe("function");
        expect(typeof mod.generateRationalInequality).toBe("function");
        expect(typeof mod.generateSystem2x2).toBe("function");
        expect(typeof mod.generateSystem3x3).toBe("function");
    });
    it("re-exports algebraGraphingPolynomials generators", async ()=>{
        const mod=await import("./index.js");
        expect(typeof mod.generatePolynomial).toBe("function");
        expect(typeof mod.generatePolynomialDivision).toBe("function");
        expect(typeof mod.generateFactoring).toBe("function");
        expect(typeof mod.generateFunctionConcepts).toBe("function");
        expect(typeof mod.generateLinearGraphing).toBe("function");
        expect(typeof mod.generateNonLinearGraphing).toBe("function");
    });
    it("re-exports algebraInPrecalculus generators", async ()=>{
        const mod=await import("./index.js");
        expect(typeof mod.generateRealNumberOperations).toBe("function");
        expect(typeof mod.generateCartesianConcepts).toBe("function");
        expect(typeof mod.generateCircleEquations).toBe("function");
        expect(typeof mod.generateLinearEquationSpecial).toBe("function");
        expect(typeof mod.generateRationalEquation).toBe("function");
        expect(typeof mod.generatePolynomialInequality).toBe("function");
        expect(typeof mod.generateFunctionProperties).toBe("function");
        expect(typeof mod.generateBasicFunctions).toBe("function");
        expect(typeof mod.generateFunctionOperations).toBe("function");
        expect(typeof mod.generateInverseFunctions).toBe("function");
        expect(typeof mod.generateTransformations).toBe("function");
        expect(typeof mod.generatePowerFunctionModeling).toBe("function");
        expect(typeof mod.generatePolynomialEndBehavior).toBe("function");
        expect(typeof mod.generateSyntheticDivision).toBe("function");
        expect(typeof mod.generateComplexZeros).toBe("function");
        expect(typeof mod.generateRationalGraphAnalysis).toBe("function");
        expect(typeof mod.generateLogisticFunctions).toBe("function");
        expect(typeof mod.generateExponentialModeling).toBe("function");
        expect(typeof mod.generateLogarithmicModeling).toBe("function");
        expect(typeof mod.generateFinance).toBe("function");
    });
});
