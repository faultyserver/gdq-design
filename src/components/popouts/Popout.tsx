import * as React from "react";

import styles from "./Popout.mod.css";

type PopoutAttachPosition = "left" | "right" | "top" | "bottom";
type PopoutAlignPosition = "start" | "middle" | "end";

type PositionProperties = { top: number; left: number };

function getVerticalPosition(targetRect: DOMRect, height: number, align: PopoutAlignPosition) {
  switch (align) {
    case "start":
      return { top: targetRect.top };
    case "middle":
      return { top: targetRect.top + (targetRect.height - height) / 2 };
    case "end":
      return { top: targetRect.top + targetRect.height - height };
  }
}

function getHorizontalPosition(targetRect: DOMRect, width: number, align: PopoutAlignPosition) {
  switch (align) {
    case "start":
      return { left: targetRect.left };
    case "middle":
      return { left: targetRect.left + (targetRect.width - width) / 2 };
    case "end":
      return { left: targetRect.left + targetRect.width - width };
  }
}

function getPositionProperties(
  targetRect: DOMRect,
  contentRect: DOMRect,
  attach: PopoutAttachPosition,
  align: PopoutAlignPosition,
  offset: number,
): PositionProperties {
  switch (attach) {
    case "left":
      return {
        ...getVerticalPosition(targetRect, contentRect.height, align),
        left: targetRect.left - contentRect.width - offset,
      };
    case "right":
      return {
        ...getVerticalPosition(targetRect, contentRect.height, align),
        left: targetRect.left + targetRect.width + offset,
      };
    case "top":
      return {
        ...getHorizontalPosition(targetRect, contentRect.width, align),
        top: targetRect.top - contentRect.height - offset,
      };
    case "bottom":
      return {
        ...getHorizontalPosition(targetRect, contentRect.width, align),
        top: targetRect.bottom + offset,
      };
  }
}

function getBounds(offset: number) {
  return {
    top: offset,
    right: window.innerWidth - offset,
    bottom: window.innerHeight - offset,
    left: offset,
  };
}

/**
 * Find the best-fitting `attach` value that fits the content in the viewport,
 * trying to stay as similar as possible to the requested position.
 * Returns both the resolved `attach` value and the position styles for that
 * attachment.
 */
function getAttachedPosition(
  targetRect: DOMRect,
  contentRect: DOMRect,
  attach: PopoutAttachPosition,
  align: PopoutAlignPosition,
  offset: number,
): [PopoutAttachPosition, PositionProperties] {
  const bounds = getBounds(offset);
  function fitsBounds(position: PositionProperties, direction: PopoutAttachPosition) {
    switch (direction) {
      case "left":
        return position.left > bounds.left;
      case "right":
        return position.left + contentRect.width < bounds.right;
      case "top":
        return position.top > bounds.top;
      case "bottom":
        return position.top + contentRect.height < bounds.bottom;
    }
  }

  function invertTo(newAttach: PopoutAttachPosition) {
    return getPositionProperties(targetRect, contentRect, newAttach, align, offset);
  }

  function getFirstFittingAttachment(
    attachments: PopoutAttachPosition[],
  ): [PopoutAttachPosition, PositionProperties] {
    for (let i = 0; i < attachments.length; i++) {
      const direction = attachments[i];
      const position = invertTo(direction);
      if (fitsBounds(position, direction)) return [direction, position];
    }

    return [attachments[0], invertTo(attachments[0])];
  }

  switch (attach) {
    case "left":
      return getFirstFittingAttachment(["left", "right", "bottom", "top"]);
    case "right":
      return getFirstFittingAttachment(["right", "left", "bottom", "top"]);
    case "top":
      return getFirstFittingAttachment(["top", "bottom", "right", "left"]);
    case "bottom":
      return getFirstFittingAttachment(["bottom", "top", "right", "left"]);
  }
}

/**
 * Adjust the inline position (e.g. vertical position when attached `left`) to
 * try to fit the content within the viewport.
 */
function nudgeAlignment(
  contentRect: DOMRect,
  position: PositionProperties,
  attach: PopoutAttachPosition,
  offset: number,
): PositionProperties {
  const bounds = getBounds(offset);

  switch (attach) {
    case "left":
    case "right":
      if (position.top < bounds.top) return { ...position, top: bounds.top };
      if (position.top + contentRect.height > bounds.bottom)
        return { ...position, top: bounds.bottom - contentRect.height };
      return position;
    case "top":
    case "bottom":
      if (position.left < bounds.left) return { ...position, left: bounds.left };
      if (position.left + contentRect.width > bounds.right)
        return { ...position, left: bounds.right - contentRect.width };
      return position;
  }
}

export interface PopoutRenderProps {
  onClose: () => unknown;
}

export interface PopoutProps {
  render: (props: PopoutRenderProps) => React.ReactNode;
  target: Element;
  attach?: PopoutAttachPosition;
  align?: PopoutAlignPosition;
  offset?: number;
  close: () => unknown;
}

export function Popout(props: PopoutProps) {
  const { render, target, attach = "right", align = "middle", offset = 8, close } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const [positionStyle, setPositionStyle] = React.useState<React.CSSProperties>({});

  React.useLayoutEffect(() => {
    function handleClick(event: MouseEvent) {
      const content = contentRef.current;
      if (content == null) return;
      if (content.contains(event.target as HTMLElement)) return;
      close();
    }
    // For some reason this has to be delayed a tick, otherwise the handler receives
    // the event that _opens_ the Popout, and immediately closes it.
    setTimeout(() => document.body.addEventListener("click", handleClick), 1);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  React.useLayoutEffect(() => {
    const content = contentRef.current;
    if (content == null) return;

    const targetRect = target.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const [resolvedAttach, styles] = getAttachedPosition(
      targetRect,
      contentRect,
      attach,
      align,
      offset,
    );
    const nudgedStyles = nudgeAlignment(contentRect, styles, resolvedAttach, offset);

    setPositionStyle(nudgedStyles);
    // Only calculate the position once. Afterward, anything can move freely
    // eslint-disable-next-line react/exhaustive-hooks
  }, []);

  return (
    <div ref={contentRef} className={styles.positioner} style={positionStyle}>
      {render({ onClose: close })}
    </div>
  );
}
