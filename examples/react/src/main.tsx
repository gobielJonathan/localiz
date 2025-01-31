import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import LocalizationWrapper from "./components/localization-wrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationWrapper>
      <App />
    </LocalizationWrapper>
  </StrictMode>
);
