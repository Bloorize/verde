import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useLocalizedText } from '@/src/hooks/useLocalizedText';

interface PrototypeActionBarProps {
  actionLabel: string;
  onAction?: () => void;
  doneLabel?: string;
  completedLabel?: string;
  completed?: boolean;
  onCompletedChange?: (completed: boolean) => void;
  defaultCompleted?: boolean;
}

export const PrototypeActionBar = ({
  actionLabel,
  onAction,
  doneLabel = 'Mark complete',
  completedLabel = 'Completed',
  completed: completedProp,
  onCompletedChange,
  defaultCompleted = false,
}: PrototypeActionBarProps) => {
  const [uncontrolledCompleted, setUncontrolledCompleted] = useState(defaultCompleted);
  const completed = completedProp ?? uncontrolledCompleted;
  const actionDisabled = !onAction;
  const localizedActionLabel = useLocalizedText(actionLabel);
  const localizedDoneLabel = useLocalizedText(doneLabel);
  const localizedCompletedLabel = useLocalizedText(completedLabel);

  const handleCompletedChange = () => {
    const nextValue = !completed;

    if (completedProp === undefined) {
      setUncontrolledCompleted(nextValue);
    }

    onCompletedChange?.(nextValue);
  };

  return (
    <View className="flex-row items-center justify-between gap-3 rounded-lg border border-brand-100 bg-white p-4">
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={completed ? localizedCompletedLabel : localizedDoneLabel}
        accessibilityState={{ checked: completed }}
        onPress={handleCompletedChange}
        className={`rounded-md px-3 py-2 ${completed ? 'bg-brand-50' : 'border border-brand-100 bg-white'}`}
      >
        <Text className={`text-sm font-semibold ${completed ? 'text-brand-700' : 'text-slate-700'}`}>
          {completed ? localizedCompletedLabel : localizedDoneLabel}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={localizedActionLabel}
        accessibilityState={{ disabled: actionDisabled }}
        disabled={actionDisabled}
        onPress={onAction}
        className={`rounded-md px-4 py-2 ${actionDisabled ? 'bg-slate-200' : 'bg-brand-600'}`}
      >
        <Text className={`text-sm font-semibold ${actionDisabled ? 'text-slate-500' : 'text-white'}`}>
          {localizedActionLabel}
        </Text>
      </Pressable>
    </View>
  );
};
