import * as React from "react";
import AutoNumeric from "autonumeric";

import { TextInput, TextInputProps } from "gdq-design";

export interface CurrencyInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: number;
  onChange: (value: number | undefined) => unknown;
  autoNumericOptions?: AutoNumeric.Options;
}

export function CurrencyInput(props: CurrencyInputProps) {
  const { value, onChange, autoNumericOptions, placeholder = "$0.00", ...otherProps } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const autonumericRef = React.useRef<AutoNumeric>();

  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (input == null) return;

    autonumericRef.current = new AutoNumeric(input, value, {
      onInvalidPaste: "clamp",
      currencySymbol: "$",
    });
    autonumericRef.current.update({});
  }, [autoNumericOptions]);

  // This only updates on blur because the string representation of the time
  // doesn't line up with the numeric representation, meaning updating the
  // value on every change will cause unusable formatting.
  function handleChange(event: React.FocusEvent<HTMLInputElement>) {
    const value = autonumericRef.current?.getNumber() ?? undefined;
    onChange(value);
  }

  return (
    <TextInput
      ref={inputRef}
      {...otherProps}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
