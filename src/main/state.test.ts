import {vi, describe, it, expect} from "vitest";
vi.mock('./dom', () => ({
    modeSingleBtn: null,
    modeMentalBtn: null,
}));
import * as state from "./state";
describe('state setters', () => {
    it('setSelectedTopic updates selectedTopic', () => {
        state.setSelectedTopic('calculus-limits');
        expect(state.selectedTopic).toBe('calculus-limits');
    });
    it('setCurrentMode updates currentMode', () => {
        state.setCurrentMode('mental');
        expect(state.currentMode).toBe('mental');
    });
    it('setSessionActive updates sessionActive', () => {
        state.setSessionActive(true);
        expect(state.sessionActive).toBe(true);
    });
    it('setSessionPaused updates sessionPaused', () => {
        state.setSessionPaused(true);
        expect(state.sessionPaused).toBe(true);
    });
    it('setSessionScore updates sessionScore', () => {
        state.setSessionScore({correct:3,total:5});
        expect(state.sessionScore).toEqual({correct:3,total:5});
    });
    it('setTimeLeft updates timeLeft', () => {
        state.setTimeLeft(60);
        expect(state.timeLeft).toBe(60);
    });
    it('setMaxQuestions updates maxQuestions', () => {
        state.setMaxQuestions(10);
        expect(state.maxQuestions).toBe(10);
    });
    it('setCurrentDifficulty updates currentDifficulty', () => {
        state.setCurrentDifficulty('hard');
        expect(state.currentDifficulty).toBe('hard');
    });
    it('setAutocontinue updates autocontinue', () => {
        state.setAutocontinue(true);
        expect(state.autocontinue).toBe(true);
    });
    it('setScope updates scope', () => {
        state.setScope('calc');
        expect(state.scope).toBe('calc');
    });
    it('setShuffle updates shuffle', () => {
        state.setShuffle(true);
        expect(state.shuffle).toBe(true);
    });
    it('setMentalScope updates mentalScope', () => {
        state.setMentalScope('precalc');
        expect(state.mentalScope).toBe('precalc');
    });
    it('setMentalShuffle updates mentalShuffle', () => {
        state.setMentalShuffle(true);
        expect(state.mentalShuffle).toBe(true);
    });
    it('setUnlimitedMode updates unlimitedMode', () => {
        state.setUnlimitedMode(true);
        expect(state.unlimitedMode).toBe(true);
    });
    it('setTotalTimeSpent updates totalTimeSpent', () => {
        state.setTotalTimeSpent(42);
        expect(state.totalTimeSpent).toBe(42);
    });
    it('setAnsweredQuestionsCount updates answeredQuestionsCount', () => {
        state.setAnsweredQuestionsCount(7);
        expect(state.answeredQuestionsCount).toBe(7);
    });
});
