import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useAppStore } from '@/src/store/appStore';

export default function InspectLocationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);
  const { buildingId, floorId, spaceTypeId, roomIdentifier, setLocation, setStep } = useAppStore();

  const siteConfigQuery = useQuery({
    queryKey: queryKeys.siteConfig(selectedSiteId),
    queryFn: () => mockSupabase.getSiteConfig(selectedSiteId),
  });

  const config = siteConfigQuery.data;
  const floors = config?.floors.filter((floor) => floor.buildingId === buildingId) ?? [];

  return (
    <PageScaffold title="Step 2: Location" description="Select building, floor, space type, and room identifier.">
      <Card>
        <Text className="mb-2 text-xs font-semibold uppercase text-slate-500">{t('Building')}</Text>
        <View className="mb-3 flex-row flex-wrap gap-2">
          {config?.buildings.map((building) => (
            <Pressable
              key={building.id}
              onPress={() => setLocation({ buildingId: building.id, floorId: undefined })}
              className={`rounded-lg px-3 py-2 ${building.id === buildingId ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
            >
              <Text className={`text-sm font-semibold ${building.id === buildingId ? 'text-white' : 'text-brand-700'}`}>{building.name}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="mb-2 text-xs font-semibold uppercase text-slate-500">{t('Floor')}</Text>
        <View className="mb-3 flex-row flex-wrap gap-2">
          {floors.map((floor) => (
            <Pressable
              key={floor.id}
              onPress={() => setLocation({ floorId: floor.id })}
              className={`rounded-lg px-3 py-2 ${floor.id === floorId ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
            >
              <Text className={`text-sm font-semibold ${floor.id === floorId ? 'text-white' : 'text-brand-700'}`}>{floor.name}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="mb-2 text-xs font-semibold uppercase text-slate-500">{t('Space Type')}</Text>
        <View className="mb-3 flex-row flex-wrap gap-2">
          {config?.spaceTypes.map((spaceType) => (
            <Pressable
              key={spaceType.id}
              onPress={() => setLocation({ spaceTypeId: spaceType.id })}
              className={`rounded-lg px-3 py-2 ${spaceType.id === spaceTypeId ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
            >
              <Text className={`text-xs font-semibold ${spaceType.id === spaceTypeId ? 'text-white' : 'text-brand-700'}`}>{spaceType.name}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="mb-1 text-xs font-semibold uppercase text-slate-500">{t('Room identifier')}</Text>
        <TextInput value={roomIdentifier} onChangeText={(value) => setLocation({ roomIdentifier: value })} className="mb-4 rounded-lg border border-slate-200 px-3 py-2" />

        <Pressable
          onPress={() => {
            setStep(3);
            router.push('/inspect/new/checklist');
          }}
          disabled={!buildingId || !floorId || !spaceTypeId || !roomIdentifier}
          className={`rounded-lg py-3 ${buildingId && floorId && spaceTypeId && roomIdentifier ? 'bg-brand-600' : 'bg-slate-300'}`}
        >
          <Text className="text-center text-sm font-semibold text-white">{t('Next')}</Text>
        </Pressable>
      </Card>
    </PageScaffold>
  );
}
