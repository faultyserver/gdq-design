import * as React from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export enum Accent {
  BLUE = "blue",
  PURPLE = "purple",
  PINK = "pink",
}

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: Theme.DARK,
  accent: Accent.PINK,
});

export function getThemeClass(theme: Theme, accent: Accent = Accent.BLUE): string {
  return `theme-${theme} accent-${accent}`;
}

export function useThemeClass(): string {
  const { theme, accent } = React.useContext(ThemeContext);

  return getThemeClass(theme, accent);
}

interface ThemeProviderProps {
  theme: Theme;
  accent: Accent;
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { theme, accent, children } = props;

  const contextValue = React.useMemo(() => ({ theme, accent }), [theme, accent]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
