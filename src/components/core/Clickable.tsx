import * as React from "react";

type InteractiveARIARole =
  | "button"
  | "gridcell"
  | "link"
  | "listitem"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "option"
  | "radio"
  | "switch"
  | "tab"
  | "treeitem";

export interface ClickableProps {
  tag?: "div" | "span" | "label" | "a";
  role?: InteractiveARIARole;
  tabIndex?: -1 | 0;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
  htmlFor?: string;
}

export function Clickable(props: ClickableProps) {
  const {
    tag: Tag = "div",
    role = "button",
    tabIndex = 0,
    children,
    className,
    onClick,
    ...extraProps
  } = props;

  const ref = React.useRef<HTMLElement>(null);

  function handleKeyDown(event: React.KeyboardEvent) {
    const element = ref.current;
    if (element == null) return;

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      element.click();
    }
  }

  return (
    <Tag
      // The dynamic Tag here makes TypeScript think this should be a LegacyRef when it's all the same
      // as the normal MutableRefObject from `useRef`.
      // @ts-expect-error
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...extraProps}
    >
      {children}
    </Tag>
  );
}
