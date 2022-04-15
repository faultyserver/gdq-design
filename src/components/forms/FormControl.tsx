import * as React from "react";
import classNames from "classnames";

import { Text, TextVariantColor } from "gdq-design";

import styles from "./FormControl.mod.css";
import { TextVariantSize } from "../text/Text";

const LABEL_SIZES: Record<string, TextVariantSize> = {
  normal: "header-sm",
  small: "header-xs",
};

export type FormControlSize = keyof typeof LABEL_SIZES;

export interface FormControlProps {
  label?: React.ReactNode;
  note?: React.ReactNode;
  color?: TextVariantColor;
  size?: FormControlSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

export function FormControl(props: FormControlProps) {
  const {
    label,
    note,
    color = "normal",
    size = "normal",
    prefix,
    suffix,
    disabled = false,
    children,
  } = props;
  const labelSize = LABEL_SIZES[size];

  return (
    <div className={classNames(styles.control, { [styles.disabled]: disabled })}>
      {label != null ? (
        <Text tag="label" variant={`${labelSize}/${color}`} className={styles.label}>
          {label}
        </Text>
      ) : null}
      <div className={styles.inputRow}>
        {prefix != null ? <div className={styles.attachment}>{prefix}</div> : null}
        {children}
        {suffix != null ? <div className={styles.attachment}>{suffix}</div> : null}
      </div>
      {note != null ? (
        <Text className={styles.note} variant={`text-sm/${color}`}>
          {note}
        </Text>
      ) : null}
    </div>
  );
}
