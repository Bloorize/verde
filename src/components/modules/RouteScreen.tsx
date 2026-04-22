import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useLocalizedText } from '@/src/hooks/useLocalizedText';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';

interface RouteLink {
  href: string;
  label: string;
}

interface RouteScreenProps {
  title: string;
  description: string;
  links?: RouteLink[];
  bullets?: string[];
  stats?: { label: string; value: string }[];
}

const LocalizedLabel = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);
  return <>{localizedValue}</>;
};

export const RouteScreen = ({ title, description, links = [], bullets = [], stats = [] }: RouteScreenProps) => {
  return (
    <PageScaffold title={title} description={description}>
      {stats.length > 0 ? (
        <Card>
          <Text className="mb-2 text-base font-semibold text-slate-900">
            <LocalizedLabel value="Snapshot" />
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {stats.map((item) => (
              <View key={item.label} className="min-w-[45%] flex-1 rounded-md bg-slate-50 px-3 py-3">
                <Text className="text-xs text-slate-500">
                  <LocalizedLabel value={item.label} />
                </Text>
                <Text className="mt-1 text-lg font-bold text-slate-900">{item.value}</Text>
              </View>
            ))}
          </View>
        </Card>
      ) : null}

      {links.length > 0 ? (
        <Card>
          <Text className="mb-2 text-base font-semibold text-slate-900">
            <LocalizedLabel value="Navigate" />
          </Text>
          <View className="gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href as any} asChild>
                <Pressable className="rounded-md border border-brand-100 bg-brand-50 px-3 py-2">
                  <Text className="text-sm font-semibold text-brand-800">
                    <LocalizedLabel value={link.label} />
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </Card>
      ) : null}

      {bullets.length > 0 ? (
        <Card>
          <Text className="mb-2 text-base font-semibold text-slate-900">
            <LocalizedLabel value="Context" />
          </Text>
          {bullets.map((item) => (
            <Text key={item} className="mb-1 text-sm text-slate-700">
              - <LocalizedLabel value={item} />
            </Text>
          ))}
        </Card>
      ) : null}
    </PageScaffold>
  );
};
