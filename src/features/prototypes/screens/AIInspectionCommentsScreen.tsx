import { useState } from 'react';
import { Pressable, Text, TextInput, useWindowDimensions, View } from 'react-native';

import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { aiInspectionComments } from '@/src/features/prototypes/data/aiInspectionComments';
import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';
import { aiInspectionCommentsRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

type CommentState = 'suggested' | 'editing' | 'saved' | 'ignored';

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

const ChecklistIcon = ({ status }: { status: (typeof aiInspectionComments.checklistItems)[number]['status'] }) => {
  if (status === 'pass') {
    return (
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
        <Text className="text-lg font-bold text-emerald-700">{'\u2713'}</Text>
      </View>
    );
  }

  if (status === 'fail') {
    return (
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-rose-50">
        <Text className="text-lg font-bold text-rose-600">X</Text>
      </View>
    );
  }

  return <View className="h-11 w-11 rounded-xl border border-brand-100 bg-white" />;
};

const ChecklistItemRow = ({
  label,
  status,
  reason,
}: {
  label: string;
  status: (typeof aiInspectionComments.checklistItems)[number]['status'];
  reason?: string;
}) => (
  <View
    className={`border-b border-brand-100 px-4 py-4 ${
      status === 'fail' ? 'border-l-4 border-l-rose-500 bg-rose-50/70 pl-3' : 'bg-white'
    } ${status === 'pending' ? 'opacity-55' : ''}`}
  >
    <View className="flex-row items-center gap-3">
      <ChecklistIcon status={status} />
      <View className="flex-1">
        <Text className="text-[15px] font-semibold leading-5 text-slate-900">
          <LocalizedValue value={label} />
        </Text>
        {reason ? (
          <View className="mt-2 self-start rounded-full bg-rose-100 px-3 py-1">
            <Text className="text-[11px] font-bold text-rose-600">
              <LocalizedValue value={reason} />
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  </View>
);

const PatternCallout = () => (
  <View className="rounded-r-2xl border-l-4 border-l-amber-500 bg-amber-50 px-4 py-4">
    <Text className="text-[12px] font-extrabold uppercase tracking-[1px] text-amber-900">
      <LocalizedValue value={aiInspectionComments.patternLabel} />
    </Text>
    <Text className="mt-2 text-[15px] leading-6 text-amber-950">
      <LocalizedValue value={aiInspectionComments.patternText} />
    </Text>
  </View>
);

export const AIInspectionCommentsScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = shouldUsePrototypeDesktopLayout(width);
  const [commentState, setCommentState] = useState<CommentState>('suggested');
  const [commentText, setCommentText] = useState(aiInspectionComments.aiComment);
  const localizedAcceptLabel = useLocalizedText(aiInspectionComments.acceptLabel);
  const localizedEditLabel = useLocalizedText(aiInspectionComments.editLabel);
  const localizedSaveLabel = useLocalizedText(aiInspectionComments.saveLabel);
  const localizedIgnoreLabel = useLocalizedText(aiInspectionComments.ignoreLabel);
  const localizedSavedLabel = useLocalizedText(aiInspectionComments.savedLabel);
  const localizedPlaceholder = useLocalizedText(aiInspectionComments.addCommentPlaceholder);
  const localizedAiTitle = useLocalizedText(
    commentState === 'ignored'
      ? aiInspectionComments.addCommentTitle
      : aiInspectionComments.aiSectionTitle,
  );
  const isEditing = commentState === 'editing' || commentState === 'ignored';
  const isSaved = commentState === 'saved';

  const inspectionHeader = (
    <View className="overflow-hidden rounded-[28px] border border-[#dcefe4] bg-[#f4f7f5]">
      <View className="flex-row items-center justify-between bg-brand-700 px-4 py-4">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">
            <Text className="text-base font-semibold text-white">&lt;</Text>
          </View>
          <View>
            <Text className="text-[17px] font-bold text-white">
              <LocalizedValue value={aiInspectionComments.headerTitle} />
            </Text>
            <Text className="mt-0.5 text-[11px] font-semibold text-emerald-100/80">
              <LocalizedValue value={aiInspectionComments.headerSubtitle} />
            </Text>
          </View>
        </View>

        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-500">
          <Text className="text-xl font-extrabold text-white">
            <LocalizedValue value={aiInspectionComments.scoreBadge} />
          </Text>
        </View>
      </View>

      <View className="border-b border-brand-100 bg-white px-4 py-4">
        <View className="flex-row items-start gap-3">
          <View className="mt-1.5 h-2.5 w-2.5 rounded-full bg-rose-600" />
          <View className="flex-1">
            <Text className="text-[15px] font-semibold text-slate-900">
              <LocalizedValue value={aiInspectionComments.locationTitle} />
            </Text>
            <Text className="mt-1 text-[13px] font-medium text-slate-500">
              <LocalizedValue value={aiInspectionComments.progressLabel} />
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white">
        {aiInspectionComments.checklistItems.map((item, index) => (
          <ChecklistItemRow
            key={item.label}
            label={item.label}
            status={item.status}
            reason={item.reason}
          />
        ))}
      </View>
    </View>
  );

  const suggestionCard = (
    <View className="overflow-hidden rounded-[24px] border border-brand-100 bg-white">
      <View className="flex-row items-center gap-3 border-b border-brand-100 bg-brand-50 px-4 py-3.5">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
          <Text className="text-base font-bold text-white">*</Text>
        </View>
        <Text className="flex-1 text-[15px] font-bold text-brand-800">{localizedAiTitle}</Text>
      </View>

      <View className="px-4 py-4">
        <TextInput
          accessibilityRole="textbox"
          editable={isEditing}
          multiline
          value={commentText}
          onChangeText={setCommentText}
          placeholder={commentState === 'ignored' ? localizedPlaceholder : undefined}
          placeholderTextColor="#94a3b8"
          className={`min-h-[132px] rounded-[18px] border px-4 py-4 text-[15px] leading-7 text-slate-900 ${
            isSaved
              ? 'border-emerald-700 bg-emerald-50'
              : isEditing
                ? 'border-brand-500 bg-white'
                : 'border-brand-200 bg-brand-50'
          }`}
          style={{ textAlignVertical: 'top' }}
        />

        {isSaved ? (
          <View className="mt-3 flex-row items-center gap-2">
            <View className="h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
              <Text className="text-[11px] font-bold text-emerald-700">{'\u2713'}</Text>
            </View>
            <Text className="text-[13px] font-bold text-emerald-700">{localizedSavedLabel}</Text>
          </View>
        ) : null}

        {commentState === 'suggested' ? (
          <View className="mt-4 flex-row items-center gap-3">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={localizedAcceptLabel}
              onPress={() => setCommentState('saved')}
              className="rounded-2xl bg-brand-600 px-5 py-3"
            >
              <Text className="text-[15px] font-bold text-white">{localizedAcceptLabel}</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={localizedEditLabel}
              onPress={() => setCommentState('editing')}
              className="rounded-2xl border border-brand-200 bg-white px-5 py-3"
            >
              <Text className="text-[15px] font-bold text-brand-700">{localizedEditLabel}</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={localizedIgnoreLabel}
              onPress={() => {
                setCommentState('ignored');
                setCommentText('');
              }}
              className="px-3 py-3"
            >
              <Text className="text-[15px] font-semibold text-slate-500">{localizedIgnoreLabel}</Text>
            </Pressable>
          </View>
        ) : null}

        {commentState === 'editing' ? (
          <View className="mt-4 flex-row items-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={localizedSaveLabel}
              onPress={() => setCommentState('saved')}
              className="rounded-2xl bg-brand-600 px-5 py-3"
            >
              <Text className="text-[15px] font-bold text-white">{localizedSaveLabel}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <PrototypePageShell testID="ai-inspection-comments-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={aiInspectionCommentsRoute} />

        {inspectionHeader}

        {isDesktop ? (
          <View className="flex-row items-start gap-5">
            <View className="flex-1 gap-4">
              {suggestionCard}
            </View>

            <View className="w-[300px] flex-shrink-0 gap-4">
              <PatternCallout />
            </View>
          </View>
        ) : (
          <View className="gap-4">
            {suggestionCard}
            <PatternCallout />
          </View>
        )}
      </View>
    </PrototypePageShell>
  );
};

export default AIInspectionCommentsScreen;
