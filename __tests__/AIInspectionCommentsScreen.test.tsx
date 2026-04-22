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
  it('renders the in-flow inspection layout from the original prototype', () => {
    const { getByDisplayValue, getByText, queryByText } = render(<AIInspectionCommentsScreen />);

    expect(getByText('Inspection')).toBeTruthy();
    expect(getByText('INS-0412')).toBeTruthy();
    expect(getByText('Learning Commons - Lobby')).toBeTruthy();
    expect(getByText('3 of 8 items checked')).toBeTruthy();
    expect(getByText('Glass surfaces')).toBeTruthy();
    expect(getByText('Floor corners')).toBeTruthy();
    expect(getByText('Waste receptacles')).toBeTruthy();
    expect(getByText('Smudges')).toBeTruthy();
    expect(getByText('SAGE — Suggested Comment')).toBeTruthy();
    expect(
      getByDisplayValue(
        'Smudges found near south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding to the nightly deep-clean rotation.',
      ),
    ).toBeTruthy();
    expect(getByText('Pattern Detected')).toBeTruthy();
    expect(getByText('This item has failed 2 of 3 recent inspections at this site.')).toBeTruthy();
    expect(queryByText('Original inspection note')).toBeNull();
    expect(queryByText('Severity framing')).toBeNull();
    expect(queryByText('Recommended follow-up')).toBeNull();
  });

  it('supports inline edit and save behavior for the suggested comment', () => {
    const { getByDisplayValue, getByRole, getByText, queryByRole } = render(
      <AIInspectionCommentsScreen />,
    );

    const commentField = getByDisplayValue(
      'Smudges found near south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding to the nightly deep-clean rotation.',
    );

    expect(commentField.props.editable).toBe(false);

    fireEvent.press(getByRole('button', { name: 'Edit' }));

    expect(getByRole('textbox').props.editable).toBe(true);
    expect(getByRole('button', { name: 'Save' })).toBeTruthy();

    fireEvent.press(getByRole('button', { name: 'Save' }));

    expect(getByText('Comment saved')).toBeTruthy();
    expect(queryByRole('button', { name: 'Accept' })).toBeNull();
    expect(queryByRole('button', { name: 'Save' })).toBeNull();
  });

  it('falls back to a manual comment entry when the suggestion is ignored', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<AIInspectionCommentsScreen />);

    fireEvent.press(getByRole('button', { name: 'Ignore' }));

    expect(getByText('Add Comment')).toBeTruthy();
    expect(getByPlaceholderText('Add your own comment...')).toBeTruthy();
  });
});
