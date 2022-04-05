import classNames from "classnames";
import * as React from "react";

import styles from "./Stack.mod.css";

const STACK_SPACES = {
  "space-none": styles["space-none"],
  "space-xs": styles["space-xs"],
  "space-sm": styles["space-sm"],
  "space-md": styles["space-md"],
  "space-lg": styles["space-lg"],
  "space-xl": styles["space-xl"],
};

const DIRECTION_CLASSES = {
  horizontal: styles["horizontal"],
  vertical: styles["vertical"],
  "reverse-horizontal": styles["reverse-horizontal"],
  "reverse-vertical": styles["reverse-vertical"],
};

export type Spacing = keyof typeof STACK_SPACES;
export type StackDirection = keyof typeof DIRECTION_CLASSES;

export interface StackProps {
  spacing?: Spacing;
  direction?: StackDirection;
  stretch?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Stack(props: StackProps) {
  const {
    spacing = "space-md",
    direction = "vertical",
    stretch = false,
    children,
    className,
  } = props;

  return (
    <div
      className={classNames(
        styles.stack,
        STACK_SPACES[spacing],
        DIRECTION_CLASSES[direction],
        className,
        { [styles.stretch]: stretch },
      )}
    >
      {children}
    </div>
  );
}

export interface SpacerProps {
  size?: Spacing;
}

export function Spacer(props: SpacerProps) {
  const { size = "space-none" } = props;

  return <div className={classNames(styles.spacer, STACK_SPACES[size])} />;
}
