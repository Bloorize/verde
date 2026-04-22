import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { mockSupabase } from '@/src/lib/mockSupabase';
import { queryKeys } from '@/src/lib/queryKeys';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';
import { useAppStore } from '@/src/store/appStore';
import { themeTokens } from '@/src/theme/tokens';

type ChatMessage = {
  id: string;
  role: 'user' | 'sage';
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    text: 'What should I focus on at this site today?',
  },
  {
    id: 'm2',
    role: 'sage',
    text:
      'Start with aging work items in high-traffic spaces, then review restroom inspection misses from the last 48 hours. Those two areas will move site health fastest.',
  },
  {
    id: 'm3',
    role: 'user',
    text: 'What is the biggest current risk?',
  },
  {
    id: 'm4',
    role: 'sage',
    text:
      'The biggest current risk is overdue corrective work tied to recent failed inspections. If those remain open, the site score and customer confidence will trend down together.',
  },
];

const suggestedPrompts = [
  'Summarize today’s biggest operational risks.',
  'Show me the oldest work items at this site.',
  'What spaces are trending down this month?',
  'What should the manager do next?',
];

const TranslatedMessageText = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value, { alwaysTranslate: true });
  return <>{localizedValue}</>;
};

const TranslatedStaticText = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);
  return <>{localizedValue}</>;
};

