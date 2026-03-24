import { View } from 'react-native';
import Svg, { Polyline, Line } from 'react-native-svg';

import { TrendPoint } from '@/src/types/domain';

interface LineTrendChartProps {
  data: TrendPoint[];
  color?: string;
  height?: number;
}

export const LineTrendChart = ({ data, color = '#2f7a58', height = 120 }: LineTrendChartProps) => {
  if (data.length === 0) {
    return <View className="h-24" />;
  }

  const width = 320;
  const max = Math.max(...data.map((point) => point.value), 1);
  const min = Math.min(...data.map((point) => point.value), 0);
  const range = Math.max(max - min, 1);

  const points = data
    .map((point, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width;
      const normalized = (point.value - min) / range;
      const y = height - normalized * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <Line x1="0" y1={height - 2} x2={width} y2={height - 2} stroke="#d6e3db" strokeWidth="1" />
      <Polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
};
