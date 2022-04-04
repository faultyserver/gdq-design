import * as React from "react";
import classNames from "classnames";

import { getThemeClass, Theme, ThemeProvider } from "./ThemeProvider";

import styles from "./AppContainer.mod.css";

import "gdq-design/styles.css";

export interface AppContainerProps {
  theme?: Theme;
  children: React.ReactNode;
  className?: string;
}

export function AppContainer(props: AppContainerProps) {
  const { theme = Theme.DARK, children, className } = props;
  return (
    <ThemeProvider theme={theme}>
      <div className={classNames(getThemeClass(theme), styles.appContainer, className)}>
        {children}
      </div>
    </ThemeProvider>
  );
}
