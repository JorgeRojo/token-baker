import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./renderer/App";

import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(React.createElement(App));
