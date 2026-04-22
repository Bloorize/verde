import { Pressable, Text, View } from 'react-native';

interface PrototypeLanguageToggleProps {
  options: string[];
  value: string;
  onChange: (language: string) => void;
}

export const PrototypeLanguageToggle = ({
  options,
  value,
  onChange,
}: PrototypeLanguageToggleProps) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option) => {
        const selected = option === value;

        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityLabel={option}
            accessibilityState={{ selected }}
            onPress={() => onChange(option)}
            className={`rounded-md px-3 py-2 ${selected ? 'bg-brand-600' : 'border border-brand-100 bg-white'}`}
          >
            <Text className={`text-sm font-semibold ${selected ? 'text-white' : 'text-slate-700'}`}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
