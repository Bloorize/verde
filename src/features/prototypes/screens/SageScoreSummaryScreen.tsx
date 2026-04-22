import { useEffect, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { sageScoreSummary } from '@/src/features/prototypes/data/sageScoreSummary';
import { sageScoreSummaryRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

type SageCard = (typeof sageScoreSummary.cards)[number];

const toneTextClassNames = {
  green: 'text-[#16803c]',
  amber: 'text-[#b47d10]',
  red: 'text-[#c42b1c]',
} as const;

const ScoreDetail = ({
  value,
  label,
  valueTone,
}: {
  value: string;
  label: string;
  valueTone?: 'amber' | 'red';
}) => (
  <View className="items-center">
    <Text
      className={`text-[20px] font-extrabold leading-6 text-[#173025] ${
        valueTone ? toneTextClassNames[valueTone] : ''
      }`}
    >
      <LocalizedValue value={value} />
    </Text>
    <Text
      className="mt-1 text-center text-[10px] font-semibold uppercase text-[#6b8078]"
      style={{ letterSpacing: 0.5 }}
    >
      <LocalizedValue value={label} />
    </Text>
  </View>
);

const ScoreCard = ({
  card,
  isDesktop,
  refreshing,
}: {
  card: SageCard;
  isDesktop: boolean;
  refreshing: boolean;
}) => (
  <View
    className="relative overflow-hidden rounded-[14px] border border-[#b7dac4] bg-white"
    style={{
      shadowColor: '#0d2118',
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 5,
      opacity: refreshing ? 0.96 : 1,
    }}
  >
    {refreshing ? <View className="absolute inset-0 z-10 bg-[rgba(47,122,88,0.08)]" pointerEvents="none" /> : null}

    <View className={!isDesktop ? 'min-h-[260px]' : undefined}>
      <View className="flex-row items-start justify-between px-[20px] pb-0 pt-[20px]">
        <Text className="mr-3 flex-1 text-[14px] font-bold leading-[18px] text-[#173025]">
          <LocalizedValue value={card.siteName} />
        </Text>

        <View className="items-end">
          <Text className={`text-[36px] font-extrabold leading-[36px] ${toneTextClassNames[card.scoreTone]}`}>
            <LocalizedValue value={card.score} />
          </Text>
          <Text
            className={`mt-[3px] text-[12px] font-bold ${
              card.trendDirection === 'up' ? 'text-[#16803c]' : 'text-[#c42b1c]'
            }`}
          >
            {card.trendDirection === 'up' ? '\u25b2' : '\u25bc'} <LocalizedValue value={card.trendValue} />
          </Text>
        </View>
      </View>

      <View className="mx-[20px] mt-[18px] self-start rounded-full border border-[#dcefe4] bg-[#f7fcf9] px-[10px] py-[4px]">
        <Text className="text-[10px] font-bold text-[#245f45]">
          {'\u2726'} <LocalizedValue value={sageScoreSummary.sageChipLabel} />
        </Text>
      </View>

      <View className="flex-1 px-[20px] pb-[20px] pt-[12px]">
        <Text className="text-[13px] leading-[23px] text-[#314f43]">
          <LocalizedValue value={card.summary} />
        </Text>
      </View>
    </View>

    <View className="border-t border-[#dcefe4] bg-[#f7fcf9] px-[18px] py-[16px]">
      <View className="flex-row items-start justify-between gap-3">
        {card.details.map((detail) => (
          <View key={detail.label} className="flex-1">
            <ScoreDetail value={detail.value} label={detail.label} valueTone={detail.valueTone} />
          </View>
        ))}
      </View>
    </View>
  </View>
);

export const SageScoreSummaryScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1100;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!refreshing) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setRefreshing(false);
    }, 1800);

    return () => clearTimeout(timeout);
  }, [refreshing]);

  return (
    <PrototypePageShell testID="sage-score-summary-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={sageScoreSummaryRoute} />

        <View className="overflow-hidden rounded-[18px] border border-[#e7efeb] bg-white">
          <View
            className={`border-b border-[#e7efeb] bg-white px-6 py-4 ${
              isDesktop ? 'flex-row items-center justify-between' : 'gap-3'
            }`}
          >
            <View className="self-start rounded-full border border-[#dcefe4] bg-[#f3faf6] px-4 py-[7px]">
              <Text className="text-[13px] font-semibold text-[#1d4d38]">
                <LocalizedValue value={sageScoreSummary.siteSelector} />{' '}
                <Text className="text-[9px] text-[#2f7a58]">{'\u25be'}</Text>
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={sageScoreSummary.refreshLabel}
              className="self-start rounded-[10px] bg-[#245f45] px-4 py-[10px]"
              onPress={() => setRefreshing(true)}
            >
              <Text className="text-[12px] font-bold text-white">
                {'\u21bb'} <LocalizedValue value={sageScoreSummary.refreshLabel} />
              </Text>
            </Pressable>
          </View>

          <View className="bg-[#fbfcfb] px-6 py-7">
            <Text className="text-[23px] font-extrabold text-[#173025]">
              <LocalizedValue value={sageScoreSummary.pageTitle} />
            </Text>
            <Text className="mb-7 mt-1 text-[13px] font-medium text-[#6b8078]">
              <LocalizedValue value={sageScoreSummary.pageSubtitle} />
            </Text>

            <View className={`${isDesktop ? 'flex-row' : 'gap-5'} mb-7 gap-5`}>
              {sageScoreSummary.cards.map((card) => (
                <View key={card.id} className={isDesktop ? 'flex-1' : undefined}>
                  <ScoreCard
                    card={card}
                    isDesktop={isDesktop}
                    refreshing={refreshing}
                  />
                </View>
              ))}
            </View>

            <View className="flex-row items-start gap-3 rounded-[16px] border border-[#dcefe4] bg-[#f7fcf9] px-6 py-5">
              <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-[#245f45]">
                <Text className="text-[14px] text-white">{'\u2726'}</Text>
              </View>
              <View className="flex-1">
                <Text
                  className="mb-1.5 text-[12px] font-extrabold uppercase text-[#1d4d38]"
                  style={{ letterSpacing: 0.8 }}
                >
                  <LocalizedValue value={sageScoreSummary.regionalSummaryLabel} />
                </Text>
                <Text className="text-[13px] leading-[20px] text-[#3d5a4e]">
                  <LocalizedValue value={sageScoreSummary.regionalSummaryText} />
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PrototypePageShell>
  );
};

export default SageScoreSummaryScreen;
