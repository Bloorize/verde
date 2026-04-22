import { fireEvent, render } from '@testing-library/react-native';

import { CustomerPerformanceSummaryScreen } from '@/src/features/prototypes/screens/CustomerPerformanceSummaryScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('CustomerPerformanceSummaryScreen', () => {
  it('renders the performance overview and customer-facing highlights', () => {
    const { getByText } = render(<CustomerPerformanceSummaryScreen />);

    expect(getByText('Performance overview')).toBeTruthy();
    expect(getByText('96%')).toBeTruthy();
    expect(getByText('Inspection completion')).toBeTruthy();
    expect(getByText('Customer-facing highlights')).toBeTruthy();
    expect(
      getByText(
        'Day porter coverage at the visitor lobby held above target for the full month, reducing visible touch-up requests during peak hours.',
      ),
    ).toBeTruthy();
    expect(getByText('Suggested share-out')).toBeTruthy();
    expect(
      getByText(
        'Performance remained stable in the most visible public areas, with faster issue closure and fewer repeat cleaning misses than last month.',
      ),
    ).toBeTruthy();
  });

  it('supports local approve and request-edit feedback states', () => {
    const { getByRole, getByText } = render(<CustomerPerformanceSummaryScreen />);
    const approveButton = getByRole('button', { name: 'Approve summary' });
    const requestEditsButton = getByRole('button', { name: 'Request edits' });

    expect(getByText('Awaiting customer review')).toBeTruthy();
    expect(approveButton).toHaveAccessibilityState({ selected: false });
    expect(requestEditsButton).toHaveAccessibilityState({ selected: false });

    fireEvent.press(approveButton);

    expect(getByText('Approved for customer share-out')).toBeTruthy();
    expect(approveButton).toHaveAccessibilityState({ selected: true });
    expect(requestEditsButton).toHaveAccessibilityState({ selected: false });
  });
});
