import { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
  DatasetComponent,
} from 'echarts/components';
import type { ECharts, EChartsCoreOption } from 'echarts/core';

echarts.use([
  SVGRenderer,
  BarChart,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
  DatasetComponent,
]);

interface EChartProps {
  option: EChartsCoreOption;
  height?: number;
}

export const EChart = ({ option, height = 220 }: EChartProps) => {
  const chartRef = useRef<any>(null);
  const instanceRef = useRef<ECharts | null>(null);
  const [width, setWidth] = useState(0);

  const chartSize = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== width) {
      setWidth(nextWidth);
    }
  };

  useEffect(() => {
    if (!chartRef.current || chartSize.width === 0) {
      return;
    }

    const chart = echarts.init(chartRef.current as any, 'light', {
      renderer: 'svg',
      width: chartSize.width,
      height: chartSize.height,
    });

    chart.setOption(option, true);
    instanceRef.current = chart;

    return () => {
      chart.dispose();
      instanceRef.current = null;
    };
  }, [chartSize.height, chartSize.width, option]);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.setOption(option, true);
    }
  }, [option]);

  return (
    <View onLayout={onLayout} style={{ height, width: '100%', minHeight: height }}>
      <SvgChart
        ref={chartRef}
        style={{
          width: chartSize.width || '100%',
          height: chartSize.height,
        }}
      />
    </View>
  );
};
