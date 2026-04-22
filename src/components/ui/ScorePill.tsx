import { Text, View } from 'react-native';

import { getScoreColor } from '@/src/utils/score';

export const ScorePill = ({ score }: { score: number }) => (
  <View
    className="rounded px-3 py-1"
    style={{
      backgroundColor: `${getScoreColor(score)}20`,
    }}
  >
    <Text className="text-xs font-bold" style={{ color: getScoreColor(score) }}>
      {score.toFixed(1)}
    </Text>
  </View>
);
