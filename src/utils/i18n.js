// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import HttpApi from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// i18n
//   .use(HttpApi)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     supportedLngs: ["en", "fr", "hi"],
//     fallbackLng: "en",
//     debug: false,
//     interpolation: {
//       escapeValue: false,
//     },
//     backend: {
//       loadPath: "/locales/{{lng}}/translation.json",
//     },
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';
import translationHI from '../locales/hi/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
