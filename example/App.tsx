import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContainer } from "gdq-design";

import Demo from "./pages/Demo";
import Login from "./pages/Login";

import styles from "./App.mod.css";

export default function App() {
  return (
    <AppContainer className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="demo" element={<Demo />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}
