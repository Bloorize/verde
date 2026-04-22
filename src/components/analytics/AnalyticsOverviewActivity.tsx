import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { mockEmployees, mockSites } from '@/src/data/mockData';
import { useAppStore } from '@/src/store/appStore';

type OverviewTab = 'work-items' | 'inspections' | 'sage-catches';

interface ActivityRow {
  name: string;
  last3Days: number;
  days3to7: number;
  days8to30: number;
}

interface ActivityTables {
  locationRows: ActivityRow[];
  employeeRows: ActivityRow[];
}

const tabs: { id: OverviewTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'work-items', label: 'Work Items', icon: 'construct-outline' },
  { id: 'inspections', label: 'Inspections', icon: 'clipboard-outline' },
  { id: 'sage-catches', label: 'Sage Catches', icon: 'warning-outline' },
];

const extraLocations = [
  'Fort Collins',
  'Temple Diablo Stadium',
  'Toyota | Tennessee',
  'Beehive Academy',
  'History Colorado Center',
  'Toyota | Missouri',
  'AEB Warehouse',
  'Solestial',
  'City of Montebello',
];

const extraEmployees = [
  'Nancy Alfaro',
  'Benjamin Fernandez',
  'Nicolas Bustamante Oroz',
  'Raul Delgadillo',
  'Nataly Marquez',
  'Edgar Borja',
  'Jorge Coretto',
  'Angie Jones',
  'Luis Gonzalez',
  'Katie Peralta',
];

const scoreFor = (seed: number, tab: OverviewTab) => {
  const multipliers: Record<OverviewTab, number[]> = {
    'work-items': [3, 5, 7],
    inspections: [2, 4, 8],
    'sage-catches': [1, 3, 6],
  };

  const [a, b, c] = multipliers[tab];

  const toValue = (n: number, high = false) => {
    if (n % 5 === 0) return 0;
    if (n % 7 === 0) return 1;
    const value = high ? (n % 22) + 3 : (n % 8) + 1;
    return value;
  };

  return {
    last3Days: toValue(seed * a),
    days3to7: toValue(seed * b),
    days8to30: toValue(seed * c, true),
  };
};

const buildOverviewData = (): Record<OverviewTab, ActivityTables> => {
  const locationNames = [...mockSites.map((site) => site.name), ...extraLocations];
  const employeeNames = [...mockEmployees.map((employee) => employee.name), ...extraEmployees];

  return {
    'work-items': {
      locationRows: locationNames.map((name, index) => ({ name, ...scoreFor(index + 2, 'work-items') })),
      employeeRows: employeeNames.map((name, index) => ({ name, ...scoreFor(index + 4, 'work-items') })),
    },
    inspections: {
      locationRows: locationNames.map((name, index) => ({ name, ...scoreFor(index + 3, 'inspections') })),
      employeeRows: employeeNames.map((name, index) => ({ name, ...scoreFor(index + 7, 'inspections') })),
    },
    'sage-catches': {
      locationRows: locationNames.map((name, index) => ({ name, ...scoreFor(index + 5, 'sage-catches') })),
      employeeRows: employeeNames.map((name, index) => ({ name, ...scoreFor(index + 9, 'sage-catches') })),
    },
  };
};

const badgeTone = (value: number): { bg: string; border: string; text: string } => {
  if (value === 0) return { bg: '#ffffff', border: '#d1d5db', text: '#6b7280' };
  if (value <= 3) return { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af' };
  if (value <= 8) return { bg: '#ffedd5', border: '#fdba74', text: '#9a3412' };
  return { bg: '#d1fae5', border: '#86efac', text: '#166534' };
};

const CountBadge = ({ value }: { value: number }) => {
  const tone = badgeTone(value);

  return (
    <View
      style={{ backgroundColor: tone.bg, borderColor: tone.border }}
      className="h-6 min-w-8 items-center justify-center rounded border px-2"
    >
      <Text style={{ color: tone.text }} className="text-xs font-semibold">
        {value}
      </Text>
    </View>
  );
};

const ActivityTable = ({
  title,
  rows,
  selectedName,
}: {
  title: string;
  rows: ActivityRow[];
  selectedName?: string;
}) => {
  return (
    <Card style={{ flex: 1 }}>
      <Text className="text-base font-bold text-slate-900">{title}</Text>
      <Text className="mb-3 mt-1 text-xs text-slate-500">Activity tracking across different time periods</Text>

      <View className="rounded-md border border-slate-200 bg-slate-50">
        <View className="flex-row items-center border-b border-slate-200 px-3 py-2">
          <Text className="flex-1 text-xs font-semibold text-slate-500">Name</Text>
          <Text className="w-16 text-center text-[11px] font-semibold text-slate-500">Last 3 Days</Text>
          <Text className="w-16 text-center text-[11px] font-semibold text-slate-500">3-7 Days</Text>
          <Text className="w-16 text-center text-[11px] font-semibold text-slate-500">8-30 Days</Text>
        </View>

        {rows.map((row) => {
          const active = selectedName === row.name;
          return (
            <View key={row.name} className="flex-row items-center border-b border-slate-100 px-3 py-2">
              <View className="flex-1 pr-2">
                <Text className={`text-xs ${active ? 'font-semibold text-brand-700' : 'text-slate-700'}`}>{row.name}</Text>
              </View>
              <View className="w-16 items-center">
                <CountBadge value={row.last3Days} />
              </View>
              <View className="w-16 items-center">
                <CountBadge value={row.days3to7} />
              </View>
              <View className="w-16 items-center">
                <CountBadge value={row.days8to30} />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
};

export const AnalyticsOverviewActivity = () => {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<OverviewTab>('inspections');
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);

  const selectedSiteName = useMemo(() => mockSites.find((site) => site.id === selectedSiteId)?.name, [selectedSiteId]);
  const data = useMemo(() => buildOverviewData(), []);
  const activeData = data[activeTab];
  const stacked = width < 1180;

  return (
    <View className="gap-3">
      <View className="flex-row flex-wrap gap-2">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`min-h-10 flex-row items-center gap-2 rounded-lg border px-3 ${
                selected ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white'
              }`}
            >
              <Ionicons name={tab.icon} size={14} color={selected ? '#1f5b41' : '#64748b'} />
              <Text className={`text-sm font-semibold ${selected ? 'text-brand-800' : 'text-slate-600'}`}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View className={`${stacked ? 'gap-3' : 'flex-row gap-3'}`}>
        <ActivityTable title="Location Activity" rows={activeData.locationRows} selectedName={selectedSiteName} />
        <ActivityTable title="Employee Performance Activity" rows={activeData.employeeRows} />
      </View>
    </View>
  );
};
