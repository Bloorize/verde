import { Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';

interface Metric {
  label: string;
  value: string;
}

export const MetricGrid = ({ title, metrics }: { title: string; metrics: Metric[] }) => (
  <Card>
    <Text className="mb-3 text-base font-semibold text-slate-900">{title}</Text>
    <View className="flex-row flex-wrap gap-3">
      {metrics.map((metric) => (
        <View key={metric.label} className="min-w-[45%] flex-1 rounded-xl bg-slate-50 px-3 py-3">
          <Text className="text-xs text-slate-500">{metric.label}</Text>
          <Text className="mt-1 text-lg font-bold text-slate-900">{metric.value}</Text>
        </View>
      ))}
    </View>
  </Card>
);
