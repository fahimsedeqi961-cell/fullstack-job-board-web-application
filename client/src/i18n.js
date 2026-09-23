import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import fa from "./locales/fa/translation.json";
import pa from "./locales/pa/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fa: {
      translation: fa,
    },
    pa: {
      translation: pa,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// For Persian and Pashto language directions
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;

  document.documentElement.dir =
    language === "fa" || language === "pa" ? "rtl" : "ltr";
});

export default i18n;
