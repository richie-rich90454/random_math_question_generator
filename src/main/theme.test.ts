/** @vitest-environment jsdom */
import {describe, it, expect, vi, beforeEach} from "vitest";
vi.mock('./settings', () => ({
    settings: { theme: 'light' },
    applyTheme: vi.fn(),
}));
import * as settingsModule from './settings';
import {initializeTheme} from "./theme";
describe('initializeTheme', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (settingsModule as any).settings.theme = 'light';
    });
    it('calls applyTheme with light when theme setting is light', async () => {
        (settingsModule as any).settings.theme = 'light';
        await initializeTheme();
        expect((settingsModule as any).applyTheme).toHaveBeenCalledWith('light');
    });
    it('calls applyTheme with dark when theme setting is dark', async () => {
        (settingsModule as any).settings.theme = 'dark';
        await initializeTheme();
        expect((settingsModule as any).applyTheme).toHaveBeenCalledWith('dark');
    });
    it('uses system preference when theme is system', async () => {
        (settingsModule as any).settings.theme = 'system';
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
        });
        await initializeTheme();
        expect((settingsModule as any).applyTheme).toHaveBeenCalledWith('light');
    });
    it('uses dark system preference when preferred', async () => {
        (settingsModule as any).settings.theme = 'system';
        window.matchMedia = vi.fn().mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
        });
        await initializeTheme();
        expect((settingsModule as any).applyTheme).toHaveBeenCalledWith('dark');
    });
    it('registers change listener when theme is system', async () => {
        (settingsModule as any).settings.theme = 'system';
        let addEventListenerMock = vi.fn();
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            addEventListener: addEventListenerMock,
        });
        await initializeTheme();
        expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
    });
});
