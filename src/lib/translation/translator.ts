import AsyncStorage from '@react-native-async-storage/async-storage';

import { SupportedLanguage } from '@/src/lib/language';

const TRANSLATION_CACHE_KEY = 'verde.translation-cache.v1';
const MAX_PERSISTED_ENTRIES = 250;
const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

type TranslationOptions = {
  sourceLanguage?: SupportedLanguage;
};

const memoryCache = new Map<string, string>();
const inflightTranslations = new Map<string, Promise<string>>();

let persistentCacheLoaded = false;
let pendingPersistTimeout: ReturnType<typeof setTimeout> | null = null;

const buildCacheKey = (text: string, targetLanguage: SupportedLanguage, sourceLanguage?: SupportedLanguage) =>
  JSON.stringify([sourceLanguage ?? 'auto', targetLanguage, text]);

const decodeHtmlEntities = (value: string): string =>
  value
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const loadPersistentCache = async (): Promise<void> => {
  if (persistentCacheLoaded) {
    return;
  }

  persistentCacheLoaded = true;

  try {
    const raw = await AsyncStorage.getItem(TRANSLATION_CACHE_KEY);
    if (!raw) {
      return;
    }

    const entries = JSON.parse(raw) as [string, string][];
    entries.forEach(([key, value]) => {
      memoryCache.set(key, value);
    });
  } catch {
    // Ignore cache hydration failures and keep going with the in-memory cache.
  }
};

const schedulePersist = () => {
  if (pendingPersistTimeout) {
    clearTimeout(pendingPersistTimeout);
  }

  pendingPersistTimeout = setTimeout(() => {
    pendingPersistTimeout = null;

    const entries = Array.from(memoryCache.entries()).slice(-MAX_PERSISTED_ENTRIES);

    void AsyncStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(entries)).catch(() => {
      // Ignore persistence issues and keep the in-memory cache warm.
    });
  }, 150);
};

const getTranslationApiKey = (): string | undefined => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY?.trim();
  return apiKey ? apiKey : undefined;
};

export const canTranslateRemotely = (): boolean => Boolean(getTranslationApiKey());

export const translateText = async (
  text: string,
  targetLanguage: SupportedLanguage,
  options: TranslationOptions = {},
): Promise<string> => {
  const normalizedText = text.trim();

  if (!normalizedText) {
    return text;
  }

  if (options.sourceLanguage && options.sourceLanguage === targetLanguage) {
    return text;
  }

  await loadPersistentCache();

  const cacheKey = buildCacheKey(text, targetLanguage, options.sourceLanguage);
  const cached = memoryCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const inflight = inflightTranslations.get(cacheKey);
  if (inflight) {
    return inflight;
  }

  const apiKey = getTranslationApiKey();
  if (!apiKey) {
    memoryCache.set(cacheKey, text);
    return text;
  }

  const request = fetch(`${GOOGLE_TRANSLATE_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
      format: 'text',
      ...(options.sourceLanguage ? { source: options.sourceLanguage } : {}),
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        return text;
      }

      const payload = (await response.json()) as {
        data?: {
          translations?: {
            translatedText?: string;
          }[];
        };
      };

      const translatedValue = payload.data?.translations?.[0]?.translatedText;
      const resolved = translatedValue ? decodeHtmlEntities(translatedValue) : text;
      memoryCache.set(cacheKey, resolved);
      schedulePersist();
      return resolved;
    })
    .catch(() => text)
    .finally(() => {
      inflightTranslations.delete(cacheKey);
    });

  inflightTranslations.set(cacheKey, request);
  return request;
};

export const translateTextList = async (
  values: string[],
  targetLanguage: SupportedLanguage,
  options: TranslationOptions = {},
): Promise<string[]> => Promise.all(values.map((value) => translateText(value, targetLanguage, options)));
