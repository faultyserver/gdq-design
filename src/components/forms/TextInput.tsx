import * as React from "react";
import classNames from "classnames";

import styles from "./TextInput.mod.css";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "password" | "email" | "date" | "time" | "datetime-local";
}

export const TextInput = React.forwardRef(
  (props: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { type = "text", value, className, onChange, ...nativeProps } = props;

    return (
      <input
        {...nativeProps}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        className={classNames(styles.input, props.className)}
      />
    );
  },
);
