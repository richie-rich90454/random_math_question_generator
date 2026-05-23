/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
vi.mock('./dom', () => ({}));
vi.mock('./state', () => ({
    selectedTopic: null,
    currentMode: 'single',
    scope: 'simple',
    mentalScope: 'simple',
    setSelectedTopic: vi.fn(),
}));
vi.mock('./ui', () => ({
    updateUIState: vi.fn(),
}));
import * as dom from './dom';
import * as state from './state';
import * as ui from './ui';
import {topics, scopeTopics} from "./constants";
import {renderTopicGrid, selectTopic, pickRandomTopic} from "./topics";
describe('renderTopicGrid', () => {
    beforeEach(() => {
        (dom as any).topicGrid = document.createElement('div');
        (dom as any).topicSearch = document.createElement('input');
        (dom as any).currentTopicDisplay = document.createElement('div');
        (dom as any).generateQuestionButton = document.createElement('button');
        (state as any).selectedTopic = null;
        (state as any).currentMode = 'single';
        (state as any).scope = 'simple';
        (state as any).mentalScope = 'simple';
        vi.clearAllMocks();
        (state as any).setSelectedTopic = vi.fn((id: any) => {
            (state as any).selectedTopic = id;
        });
        (ui as any).updateUIState = vi.fn();
    });
    it('creates pill buttons for simple scope', () => {
        renderTopicGrid();
        let pills = (dom as any).topicGrid.querySelectorAll('.topic-pill');
        expect(pills.length).toBe(4);
    });
    it('filters by search term', () => {
        (dom as any).topicSearch.value = 'add';
        renderTopicGrid();
        let pills = (dom as any).topicGrid.querySelectorAll('.topic-pill');
        expect(pills.length).toBe(1);
    });
    it('returns early when topicGrid is null', () => {
        (dom as any).topicGrid = null;
        expect(() => renderTopicGrid()).not.toThrow();
    });
    it('selects first topic when none selected', () => {
        renderTopicGrid();
        expect((state as any).setSelectedTopic).toHaveBeenCalledWith('add');
    });
});
describe('selectTopic', () => {
    beforeEach(() => {
        (dom as any).currentTopicDisplay = document.createElement('div');
        (dom as any).generateQuestionButton = document.createElement('button');
        (state as any).setSelectedTopic = vi.fn();
        (ui as any).updateUIState = vi.fn();
        vi.clearAllMocks();
    });
    it('calls setSelectedTopic with topicId', () => {
        selectTopic('add');
        expect((state as any).setSelectedTopic).toHaveBeenCalledWith('add');
    });
    it('updates currentTopicDisplay with topic name', () => {
        selectTopic('add');
        expect((dom as any).currentTopicDisplay.textContent).toBe('Addition');
    });
    it('enables generate question button', () => {
        (dom as any).generateQuestionButton.disabled = true;
        selectTopic('add');
        expect((dom as any).generateQuestionButton.disabled).toBe(false);
    });
    it('calls updateUIState', () => {
        selectTopic('add');
        expect((ui as any).updateUIState).toHaveBeenCalled();
    });
});
describe('pickRandomTopic', () => {
    beforeEach(() => {
        (state as any).currentMode = 'single';
        (state as any).scope = 'simple';
    });
    it('returns a topic ID from current scope', () => {
        let result = pickRandomTopic();
        expect(result).not.toBeNull();
        expect(scopeTopics.simple).toContain(result);
    });
    it('falls back to simple scope for unknown scope', () => {
        (state as any).scope = 'unknown';
        let result = pickRandomTopic();
        expect(scopeTopics.simple).toContain(result);
    });
});
