## Internationalization Toolkit

---

Welcome to the ultimate toolkit for internationalization (i18n) projects! This repository offers a comprehensive suite of **core utilities**, **custom hooks**, **helper functions**, and **reusable components** designed to streamline the development of multilingual applications.

### Key Features

- **Custom Hooks**: Simplify state management and logic for language switching, translation retrieval, and localization workflows.
- **Helper Functions**: Powerful utilities for common i18n tasks, including formatting dates, numbers, and currencies according to locale, and dynamically loading translation files.
- **Reusable Components**: Modular UI components like language selectors and localized date-time displays, ready to integrate into your project.
- **Modular Design**: Highly modular and well-documented utilities and components, adaptable to various application architectures and frameworks.
- **Developer-Friendly**: Thoroughly commented code and detailed examples for smooth integration and quick onboarding.

Empower your team to build scalable and maintainable multilingual applications while reducing repetitive tasks and development overhead.

## Installation

You can install the `localiz` package using your preferred package manager:

### Using npm
```bash
npm install localiz
```

### Using pnpm
```bash
pnpm add localiz
```

### Using yarn
```bash
yarn add localiz
```

### API 

#### i18n Init Function Spec

| Parameter          | Type      | Description                          |
|--------------------|-----------|--------------------------------------|
| resources          | Resource  | The resource object for translations |
| defaultLang        | string    | The default language code            |
| returnEmptyString? | boolean   | Optional flag to return empty string |

#### LocalizeProvider Spec

| Parameter | Type             | Description                          |
|-----------|------------------|--------------------------------------|
| i18n      | I18n             | The i18n instance                    |
| children  | React.ReactNode  | The child components                 |


### Usage

#### React
```tsx
// main.tsx
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

function main() {
    return (
        <LocalizeProvider i18n={i18nInstance}>
            <App />
        </LocalizeProvider>
    );
}

// app.tsx
import { useState, useEffect } from "react";
import { useTranslation } from "localiz/react";

function App() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const languageListener = () => {};
        i18n.on("onlanguagechanged", languageListener);
        return () => i18n.off("onlanguagechanged", languageListener);
    }, []);

    return (
        <>
            <h4>{t("hello", { name: "Jon Doe" })}</h4>
            <button onClick={() => i18n.changeLanguage("en")}>en</button>
            <button onClick={() => i18n.changeLanguage("es")}>es</button>
        </>
    );
}

export default App;
```
