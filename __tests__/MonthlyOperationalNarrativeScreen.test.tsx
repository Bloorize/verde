import { fireEvent, render } from '@testing-library/react-native';

import { MonthlyOperationalNarrativeScreen } from '@/src/features/prototypes/screens/MonthlyOperationalNarrativeScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('MonthlyOperationalNarrativeScreen', () => {
  it('renders the monthly summary intro and narrative sections', () => {
    const { getByText } = render(<MonthlyOperationalNarrativeScreen />);

    expect(getByText('Monthly snapshot')).toBeTruthy();
    expect(
      getByText(
        'April closed with steadier inspection execution across the district, but labor coverage remained uneven at two high-traffic accounts during late shifts.',
      ),
    ).toBeTruthy();
    expect(getByText('What improved')).toBeTruthy();
    expect(
      getByText(
        'Supervisor follow-through improved after weekly recap notes were standardized, which helped teams close more repeat issues before the next walkthrough.',
      ),
    ).toBeTruthy();
    expect(getByText('What needs attention')).toBeTruthy();
    expect(getByText('What we are watching next month')).toBeTruthy();
  });

  it('updates the local month view when navigating between demo months', () => {
    const { getByRole, getByText } = render(<MonthlyOperationalNarrativeScreen />);
    const saveDraftButton = getByRole('button', { name: 'Save draft' });
    const exportButton = getByRole('button', { name: 'Prepare export' });

    expect(getByText('Southwest District - April 2026')).toBeTruthy();
    expect(saveDraftButton).toHaveAccessibilityState({ selected: false });
    expect(exportButton).toHaveAccessibilityState({ selected: false });

    fireEvent.press(getByRole('button', { name: 'Previous month' }));
    fireEvent.press(exportButton);

    expect(getByText('Southwest District - March 2026')).toBeTruthy();
    expect(saveDraftButton).toHaveAccessibilityState({ selected: false });
    expect(exportButton).toHaveAccessibilityState({ selected: true });
  });
});
