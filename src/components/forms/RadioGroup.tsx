import * as React from "react";
import * as uuid from "uuid";

import { Stack, Text } from "gdq-design";
import RadioUnselected from "gdq-design/icons/RadioUnselected";
import RadioSelected from "gdq-design/icons/RadioSelected";

import styles from "./RadioGroup.mod.css";
import { Clickable } from "../core/Clickable";

interface Option<T> {
  value: T;
  label: string | React.ReactNode;
}

interface RadioItemProps<T> {
  selected: boolean;
  option: Option<T>;
  groupId: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function RadioItem<T>(props: RadioItemProps<T>) {
  const { selected, option, groupId, onChange } = props;
  const { value, label } = option;

  const [inputId] = React.useState(() => uuid.v4());

  const Icon = selected ? RadioSelected : RadioUnselected;
  const labelNode =
    typeof label === "string" ? (
      <Text className={styles.label}>{label}</Text>
    ) : (
      <div className={styles.label}>{label}</div>
    );

  return (
    <Clickable tag="label" aria-selected={selected} className={styles.radioItem} htmlFor={inputId}>
      <input
        type="radio"
        name={groupId}
        onChange={onChange}
        id={inputId}
        value={String(value)}
        style={{ display: "none" }}
      />
      <Icon className={styles.icon} size={24} />
      {labelNode}
    </Clickable>
  );
}

export interface RadioGroupProps<T> {
  value: T | undefined;
  options: Option<T>[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

export function RadioGroup<T>(props: RadioGroupProps<T>) {
  const { value, options, onChange } = props;
  const [groupId] = React.useState(() => uuid.v4());

  return (
    <Stack spacing="space-md">
      {options.map((option) => (
        <RadioItem
          key={String(option.value)}
          selected={value === option.value}
          option={option}
          groupId={groupId}
          onChange={onChange}
        />
      ))}
    </Stack>
  );
}
