import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import LocalizationWrapper from "./components/localization-wrapper";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationWrapper>
      <App />
    </LocalizationWrapper>
  </StrictMode>
);
