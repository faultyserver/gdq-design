import * as React from "react";
import classNames from "classnames";

import styles from "./TextArea.mod.css";

function renderMaxLengthIndicator(length?: number, maxLength?: number) {
  if (length == null || maxLength == null) return null;

  const limitRatio = length / maxLength;

  const nearLimit = limitRatio > 0.8 && limitRatio < 1.0;
  const overLimit = limitRatio >= 1.0;

  return (
    <div
      className={classNames(styles.lengthLimit, {
        [styles.nearLimit]: nearLimit,
        [styles.overLimit]: overLimit,
      })}>
      <span className={styles.length}>{length}</span> /
      <span className={styles.limit}>{maxLength}</span>
    </div>
  );
}

const RESIZE_CLASSES = {
  horizontal: styles.resizeHorizontal,
  vertical: styles.resizeVertical,
  both: styles.resizeBoth,
  none: styles.resizeNone,
};

type TextAreaResizeType = keyof typeof RESIZE_CLASSES;

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: TextAreaResizeType;
  disabled?: boolean;
}

export const TextArea = React.forwardRef(
  (props: TextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const {
      value,
      maxLength,
      rows = 3,
      resize = "vertical",
      disabled = false,
      className,
      onChange,
      ...nativeProps
    } = props;
    const length = value?.toString().length;

    return (
      <div className={classNames(styles.container, { [styles.disabled]: disabled })}>
        <textarea
          ref={ref}
          disabled={disabled}
          {...nativeProps}
          value={value}
          maxLength={maxLength}
          rows={rows}
          onChange={onChange}
          className={classNames(styles.input, className, RESIZE_CLASSES[resize])}></textarea>
        {renderMaxLengthIndicator(length, maxLength)}
      </div>
    );
  },
);
