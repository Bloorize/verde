import { SupportedLanguage } from '@/src/lib/language';
import { getActiveLanguage } from '@/src/i18n';

const getLocaleTag = (language?: SupportedLanguage): string => (language ?? getActiveLanguage()) === 'es' ? 'es-ES' : 'en-US';

export const formatTimestamp = (value: string, language?: SupportedLanguage): string => {
  const date = new Date(value);
  return date.toLocaleString(getLocaleTag(language), {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const formatDate = (value: string, language?: SupportedLanguage): string => {
  const date = new Date(value);
  return date.toLocaleDateString(getLocaleTag(language), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
