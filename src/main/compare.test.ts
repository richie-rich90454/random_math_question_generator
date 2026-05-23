import {describe, it, expect} from "vitest";
import {
    convertLatex,
    sanitize,
    removeConstants,
    toDecimal,
    toTerms,
    tryEvaluate,
    compareExpressions,
    isAnswerCorrect,
} from "./compare";
describe('convertLatex', () => {
    it('converts \\frac{a}{b} to (a)/(b)', () => {
        expect(convertLatex('\\frac{1}{2}')).toBe('(1)/(2)');
    });
    it('converts \\sqrt{x} to sqrt(x)', () => {
        expect(convertLatex('\\sqrt{2}')).toBe('sqrt(2)');
    });
    it('converts \\sqrt[n]{x} to (x)^(1/(n))', () => {
        expect(convertLatex('\\sqrt[3]{8}')).toBe('(8)^(1/(3))');
    });
    it('converts angle brackets \\langle ... \\rangle to [...]', () => {
        expect(convertLatex('\\langle a, b \\rangle')).toBe('[a, b]');
    });
    it('converts matrix pmatrix to nested arrays', () => {
        let input='\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}';
        let expected='[[1,2],[3,4]]';
        expect(convertLatex(input)).toBe(expected);
    });
    it('strips backslash from \\sin making sin', () => {
        expect(convertLatex('\\sin(x)')).toBe('sin(x)');
    });
});
describe('sanitize', () => {
    it('removes whitespace and lowercases', () => {
        expect(sanitize('  X + Y  ')).toBe('x+y');
    });
    it('normalizes exponent notation', () => {
        expect(sanitize('x^{2}')).toBe('x^2');
    });
    it('converts ** to ^', () => {
        expect(sanitize('x**2')).toBe('x^2');
    });
    it('inserts implicit multiplication between digit and letter', () => {
        expect(sanitize('2x')).toBe('2*x');
    });
    it('converts ln to log', () => {
        expect(sanitize('ln(x)')).toBe('log(x)');
    });
    it('converts arcsin to asin', () => {
        expect(sanitize('arcsin(x)')).toBe('asin(x)');
    });
});
describe('removeConstants', () => {
    it('strips numeric constants leaving variables', () => {
        expect(removeConstants('x+5')).toBe('x');
    });
    it('preserves constant of integration C', () => {
        expect(removeConstants('x+C')).toBe('x+C');
    });
    it('removes integration constant k', () => {
        expect(removeConstants('x+k')).toBe('x');
    });
    it('returns original string if all terms are constant', () => {
        expect(removeConstants('5')).toBe('5');
    });
});
describe('toDecimal', () => {
    it('converts fraction to decimal', () => {
        expect(toDecimal('1/2')).toBe('0.5');
    });
});
describe('toTerms', () => {
    it('splits on +/- and sorts', () => {
        let result=toTerms('x+1');
        expect(result).toEqual(['1','x']);
    });
    it('handles subtraction by converting to +-', () => {
        let result=toTerms('x-1');
        expect(result).toEqual(['-1','x']);
    });
});
describe('tryEvaluate', () => {
    it('evaluates numeric expressions', () => {
        expect(tryEvaluate('2+3')).toBe(5);
    });
    it('returns null on evaluation failure', () => {
        expect(tryEvaluate('x+y')).toBeNull();
    });
});
describe('compareExpressions', () => {
    it('returns true for equal strings', () => {
        expect(compareExpressions('x+1','x+1')).toBe(true);
    });
    it('handles LaTeX equivalence', () => {
        expect(compareExpressions('\\frac{1}{2}','1/2')).toBe(true);
    });
    it('handles expressions differing by zero constant', () => {
        expect(compareExpressions('x+0','x')).toBe(true);
    });
    it('handles LaTeX sqrt equivalence', () => {
        expect(compareExpressions('\\sqrt{x}','sqrt(x)')).toBe(true);
    });
});
describe('isAnswerCorrect', () => {
    it('returns false for empty answer', () => {
        expect(isAnswerCorrect('','42')).toBe(false);
    });
    it('accepts equal numbers', () => {
        expect(isAnswerCorrect('42','42')).toBe(true);
    });
    it('rejects different numbers', () => {
        expect(isAnswerCorrect('42','43')).toBe(false);
    });
    it('accepts identical equations', () => {
        expect(isAnswerCorrect('x=5','x=5')).toBe(true);
    });
    it('accepts alternate answer', () => {
        expect(isAnswerCorrect('1/2','0.5','1/2')).toBe(true);
    });
    it('accepts fraction equal to decimal', () => {
        expect(isAnswerCorrect('0.5','1/2')).toBe(true);
    });
});
