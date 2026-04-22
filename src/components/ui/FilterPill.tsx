import { Pressable, Text } from 'react-native';

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export const FilterPill = ({ label, active, onPress }: FilterPillProps) => (
  <Pressable
    onPress={onPress}
    className={`rounded-lg px-4 py-2 ${active ? 'bg-brand-600' : 'bg-brand-50 border border-brand-200'}`}
  >
    <Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-brand-700'}`}>{label}</Text>
  </Pressable>
);
