import { fireEvent, render } from '@testing-library/react-native';

import { IncidentSeverityClassificationScreen } from '@/src/features/prototypes/screens/IncidentSeverityClassificationScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name }: { name: string }) => {
    const { Text } = require('react-native');
    return <Text>{name}</Text>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('IncidentSeverityClassificationScreen', () => {
  it('renders only the html app body content for the default incident', () => {
    const { getByTestId, getByText } = render(<IncidentSeverityClassificationScreen />);

    expect(getByText('Previous')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    expect(getByTestId('link:/prototypes/sage-score-summary')).toBeTruthy();
    expect(getByTestId('link:/prototypes/monthly-operational-narrative')).toBeTruthy();
    expect(getByText('Estrella Community College')).toBeTruthy();
    expect(getByText('Incident Review')).toBeTruthy();
    expect(getByText('INC-0891')).toBeTruthy();
    expect(getByText('Slip and fall near loading dock — Building A')).toBeTruthy();
    expect(getByText('Safety Concern')).toBeTruthy();
    expect(getByText('Maria Santos')).toBeTruthy();
    expect(getByText('RECORDABLE')).toBeTruthy();
    expect(
      getByText(
        'Based on the description, this incident involved a slip and fall resulting in a knee injury that required first aid treatment. The employee continued working, but any injury requiring treatment beyond basic first aid is classified as Recordable under OSHA guidelines.',
      ),
    ).toBeTruthy();
    expect(getByText('Confidence: High (92%)')).toBeTruthy();
    expect(getByText('Required Steps')).toBeTruthy();
    expect(getByText('OSHA 300 log entry')).toBeTruthy();
    expect(getByText('Accept Classification')).toBeTruthy();
    expect(getByText('Override')).toBeTruthy();
    expect(getByText('Add Notes')).toBeTruthy();
  });

  it('supports severity override and classification acceptance in the body content', () => {
    const { getByRole, getByText } = render(<IncidentSeverityClassificationScreen />);

    fireEvent.press(getByRole('button', { name: 'Override' }));
    fireEvent.press(getByRole('button', { name: 'Serious' }));

    expect(getByText('SERIOUS')).toBeTruthy();

    fireEvent.press(getByRole('button', { name: 'Accept Classification' }));

    expect(getByText('CONFIRMED: SERIOUS')).toBeTruthy();
    expect(getByText('Accepted ✓')).toBeTruthy();
  });
});
