import * as React from "react";
import * as uuid from "uuid";

import { Text } from "gdq-design";

import styles from "./FormControl.mod.css";

export interface FormControlProps {
  label?: React.ReactNode;
  note?: React.ReactNode;
  children: React.ReactNode;
}

export function FormControl(props: FormControlProps) {
  const { label, note, children } = props;
  const [controlId] = React.useState(() => uuid.v4());

  return (
    <div className={styles.control}>
      {label != null ? (
        <Text tag="label" variant="header-sm" className={styles.label}>
          {label}
        </Text>
      ) : null}
      {children}
      {note != null ? (
        <Text className={styles.note} variant="text-sm">
          {note}
        </Text>
      ) : null}
    </div>
  );
}
