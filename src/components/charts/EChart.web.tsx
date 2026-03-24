import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
  DatasetComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts, EChartsCoreOption } from 'echarts/core';

echarts.use([
  CanvasRenderer,
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
  const chartDivRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<ECharts | null>(null);

  useEffect(() => {
    if (!chartDivRef.current) {
      return;
    }

    const chart = echarts.init(chartDivRef.current, 'light', {
      renderer: 'canvas',
    });

    chartInstanceRef.current = chart;

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            chart.resize();
          })
        : null;

    if (resizeObserver) {
      resizeObserver.observe(chartDivRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      chart.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(option, true);
      chartInstanceRef.current.resize();
    }
  }, [option]);

  return (
    <View style={{ height, width: '100%', minHeight: height }}>
      <div
        ref={chartDivRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};
