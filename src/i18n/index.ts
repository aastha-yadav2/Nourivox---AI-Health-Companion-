import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../../public/locales/en.json';
import hiTranslations from '../../public/locales/hi.json';
import bnTranslations from '../../public/locales/bn.json';
import teTranslations from '../../public/locales/te.json';
import mrTranslations from '../../public/locales/mr.json';
import taTranslations from '../../public/locales/ta.json';
import guTranslations from '../../public/locales/gu.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    
    resources: {
      en: {
        translation: enTranslations
      },
      hi: {
        translation: hiTranslations
      },
      bn: {
        translation: bnTranslations
      },
      te: {
        translation: teTranslations
      },
      mr: {
        translation: mrTranslations
      },
      ta: {
        translation: taTranslations
      },
      gu: {
        translation: guTranslations
      }
    },

    interpolation: {
      escapeValue: false, // react already does escaping
    },

    react: {
      useSuspense: false,
    }
  });

export default i18n;