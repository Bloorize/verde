import { Text } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';
import { type PrototypeRoute } from '@/src/features/prototypes/types';

export const PrototypeDetailPlaceholderScreen = ({ route }: { route: PrototypeRoute }) => {
  const item = prototypeCatalog.find((entry) => entry.route === route);

  if (!item) {
    throw new Error(`Unknown prototype route: ${route}`);
  }

  return (
    <PageScaffold title={item.title} description={item.description}>
      <Card>
        <Text className="text-sm font-semibold text-slate-900">Prototype placeholder</Text>
        <Text className="mt-1 text-sm leading-5 text-slate-600">
          Detailed prototype content will be added in a later task.
        </Text>
      </Card>
    </PageScaffold>
  );
};

export default PrototypeDetailPlaceholderScreen;
