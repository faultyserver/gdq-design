import classNames from "classnames";
import * as React from "react";

import styles from "./Button.mod.css";

const VARIANTS = {
  primary: styles.primary,
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  link: styles.link,
};

type ButtonVariant = keyof typeof VARIANTS;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button(props: ButtonProps) {
  const { variant = "default" } = props;

  return (
    <button {...props} className={classNames(styles.button, VARIANTS[variant], props.className)} />
  );
}
