/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
vi.mock('./dom', () => ({}));
vi.mock('./state', () => ({}));
vi.mock('./ui', () => ({}));
vi.mock('./topics', () => ({}));
vi.mock('./questionGenerator', () => ({
    generateQuestion: vi.fn(),
}));
vi.mock('./mcq', () => ({
    generateChoicesForCurrentQuestion: vi.fn(),
}));
import * as dom from './dom';
import * as state from './state';
import * as ui from './ui';
import * as topics from './topics';
import {debounceGenerate, generateQuestion} from "./generation";
describe('generation', () => {
    beforeEach(() => {
        (dom as any).questionArea = document.createElement('div');
        (dom as any).userAnswer = document.createElement('textarea');
        (dom as any).answerResults = document.createElement('div');
        (dom as any).checkAnswerButton = document.createElement('button');
        (dom as any).expectedFormatDiv = document.createElement('div');
        (state as any).shuffle = false;
        (state as any).currentMode = 'single';
        (state as any).selectedTopic = null;
        (state as any).currentDifficulty = 'medium';
        (state as any).autoTimeout = null;
        (state as any).mcqMode = false;
        (state as any).generateDebounceTimeout = null;
        (state as any).setGenerateDebounceTimeout = vi.fn();
        (state as any).setAutoTimeout = vi.fn();
        (ui as any).showNotification = vi.fn();
        (ui as any).updatePreview = vi.fn();
        (ui as any).updateUIState = vi.fn();
        (topics as any).pickRandomTopic = vi.fn();
        (topics as any).selectTopic = vi.fn();
        window.hasQuestion = false;
        vi.clearAllMocks();
    });
    describe('debounceGenerate', () => {
        it('debounces and calls generateQuestion after 150ms', () => {
            vi.useFakeTimers();
            debounceGenerate();
            expect((state as any).setGenerateDebounceTimeout).toHaveBeenCalled();
            vi.advanceTimersByTime(150);
            expect((state as any).setGenerateDebounceTimeout).toHaveBeenLastCalledWith(null);
            vi.useRealTimers();
        });
    });
    describe('generateQuestion', () => {
        it('shows warning when no topic selected', () => {
            generateQuestion();
            expect((ui as any).showNotification).toHaveBeenCalledWith('Please select a topic first', 'warning');
        });
        it('returns early when shuffle picks null topic', () => {
            (state as any).shuffle = true;
            (state as any).selectedTopic = 'add';
            (topics as any).pickRandomTopic.mockReturnValue(null);
            generateQuestion();
            expect((ui as any).showNotification).toHaveBeenCalledWith('No topics available in current scope', 'warning');
            expect((state as any).selectedTopic).toBe('add');
        });
        it('picks random topic when shuffle is on', () => {
            (state as any).shuffle = true;
            (state as any).selectedTopic = 'add';
            (topics as any).pickRandomTopic.mockReturnValue('mult');
            generateQuestion();
            expect((topics as any).selectTopic).toHaveBeenCalledWith('mult');
        });
        it('returns early when required dom elements are null', () => {
            (state as any).selectedTopic = 'add';
            (dom as any).questionArea = null;
            generateQuestion();
            expect(window.hasQuestion).toBeFalsy();
        });
        it('sets hasQuestion on success', () => {
            (state as any).selectedTopic = 'add';
            generateQuestion();
            expect(window.hasQuestion).toBe(true);
            expect((dom as any).checkAnswerButton.disabled).toBe(false);
            expect((dom as any).userAnswer.disabled).toBe(false);
            expect((ui as any).updatePreview).toHaveBeenCalled();
            expect((ui as any).updateUIState).toHaveBeenCalled();
        });
    });
});
