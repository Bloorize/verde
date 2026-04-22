import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SupportedLanguage } from '@/src/lib/language';
import { getActiveLanguage } from '@/src/i18n';
import { translateText } from '@/src/lib/translation/translator';

type LocalizedTextOptions = {
  alwaysTranslate?: boolean;
  sourceLanguage?: SupportedLanguage;
};

export const useLocalizedText = (value: string | null | undefined, options: LocalizedTextOptions = {}): string => {
  const { t } = useTranslation();
  const [translatedValue, setTranslatedValue] = useState(value ?? '');

  const input = value ?? '';
  const catalogValue = useMemo(() => {
    if (!input) {
      return '';
    }

    return t(input, { defaultValue: input });
  }, [input, t]);

  const activeLanguage = getActiveLanguage();
  const shouldRuntimeTranslate =
    Boolean(input) &&
    (!options.sourceLanguage || options.sourceLanguage !== activeLanguage) &&
    (options.alwaysTranslate || (activeLanguage !== 'en' && catalogValue === input));

  useEffect(() => {
    let cancelled = false;

    setTranslatedValue(catalogValue || input);

    if (!shouldRuntimeTranslate) {
      return () => {
        cancelled = true;
      };
    }

    void translateText(input, activeLanguage, { sourceLanguage: options.sourceLanguage }).then((nextValue) => {
      if (!cancelled) {
        setTranslatedValue(nextValue);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activeLanguage, catalogValue, input, options.sourceLanguage, shouldRuntimeTranslate]);

  return translatedValue;
};
