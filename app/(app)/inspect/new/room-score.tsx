import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { useAppStore } from '@/src/store/appStore';

export default function InspectRoomScoreScreen() {
  const router = useRouter();
  const { activeRoomScore, setActiveRoomScore, addCompletedRoom, notes, setNotes, completedRooms, setStep } = useAppStore();

  return (
    <PageScaffold title="Step 4: Room Score" description="Assign manual room score and continue to next room or summary.">
      <Card>
        <Text className="mb-2 text-base font-semibold text-slate-900">Manual Score (1.0 - 5.0)</Text>
        <View className="mb-3 flex-row gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <Pressable key={score} onPress={() => setActiveRoomScore(score)} className={`h-10 w-10 items-center justify-center rounded-xl ${activeRoomScore === score ? 'bg-brand-600' : 'bg-slate-100'}`}>
              <Text className={`font-semibold ${activeRoomScore === score ? 'text-white' : 'text-slate-700'}`}>{score}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="mb-1 text-xs font-semibold uppercase text-slate-500">Notes</Text>
        <TextInput value={notes} onChangeText={setNotes} multiline className="mb-4 rounded-xl border border-slate-200 px-3 py-2" />

        <View className="flex-row gap-2">
          <Pressable onPress={addCompletedRoom} className="flex-1 rounded-xl border border-brand-200 bg-brand-50 py-3">
            <Text className="text-center text-sm font-semibold text-brand-700">Save & Continue Room</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              addCompletedRoom();
              setStep(5);
              router.push('/inspect/new/summary');
            }}
            className="flex-1 rounded-xl bg-brand-600 py-3"
          >
            <Text className="text-center text-sm font-semibold text-white">Go to Summary</Text>
          </Pressable>
        </View>

        <Text className="mt-2 text-xs text-slate-500">Rooms captured: {completedRooms.length}</Text>
      </Card>
    </PageScaffold>
  );
}
