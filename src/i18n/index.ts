import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { SupportedLanguage } from '@/src/lib/language';

import { resources } from './resources';

const i18n = createInstance();
let initialized = false;

export const initializeI18n = async (): Promise<typeof i18n> => {
  if (initialized) {
    return i18n;
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
  });

  initialized = true;
  return i18n;
};

void initializeI18n();

export const setI18nLanguage = async (language: SupportedLanguage): Promise<void> => {
  if (!initialized) {
    await initializeI18n();
  }

  if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }
};

export const getActiveLanguage = (): SupportedLanguage => {
  const current = i18n.resolvedLanguage ?? i18n.language;
  return current === 'es' ? 'es' : 'en';
};

export default i18n;
