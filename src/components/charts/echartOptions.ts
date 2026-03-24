import type { EChartsCoreOption } from 'echarts/core';

import { TrendPoint } from '@/src/types/domain';

const axisLabel = {
  color: '#64748b',
  fontSize: 11,
};

const splitLine = {
  lineStyle: {
    color: '#e2e8f0',
  },
};

export const buildLineOption = (data: TrendPoint[], color = '#2f7a58'): EChartsCoreOption => ({
  animationDuration: 350,
  grid: {
    left: 28,
    right: 8,
    top: 16,
    bottom: 26,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: data.map((point) => point.label),
    axisLabel,
    axisLine: { lineStyle: { color: '#cbd5e1' } },
  },
  yAxis: {
    type: 'value',
    axisLabel,
    splitLine,
  },
  series: [
    {
      data: data.map((point) => point.value),
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        width: 3,
        color,
      },
      itemStyle: {
        color,
      },
      areaStyle: {
        color: `${color}22`,
      },
    },
  ],
});

export const buildBarOption = (data: TrendPoint[], color = '#2f7a58'): EChartsCoreOption => ({
  animationDuration: 300,
  grid: {
    left: 30,
    right: 8,
    top: 16,
    bottom: 24,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: data.map((point) => point.label),
    axisLabel,
    axisLine: { lineStyle: { color: '#cbd5e1' } },
  },
  yAxis: {
    type: 'value',
    axisLabel,
    splitLine,
  },
  series: [
    {
      data: data.map((point) => point.value),
      type: 'bar',
      itemStyle: {
        color,
        borderRadius: [6, 6, 0, 0],
      },
      barMaxWidth: 28,
    },
  ],
});
