import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";

import { Clickable, Text } from "gdq-design";
import CheckboxUnchecked from "gdq-design/icons/CheckboxUnchecked";
import CheckboxChecked from "gdq-design/icons/CheckboxChecked";

import styles from "./Checkbox.mod.css";

export interface CheckboxProps {
  checked: boolean;
  label?: string | React.ReactNode;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

export function Checkbox(props: CheckboxProps) {
  const { checked, label, disabled = false, onChange } = props;
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
      disabled={disabled}
      aria-checked={checked}
      className={classNames(styles.checkbox, { [styles.disabled]: disabled })}
      htmlFor={inputId}
    >
      <input
        type="checkbox"
        style={{ display: "none" }}
        id={inputId}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Icon className={styles.icon} size={24} />
      {labelNode}
    </Clickable>
  );
}
