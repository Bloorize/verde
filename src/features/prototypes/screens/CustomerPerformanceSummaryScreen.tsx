import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';
import { customerPerformanceSummary } from '@/src/features/prototypes/data/customerPerformanceSummary';
import { customerPerformanceSummaryRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

type CustomerFeedbackState = 'pending' | 'approved' | 'needs-edit';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const CustomerPerformanceSummaryScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = shouldUsePrototypeDesktopLayout(width);
  const [feedbackState, setFeedbackState] = useState<CustomerFeedbackState>('pending');
  const feedbackTitle =
    feedbackState === 'pending'
      ? 'Awaiting customer review'
      : feedbackState === 'approved'
        ? 'Approved for customer share-out'
        : 'Edits requested before share-out';
  const feedbackDetail =
    feedbackState === 'pending'
      ? 'Use the demo controls to either approve the summary or send it back for one more revision pass.'
      : feedbackState === 'approved'
        ? 'The summary is ready to send with this month’s customer-facing recap.'
        : 'Hold the share-out until the narrative is tightened for the next customer review pass.';
  const approveSummaryLabel = useLocalizedText('Approve summary');
  const requestEditsLabel = useLocalizedText('Request edits');
  const localizedFeedbackTitle = useLocalizedText(feedbackTitle);
  const localizedFeedbackDetail = useLocalizedText(feedbackDetail);

  return (
    <PrototypePageShell testID="customer-performance-summary-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={customerPerformanceSummaryRoute} />

        <PrototypeHeader
          title={customerPerformanceSummary.headerTitle}
          subtitle={customerPerformanceSummary.headerSubtitle}
        />

        <View className={`gap-4 ${isDesktop ? 'flex-row items-start' : ''}`}>
          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-base font-semibold text-slate-900">
                  <LocalizedValue value={customerPerformanceSummary.overviewTitle} />
                </Text>
                <View className="flex-row items-end gap-3">
                  <Text className="text-5xl font-bold tracking-tight text-slate-900">
                    <LocalizedValue value={customerPerformanceSummary.overviewValue} />
                  </Text>
                  <Text className="pb-1 text-sm font-semibold text-slate-600">
                    <LocalizedValue value={customerPerformanceSummary.overviewLabel} />
                  </Text>
                </View>
                <Text className="text-sm leading-5 text-slate-600">
                  <LocalizedValue value={customerPerformanceSummary.overviewContext} />
                </Text>
              </View>

              <View className="gap-3">
                {customerPerformanceSummary.metrics.map((metric) => (
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

          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-3">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={customerPerformanceSummary.highlightsTitle} />
              </Text>
              <View className="gap-3">
                {customerPerformanceSummary.highlights.map((highlight) => (
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
        </View>

        <PrototypeSectionCard>
          <View className="gap-3">
            <Text className="text-base font-semibold text-slate-900">
              <LocalizedValue value={customerPerformanceSummary.summaryTitle} />
            </Text>
            <Text className="text-sm leading-6 text-slate-700">
              <LocalizedValue value={customerPerformanceSummary.summaryText} />
            </Text>
            <View className="gap-3 border-t border-slate-100 pt-3">
              <View className="flex-row flex-wrap gap-2">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={approveSummaryLabel}
                  accessibilityState={{ selected: feedbackState === 'approved' }}
                  onPress={() => setFeedbackState('approved')}
                  className={`rounded-md px-3 py-2 ${feedbackState === 'approved' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                >
                  <Text className={`text-sm font-semibold ${feedbackState === 'approved' ? 'text-white' : 'text-slate-700'}`}>
                    {approveSummaryLabel}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={requestEditsLabel}
                  accessibilityState={{ selected: feedbackState === 'needs-edit' }}
                  onPress={() => setFeedbackState('needs-edit')}
                  className={`rounded-md px-3 py-2 ${feedbackState === 'needs-edit' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                >
                  <Text
                    className={`text-sm font-semibold ${feedbackState === 'needs-edit' ? 'text-white' : 'text-slate-700'}`}
                  >
                    {requestEditsLabel}
                  </Text>
                </Pressable>
              </View>
              <View className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                <Text className="text-sm font-semibold text-slate-900">{localizedFeedbackTitle}</Text>
                <Text className="mt-1 text-sm leading-5 text-slate-600">{localizedFeedbackDetail}</Text>
              </View>
            </View>
          </View>
        </PrototypeSectionCard>
      </View>
    </PrototypePageShell>
  );
};

export default CustomerPerformanceSummaryScreen;
