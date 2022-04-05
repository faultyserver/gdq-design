import * as React from "react";
import * as uuid from "uuid";

import { Text, TextVariantColor } from "gdq-design";

import styles from "./FormControl.mod.css";

export interface FormControlProps {
  label?: React.ReactNode;
  note?: React.ReactNode;
  color?: TextVariantColor;
  children: React.ReactNode;
}

export function FormControl(props: FormControlProps) {
  const { label, note, color = "normal", children } = props;
  const [controlId] = React.useState(() => uuid.v4());

  return (
    <div className={styles.control}>
      {label != null ? (
        <Text tag="label" variant={`header-sm/${color}`} className={styles.label}>
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
