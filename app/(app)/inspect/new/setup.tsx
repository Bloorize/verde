import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { useAppStore } from '@/src/store/appStore';

const inspectionTypes = ['Routine', 'Quality Assurance', 'Follow-up'] as const;

export default function InspectSetupScreen() {
  const router = useRouter();
  const { type, baseline, jointInspection, inspectionDate, setMeta, setStep } = useAppStore();

  return (
    <PageScaffold title="Step 1: Setup" description="Set inspection type, baseline and joint flags, then start.">
      <Card>
        <Text className="mb-3 text-base font-semibold text-slate-900">Inspection Type</Text>
        <View className="mb-4 flex-row flex-wrap gap-2">
          {inspectionTypes.map((inspectionType) => (
            <Pressable
              key={inspectionType}
              onPress={() => setMeta({ type: inspectionType })}
              className={`rounded-xl px-3 py-2 ${type === inspectionType ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
            >
              <Text className={`text-sm font-semibold ${type === inspectionType ? 'text-white' : 'text-brand-700'}`}>{inspectionType}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-3 flex-row gap-2">
          <Pressable onPress={() => setMeta({ baseline: true })} className={`flex-1 rounded-xl px-3 py-3 ${baseline ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}>
            <Text className={`text-center text-sm font-semibold ${baseline ? 'text-white' : 'text-brand-700'}`}>Baseline: Yes</Text>
          </Pressable>
          <Pressable onPress={() => setMeta({ baseline: false })} className={`flex-1 rounded-xl px-3 py-3 ${!baseline ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}>
            <Text className={`text-center text-sm font-semibold ${!baseline ? 'text-white' : 'text-brand-700'}`}>Baseline: No</Text>
          </Pressable>
        </View>

        <View className="mb-4 flex-row gap-2">
          <Pressable
            onPress={() => setMeta({ jointInspection: true })}
            className={`flex-1 rounded-xl px-3 py-3 ${jointInspection ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
          >
            <Text className={`text-center text-sm font-semibold ${jointInspection ? 'text-white' : 'text-brand-700'}`}>Joint: Yes</Text>
          </Pressable>
          <Pressable
            onPress={() => setMeta({ jointInspection: false })}
            className={`flex-1 rounded-xl px-3 py-3 ${!jointInspection ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
          >
            <Text className={`text-center text-sm font-semibold ${!jointInspection ? 'text-white' : 'text-brand-700'}`}>Joint: No</Text>
          </Pressable>
        </View>

        <Text className="mb-1 text-xs font-semibold uppercase text-slate-500">Inspection Date</Text>
        <TextInput value={inspectionDate} onChangeText={(value) => setMeta({ inspectionDate: value })} className="mb-4 rounded-xl border border-slate-200 px-3 py-2" />

        <Pressable
          onPress={() => {
            setStep(2);
            router.push('/inspect/new/location');
          }}
          className="rounded-xl bg-brand-600 py-3"
        >
          <Text className="text-center text-sm font-semibold text-white">Start Inspecting</Text>
        </Pressable>
      </Card>
    </PageScaffold>
  );
}
