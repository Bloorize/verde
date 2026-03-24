import { Text, View } from 'react-native';

import { TrendPoint } from '@/src/types/domain';

interface BarSeriesChartProps {
  data: TrendPoint[];
  color?: string;
}

export const BarSeriesChart = ({ data, color = '#2f7a58' }: BarSeriesChartProps) => {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <View className="gap-3">
      {data.map((item) => (
        <View key={item.label} className="gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-slate-500">{item.label}</Text>
            <Text className="text-xs font-semibold text-slate-700">{item.value}</Text>
          </View>
          <View className="h-2 overflow-hidden rounded-full bg-slate-200">
            <View
              className="h-full rounded-full"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
