import * as React from "react";
import * as uuid from "uuid";

import { Clickable, Text } from "gdq-design";
import CheckboxUnchecked from "gdq-design/icons/CheckboxUnchecked";
import CheckboxChecked from "gdq-design/icons/CheckboxChecked";

import styles from "./Checkbox.mod.css";

export interface CheckboxProps {
  checked: boolean;
  label?: string | React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

export function Checkbox(props: CheckboxProps) {
  const { checked, label, onChange } = props;
  const [inputId] = React.useState(() => uuid.v4());

  const Icon = checked ? CheckboxChecked : CheckboxUnchecked;
  const labelNode =
    typeof label === "string" ? (
      <Text className={styles.label}>{label}</Text>
    ) : (
      <div className={styles.label}>{label}</div>
    );

  return (
    <Clickable
      tag="label"
      tabIndex={0}
      aria-checked={checked}
      className={styles.checkbox}
      htmlFor={inputId}
    >
      <input
        type="checkbox"
        onChange={onChange}
        id={inputId}
        checked={checked}
        style={{ display: "none" }}
      />
      <Icon className={styles.icon} size={24} />
      {labelNode}
    </Clickable>
  );
}
