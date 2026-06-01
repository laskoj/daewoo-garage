import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

type ThemeStore = {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themeMode: 'light',
  isDarkMode: false,

  toggleTheme: () =>
    set((state) => {
      const nextMode: ThemeMode = state.themeMode === 'light' ? 'dark' : 'light';

      return {
        themeMode: nextMode,
        isDarkMode: nextMode === 'dark',
      };
    }),

  setThemeMode: (mode) =>
    set({
      themeMode: mode,
      isDarkMode: mode === 'dark',
    }),
}));
