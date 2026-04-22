import { fireEvent, render } from '@testing-library/react-native';

import { PlainLanguageWorkItemScreen } from '@/src/features/prototypes/screens/PlainLanguageWorkItemScreen';

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

describe('PlainLanguageWorkItemScreen', () => {
  beforeEach(() => {
    mockUseLocalizedText.mockImplementation((value: string) => value);
  });

  it('renders the prototype content using the shared shell primitives', () => {
    const { getByText, getByRole, queryByRole } = render(<PlainLanguageWorkItemScreen />);

    expect(getByText('Work Item')).toBeTruthy();
    expect(getByText('WI-2847')).toBeTruthy();
    expect(getByText('HIGH')).toBeTruthy();
    expect(getByText('Building C - Restroom 114')).toBeTruthy();
    expect(getByText('Due Today, 2:00 PM')).toBeTruthy();
    expect(getByText('SAGE - AI Translation')).toBeTruthy();
    expect(getByText('Restroom Cleaning - Building C')).toBeTruthy();
    expect(getByText('Go to Restroom 114 in Building C')).toBeTruthy();
    expect(getByText('Why this task?')).toBeTruthy();
    expect(
      getByText('A supervisor noticed this area needs attention during their walkthrough.'),
    ).toBeTruthy();
    expect(getByText('Estimated time: ~25 min')).toBeTruthy();
    expect(getByRole('button', { name: 'View original supervisor notes' })).toBeTruthy();
    expect(getByRole('checkbox', { name: 'Mark Complete' })).toBeTruthy();
    expect(queryByRole('button', { name: 'Mark Complete' })).toBeNull();
  });

  it('routes shared prototype copy through the localization hook', () => {
    mockUseLocalizedText.mockImplementation((value: string) => `t:${value}`);

    const { getByRole, getByText, queryByText } = render(<PlainLanguageWorkItemScreen />);

    expect(getByText('t:Work Item')).toBeTruthy();
    expect(getByText('t:Building C - Restroom 114')).toBeTruthy();
    expect(getByText('t:Due Today, 2:00 PM')).toBeTruthy();
    expect(getByText('t:SAGE - AI Translation')).toBeTruthy();
    expect(getByText('t:Why this task?')).toBeTruthy();
    expect(
      getByText('t:A supervisor noticed this area needs attention during their walkthrough.'),
    ).toBeTruthy();
    expect(getByText('t:Estimated time: ~25 min')).toBeTruthy();
    expect(getByRole('button', { name: 't:View original supervisor notes' })).toBeTruthy();
    expect(queryByText('Work Item')).toBeNull();
    expect(queryByText('Building C - Restroom 114')).toBeNull();
  });

  it('switches the AI translation content between English and Spanish locally', () => {
    const { getByRole, getByText, queryByText } = render(<PlainLanguageWorkItemScreen />);

    expect(getByText('Restroom Cleaning - Building C')).toBeTruthy();
    expect(queryByText('Limpieza de bano - Edificio C')).toBeNull();

    fireEvent.press(getByRole('button', { name: 'ES' }));

    expect(getByText('Limpieza de bano - Edificio C')).toBeTruthy();
    expect(getByText('Ve al Bano 114 en el Edificio C')).toBeTruthy();
    expect(queryByText('Restroom Cleaning - Building C')).toBeNull();
  });

  it('reveals and hides the original supervisor notes from the expander', () => {
    const { getByRole, getByText, queryByText } = render(<PlainLanguageWorkItemScreen />);
    const notesTrigger = getByRole('button', { name: 'View original supervisor notes' });
    const notesBody = 'RR 114 bldg C - grout + drain. Poss. mold. Sealant if needed. Photo req.';

    expect(queryByText(notesBody)).toBeNull();

    fireEvent.press(notesTrigger);

    expect(getByText(notesBody)).toBeTruthy();

    fireEvent.press(notesTrigger);

    expect(queryByText(notesBody)).toBeNull();
  });

  it('shows completion status without exposing an enabled follow-up action', () => {
    const { getByRole, getByText, queryByRole } = render(<PlainLanguageWorkItemScreen />);
    const completionControl = getByRole('checkbox', { name: 'Mark Complete' });

    fireEvent.press(completionControl);

    expect(getByRole('checkbox', { name: 'Completed' })).toHaveAccessibilityState({ checked: true });
    expect(getByText('Done! Sent to supervisor.')).toBeTruthy();
    expect(queryByRole('button', { name: 'Done! Sent to supervisor.' })).toBeNull();
  });
});
