import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import {
  incidentSeverityClassification,
  type IncidentSeverityKey,
} from '@/src/features/prototypes/data/incidentSeverityClassification';
import { incidentSeverityClassificationRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

const severityTokens: Record<
  IncidentSeverityKey,
  {
    cardBorder: string;
    cardBackground: string;
    iconBackground: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    labelColor: string;
    badgeBackground: string;
    badgeColor: string;
    badgeBorderColor: string;
    barColor: string;
    dotColor: string;
  }
> = {
  firstaid: {
    cardBorder: '#dbeafe',
    cardBackground: '#eff6ff',
    iconBackground: '#3b82f6',
    iconName: 'water-outline',
    iconColor: '#ffffff',
    labelColor: '#1d4ed8',
    badgeBackground: '#dbeafe',
    badgeColor: '#1d4ed8',
    badgeBorderColor: '#3b82f6',
    barColor: '#3b82f6',
    dotColor: '#3b82f6',
  },
  recordable: {
    cardBorder: '#fef3c7',
    cardBackground: '#fffbeb',
    iconBackground: '#f59e0b',
    iconName: 'warning-outline',
    iconColor: '#ffffff',
    labelColor: '#b45309',
    badgeBackground: '#fef3c7',
    badgeColor: '#92400e',
    badgeBorderColor: '#f59e0b',
    barColor: '#f59e0b',
    dotColor: '#f59e0b',
  },
  serious: {
    cardBorder: '#fecaca',
    cardBackground: '#fef2f2',
    iconBackground: '#ef4444',
    iconName: 'medical-outline',
    iconColor: '#ffffff',
    labelColor: '#b91c1c',
    badgeBackground: '#fecaca',
    badgeColor: '#b91c1c',
    badgeBorderColor: '#ef4444',
    barColor: '#ef4444',
    dotColor: '#ef4444',
  },
};

const MetaBadge = ({ label, tone }: { label: string; tone: 'amber' | 'blue' }) => (
  <View
    className="rounded-full border px-3 py-1"
    style={{
      backgroundColor: tone === 'amber' ? '#fffbeb' : '#eff6ff',
      borderColor: tone === 'amber' ? '#fef3c7' : '#dbeafe',
    }}
  >
    <Text
      className="text-[11px] font-bold"
      style={{ color: tone === 'amber' ? '#b45309' : '#1d4ed8', letterSpacing: 0.3 }}
    >
      <LocalizedValue value={label} />
    </Text>
  </View>
);

const ChecklistRow = ({ text, done }: { text: string; done: boolean }) => (
  <View className={`flex-row items-center gap-3 ${done ? '' : 'opacity-95'}`}>
    <View
      className="h-[22px] w-[22px] items-center justify-center rounded-md"
      style={{
        backgroundColor: done ? '#dcfce7' : '#fff7ed',
        borderWidth: done ? 0 : 1.5,
        borderColor: done ? 'transparent' : '#fdba74',
      }}
    >
      <Text className="text-[12px] font-bold" style={{ color: done ? '#166534' : '#c2410c' }}>
        {done ? '\u2713' : '\u25a1'}
      </Text>
    </View>
    <Text className="flex-1 text-[13px] font-medium leading-5" style={{ color: done ? '#173025' : '#92400e' }}>
      <LocalizedValue value={text} />
    </Text>
  </View>
);

export const IncidentSeverityClassificationScreen = () => {
  const [overrideSeverity, setOverrideSeverity] = useState<IncidentSeverityKey | null>(null);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const incident = incidentSeverityClassification.incidents[0];
  const severity = overrideSeverity ?? incident.severity;
  const severityToken = severityTokens[severity];
  const acceptedLabel = useLocalizedText(incidentSeverityClassification.acceptedLabel);
  const acceptLabel = useLocalizedText(incidentSeverityClassification.acceptLabel);
  const overrideLabel = useLocalizedText(incidentSeverityClassification.overrideLabel);
  const addNotesLabel = useLocalizedText(incidentSeverityClassification.addNotesLabel);

  const handleOverride = (nextSeverity: IncidentSeverityKey) => {
    setOverrideSeverity(nextSeverity);
    setOverrideOpen(false);
    setIsAccepted(false);
  };

  const visibleSeverityLabel =
    severity === 'firstaid' ? 'FIRST AID' : severity === 'recordable' ? 'RECORDABLE' : 'SERIOUS';

  return (
    <ScrollView
      testID="incident-severity-classification-screen"
      style={{ flex: 1, backgroundColor: '#f4f7f5' }}
      contentContainerStyle={{ alignItems: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full max-w-[904px]" style={{ minHeight: 620 }}>
        <View className="px-4 pt-4">
          <PrototypePager route={incidentSeverityClassificationRoute} />
        </View>

        <View style={{ backgroundColor: '#f4f7f5' }}>
          <View
            className="flex-row items-center justify-between border-b px-7 py-3"
            style={{ backgroundColor: '#ffffff', borderBottomColor: '#dcefe4' }}
          >
            <View
              className="flex-row items-center rounded-full border px-4 py-1.5"
              style={{ backgroundColor: '#f3faf6', borderColor: '#dcefe4' }}
            >
              <View className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: '#2f7a58' }} />
              <Text className="text-[13px] font-semibold text-[#1d4d38]">
                <LocalizedValue value={incidentSeverityClassification.siteName} />
              </Text>
            </View>
            <View className="h-[30px] w-[30px] items-center justify-center rounded-full bg-[#245f45]">
              <Text className="text-[12px] font-bold text-white">
                <LocalizedValue value={incidentSeverityClassification.avatarInitials} />
              </Text>
            </View>
          </View>

          <View className="px-7 pb-20 pt-7">
            <Text className="text-[22px] font-extrabold text-[#173025]">
              <LocalizedValue value={incidentSeverityClassification.pageTitle} />
            </Text>
            <Text className="mb-6 mt-1 text-[13px] font-semibold text-[#6b8078]">
              <LocalizedValue value={incident.caseId} />
            </Text>

            <View
              className="mb-5 rounded-2xl border bg-white px-6 py-[22px]"
              style={{ borderColor: '#dcefe4', shadowColor: '#0d2118', shadowOpacity: 0.08, shadowRadius: 24 }}
            >
              <Text className="mb-[14px] text-[17px] font-bold text-[#173025]">
                <LocalizedValue value={incident.title} />
              </Text>
              <View className="mb-4 flex-row flex-wrap items-center gap-3">
                <MetaBadge label={incident.type} tone="amber" />
                <MetaBadge label={incident.status} tone="blue" />
                <View className="h-4 w-px" style={{ backgroundColor: '#dcefe4' }} />
                <Text className="text-[12px] text-[#6b8078]">
                  Submitted by{' '}
                  <Text className="font-semibold text-[#173025]">
                    <LocalizedValue value={incident.submitter} />
                  </Text>
                </Text>
                <View className="h-4 w-px" style={{ backgroundColor: '#dcefe4' }} />
                <Text className="text-[12px] text-[#6b8078]">
                  <LocalizedValue value={incident.submitTime} />
                </Text>
              </View>
              <View className="border-t pt-[14px]" style={{ borderTopColor: '#dcefe4' }}>
                <Text className="text-[14px] leading-6 text-[#3a5c4e]">
                  <LocalizedValue value={incident.description} />
                </Text>
              </View>
            </View>

            <View
              className="overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: isAccepted ? '#b7dac4' : severityToken.cardBorder }}
            >
              <View
                className="flex-row items-center gap-[10px] border-b px-[22px] py-[14px]"
                style={{
                  backgroundColor: isAccepted ? '#f3faf6' : severityToken.cardBackground,
                  borderBottomColor: 'rgba(0,0,0,0.06)',
                }}
              >
                <View
                  className="h-7 w-7 items-center justify-center rounded-lg"
                  style={{ backgroundColor: isAccepted ? '#245f45' : severityToken.iconBackground }}
                >
                  <Ionicons
                    name={severityToken.iconName}
                    size={14}
                    color={severityToken.iconColor}
                  />
                </View>
                <Text
                  className="text-[13px] font-bold"
                  style={{ color: isAccepted ? '#1d4d38' : severityToken.labelColor }}
                >
                  <LocalizedValue value={incidentSeverityClassification.aiLabel} />
                </Text>
              </View>

              <View className="px-6 py-6">
                <View
                  className="mb-5 self-start rounded-full border-2 px-7 py-2.5"
                  style={{
                    backgroundColor: isAccepted ? '#f3faf6' : severityToken.badgeBackground,
                    borderColor: isAccepted ? '#2f7a58' : severityToken.badgeBorderColor,
                  }}
                >
                  <Text
                    className="text-[18px] font-extrabold"
                    style={{ color: severityToken.badgeColor, letterSpacing: 1.1 }}
                  >
                    {isAccepted ? `CONFIRMED: ${visibleSeverityLabel}` : visibleSeverityLabel}
                  </Text>
                </View>

                <Text className="mb-5 text-[14px] leading-6 text-[#3a5c4e]">
                  <LocalizedValue value={incident.rationale} />
                </Text>

                <View className="mb-6 flex-row items-center gap-3">
                  <Text className="text-[12px] font-bold text-[#6b8078]">
                    <LocalizedValue value={incident.confidenceText} />
                  </Text>
                  <View className="h-1.5 max-w-[180px] flex-1 overflow-hidden rounded-full bg-[#e8ede9]">
                    <View
                      className="h-full rounded-full"
                      style={{ width: `${incident.confidence}%`, backgroundColor: severityToken.barColor }}
                    />
                  </View>
                </View>

                <Text className="mb-3 text-[12px] font-bold uppercase tracking-[1px] text-[#6b8078]">
                  Required Steps
                </Text>
                <View className="mb-6 gap-[10px]">
                  {incident.steps.map((step) => (
                    <ChecklistRow key={step.text} text={step.text} done={step.done} />
                  ))}
                </View>

                <View
                  className="relative flex-row items-center gap-[10px] border-t pt-5"
                  style={{ borderTopColor: '#dcefe4' }}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={acceptLabel}
                    onPress={() => {
                      if (!isAccepted) {
                        setIsAccepted(true);
                        setOverrideOpen(false);
                      }
                    }}
                    className="rounded-[10px] px-6 py-3"
                    style={{ backgroundColor: isAccepted ? '#166534' : '#245f45' }}
                  >
                    <Text className="text-[14px] font-bold text-white">
                      {isAccepted ? acceptedLabel : acceptLabel}
                    </Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={overrideLabel}
                    onPress={() => setOverrideOpen((current) => !current)}
                    className="rounded-[10px] border px-5 py-[11px]"
                    style={{ borderColor: '#b7dac4' }}
                  >
                    <Text className="text-[14px] font-bold text-[#1d4d38]">{overrideLabel}</Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={addNotesLabel}
                    className="rounded-[10px] px-4 py-[11px]"
                  >
                    <Text className="text-[14px] font-semibold text-[#6b8078]">{addNotesLabel}</Text>
                  </Pressable>

                  {overrideOpen ? (
                    <View
                      className="absolute left-[140px] top-[54px] z-10 min-w-[180px] rounded-xl border bg-white p-1.5"
                      style={{
                        borderColor: '#dcefe4',
                        shadowColor: '#000',
                        shadowOpacity: 0.12,
                        shadowRadius: 16,
                        shadowOffset: { width: 0, height: 8 },
                      }}
                    >
                      {incidentSeverityClassification.overrideOptions.map((option) => {
                        const optionToken = severityTokens[option.severity];

                        return (
                          <Pressable
                            key={option.label}
                            accessibilityRole="button"
                            accessibilityLabel={option.label}
                            onPress={() => handleOverride(option.severity)}
                            className="flex-row items-center gap-[10px] rounded-lg px-[14px] py-[10px]"
                          >
                            <View
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: optionToken.dotColor }}
                            />
                            <Text className="text-[13px] font-semibold text-[#173025]">
                              <LocalizedValue value={option.label} />
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IncidentSeverityClassificationScreen;
