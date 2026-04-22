import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { canTranslateRemotely } from '@/src/lib/translation/translator';
import { SupportedLanguage } from '@/src/lib/language';
import { useAppStore } from '@/src/store/appStore';

const languageOptions: SupportedLanguage[] = ['en', 'es'];

export default function ProfilePreferencesScreen() {
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  return (
    <PageScaffold title="Preferences" description="Choose how Verde is displayed.">
      <Card>
        <Text className="text-base font-semibold text-slate-900">{t('App language')}</Text>
        <Text className="mt-1 text-sm text-slate-600">
          {t('Everything on screen is translated into your selected language when possible.')}
        </Text>

        <View className="mt-4 gap-3">
          {languageOptions.map((option) => {
            const isSelected = option === language;

            return (
              <Pressable
                key={option}
                onPress={() => {
                  void setLanguage(option);
                }}
                className={`rounded-lg border px-4 py-3 ${isSelected ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-white'}`}
              >
                <Text className={`text-sm font-semibold ${isSelected ? 'text-brand-700' : 'text-slate-900'}`}>
                  {option === 'en' ? t('English') : t('Spanish')}
                </Text>
                <Text className="mt-1 text-xs text-slate-500">{option === 'en' ? 'English' : 'Espanol'}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <Text className="text-base font-semibold text-slate-900">{t('Translate all content')}</Text>
        <Text className="mt-1 text-sm text-slate-600">
          {t(
            'Static labels are translated locally. Notes, comments, and other record text use the translation service with caching and fallback.',
          )}
        </Text>
        {!canTranslateRemotely() ? (
          <Text className="mt-3 text-xs text-amber-700">
            {t(
              'Google Translate API is not configured. Static labels still switch languages, and dynamic record text will stay in its original language until `EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY` is set.',
            )}
          </Text>
        ) : null}
      </Card>
    </PageScaffold>
  );
}
