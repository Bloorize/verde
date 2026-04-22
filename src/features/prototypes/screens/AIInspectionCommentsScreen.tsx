import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypePager } from '@/src/features/prototypes/components/PrototypePager';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { PrototypeStepList } from '@/src/features/prototypes/components/PrototypeStepList';
import { aiInspectionComments } from '@/src/features/prototypes/data/aiInspectionComments';
import { aiInspectionCommentsRoute } from '@/src/features/prototypes/types';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

type CommentReviewState = 'pending' | 'accepted' | 'editing' | 'ignored';

const reviewStateCopy: Record<CommentReviewState, { title: string; detail: string }> = {
  pending: {
    title: 'Pending review',
    detail: 'Choose whether to accept the rewrite, keep working on it, or leave the original note in place.',
  },
  accepted: {
    title: 'Accepted for handoff',
    detail: 'The rewrite is ready to carry forward in the shift follow-up notes.',
  },
  editing: {
    title: 'Editing requested',
    detail: 'The rewrite needs one more pass before it is ready for handoff.',
  },
  ignored: {
    title: 'Original note kept',
    detail: 'The demo is holding the raw inspection language and skipping the rewrite for now.',
  },
};

const LocalizedValue = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <>{localizedValue}</>;
};

export const AIInspectionCommentsScreen = () => {
  const [reviewState, setReviewState] = useState<CommentReviewState>('pending');
  const reviewCopy = reviewStateCopy[reviewState];
  const rewriteReviewLabel = useLocalizedText('Rewrite review');
  const acceptRewriteLabel = useLocalizedText('Accept rewrite');
  const editRewriteLabel = useLocalizedText('Edit rewrite');
  const ignoreRewriteLabel = useLocalizedText('Ignore rewrite');
  const localizedReviewTitle = useLocalizedText(reviewCopy.title);
  const localizedReviewDetail = useLocalizedText(reviewCopy.detail);

  return (
    <PrototypePageShell testID="ai-inspection-comments-screen">
      <View className="gap-4 px-4 pb-4 pt-4">
        <PrototypePager route={aiInspectionCommentsRoute} />

        <PrototypeHeader
          title={aiInspectionComments.headerTitle}
          subtitle={aiInspectionComments.headerSubtitle}
          badge={aiInspectionComments.scoreBadge}
        />

        <PrototypeSectionCard>
          <View className="flex-row items-start gap-3">
            <View className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-600" />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-slate-900">
                <LocalizedValue value={aiInspectionComments.locationTitle} />
              </Text>
              <Text className="mt-1 text-xs font-medium text-slate-600">
                <LocalizedValue value={aiInspectionComments.progressLabel} />
              </Text>
            </View>
          </View>
        </PrototypeSectionCard>

        <PrototypeSectionCard>
          <View className="gap-2">
            <Text className="text-base font-semibold text-slate-900">
              <LocalizedValue value={aiInspectionComments.originalNoteTitle} />
            </Text>
            <Text className="text-sm leading-6 text-slate-700">
              <LocalizedValue value={aiInspectionComments.originalNote} />
            </Text>
          </View>
        </PrototypeSectionCard>

        <PrototypeSectionCard>
          <View className="gap-3">
            <Text className="text-base font-semibold text-slate-900">
              <LocalizedValue value={aiInspectionComments.aiRewriteTitle} />
            </Text>
            <View className="rounded-md border border-brand-100 bg-brand-50 px-4 py-3">
              <Text className="text-sm leading-6 text-slate-800">
                <LocalizedValue value={aiInspectionComments.aiRewrite} />
              </Text>
            </View>
            <View className="gap-2 border-t border-slate-100 pt-3">
              <Text className="text-sm font-semibold text-slate-900">{rewriteReviewLabel}</Text>
              <View className="flex-row flex-wrap gap-2">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={acceptRewriteLabel}
                  accessibilityState={{ selected: reviewState === 'accepted' }}
                  onPress={() => setReviewState('accepted')}
                  className={`rounded-md px-3 py-2 ${reviewState === 'accepted' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                >
                  <Text className={`text-sm font-semibold ${reviewState === 'accepted' ? 'text-white' : 'text-slate-700'}`}>
                    {acceptRewriteLabel}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={editRewriteLabel}
                  accessibilityState={{ selected: reviewState === 'editing' }}
                  onPress={() => setReviewState('editing')}
                  className={`rounded-md px-3 py-2 ${reviewState === 'editing' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                >
                  <Text className={`text-sm font-semibold ${reviewState === 'editing' ? 'text-white' : 'text-slate-700'}`}>
                    {editRewriteLabel}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={ignoreRewriteLabel}
                  accessibilityState={{ selected: reviewState === 'ignored' }}
                  onPress={() => setReviewState('ignored')}
                  className={`rounded-md px-3 py-2 ${reviewState === 'ignored' ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
                >
                  <Text className={`text-sm font-semibold ${reviewState === 'ignored' ? 'text-white' : 'text-slate-700'}`}>
                    {ignoreRewriteLabel}
                  </Text>
                </Pressable>
              </View>
              <View className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                <Text className="text-sm font-semibold text-slate-900">{localizedReviewTitle}</Text>
                <Text className="mt-1 text-sm leading-5 text-slate-600">{localizedReviewDetail}</Text>
              </View>
            </View>
          </View>
        </PrototypeSectionCard>

        <PrototypeSectionCard>
          <View className="gap-3">
            <Text className="text-base font-semibold text-slate-900">
              <LocalizedValue value={aiInspectionComments.severityTitle} />
            </Text>
            <View className="rounded-r-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
              <Text className="text-xs font-semibold uppercase tracking-wide text-amber-900">
                <LocalizedValue value={aiInspectionComments.severityLabel} />
              </Text>
              <Text className="mt-1 text-sm leading-5 text-amber-950">
                <LocalizedValue value={aiInspectionComments.severitySummary} />
              </Text>
            </View>
          </View>
        </PrototypeSectionCard>

        <PrototypeSectionCard>
          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-base font-semibold text-slate-900">
                <LocalizedValue value={aiInspectionComments.followUpTitle} />
              </Text>
              <Text className="text-sm leading-5 text-slate-600">
                <LocalizedValue value={aiInspectionComments.followUpIntro} />
              </Text>
            </View>

            <PrototypeStepList steps={[...aiInspectionComments.followUpSteps]} />
          </View>
        </PrototypeSectionCard>
      </View>
    </PrototypePageShell>
  );
};

export default AIInspectionCommentsScreen;
