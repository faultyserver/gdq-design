import * as React from "react";
import classNames from "classnames";

import { getThemeClass, Accent, Theme, ThemeProvider } from "./ThemeProvider";

import styles from "./AppContainer.mod.css";

import "gdq-design/styles.css";

export interface AppContainerProps {
  theme: Theme;
  accent: Accent;
  children: React.ReactNode;
  className?: string;
}

export function AppContainer(props: AppContainerProps) {
  const { theme, accent, children, className } = props;
  return (
    <ThemeProvider theme={theme} accent={accent}>
      <div className={classNames(getThemeClass(theme, accent), styles.appContainer, className)}>
        {children}
      </div>
    </ThemeProvider>
  );
}
