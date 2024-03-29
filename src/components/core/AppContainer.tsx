import * as React from "react";
import classNames from "classnames";

import { Layers } from "../layers/Layers";
import { getThemeClass, Accent, Theme, ThemeProvider, ThemeContext } from "./ThemeProvider";

import styles from "./AppContainer.mod.css";

import "gdq-design/styles.css";

interface AppInnerProps {
  children: React.ReactNode;
  className?: string;
}

function AppInner(props: AppInnerProps) {
  const { children, className } = props;
  const { theme, accent } = React.useContext(ThemeContext);

  return (
    <div className={classNames(getThemeClass(theme, accent), styles.appContainer)}>
      <div className={className}>{children}</div>
      <Layers />
    </div>
  );
}

export interface AppContainerProps {
  theme?: Theme;
  accent?: Accent;
  children: React.ReactNode;
  className?: string;
}

export function AppContainer(props: AppContainerProps) {
  const { theme, accent, children, className } = props;
  return (
    <ThemeProvider theme={theme} accent={accent}>
      <AppInner className={className}>{children}</AppInner>
    </ThemeProvider>
  );
}
