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

  it('renders the key static score, metrics, highlights, and narrative content', () => {
    const { getByText } = render(<SageScoreSummaryScreen />);

    expect(getByText('Overall score')).toBeTruthy();
    expect(getByText('87')).toBeTruthy();
    expect(getByText('+2 vs last month')).toBeTruthy();
    expect(getByText('Inspection coverage')).toBeTruthy();
    expect(getByText('87%')).toBeTruthy();
    expect(getByText('Regional highlights')).toBeTruthy();
    expect(
      getByText(
        'ASU Downtown remains the main drag on the regional score because two work items are still overdue.',
      ),
    ).toBeTruthy();
    expect(getByText('Narrative summary')).toBeTruthy();
    expect(
      getByText(
        'The region ended the month stronger overall, but the score is still being held back by unresolved follow-up work at ASU Downtown. The cleanest next gain is to close overdue items there while keeping Palm Springs on its preventive maintenance plan.',
      ),
    ).toBeTruthy();
  });

  it('routes visible score summary copy through the localization hook', () => {
    mockUseLocalizedText.mockImplementation((value: string) => `t:${value}`);

    const { getByText, queryByText } = render(<SageScoreSummaryScreen />);

    expect(getByText('t:Overall score')).toBeTruthy();
    expect(getByText('t:+2 vs last month')).toBeTruthy();
    expect(getByText('t:Inspection coverage')).toBeTruthy();
    expect(getByText('t:Regional highlights')).toBeTruthy();
    expect(getByText('t:Narrative summary')).toBeTruthy();
    expect(
      getByText(
        't:The region ended the month stronger overall, but the score is still being held back by unresolved follow-up work at ASU Downtown. The cleanest next gain is to close overdue items there while keeping Palm Springs on its preventive maintenance plan.',
      ),
    ).toBeTruthy();
    expect(queryByText('Overall score')).toBeNull();
    expect(queryByText('Narrative summary')).toBeNull();
  });
});
