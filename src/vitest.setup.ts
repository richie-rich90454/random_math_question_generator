import {vi} from "vitest";
vi.stubGlobal('MathJax', {
    typesetPromise: vi.fn().mockResolvedValue(undefined),
    typeset: vi.fn(),
});
vi.stubGlobal('katex', {
    render: vi.fn(),
    renderToString: vi.fn((s: string) => s),
});
vi.stubGlobal('correctAnswer', { correct: '', alternate: '', display: '' });
vi.stubGlobal('hasQuestion', false);
vi.stubGlobal('expectedFormat', '');
