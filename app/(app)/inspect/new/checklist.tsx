import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

import { failureReasons } from '@/src/data/checklist';
import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { useAppStore } from '@/src/store/appStore';

export default function InspectChecklistScreen() {
  const router = useRouter();
  const { activeRoomItems, updateItem, setFailureReason, setStep } = useAppStore();
  const hasUnsetItems = activeRoomItems.some((item) => item.status === 'unset');
  const hasMissingFailureReason = activeRoomItems.some((item) => item.status === 'fail' && !item.reason);

  return (
    <PageScaffold title="Step 3: Checklist" description="Capture thumbs up/down, reasons, stars, photos, and notes.">
      <Card>
        <View className="gap-3">
          {activeRoomItems.map((item) => (
            <View key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <Text className="mb-2 text-sm font-semibold text-slate-800">{item.name}</Text>
              <View className="mb-2 flex-row flex-wrap gap-2">
                <Pressable onPress={() => updateItem(item.id, { status: 'pass', reason: undefined })} className={`rounded-lg px-3 py-2 ${item.status === 'pass' ? 'bg-brand-600' : 'bg-white border border-slate-300'}`}>
                  <Text className={`text-xs font-semibold ${item.status === 'pass' ? 'text-white' : 'text-slate-700'}`}>Thumbs up</Text>
                </Pressable>
                <Pressable onPress={() => updateItem(item.id, { status: 'fail' })} className={`rounded-lg px-3 py-2 ${item.status === 'fail' ? 'bg-rose-600' : 'bg-white border border-slate-300'}`}>
                  <Text className={`text-xs font-semibold ${item.status === 'fail' ? 'text-white' : 'text-slate-700'}`}>Thumbs down</Text>
                </Pressable>
                <Pressable onPress={() => updateItem(item.id, { aboveAndBeyond: !item.aboveAndBeyond })} className={`rounded-lg px-3 py-2 ${item.aboveAndBeyond ? 'bg-amber-500' : 'bg-white border border-slate-300'}`}>
                  <Text className={`text-xs font-semibold ${item.aboveAndBeyond ? 'text-white' : 'text-slate-700'}`}>Star</Text>
                </Pressable>
                <Pressable onPress={() => updateItem(item.id, { photoCount: item.photoCount + 1 })} className="rounded-lg border border-slate-300 bg-white px-3 py-2">
                  <Text className="text-xs font-semibold text-slate-700">Photo {item.photoCount > 0 ? `(${item.photoCount})` : ''}</Text>
                </Pressable>
              </View>

              {item.status === 'fail' ? (
                <View className="mb-2 flex-row flex-wrap gap-2">
                  {failureReasons.map((reason) => (
                    <Pressable
                      key={reason}
                      onPress={() => setFailureReason(item.id, reason)}
                      className={`rounded-lg px-2 py-1 ${item.reason === reason ? 'bg-rose-600' : 'bg-white border border-rose-300'}`}
                    >
                      <Text className={`text-xs font-semibold ${item.reason === reason ? 'text-white' : 'text-rose-700'}`}>{reason}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}

              <TextInput placeholder="Notes / comments" className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs" />
            </View>
          ))}
        </View>

        {hasUnsetItems ? <Text className="mt-2 text-xs text-amber-700">Complete all checklist items.</Text> : null}
        {hasMissingFailureReason ? <Text className="mt-1 text-xs text-rose-700">All failed items need a miss reason.</Text> : null}

        <Pressable
          onPress={() => {
            setStep(4);
            router.push('/inspect/new/room-score');
          }}
          disabled={hasUnsetItems || hasMissingFailureReason}
          className={`mt-4 rounded-xl py-3 ${!hasUnsetItems && !hasMissingFailureReason ? 'bg-brand-600' : 'bg-slate-300'}`}
        >
          <Text className="text-center text-sm font-semibold text-white">Next: Room Score</Text>
        </Pressable>
      </Card>
    </PageScaffold>
  );
}
