import * as React from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: Theme.DARK,
});

export function getThemeClass(theme: Theme): string {
  return `theme-${theme}`;
}

export function useThemeClass(): string {
  const { theme } = React.useContext(ThemeContext);

  return getThemeClass(theme);
}

interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { theme, children } = props;

  const contextValue = React.useMemo(() => ({ theme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
