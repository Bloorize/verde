import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { monthlyOperationalNarrative } from '@/src/features/prototypes/data/monthlyOperationalNarrative';
import { monthlyOperationalNarrativeRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const MonthlyOperationalNarrativeScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1100;
  const monthOrder = ['february', 'march'] as const;
  const [monthKey, setMonthKey] = useState<(typeof monthOrder)[number]>('march');
  const [isDownloaded, setIsDownloaded] = useState(false);
  const activeMonth = monthlyOperationalNarrative.months[monthKey];
  const monthIndex = monthOrder.indexOf(monthKey);
  const localizedDownloadLabel = useLocalizedText(
    isDownloaded ? monthlyOperationalNarrative.downloadedLabel : monthlyOperationalNarrative.downloadLabel,
  );
  const localizedShareLabel = useLocalizedText(monthlyOperationalNarrative.shareLabel);

  return (
    <PrototypePageShell testID="monthly-operational-narrative-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={monthlyOperationalNarrativeRoute} />

        <View className="overflow-hidden rounded-[18px] border border-[#e7efeb] bg-white">
          <View
            className={`border-b border-[#e7efeb] bg-white px-6 py-4 ${
              isDesktop ? 'flex-row items-center justify-between' : 'gap-3'
            }`}
          >
            <View className="self-start rounded-full border border-[#dcefe4] bg-[#f3faf6] px-4 py-[7px]">
              <View className="flex-row items-center">
                <View className="mr-2 h-2 w-2 rounded-full bg-[#2f7a58]" />
                <Text className="text-[13px] font-semibold text-[#1d4d38]">
                  <LocalizedValue value={monthlyOperationalNarrative.siteLabel} />
                </Text>
              </View>
            </View>

            <View className={`items-center ${isDesktop ? 'flex-row gap-5' : 'gap-3'}`}>
              <View className="flex-row items-center gap-3 self-start">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Previous month"
                  accessibilityState={{ disabled: monthIndex === 0 }}
                  disabled={monthIndex === 0}
                  onPress={() => {
                    if (monthIndex > 0) {
                      setMonthKey(monthOrder[monthIndex - 1]);
                      setIsDownloaded(false);
                    }
                  }}
                  className="h-9 w-9 items-center justify-center rounded-[10px] border border-[#dce7e1] bg-white"
                >
                  <Text className={`text-[16px] ${monthIndex === 0 ? 'text-[#b6c2bd]' : 'text-[#6a7e77]'}`}>
                    {'\u2190'}
                  </Text>
                </Pressable>
                <Text className="min-w-[110px] text-center text-[14px] font-bold text-[#21352d]">
                  <LocalizedValue value={activeMonth.label} />
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Next month"
                  accessibilityState={{ disabled: monthIndex === monthOrder.length - 1 }}
                  disabled={monthIndex === monthOrder.length - 1}
                  onPress={() => {
                    if (monthIndex < monthOrder.length - 1) {
                      setMonthKey(monthOrder[monthIndex + 1]);
                      setIsDownloaded(false);
                    }
                  }}
                  className="h-9 w-9 items-center justify-center rounded-[10px] border border-[#dce7e1] bg-white"
                >
                  <Text
                    className={`text-[16px] ${
                      monthIndex === monthOrder.length - 1 ? 'text-[#b6c2bd]' : 'text-[#6a7e77]'
                    }`}
                  >
                    {'\u2192'}
                  </Text>
                </Pressable>
              </View>

              <View className="self-start rounded-full border border-[#c9ddcf] bg-[#2f6f53] px-4 py-2">
                <Text className="text-[12px] font-bold text-white">
                  {'\u2726'} <LocalizedValue value={monthlyOperationalNarrative.generatedByLabel} />
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-[#fbfcfb] px-6 py-7">
            <View
              className="rounded-[18px] border border-[#e6eeea] bg-white px-7 py-8"
              style={{
                shadowColor: '#0d2118',
                shadowOpacity: 0.07,
                shadowRadius: 22,
                shadowOffset: { width: 0, height: 10 },
                elevation: 3,
              }}
            >
              <Text className="text-[22px] font-extrabold text-[#173025]">
                <LocalizedValue value={activeMonth.title} />
              </Text>
              <Text className="mb-7 mt-1 text-[13px] font-medium text-[#7b8f88]">
                <LocalizedValue value={activeMonth.timestamp} />
              </Text>

              <View className="border-b border-[#e8efeb] pb-6">
                <Text className="mb-3 text-[16px] font-bold text-[#173025]">
                  <LocalizedValue value={monthlyOperationalNarrative.sectionTitles.executiveSummary} />
                </Text>
                <Text className="text-[15px] leading-[30px] text-[#3c554d]">
                  <LocalizedValue value={activeMonth.summary} />
                </Text>
              </View>

              <View className="border-b border-[#e8efeb] py-6">
                <Text className="mb-3 text-[16px] font-bold text-[#173025]">
                  <LocalizedValue value={monthlyOperationalNarrative.sectionTitles.sitePerformance} />
                </Text>

                <View className="gap-5">
                  {activeMonth.sites.map((site) => (
                    <View key={site.name}>
                      <View className="flex-row flex-wrap items-center gap-2">
                        <Text className="text-[15px] font-bold text-[#173025]">
                          <LocalizedValue value={site.name} />
                        </Text>
                        <View
                          className={`rounded-full px-2 py-0.5 ${
                            site.direction === 'up' ? 'bg-[#ecfbf1]' : 'bg-[#fff1f1]'
                          }`}
                        >
                          <Text
                            className={`text-[12px] font-bold ${
                              site.direction === 'up' ? 'text-[#2f7a58]' : 'text-[#c25246]'
                            }`}
                          >
                            <LocalizedValue value={site.score} />{' '}
                            {site.direction === 'up' ? '\u25b2' : '\u25bc'}
                            <LocalizedValue value={site.delta} />
                          </Text>
                        </View>
                      </View>

                      <View className="mt-2 gap-2">
                        {site.bullets.map((bullet) => (
                          <View key={bullet} className="flex-row items-start gap-3">
                            <Text className="mt-[3px] text-[11px] text-[#2f7a58]">{'\u2022'}</Text>
                            <Text className="flex-1 text-[14px] leading-[24px] text-[#324a42]">
                              <LocalizedValue value={bullet} />
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View className="border-b border-[#e8efeb] py-6">
                <Text className="mb-3 text-[16px] font-bold text-[#173025]">
                  <LocalizedValue value={monthlyOperationalNarrative.sectionTitles.patterns} />
                </Text>

                <View className="gap-2">
                  {activeMonth.patterns.map((pattern) => (
                    <View key={pattern} className="flex-row items-start gap-3">
                      <Text className="mt-[4px] text-[11px] text-[#d4a21a]">{'\u2022'}</Text>
                      <Text className="flex-1 text-[14px] leading-[24px] text-[#324a42]">
                        <LocalizedValue value={pattern} />
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="py-6">
                <Text className="mb-3 text-[16px] font-bold text-[#173025]">
                  <LocalizedValue value={monthlyOperationalNarrative.sectionTitles.actions} />
                </Text>

                <View className="gap-2">
                  {activeMonth.actions.map((action, index) => (
                    <View key={action} className="flex-row items-start gap-3">
                      <View className="mt-[1px] h-5 w-5 items-center justify-center rounded-full bg-[#2f6f53]">
                        <Text className="text-[11px] font-bold text-white">{index + 1}</Text>
                      </View>
                      <Text className="flex-1 text-[14px] leading-[24px] text-[#324a42]">
                        <LocalizedValue value={action} />
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="flex-row flex-wrap gap-3 border-t border-[#e8efeb] pt-6">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={localizedDownloadLabel}
                  onPress={() => setIsDownloaded(true)}
                  className={`rounded-[10px] border px-5 py-3 ${
                    isDownloaded ? 'border-[#c9ddcf] bg-[#ecfbf1]' : 'border-[#dce7e1] bg-white'
                  }`}
                >
                  <Text className="text-[14px] font-bold text-[#274d3d]">
                    {'\u21e9'} {localizedDownloadLabel}
                    {isDownloaded ? ' \u2713' : ''}
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={localizedShareLabel}
                  className="rounded-[10px] border border-[#dce7e1] bg-white px-5 py-3"
                >
                  <Text className="text-[14px] font-bold text-[#274d3d]">
                    {'\u2197'} {localizedShareLabel}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PrototypePageShell>
  );
};

export default MonthlyOperationalNarrativeScreen;
