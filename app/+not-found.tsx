import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-3 bg-[#f4f7f5] p-6">
      <Text className="text-lg font-bold text-slate-900">{t('Page not found')}</Text>
      <Link href="/auth/sign-in" className="text-sm font-semibold text-brand-700">
        {t('Return to sign in')}
      </Link>
    </View>
  );
}
