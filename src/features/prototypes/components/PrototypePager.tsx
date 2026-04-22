import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { getPrototypeRouteNeighbors } from '@/src/features/prototypes/data/catalog';
import { type PrototypeRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

interface PrototypePagerProps {
  route: PrototypeRoute;
}

const PrototypePagerLink = ({ href, label }: { href: PrototypeRoute; label: 'Previous' | 'Next' }) => {
  const localizedLabel = useLocalizedText(label);

  return (
    <Link href={href} asChild>
      <Pressable className="rounded-md border border-brand-100 bg-brand-50 px-4 py-2">
        <Text className="text-sm font-semibold text-brand-800">{localizedLabel}</Text>
      </Pressable>
    </Link>
  );
};

export const PrototypePager = ({ route }: PrototypePagerProps) => {
  const { previous, next } = getPrototypeRouteNeighbors(route);

  if (!previous && !next) {
    return null;
  }

  const justifyClassName = previous && next ? 'justify-between' : previous ? 'justify-start' : 'justify-end';

  return (
    <View className={`flex-row items-center gap-3 ${justifyClassName}`}>
      {previous ? <PrototypePagerLink href={previous.route} label="Previous" /> : null}
      {next ? <PrototypePagerLink href={next.route} label="Next" /> : null}
    </View>
  );
};
