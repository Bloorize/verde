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
  it('renders the original report body for the default site', () => {
    const { getByText } = render(<CustomerPerformanceSummaryScreen />);

    expect(getByText('Monthly Reports')).toBeTruthy();
    expect(getByText('Monthly Site Performance Summary')).toBeTruthy();
    expect(getByText('Estrella Community College - March 2026')).toBeTruthy();
    expect(getByText('88')).toBeTruthy();
    expect(getByText('Inspection Quality')).toBeTruthy();
    expect(getByText('94%')).toBeTruthy();
    expect(getByText('1.8 days')).toBeTruthy();
    expect(getByText('0 incidents')).toBeTruthy();
    expect(getByText('Performance Summary')).toBeTruthy();
    expect(
      getByText(
        'Inspection scores at Estrella Community College improved 6% this month, driven by consistent daily coverage in high-traffic areas. All work items were resolved within the contracted SLA for the first time this quarter. One safety near-miss was identified during a routine walkthrough and resolved same-day, reflecting strong field awareness and proactive reporting culture. Verde recommends maintaining current staffing levels and continuing the daily touchpoint protocol that has driven these results.',
      ),
    ).toBeTruthy();
    expect(getByText('Approve & Send')).toBeTruthy();
    expect(getByText('Request Edit')).toBeTruthy();
  });

  it('switches sites and updates the report content', () => {
    const { getByLabelText, getByText, queryByText } = render(<CustomerPerformanceSummaryScreen />);

    fireEvent.press(getByLabelText('ASU Downtown'));

    expect(getByText('ASU Downtown - March 2026')).toBeTruthy();
    expect(getByText('72')).toBeTruthy();
    expect(getByText('4.2 days')).toBeTruthy();
    expect(getByText('1 recordable')).toBeTruthy();
    expect(queryByText('Estrella Community College - March 2026')).toBeNull();
  });

  it('supports approve and request-edit actions in the report footer', () => {
    const { getByRole, getByText } = render(<CustomerPerformanceSummaryScreen />);
    const approveButton = getByRole('button', { name: 'Approve & Send' });
    const requestEditsButton = getByRole('button', { name: 'Request Edit' });

    fireEvent.press(approveButton);
    expect(getByText('Approve & Send ✓')).toBeTruthy();

    fireEvent.press(requestEditsButton);
    expect(getByRole('textbox')).toBeTruthy();
    expect(getByRole('button', { name: 'Submit feedback' })).toBeTruthy();

    fireEvent.changeText(getByRole('textbox'), 'Tighten the safety paragraph.');
    fireEvent.press(getByRole('button', { name: 'Submit feedback' }));

    expect(getByText('Feedback submitted ✓')).toBeTruthy();
  });
});
