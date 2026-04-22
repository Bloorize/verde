import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

export const LANGUAGE_STORAGE_KEY = 'verde.language';

export type SupportedLanguage = 'en' | 'es';

const supportedLanguages: SupportedLanguage[] = ['en', 'es'];

export const isSupportedLanguage = (value: string | null | undefined): value is SupportedLanguage =>
  supportedLanguages.includes(value as SupportedLanguage);

export const normalizeLanguage = (value: string | null | undefined): SupportedLanguage => {
  if (!value) {
    return 'en';
  }

  const [baseLanguage] = value.toLowerCase().split('-');
  return isSupportedLanguage(baseLanguage) ? baseLanguage : 'en';
};

export const getDeviceLanguage = (): SupportedLanguage => {
  const primaryLocale = getLocales()[0];
  return normalizeLanguage(primaryLocale?.languageCode ?? primaryLocale?.languageTag);
};

export const loadStoredLanguage = async (): Promise<SupportedLanguage | null> => {
  try {
    const value = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value ? normalizeLanguage(value) : null;
  } catch {
    return null;
  }
};

export const persistLanguage = async (language: SupportedLanguage): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore storage errors and fall back to the in-memory selection.
  }
};
