import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { Card } from '@/src/components/ui/Card';
import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);
  return <>{localizedValue}</>;
};

export const PrototypeIndexScreen = () => {
  return (
    <PageScaffold
      title="Prototypes"
      description="Browse the six static demos staged for the upcoming prototype routes."
    >
      <View className="gap-3">
        {prototypeCatalog.map((item) => (
          <Link key={item.id} href={item.route} asChild>
            <Pressable>
              <Card>
                <Text className="text-base font-semibold text-slate-900">
                  <LocalizedValue value={item.title} />
                </Text>
                <Text className="mt-1 text-sm leading-5 text-slate-600">
                  <LocalizedValue value={item.description} />
                </Text>
              </Card>
            </Pressable>
          </Link>
        ))}
      </View>
    </PageScaffold>
  );
};

export default PrototypeIndexScreen;
