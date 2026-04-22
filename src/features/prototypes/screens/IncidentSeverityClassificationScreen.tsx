import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { PrototypeStepList } from '@/src/features/prototypes/components/PrototypeStepList';
import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';
import { incidentSeverityClassification } from '@/src/features/prototypes/data/incidentSeverityClassification';
import { incidentSeverityClassificationRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

type SeverityLevel = 'high' | 'moderate';
type ConfidenceLevel = 'high' | 'needs-review';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const IncidentSeverityClassificationScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = shouldUsePrototypeDesktopLayout(width);
  const [severityLevel, setSeverityLevel] = useState<SeverityLevel>('high');
  const [confidenceLevel, setConfidenceLevel] = useState<ConfidenceLevel>('high');

  const severityLabel = severityLevel === 'high' ? incidentSeverityClassification.severityLabel : 'Moderate severity';
  const severitySummary =
    severityLevel === 'high'
      ? incidentSeverityClassification.severitySummary
      : 'The area was made safe quickly and no injury was reported, so the demo override treats this as a contained operational issue that still needs follow-up.';
  const confidenceLabel = confidenceLevel === 'high' ? 'High confidence' : 'Needs supervisor review';
  const currentAssessmentLabel = useLocalizedText(`Current assessment: ${severityLabel}`);
  const confidenceStatusLabel = useLocalizedText(`Confidence: ${confidenceLabel}`);
  const keepHighLabel = useLocalizedText('Keep high');
  const overrideModerateLabel = useLocalizedText('Override to moderate');
  const highConfidenceButtonLabel = useLocalizedText('Set high confidence');
  const needsReviewButtonLabel = useLocalizedText('Mark needs review');
  const highConfidenceText = useLocalizedText('High confidence');
  const needsReviewText = useLocalizedText('Needs review');

  return (
    <PrototypePageShell testID="incident-severity-classification-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={incidentSeverityClassificationRoute} />

        <PrototypeHeader
          title={incidentSeverityClassification.headerTitle}
          subtitle={incidentSeverityClassification.headerSubtitle}
          badge={incidentSeverityClassification.scoreBadge}
        />

        <View className={`gap-4 ${isDesktop ? 'flex-row items-start' : ''}`}>
          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-4">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={incidentSeverityClassification.summaryTitle} />
              </Text>

              <View className="gap-3">
                <View className="gap-1">
                  <Text className="text-xs font-medium text-slate-500">
                    <LocalizedValue value={incidentSeverityClassification.incidentIdLabel} />
                  </Text>
                  <Text className="text-xl font-bold text-slate-900">
                    <LocalizedValue value={incidentSeverityClassification.incidentId} />
                  </Text>
                </View>

                <View className="gap-1">
                  <Text className="text-xs font-medium text-slate-500">
                    <LocalizedValue value={incidentSeverityClassification.locationLabel} />
                  </Text>
                  <Text className="text-sm leading-5 text-slate-700">
                    <LocalizedValue value={incidentSeverityClassification.location} />
                  </Text>
                </View>

                <View className="gap-1">
                  <Text className="text-xs font-medium text-slate-500">
                    <LocalizedValue value={incidentSeverityClassification.reportedByLabel} />
                  </Text>
                  <Text className="text-sm leading-5 text-slate-700">
                    <LocalizedValue value={incidentSeverityClassification.reportedBy} />
                  </Text>
                </View>
              </View>
            </View>
          </PrototypeSectionCard>

          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-3">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={incidentSeverityClassification.severityTitle} />
              </Text>
              <View className="rounded-r-lg border-l-4 border-rose-500 bg-rose-50 px-4 py-3">
                <Text className="text-xs font-semibold uppercase tracking-wide text-rose-900">
                  <LocalizedValue value={severityLabel} />
                </Text>
                <Text className="mt-1 text-sm leading-5 text-rose-950">
                  <LocalizedValue value={severitySummary} />
                </Text>
              </View>
              <Text className="text-sm leading-6 text-slate-700">
                <LocalizedValue value={incidentSeverityClassification.severityContext} />
              </Text>
              <View className="gap-3 border-t border-slate-100 pt-3">
                <View className="gap-1">
                  <Text className="text-sm font-semibold text-slate-900">{currentAssessmentLabel}</Text>
                  <Text className="text-sm text-slate-600">{confidenceStatusLabel}</Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={keepHighLabel}
                    accessibilityState={{ selected: severityLevel === 'high' }}
                    onPress={() => setSeverityLevel('high')}
                    className={`rounded-md px-3 py-2 ${severityLevel === 'high' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                  >
                    <Text className={`text-sm font-semibold ${severityLevel === 'high' ? 'text-white' : 'text-slate-700'}`}>
                      {keepHighLabel}
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={overrideModerateLabel}
                    accessibilityState={{ selected: severityLevel === 'moderate' }}
                    onPress={() => setSeverityLevel('moderate')}
                    className={`rounded-md px-3 py-2 ${severityLevel === 'moderate' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                  >
                    <Text
                      className={`text-sm font-semibold ${severityLevel === 'moderate' ? 'text-white' : 'text-slate-700'}`}
                    >
                      {overrideModerateLabel}
                    </Text>
                  </Pressable>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={highConfidenceButtonLabel}
                    accessibilityState={{ selected: confidenceLevel === 'high' }}
                    onPress={() => setConfidenceLevel('high')}
                    className={`rounded-md px-3 py-2 ${confidenceLevel === 'high' ? 'bg-slate-900' : 'border border-slate-200 bg-white'}`}
                  >
                    <Text className={`text-sm font-semibold ${confidenceLevel === 'high' ? 'text-white' : 'text-slate-700'}`}>
                      {highConfidenceText}
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={needsReviewButtonLabel}
                    accessibilityState={{ selected: confidenceLevel === 'needs-review' }}
                    onPress={() => setConfidenceLevel('needs-review')}
                    className={`rounded-md px-3 py-2 ${confidenceLevel === 'needs-review' ? 'bg-slate-900' : 'border border-slate-200 bg-white'}`}
                  >
                    <Text
                      className={`text-sm font-semibold ${confidenceLevel === 'needs-review' ? 'text-white' : 'text-slate-700'}`}
                    >
                      {needsReviewText}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </PrototypeSectionCard>
        </View>

        <PrototypeSectionCard>
          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={incidentSeverityClassification.nextActionsTitle} />
              </Text>
              <Text className="text-sm leading-5 text-slate-600">
                <LocalizedValue value={incidentSeverityClassification.nextActionsIntro} />
              </Text>
            </View>

            <PrototypeStepList steps={[...incidentSeverityClassification.nextActions]} />
          </View>
        </PrototypeSectionCard>
      </View>
    </PrototypePageShell>
  );
};

export default IncidentSeverityClassificationScreen;
