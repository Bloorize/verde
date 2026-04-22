import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';
import { monthlyOperationalNarrative } from '@/src/features/prototypes/data/monthlyOperationalNarrative';
import { monthlyOperationalNarrativeRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const narrativeMonths = [
  {
    headerSubtitle: 'Southwest District - March 2026',
    summaryText:
      'March finished with stronger late-shift coverage than expected, but repeat cleaning misses still clustered around two high-traffic accounts.',
    sections: [
      {
        title: 'What improved',
        body: 'Weekly supervisor recaps started to surface repeat issues sooner, which helped teams close open items before the next inspection cycle.',
      },
      {
        title: 'What needs attention',
        body: 'Restroom detail work at ASU Downtown and Phoenix Medical Center still slipped when overtime staffing filled the final shift.',
      },
      {
        title: 'What we are watching next month',
        body: 'The main question is whether those two accounts can hold morning-ready conditions without relying on cleanup recovery from day porters.',
      },
    ],
  },
  {
    headerSubtitle: monthlyOperationalNarrative.headerSubtitle,
    summaryText: monthlyOperationalNarrative.summaryText,
    sections: monthlyOperationalNarrative.sections,
  },
  {
    headerSubtitle: 'Southwest District - May 2026',
    summaryText:
      'May opened with steadier staffing plans, but the district is still tracking whether recent gains can hold through heavier event traffic and summer turnover.',
    sections: [
      {
        title: 'What improved',
        body: 'Leadership handoffs are landing more cleanly, which has reduced the lag between inspection findings and same-day follow-up.',
      },
      {
        title: 'What needs attention',
        body: 'Visitor-facing restrooms remain the first place visible misses show up when teams fall behind during double-shift coverage.',
      },
      {
        title: 'What we are watching next month',
        body: 'The next signal is whether closure speed stays high once seasonal staffing changes settle into the district.',
      },
    ],
  },
] as const;

type DocumentState = 'draft' | 'saved' | 'exported';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const MonthlyOperationalNarrativeScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = shouldUsePrototypeDesktopLayout(width);
  const [monthIndex, setMonthIndex] = useState(1);
  const [documentState, setDocumentState] = useState<DocumentState>('draft');
  const activeMonth = narrativeMonths[monthIndex];
  const [firstSection, secondSection, thirdSection] = activeMonth.sections;
  const documentStatus =
    documentState === 'draft'
      ? 'Draft ready for review'
      : documentState === 'saved'
        ? 'Draft saved locally'
        : 'Export prepared for sharing';
  const previousMonthLabel = useLocalizedText('Previous month');
  const nextMonthLabel = useLocalizedText('Next month');
  const saveDraftLabel = useLocalizedText('Save draft');
  const prepareExportLabel = useLocalizedText('Prepare export');
  const localizedDocumentStatus = useLocalizedText(documentStatus);

  return (
    <PrototypePageShell testID="monthly-operational-narrative-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={monthlyOperationalNarrativeRoute} />

        <PrototypeHeader
          title={monthlyOperationalNarrative.headerTitle}
          subtitle={activeMonth.headerSubtitle}
        />

        <PrototypeSectionCard>
          <View className={`gap-3 ${isDesktop ? 'flex-row items-center justify-between' : ''}`}>
            <View className="flex-row flex-wrap gap-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={previousMonthLabel}
                accessibilityState={{ disabled: monthIndex === 0 }}
                disabled={monthIndex === 0}
                onPress={() => setMonthIndex((current) => Math.max(0, current - 1))}
                className={`rounded-md px-3 py-2 ${monthIndex === 0 ? 'bg-slate-100' : 'border border-brand-100 bg-white'}`}
              >
                <Text className={`text-sm font-semibold ${monthIndex === 0 ? 'text-slate-400' : 'text-slate-700'}`}>
                  {previousMonthLabel}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={nextMonthLabel}
                accessibilityState={{ disabled: monthIndex === narrativeMonths.length - 1 }}
                disabled={monthIndex === narrativeMonths.length - 1}
                onPress={() => setMonthIndex((current) => Math.min(narrativeMonths.length - 1, current + 1))}
                className={`rounded-md px-3 py-2 ${monthIndex === narrativeMonths.length - 1 ? 'bg-slate-100' : 'border border-brand-100 bg-white'}`}
              >
                <Text
                  className={`text-sm font-semibold ${monthIndex === narrativeMonths.length - 1 ? 'text-slate-400' : 'text-slate-700'}`}
                >
                  {nextMonthLabel}
                </Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={saveDraftLabel}
                accessibilityState={{ selected: documentState === 'saved' }}
                onPress={() => setDocumentState('saved')}
                className={`rounded-md px-3 py-2 ${documentState === 'saved' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
              >
                <Text className={`text-sm font-semibold ${documentState === 'saved' ? 'text-white' : 'text-slate-700'}`}>
                  {saveDraftLabel}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={prepareExportLabel}
                accessibilityState={{ selected: documentState === 'exported' }}
                onPress={() => setDocumentState('exported')}
                className={`rounded-md px-3 py-2 ${documentState === 'exported' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
              >
                <Text
                  className={`text-sm font-semibold ${documentState === 'exported' ? 'text-white' : 'text-slate-700'}`}
                >
                  {prepareExportLabel}
                </Text>
              </Pressable>
            </View>
          </View>
          <Text className="mt-3 text-sm text-slate-600">{localizedDocumentStatus}</Text>
        </PrototypeSectionCard>

        <PrototypeSectionCard>
          <View className="gap-3">
            <Text className="text-base font-semibold text-slate-900">
              <LocalizedValue value={monthlyOperationalNarrative.summaryTitle} />
            </Text>
            <Text className="text-sm leading-6 text-slate-700">
              <LocalizedValue value={activeMonth.summaryText} />
            </Text>
          </View>
        </PrototypeSectionCard>

        <View className={`gap-4 ${isDesktop ? 'flex-row items-start' : ''}`}>
          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-3">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={firstSection.title} />
              </Text>
              <Text className="text-sm leading-6 text-slate-700">
                <LocalizedValue value={firstSection.body} />
              </Text>
            </View>
          </PrototypeSectionCard>

          <PrototypeSectionCard className={isDesktop ? 'flex-1' : undefined}>
            <View className="gap-3">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={secondSection.title} />
              </Text>
              <Text className="text-sm leading-6 text-slate-700">
                <LocalizedValue value={secondSection.body} />
              </Text>
            </View>
          </PrototypeSectionCard>
        </View>

        <PrototypeSectionCard>
          <View className="gap-3">
            <Text className="text-base font-semibold text-slate-900">
              <LocalizedValue value={thirdSection.title} />
            </Text>
            <Text className="text-sm leading-6 text-slate-700">
              <LocalizedValue value={thirdSection.body} />
            </Text>
          </View>
        </PrototypeSectionCard>
      </View>
    </PrototypePageShell>
  );
};

export default MonthlyOperationalNarrativeScreen;
