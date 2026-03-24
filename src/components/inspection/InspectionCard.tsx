import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { ScorePill } from '@/src/components/ui/ScorePill';
import { Inspection } from '@/src/types/domain';
import { formatTimestamp } from '@/src/utils/format';
import { getScoreColor } from '@/src/utils/score';

interface InspectionCardProps {
  inspection: Inspection;
  onPress: () => void;
}

export const InspectionCard = ({ inspection, onPress }: InspectionCardProps) => (
  <Pressable onPress={onPress}>
    <Card>
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-brand-700">
            <Text className="text-xs font-bold text-white">{inspection.inspectorAvatar}</Text>
          </View>
          <View>
            <Text className="text-sm font-bold text-slate-900">{inspection.inspectorName}</Text>
            <Text className="text-xs text-slate-500">{formatTimestamp(inspection.timestamp)}</Text>
          </View>
        </View>

        <ScorePill score={inspection.score} />
      </View>

      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xs text-slate-600">{inspection.buildingName}</Text>
        <Text className="text-xs font-semibold text-slate-600">{inspection.spacesInspected} spaces</Text>
      </View>

      <View className="mb-3 h-2 overflow-hidden rounded-full bg-brand-100">
        <View
          className="h-full rounded-full"
          style={{
            width: `${Math.min(inspection.score / 5, 1) * 100}%`,
            backgroundColor: getScoreColor(inspection.score),
          }}
        />
      </View>

      <View className="gap-2">
        {inspection.rooms.slice(0, 3).map((room) => (
          <View key={room.id} className="flex-row items-center justify-between rounded-xl bg-brand-50 px-3 py-2">
            <View>
              <Text className="text-xs font-semibold text-slate-700">{room.name}</Text>
              <Text className="text-[11px] text-slate-500">Room score {room.score.toFixed(1)}</Text>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="camera-outline" size={14} color="#4b5563" />
                <Text className="text-[11px] text-slate-600">{room.photoCount}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="chatbubble-ellipses-outline" size={14} color="#4b5563" />
                <Text className="text-[11px] text-slate-600">{room.commentCount}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  </Pressable>
);
