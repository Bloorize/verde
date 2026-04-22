import { fireEvent, render } from '@testing-library/react-native';

import { AIInspectionCommentsScreen } from '@/src/features/prototypes/screens/AIInspectionCommentsScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('AIInspectionCommentsScreen', () => {
  it('renders the key static inspection comment sections and follow-up content', () => {
    const { getByText } = render(<AIInspectionCommentsScreen />);

    expect(getByText('Inspection')).toBeTruthy();
    expect(getByText('Original inspection note')).toBeTruthy();
    expect(
      getByText(
        "Floor corners near the south entry still show smudges after service. This item failed again on tonight's walkthrough.",
      ),
    ).toBeTruthy();
    expect(getByText('AI rewrite')).toBeTruthy();
    expect(
      getByText(
        'Smudges found near the south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding the lobby edge detail to the nightly deep-clean rotation.',
      ),
    ).toBeTruthy();
    expect(getByText('Severity framing')).toBeTruthy();
    expect(getByText('Moderate recurrence')).toBeTruthy();
    expect(getByText('Recommended follow-up')).toBeTruthy();
    expect(getByText('Add the south entry corners to the nightly deep-clean rotation.')).toBeTruthy();
  });

  it('lets the local demo review state move from pending to accepted', () => {
    const { getByRole, getByText } = render(<AIInspectionCommentsScreen />);
    const acceptButton = getByRole('button', { name: 'Accept rewrite' });
    const editButton = getByRole('button', { name: 'Edit rewrite' });

    expect(getByText('Pending review')).toBeTruthy();
    expect(acceptButton).toHaveAccessibilityState({ selected: false });
    expect(editButton).toHaveAccessibilityState({ selected: false });

    fireEvent.press(acceptButton);

    expect(getByText('Accepted for handoff')).toBeTruthy();
    expect(acceptButton).toHaveAccessibilityState({ selected: true });
    expect(editButton).toHaveAccessibilityState({ selected: false });
  });
});
