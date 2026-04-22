import { Text, useWindowDimensions, View } from 'react-native';

import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';
import { sageScoreSummary } from '@/src/features/prototypes/data/sageScoreSummary';
import { sageScoreSummaryRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const SageScoreSummaryScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = shouldUsePrototypeDesktopLayout(width);

  return (
    <PrototypePageShell testID="sage-score-summary-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={sageScoreSummaryRoute} />

        <PrototypeHeader
          title={sageScoreSummary.headerTitle}
          subtitle={sageScoreSummary.headerSubtitle}
        />

        <PrototypeSectionCard>
          <View className={`gap-4 ${isDesktop ? 'flex-row items-start justify-between' : ''}`}>
            <View className="gap-2">
              <Text className="text-sm font-semibold text-slate-600">
                <LocalizedValue value={sageScoreSummary.scoreTitle} />
              </Text>
              <View className="flex-row items-end gap-3">
                <Text className="text-5xl font-bold tracking-tight text-slate-900">
                  <LocalizedValue value={sageScoreSummary.scoreValue} />
                </Text>
                <Text className="pb-1 text-sm font-semibold text-emerald-700">
                  <LocalizedValue value={sageScoreSummary.scoreTrend} />
                </Text>
              </View>
              <Text className="text-sm leading-5 text-slate-600">
                <LocalizedValue value={sageScoreSummary.scoreContext} />
              </Text>
            </View>

            <View className="gap-3" style={isDesktop ? { width: 340, flexShrink: 0 } : undefined}>
              {sageScoreSummary.metrics.map((metric) => (
                <View
                  key={metric.label}
                  className="rounded-md border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <View className="flex-row items-baseline justify-between gap-3">
                    <Text className="text-sm font-semibold text-slate-900">
                      <LocalizedValue value={metric.label} />
                    </Text>
                    <Text className="text-xl font-bold text-slate-900">
                      <LocalizedValue value={metric.value} />
                    </Text>
                  </View>
                  <Text className="mt-1 text-sm leading-5 text-slate-600">
                    <LocalizedValue value={metric.note} />
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </PrototypeSectionCard>

        <View className={`gap-4 ${isDesktop ? 'flex-row items-start' : ''}`}>
          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-3">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={sageScoreSummary.highlightsTitle} />
              </Text>
              <View className="gap-3">
                {sageScoreSummary.highlights.map((highlight) => (
                  <View key={highlight} className="flex-row items-start gap-3">
                    <View className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-600" />
                    <Text className="flex-1 text-sm leading-6 text-slate-700">
                      <LocalizedValue value={highlight} />
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </PrototypeSectionCard>

          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-3">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={sageScoreSummary.narrativeTitle} />
              </Text>
              <Text className="text-sm leading-6 text-slate-700">
                <LocalizedValue value={sageScoreSummary.narrative} />
              </Text>
            </View>
          </PrototypeSectionCard>
        </View>
      </View>
    </PrototypePageShell>
  );
};

export default SageScoreSummaryScreen;
