import classNames from "classnames";
import * as React from "react";

import styles from "./TextInput.mod.css";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "text" | "number" | "password";
}

export function TextInput(props: TextInputProps) {
  const { type = "text" } = props;
  return <input {...props} type={type} className={classNames(styles.input, props.className)} />;
}
