import { Text, View } from 'react-native';

import { useLocalizedText } from '@/src/hooks/useLocalizedText';

interface PrototypeStepListProps {
  steps: string[];
}

const LocalizedStepText = ({ step }: { step: string }) => {
  const localizedStep = useLocalizedText(step);

  return <Text className="flex-1 text-sm leading-5 text-slate-700">{localizedStep}</Text>;
};

export const PrototypeStepList = ({ steps }: PrototypeStepListProps) => {
  return (
    <View className="gap-3">
      {steps.map((step, index) => (
        <View key={`${index + 1}-${step}`} className="flex-row gap-3">
          <View className="mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-brand-50">
            <Text className="text-xs font-semibold text-brand-700">{index + 1}</Text>
          </View>
          <LocalizedStepText step={step} />
        </View>
      ))}
    </View>
  );
};
