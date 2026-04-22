import { fireEvent, render } from '@testing-library/react-native';

import { IncidentSeverityClassificationScreen } from '@/src/features/prototypes/screens/IncidentSeverityClassificationScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('IncidentSeverityClassificationScreen', () => {
  it('renders the incident summary, severity explanation, and next actions', () => {
    const { getByText } = render(<IncidentSeverityClassificationScreen />);

    expect(getByText('Incident summary')).toBeTruthy();
    expect(getByText('INC-2408')).toBeTruthy();
    expect(getByText('Phoenix Medical Center - Loading Dock')).toBeTruthy();
    expect(getByText('Severity explanation')).toBeTruthy();
    expect(getByText('High severity')).toBeTruthy();
    expect(
      getByText(
        'The spill reached a staff access path, created an immediate slip hazard, and required a temporary area closure while cleanup and root-cause checks were completed.',
      ),
    ).toBeTruthy();
    expect(getByText('Next actions')).toBeTruthy();
    expect(getByText('Dispatch the evening engineering lead to inspect the drain cover assembly.')).toBeTruthy();
  });

  it('supports a local override state for the demo severity review', () => {
    const { getByRole, getByText } = render(<IncidentSeverityClassificationScreen />);
    const moderateButton = getByRole('button', { name: 'Override to moderate' });
    const highConfidenceButton = getByRole('button', { name: 'Set high confidence' });
    const needsReviewButton = getByRole('button', { name: 'Mark needs review' });

    expect(getByText('Current assessment: High severity')).toBeTruthy();
    expect(moderateButton).toHaveAccessibilityState({ selected: false });
    expect(highConfidenceButton).toHaveAccessibilityState({ selected: true });
    expect(needsReviewButton).toHaveAccessibilityState({ selected: false });

    fireEvent.press(moderateButton);
    fireEvent.press(needsReviewButton);

    expect(getByText('Current assessment: Moderate severity')).toBeTruthy();
    expect(moderateButton).toHaveAccessibilityState({ selected: true });
    expect(highConfidenceButton).toHaveAccessibilityState({ selected: false });
    expect(needsReviewButton).toHaveAccessibilityState({ selected: true });
  });
});
