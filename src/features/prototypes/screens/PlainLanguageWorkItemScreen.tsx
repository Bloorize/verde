import { useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

import { PrototypeExpander } from '@/src/features/prototypes/components/PrototypeExpander';
import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypeLanguageToggle } from '@/src/features/prototypes/components/PrototypeLanguageToggle';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { PrototypeStepList } from '@/src/features/prototypes/components/PrototypeStepList';
import { plainLanguageWorkItemRoute } from '@/src/features/prototypes/types';
import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';
import {
  plainLanguageWorkItem,
  type PlainLanguageWorkItemLanguage,
} from '@/src/features/prototypes/data/plainLanguageWorkItem';

const languageToggleOptions = ['EN', 'ES'] as const;

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const PlainLanguageWorkItemScreen = () => {
  const { width } = useWindowDimensions();
  const [language, setLanguage] = useState<PlainLanguageWorkItemLanguage>('en');
  const [completed, setCompleted] = useState(false);
  const isDesktop = shouldUsePrototypeDesktopLayout(width);
  const localizedContent = plainLanguageWorkItem.translations[language];
  const selectedLanguageOption = language === 'en' ? 'EN' : 'ES';
  const localizedCompleteLabel = useLocalizedText(plainLanguageWorkItem.completeLabel);
  const localizedCompletedLabel = useLocalizedText(plainLanguageWorkItem.completedLabel);
  const localizedDoneMessage = useLocalizedText(plainLanguageWorkItem.doneMessage);

  const locationSection = (
    <PrototypeSectionCard>
      <View className="flex-row items-start gap-3">
        <View className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-600" />
        <View className="flex-1">
          <Text className="text-sm font-semibold text-slate-900">
            <LocalizedValue value={plainLanguageWorkItem.locationTitle} />
          </Text>
          <Text className="mt-1 text-xs font-medium text-slate-600">
            <LocalizedValue value={plainLanguageWorkItem.dueLabel} />
          </Text>
        </View>
      </View>
    </PrototypeSectionCard>
  );

  const translationSection = (
    <PrototypeSectionCard>
      <View className="gap-4">
        <View className={`gap-3 ${isDesktop ? 'flex-row items-center justify-between' : ''}`}>
          <Text className="text-sm font-semibold text-brand-700">
            <LocalizedValue value={plainLanguageWorkItem.aiSectionTitle} />
          </Text>
          <PrototypeLanguageToggle
            options={[...languageToggleOptions]}
            value={selectedLanguageOption}
            onChange={(value) => setLanguage(value === 'ES' ? 'es' : 'en')}
          />
        </View>

        <Text className="text-xl font-bold leading-7 text-slate-900">{localizedContent.title}</Text>

        <PrototypeStepList steps={[...localizedContent.steps]} />

        <View className="rounded-r-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
          <Text className="text-xs font-semibold uppercase tracking-wide text-amber-900">
            <LocalizedValue value={plainLanguageWorkItem.whyLabel} />
          </Text>
          <Text className="mt-1 text-sm leading-5 text-amber-950">
            <LocalizedValue value={plainLanguageWorkItem.whyText} />
          </Text>
        </View>

        <Text className="text-xs font-semibold text-slate-600">
          <LocalizedValue value={plainLanguageWorkItem.estimate} />
        </Text>
      </View>
    </PrototypeSectionCard>
  );

  const notesSection = (
    <PrototypeExpander title={plainLanguageWorkItem.expanderLabel}>
      <Text className="text-sm italic leading-5 text-slate-600">
        <LocalizedValue value={plainLanguageWorkItem.expanderBody} />
      </Text>
    </PrototypeExpander>
  );

  const completionSection = completed ? (
    <View className="flex-row items-center justify-between gap-3 rounded-lg border border-brand-100 bg-white p-4">
      <View
        accessible
        accessibilityRole="checkbox"
        accessibilityLabel={localizedCompletedLabel}
        accessibilityState={{ checked: true }}
        className="rounded-md bg-brand-50 px-3 py-2"
      >
        <Text className="text-sm font-semibold text-brand-700">{localizedCompletedLabel}</Text>
      </View>
      <Text className="text-sm font-semibold text-slate-600">{localizedDoneMessage}</Text>
    </View>
  ) : (
    <View className="rounded-lg border border-brand-100 bg-white p-4">
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={localizedCompleteLabel}
        accessibilityState={{ checked: false }}
        onPress={() => setCompleted(true)}
        className="self-start rounded-md border border-brand-100 bg-white px-3 py-2"
      >
        <Text className="text-sm font-semibold text-slate-700">{localizedCompleteLabel}</Text>
      </Pressable>
    </View>
  );

  return (
    <PrototypePageShell testID="plain-language-work-item-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={plainLanguageWorkItemRoute} />

        <PrototypeHeader
          title={plainLanguageWorkItem.headerTitle}
          subtitle={plainLanguageWorkItem.headerSubtitle}
          badge={plainLanguageWorkItem.priorityBadge}
        />

        {isDesktop ? (
          <View className="flex-row items-start gap-4">
            <View className="flex-1 gap-4">
              {locationSection}
              {translationSection}
            </View>

            <View className="gap-4" style={{ width: 300, flexShrink: 0 }}>
              {notesSection}
            </View>
          </View>
        ) : (
          <View className="gap-4">
            {locationSection}
            {translationSection}
            {notesSection}
          </View>
        )}

        {completionSection}
      </View>
    </PrototypePageShell>
  );
};

export default PlainLanguageWorkItemScreen;
