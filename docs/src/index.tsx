import * as React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "gdq-design/style.css";

const root = createRoot(document.getElementById("app-container")!);
root.render(<App />);
