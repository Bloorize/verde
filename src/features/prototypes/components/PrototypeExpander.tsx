import { Children, Fragment, PropsWithChildren, isValidElement, type ReactNode, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { useLocalizedText } from '@/src/hooks/useLocalizedText';

interface PrototypeExpanderProps {
  title: string;
  defaultOpen?: boolean;
}

const LocalizedInlineText = ({ value }: { value: string }) => {
  const localizedValue = useLocalizedText(value);

  return <Text className="text-sm leading-5 text-slate-700">{localizedValue}</Text>;
};

const renderExpanderContent = (node: ReactNode, keyPrefix = 'content'): ReactNode => {
  return Children.toArray(node).map((child, index) => {
    const key = `${keyPrefix}-${index}`;

    if (typeof child === 'string' || typeof child === 'number') {
      return <LocalizedInlineText key={key} value={String(child)} />;
    }

    if (isValidElement<PropsWithChildren>(child) && child.type === Fragment) {
      return renderExpanderContent(child.props.children, key);
    }

    return child;
  });
};

export const PrototypeExpander = ({
  title,
  defaultOpen = false,
  children,
}: PropsWithChildren<PrototypeExpanderProps>) => {
  const [open, setOpen] = useState(defaultOpen);
  const localizedTitle = useLocalizedText(title);
  const localizedToggleLabel = useLocalizedText(open ? 'Hide' : 'Show');

  return (
    <PrototypeSectionCard>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={localizedTitle}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((current) => !current)}
        className="flex-row items-center justify-between gap-3"
      >
        <Text className="flex-1 text-base font-semibold text-slate-900">{localizedTitle}</Text>
        <Text className="text-sm font-medium text-slate-500">{localizedToggleLabel}</Text>
      </Pressable>

      {open ? (
        <View className="mt-3 border-t border-slate-100 pt-3">
          {renderExpanderContent(children)}
        </View>
      ) : null}
    </PrototypeSectionCard>
  );
};
