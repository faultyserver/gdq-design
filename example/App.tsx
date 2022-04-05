import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Accent,
  BrandLogo,
  AppContainer,
  Header,
  Hero,
  Spacer,
  Stack,
  Text,
  Theme,
} from "gdq-design";

import ThemeSelector from "./ThemeSelector";
import Demo from "./pages/Demo";
import Login from "./pages/Login";

import styles from "./App.mod.css";

export default function App() {
  const [theme, setTheme] = React.useState<Theme>(Theme.LIGHT);
  const [accent, setAccent] = React.useState<Accent>(Accent.PINK);
  return (
    <AppContainer theme={theme} accent={accent}>
      <BrowserRouter>
        <Hero type="primary">
          <Stack direction="horizontal" spacing="space-lg">
            <BrandLogo />
            <div>
              <Header tag="h1" variant="header-xl/inherit" uppercase>
                GDQ Design System
              </Header>
              <Text variant="text-lg/inherit">
                This is a demo of the GDQ Design System components.
              </Text>
            </div>
          </Stack>
          <Spacer size="space-lg" />
          <ThemeSelector theme={theme} setTheme={setTheme} accent={accent} setAccent={setAccent} />
        </Hero>
        <Spacer size="space-lg" />
        <div className={styles.app}>
          <Routes>
            <Route path="demo" element={<Demo />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContainer>
  );
}
