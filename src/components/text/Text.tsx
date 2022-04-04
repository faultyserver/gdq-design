import * as React from "react";
import classNames from "classnames";

import styles from "./Text.mod.css";

const VARIANTS = {
  "header-xs": styles["header-xs"],
  "header-sm": styles["header-sm"],
  "header-md": styles["header-md"],
  "header-lg": styles["header-lg"],
  "header-xl": styles["header-xl"],
  "header-xxl": styles["header-xxl"],
  "text-xs": styles["text-xs"],
  "text-sm": styles["text-sm"],
  "text-md": styles["text-md"],
  "text-lg": styles["text-lg"],
};

export type TextVariant = keyof typeof VARIANTS;

export interface TextProps {
  tag?: "div" | "span" | "label" | "p";
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

export function Text(props: TextProps) {
  const { tag: Tag = "div", variant = "text-md", children, className } = props;

  return <Tag className={classNames(styles.text, VARIANTS[variant], className)}>{children}</Tag>;
}

export interface HeaderProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: TextVariant;
  uppercase?: boolean;
  withMargin?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const {
    tag: Tag,
    variant = "header-lg",
    uppercase = false,
    withMargin = false,
    children,
    className,
  } = props;

  return (
    <Tag
      className={classNames(styles.header, VARIANTS[variant], className, {
        [styles.uppercase]: uppercase,
        [styles.withMargin]: withMargin,
      })}
    >
      {children}
    </Tag>
  );
}