export const AskSageWindow = () => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const [draftMessage, setDraftMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const isAskSageOpen = useAppStore((state) => state.isAskSageOpen);
  const setAskSageOpen = useAppStore((state) => state.setAskSageOpen);
  const selectedSiteId = useAppStore((state) => state.selectedSiteId);

  const sitesQuery = useQuery({
    queryKey: queryKeys.sites(),
    queryFn: () => mockSupabase.listSites(),
  });

  const selectedSite = sitesQuery.data?.find((site) => site.id === selectedSiteId)?.name ?? 'Selected Site';
  const isDesktop = width >= 1024;
  const panelWidth = isDesktop ? Math.min(860, width - 340) : Math.min(width - 24, 780);
  const panelHeight = isDesktop ? Math.min(640, height - 80) : Math.min(height - 28, 760);

  if (!isAskSageOpen) {
    return null;
  }

  const pushMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: `user_${Date.now()}`, role: 'user', text: trimmed },
      {
        id: `sage_${Date.now() + 1}`,
        role: 'sage',
        text:
          'This is a prototype response for stakeholder demos. Once the real Sage service is wired in, this panel can answer against inspections, work items, cases, analytics, and site context in real time.',
      },
    ]);
    setDraftMessage('');
  };

  return (
    <View
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 90,
        justifyContent: isDesktop ? 'flex-end' : 'center',
        alignItems: isDesktop ? 'flex-end' : 'center',
        padding: isDesktop ? 24 : 12,
      }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={() => setAskSageOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(1, 10, 8, 0.24)',
        }}
      />

      <View
        style={{
          width: panelWidth,
          height: panelHeight,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: themeTokens.colors.brandPrimary,
          backgroundColor: '#ffffff',
          shadowColor: '#0d2118',
          shadowOpacity: 0.16,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 12 },
          elevation: 8,
          flexDirection: isDesktop ? 'row' : 'column',
        }}
      >
        {isDesktop ? (
          <View
            style={{
              width: 220,
              backgroundColor: '#d8f0df',
              borderRightWidth: 1,
              borderRightColor: 'rgba(31, 100, 83, 0.12)',
              padding: 20,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <View
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 44,
                  borderWidth: 3,
                  borderColor: themeTokens.colors.brandPrimary,
                  backgroundColor: '#d8f0df',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={require('../../../assets/sage_avatar.png')}
                  style={{ width: 78, height: 78 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#0f5a4d' }}>{t('Ask Sage')}</Text>
              <Text style={{ marginTop: 6, fontSize: 15, color: '#185f52' }}>{t('Sage AI Assistant')}</Text>
              <Text style={{ marginTop: 14, fontSize: 13, lineHeight: 20, color: '#35685d' }}>
                {t('Site-aware assistant for inspections, work items, incidents, and operating recommendations.')}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 24,
                borderRadius: 22,
                backgroundColor: 'rgba(255,255,255,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}
            >
              <Image
                source={require('../../../assets/sage_left_rail.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            </View>
          </View>
        ) : null}

        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 22,
              paddingVertical: 18,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(31, 100, 83, 0.1)',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              {!isDesktop ? (
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    borderWidth: 2,
                    borderColor: themeTokens.colors.brandPrimary,
                    backgroundColor: '#d8f0df',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={require('../../../assets/sage_avatar.png')}
                    style={{ width: 46, height: 46 }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}

              <View>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#114f44' }}>{t('Ask Sage')}</Text>
                <Text style={{ marginTop: 4, fontSize: 13, color: '#31675d' }}>{selectedSite}</Text>
              </View>
            </View>

            <Pressable
              onPress={() => setAskSageOpen(false)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3faf6',
                borderWidth: 1,
                borderColor: 'rgba(31, 100, 83, 0.12)',
              }}
            >
              <Ionicons name="close" size={20} color="#1f6453" />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 22, paddingBottom: 18, gap: 18 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <View
                style={{
                  maxWidth: '84%',
                  paddingHorizontal: 18,
                  paddingVertical: 14,
                  borderRadius: 18,
                  borderBottomRightRadius: 6,
                  borderWidth: 2,
                  borderColor: '#1f6453',
                  backgroundColor: '#ffffff',
                }}
              >
                <Text style={{ fontSize: 15, lineHeight: 22, color: '#1f6453' }}>
                  <TranslatedStaticText value="How can I improve site health fastest this week?" />
                </Text>
              </View>
            </View>

            {messages.map((message) => {
              const isUser = message.role === 'user';

              return (
                <View
                  key={message.id}
                  style={{
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  {!isUser ? (
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', maxWidth: '88%' }}>
                      <View
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 17,
                          borderWidth: 1,
                          borderColor: '#1f6453',
                          backgroundColor: '#d8f0df',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                          marginTop: 6,
                        }}
                      >
                        <Image
                          source={require('../../../assets/sage_avatar.png')}
                          style={{ width: 22, height: 22 }}
                          resizeMode="contain"
                        />
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 18,
                          paddingVertical: 15,
                          borderRadius: 18,
                          borderBottomLeftRadius: 6,
                          backgroundColor: '#d8f0df',
                        }}
                      >
                        <Text style={{ fontSize: 15, lineHeight: 22, color: '#1f6453' }}>
                          <TranslatedMessageText value={message.text} />
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        maxWidth: '84%',
                        paddingHorizontal: 18,
                        paddingVertical: 14,
                        borderRadius: 18,
                        borderBottomRightRadius: 6,
                        borderWidth: 2,
                        borderColor: '#1f6453',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <Text style={{ fontSize: 15, lineHeight: 22, color: '#1f6453' }}>
                        <TranslatedMessageText value={message.text} />
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}

            <View style={{ marginTop: 4, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {suggestedPrompts.map((prompt) => (
                <Pressable
                  key={prompt}
                  onPress={() => pushMessage(prompt)}
                  style={{
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: '#cce8d5',
                    backgroundColor: '#f7fcf8',
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#1f6453' }}>
                    <TranslatedStaticText value={prompt} />
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderTopWidth: 1,
              borderTopColor: 'rgba(31, 100, 83, 0.1)',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#1f6453',
                borderRadius: 30,
                paddingLeft: 16,
                paddingRight: 6,
                paddingVertical: 4,
              }}
            >
              <TextInput
                value={draftMessage}
                onChangeText={setDraftMessage}
                onSubmitEditing={() => pushMessage(draftMessage)}
                placeholder={t('How can I help you today?')}
                placeholderTextColor="#8bb5a8"
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: '#1f6453',
                  paddingVertical: 10,
                }}
              />

              <Pressable
                onPress={() => pushMessage(draftMessage)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: '#1f6453',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="send" size={18} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
