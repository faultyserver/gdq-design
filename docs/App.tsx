import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContainer } from "gdq-design";

import DocsSidebar from "./DocsSidebar";
import Pages from "./Pages";
import Forms from "./pages/Forms";
import Home from "./pages/Home";
import Typography from "./pages/Typography";

import styles from "./App.mod.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppContainer className={styles.container}>
        <DocsSidebar className={styles.sidebar} />
        <main className={styles.content}>
          <div className={styles.contentWidthContainer}>
            <Routes>
              <Route path={Pages.HOME} element={<Home />} />
              <Route path={Pages.FORMS} element={<Forms />} />
              <Route path={Pages.TYPOGRAPHY} element={<Typography />} />
            </Routes>
          </div>
        </main>
      </AppContainer>
    </BrowserRouter>
  );
}
