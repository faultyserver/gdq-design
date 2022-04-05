import * as React from "react";

import { Accent, FormControl, SelectInput, Stack, Theme } from "gdq-design";

const THEME_OPTIONS = [
  { name: "Dark", value: Theme.DARK },
  { name: "Light", value: Theme.LIGHT },
];

const ACCENT_OPTIONS = [
  { name: "Blue", value: Accent.BLUE },
  { name: "Purple", value: Accent.PURPLE },
  { name: "Pink", value: Accent.PINK },
];

interface ThemeSelectorProps {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => unknown;
  setAccent: (setAccent: Accent) => unknown;
}

export default function ThemeSelector(props: ThemeSelectorProps) {
  const { theme, accent, setTheme, setAccent } = props;

  return (
    <Stack direction="horizontal" stretch spacing="space-md">
      <FormControl label="Theme" color="inherit">
        <SelectInput
          items={THEME_OPTIONS}
          selectedItem={THEME_OPTIONS.find(({ value }) => value === theme)}
          onSelect={(item) => (item != null ? setTheme(item.value) : null)}
        />
      </FormControl>
      <FormControl label="Accent Color" color="inherit">
        <SelectInput
          items={ACCENT_OPTIONS}
          selectedItem={ACCENT_OPTIONS.find(({ value }) => value === accent)}
          onSelect={(item) => (item != null ? setAccent(item.value) : null)}
        />
      </FormControl>
    </Stack>
  );
}
