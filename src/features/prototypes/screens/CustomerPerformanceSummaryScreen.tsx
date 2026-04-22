import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { customerPerformanceSummary } from '@/src/features/prototypes/data/customerPerformanceSummary';
import { customerPerformanceSummaryRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const CustomerPerformanceSummaryScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1100;
  const [currentSiteId, setCurrentSiteId] = useState<(typeof customerPerformanceSummary.siteTabs)[number]['id']>(
    'estrella',
  );
  const [isApproved, setIsApproved] = useState(false);
  const [isEditPanelVisible, setIsEditPanelVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const localizedApproveLabel = useLocalizedText(customerPerformanceSummary.approveLabel);
  const localizedRequestEditLabel = useLocalizedText(customerPerformanceSummary.requestEditLabel);
  const localizedSubmitFeedbackLabel = useLocalizedText(customerPerformanceSummary.submitFeedbackLabel);
  const localizedFeedbackSentLabel = useLocalizedText(customerPerformanceSummary.feedbackSentLabel);
  const localizedRequestEditPlaceholder = useLocalizedText(customerPerformanceSummary.requestEditPlaceholder);

  const currentSite = useMemo(
    () => customerPerformanceSummary.sites[currentSiteId],
    [currentSiteId],
  );

  const switchSite = (siteId: (typeof customerPerformanceSummary.siteTabs)[number]['id']) => {
    setCurrentSiteId(siteId);
    setIsApproved(false);
    setIsEditPanelVisible(false);
    setFeedbackText('');
    setFeedbackSent(false);
  };

  return (
    <PrototypePageShell testID="customer-performance-summary-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={customerPerformanceSummaryRoute} />

        <View className="overflow-hidden rounded-[18px] border border-[#e7efeb] bg-white">
          <View
            className={`border-b border-[#e7efeb] bg-white px-6 py-4 ${
              isDesktop ? 'flex-row items-center justify-between' : 'gap-3'
            }`}
          >
            <View className="flex-row self-start rounded-[12px] bg-[#eef3ef] p-1">
              {customerPerformanceSummary.siteTabs.map((tab) => {
                const isActive = tab.id === currentSiteId;

                return (
                  <Pressable
                    key={tab.id}
                    accessibilityRole="button"
                    accessibilityLabel={tab.label}
                    accessibilityState={{ selected: isActive }}
                    onPress={() => switchSite(tab.id)}
                    className={`rounded-[10px] px-5 py-3 ${isActive ? 'bg-white' : 'bg-transparent'}`}
                  >
                    <Text className={`text-[14px] font-semibold ${isActive ? 'text-[#21352d]' : 'text-[#73867f]'}`}>
                      <LocalizedValue value={tab.label} />
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text className="text-[14px] font-medium text-[#7b8f88]">
              <LocalizedValue value={customerPerformanceSummary.topBarLabel} />
            </Text>
          </View>

          <View className="bg-[#fbfcfb] px-6 py-7">
            <View
              className="overflow-hidden rounded-[18px] border border-[#e2ebe6] bg-white"
              style={{
                shadowColor: '#0d2118',
                shadowOpacity: 0.08,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 10 },
                elevation: 3,
              }}
            >
              <View className="flex-row items-center bg-[#184e39] px-9 py-8">
                <View className="mr-4 h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-white/18">
                  <Text className="text-[28px] font-extrabold text-white">
                    <LocalizedValue value={currentSite.badgeLetter} />
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[12px] font-bold uppercase text-[#dbece2]"
                    style={{ letterSpacing: 1.2 }}
                  >
                    <LocalizedValue value={customerPerformanceSummary.brandLabel} />
                  </Text>
                  <Text className="mt-1 text-[20px] font-extrabold text-white">
                    <LocalizedValue value={customerPerformanceSummary.reportTitle} />
                  </Text>
                  <Text className="mt-1 text-[14px] font-medium text-[#d9e8df]">
                    <LocalizedValue value={currentSite.meta} />
                  </Text>
                </View>
              </View>

              <View
                className={`items-center justify-center gap-8 px-8 py-10 ${
                  isDesktop ? 'flex-row' : 'flex-col'
                }`}
              >
                <View className="items-center justify-center">
                  <View className="h-[120px] w-[120px] items-center justify-center rounded-full border-[8px] border-[#2f7a58] bg-white">
                    <View className="absolute left-[10px] top-[10px] h-7 w-7 rounded-full bg-white" />
                    <Text className="text-[46px] font-extrabold tracking-[-1px] text-[#18342b]">
                      <LocalizedValue value={currentSite.score} />
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    className="text-[18px] font-bold uppercase text-[#6f8078]"
                    style={{ letterSpacing: 0.8 }}
                  >
                    <LocalizedValue value={customerPerformanceSummary.scoreLabel} />
                  </Text>
                  <Text
                    className={`mt-2 text-[16px] font-bold ${
                      currentSite.trendDirection === 'up' ? 'text-[#2f8a69]' : 'text-[#c25246]'
                    }`}
                  >
                    {currentSite.trendDirection === 'up' ? '\u25b2' : '\u25bc'}{' '}
                    <LocalizedValue value={currentSite.trend} />
                  </Text>
                </View>
              </View>

              <View className={`${isDesktop ? 'flex-row' : ''} border-t border-[#edf2ef]`}>
                {customerPerformanceSummary.metrics.map((metric, index) => {
                  const currentMetric = currentSite.metrics.find((item) => item.id === metric.id);

                  if (!currentMetric) {
                    return null;
                  }

                  return (
                    <View
                      key={metric.id}
                      className={`flex-1 px-8 py-8 ${isDesktop && index < customerPerformanceSummary.metrics.length - 1 ? 'border-r border-[#edf2ef]' : ''} ${!isDesktop && index < customerPerformanceSummary.metrics.length - 1 ? 'border-b border-[#edf2ef]' : ''}`}
                    >
                      <Text
                        className="text-center text-[12px] font-extrabold uppercase text-[#8ca09a]"
                        style={{ letterSpacing: 0.8 }}
                      >
                        <LocalizedValue value={metric.label} />
                      </Text>
                      <Text className="mt-4 text-center text-[28px] font-extrabold text-[#16362c]">
                        <LocalizedValue value={currentMetric.value} />
                      </Text>
                      <Text className="mt-2 text-center text-[13px] leading-[20px] text-[#798c85]">
                        <LocalizedValue value={currentMetric.subtitle} />
                      </Text>
                      <Text
                        className={`mt-3 text-center text-[13px] leading-[20px] ${
                          currentMetric.trendTone === 'positive'
                            ? 'text-[#2c7f5d]'
                            : currentMetric.trendTone === 'negative'
                              ? 'text-[#9b4e45]'
                              : 'text-[#4a6057]'
                        }`}
                      >
                        <LocalizedValue value={currentMetric.trend} />
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View className="border-t border-[#edf2ef] px-9 py-8">
                <View className="flex-row flex-wrap items-center gap-3">
                  <Text className="text-[18px] font-extrabold text-[#16362c]">
                    <LocalizedValue value={customerPerformanceSummary.narrativeTitle} />
                  </Text>
                  <View className="rounded-full border border-[#dcefe4] bg-[#f7fcf9] px-3 py-1">
                    <Text className="text-[12px] font-semibold text-[#2d6c52]">
                      <LocalizedValue value={customerPerformanceSummary.generatedByLabel} />
                    </Text>
                  </View>
                </View>

                <Text className="mt-5 text-[16px] leading-[29px] text-[#3d554d]">
                  <LocalizedValue value={currentSite.narrative} />
                </Text>
              </View>

              <View
                className={`border-t border-[#edf2ef] px-9 py-5 ${
                  isDesktop ? 'flex-row items-center justify-between' : 'gap-2'
                }`}
              >
                <Text className="text-[13px] text-[#93a39d]">
                  <LocalizedValue value={customerPerformanceSummary.preparedByLabel} />
                </Text>
                <Text className="text-[13px] text-[#93a39d]">
                  <LocalizedValue value={customerPerformanceSummary.reviewedByLabel} />
                </Text>
              </View>

              <View className="border-t border-[#edf2ef] px-9 py-6">
                <View className="flex-row flex-wrap gap-3">
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={localizedApproveLabel}
                    onPress={() => setIsApproved(true)}
                    className={`rounded-[12px] px-6 py-4 ${isApproved ? 'bg-[#245f45]' : 'bg-[#2f6f53]'}`}
                  >
                    <Text className="text-[14px] font-bold text-white">
                      {isApproved ? `${localizedApproveLabel} \u2713` : localizedApproveLabel}
                    </Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={localizedRequestEditLabel}
                    onPress={() => {
                      setIsEditPanelVisible((current) => !current);
                      setFeedbackSent(false);
                    }}
                    className="rounded-[12px] border border-[#d8e5df] bg-white px-6 py-4"
                  >
                    <Text className="text-[14px] font-bold text-[#35644e]">{localizedRequestEditLabel}</Text>
                  </Pressable>
                </View>

                {isEditPanelVisible ? (
                  <View className="mt-4 rounded-[14px] border border-[#dfe9e4] bg-[#f9fcfa] p-4">
                    <TextInput
                      accessibilityRole="textbox"
                      multiline
                      value={feedbackText}
                      onChangeText={setFeedbackText}
                      placeholder={localizedRequestEditPlaceholder}
                      placeholderTextColor="#8aa097"
                      className="min-h-[110px] rounded-[12px] border border-[#dce7e1] bg-white px-4 py-3 text-[14px] leading-6 text-[#21352d]"
                      style={{ textAlignVertical: 'top' }}
                    />
                    <View className="mt-3 flex-row items-center gap-3">
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={localizedSubmitFeedbackLabel}
                        onPress={() => {
                          if (!feedbackText.trim()) {
                            return;
                          }
                          setFeedbackSent(true);
                          setFeedbackText('');
                        }}
                        className="rounded-[10px] bg-[#35644e] px-4 py-3"
                      >
                        <Text className="text-[13px] font-bold text-white">{localizedSubmitFeedbackLabel}</Text>
                      </Pressable>

                      {feedbackSent ? (
                        <Text className="text-[13px] font-semibold text-[#35644e]">
                          {localizedFeedbackSentLabel} {'\u2713'}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </PrototypePageShell>
  );
};

export default CustomerPerformanceSummaryScreen;
