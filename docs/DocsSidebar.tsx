import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import {
  Accent,
  BrandLogo,
  Card,
  Divider,
  FormControl,
  SelectInput,
  Stack,
  TabColor,
  Tabs,
  Text,
  Theme,
  ThemeContext,
} from "gdq-design";
import ExclamationTriangle from "gdq-design/icons/ExclamationTriangle";
import { IconProps } from "gdq-design/icons/IconProps";
import InfoCircle from "gdq-design/icons/InfoCircle";

const THEME_OPTIONS = [
  { name: "Dark", value: Theme.DARK },
  { name: "Light", value: Theme.LIGHT },
];

const ACCENT_OPTIONS = [
  { name: "Blue", value: Accent.BLUE },
  { name: "Purple", value: Accent.PURPLE },
  { name: "Pink", value: Accent.PINK },
];

type SidebarTab =
  | {
      name: string;
      route: string;
      color?: TabColor;
      icon?: React.ComponentType<IconProps>;
    }
  | { header: string };

const SIDEBAR_TABS: SidebarTab[] = [
  { header: "Guides" },
  { name: "Home", route: "/" },
  { header: "Components" },
  { name: "Forms", route: "/forms" },
  { name: "Typography", route: "/typography" },
];

export default function DocsSidebar(props: { className: string }) {
  const { className } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, accent, setTheme, setAccent } = React.useContext(ThemeContext);

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        <div>
          <BrandLogo color="var(--text-normal)" width="100%" />
          <Text variant="text-sm/normal">
            GDQ's Design System for React-based web applications.
          </Text>
        </div>
        <Divider />
        <FormControl label="Theme" size="small">
          <SelectInput
            items={THEME_OPTIONS}
            selectedItem={THEME_OPTIONS.find(({ value }) => value === theme)}
            onSelect={(item) => (item != null ? setTheme(item.value) : null)}
          />
        </FormControl>
        <FormControl label="Accent Color" size="small">
          <SelectInput
            items={ACCENT_OPTIONS}
            selectedItem={ACCENT_OPTIONS.find(({ value }) => value === accent)}
            onSelect={(item) => (item != null ? setAccent(item.value) : null)}
          />
        </FormControl>
        <Divider />
        <Tabs.Group>
          {SIDEBAR_TABS.map(({ name, route, color, header, icon }) =>
            header != null ? (
              <Tabs.Header label={header} />
            ) : (
              <Tabs.Tab
                label={name}
                onClick={() => (console.log("navigating?"), navigate(route))}
                color={color}
                icon={icon}
                selected={location.pathname === route}
              />
            ),
          )}
        </Tabs.Group>
      </Stack>
    </Card>
  );
}
