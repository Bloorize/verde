import { render } from '@testing-library/react-native';

import { SageScoreSummaryScreen } from '@/src/features/prototypes/screens/SageScoreSummaryScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

const mockUseLocalizedText = jest.fn((value: string) => value);

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => mockUseLocalizedText(value),
}));

describe('SageScoreSummaryScreen', () => {
  beforeEach(() => {
    mockUseLocalizedText.mockImplementation((value: string) => value);
  });

  it('renders the mockup copy with all card detail sections visible', () => {
    const { getByLabelText, getByText } = render(<SageScoreSummaryScreen />);

    expect(getByText('Regional Dashboard')).toBeTruthy();
    expect(getByText(/All Sites - Southwest Region/)).toBeTruthy();
    expect(getByLabelText('Refresh insights')).toBeTruthy();
    expect(getByText('Estrella Community College')).toBeTruthy();
    expect(getByText('88')).toBeTruthy();
    expect(getByText('ASU Downtown')).toBeTruthy();
    expect(getByText('72')).toBeTruthy();
    expect(getByText('94%')).toBeTruthy();
    expect(getByText('76%')).toBeTruthy();
    expect(getByText('91%')).toBeTruthy();
    expect(
      getByText(
        'Joint inspection frequency is below the monthly target and a safety incident from last week is still in review. Two overdue work items in Building B are pulling the score down.',
      ),
    ).toBeTruthy();
    expect(getByText('Regional Summary')).toBeTruthy();
    expect(
      getByText(
        'Across all 3 sites, inspection coverage averaged 87% this month. ASU Downtown needs immediate attention on overdue work items and the open safety incident.',
      ),
    ).toBeTruthy();
  });

  it('routes visible score summary copy through the localization hook', () => {
    mockUseLocalizedText.mockImplementation((value: string) => `t:${value}`);

    const { getAllByText, getByText, queryByText, getByLabelText } = render(<SageScoreSummaryScreen />);

    expect(getByText('t:Regional Dashboard')).toBeTruthy();
    expect(getByText(/t:Refresh insights/)).toBeTruthy();
    expect(getByText(/t:All Sites - Southwest Region/)).toBeTruthy();
    expect(getByText('t:Regional Summary')).toBeTruthy();
    expect(getAllByText('t:Inspection Coverage')).toHaveLength(3);
    expect(getByText('t:76%')).toBeTruthy();
    expect(
      getByText(
        't:Across all 3 sites, inspection coverage averaged 87% this month. ASU Downtown needs immediate attention on overdue work items and the open safety incident.',
      ),
    ).toBeTruthy();
    expect(queryByText('Regional Dashboard')).toBeNull();
    expect(queryByText('Regional Summary')).toBeNull();
  });
});
