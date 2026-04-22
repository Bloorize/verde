import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useLocalizedText } from '@/src/hooks/useLocalizedText';

import { Card } from '@/src/components/ui/Card';

interface RouteLinkItem {
  href?: string;
  label: string;
  description?: string;
  onPress?: () => void;
}

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);
  return <>{localizedValue}</>;
};

export const RouteLinks = ({ title, links }: { title: string; links: RouteLinkItem[] }) => (
  <Card>
    <Text className="mb-2 text-base font-semibold text-slate-900">
      <LocalizedValue value={title} />
    </Text>
    <View className="gap-2">
      {links.map((link) =>
        link.href ? (
          <Link href={link.href as any} key={link.href} asChild>
            <Pressable className="rounded-md border border-brand-100 bg-brand-50 px-3 py-2">
              <Text className="text-sm font-semibold text-brand-800">
                <LocalizedValue value={link.label} />
              </Text>
              {link.description ? (
                <Text className="text-xs text-slate-600">
                  <LocalizedValue value={link.description} />
                </Text>
              ) : null}
            </Pressable>
          </Link>
        ) : (
          <Pressable
            key={link.label}
            onPress={link.onPress}
            className="rounded-md border border-brand-100 bg-brand-50 px-3 py-2"
          >
            <Text className="text-sm font-semibold text-brand-800">
              <LocalizedValue value={link.label} />
            </Text>
            {link.description ? (
              <Text className="text-xs text-slate-600">
                <LocalizedValue value={link.description} />
              </Text>
            ) : null}
          </Pressable>
        ),
      )}
    </View>
  </Card>
);
