import * as React from "react";

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
  children: React.ReactNode;
}

export function FormControl(props: FormControlProps) {
  const { label, note, color = "normal", size = "normal", children } = props;
  const labelSize = LABEL_SIZES[size];

  return (
    <div className={styles.control}>
      {label != null ? (
        <Text tag="label" variant={`${labelSize}/${color}`} className={styles.label}>
          {label}
        </Text>
      ) : null}
      {children}
      {note != null ? (
        <Text className={styles.note} variant={`text-sm/${color}`}>
          {note}
        </Text>
      ) : null}
    </div>
  );
}
