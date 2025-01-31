import { createApp } from "vue";
import "./style.css";
import { i18n } from "localiz";
import { i18nPlugin } from "localiz/vue";

import App from "./App.vue";

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

const app = createApp(App);
app.use(i18nPlugin, { i18n: i18nInstance });

app.mount("#app");
