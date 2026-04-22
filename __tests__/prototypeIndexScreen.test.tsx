import { render } from '@testing-library/react-native';

import PrototypesIndexScreen from '@/app/(app)/prototypes/index';
import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('prototype index screen', () => {
  it('renders every prototype entry from the shared catalog with descriptions and routes', () => {
    const { getByText, getByTestId } = render(<PrototypesIndexScreen />);

    expect(getByText('Prototypes')).toBeTruthy();

    for (const item of prototypeCatalog) {
      expect(getByText(item.title)).toBeTruthy();
      expect(getByText(item.description)).toBeTruthy();
      expect(getByTestId(`link:${item.route}`)).toBeTruthy();
    }
  });
});
