import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

export const Card = ({ children, style, ...rest }: PropsWithChildren<ViewProps>) => {
  return (
    <View
      className="rounded-lg border border-brand-100 bg-white p-4"
      style={[
        {
          shadowColor: '#0d2118',
          shadowOpacity: 0.04,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 1 },
          elevation: 1,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
