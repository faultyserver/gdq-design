import * as React from "react";
import classNames from "classnames";

import styles from "./TextInput.mod.css";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "password" | "email";
}

export function TextInput(props: TextInputProps) {
  const { type = "text", value, className, onChange, ...nativeProps } = props;

  return (
    <input
      {...nativeProps}
      type={type}
      value={value}
      onChange={onChange}
      className={classNames(styles.input, props.className)}
    />
  );
}
