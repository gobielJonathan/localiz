import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { LocalizeProvider } from "localiz/react";
import { i18n } from "localiz";

const i18nInstance = i18n().init({
  defaultLang: "en",
  resources: {
    en: {
      hello: "Hello, {{name}}!",
    },
    es: {
      hello: "¡Hola, {{name}}!",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizeProvider i18n={i18nInstance} lang="en">
      <App />
    </LocalizeProvider>
  </StrictMode>
);
