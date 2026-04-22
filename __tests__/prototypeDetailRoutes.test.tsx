import { render } from '@testing-library/react-native';

import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: any; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('prototype detail routes', () => {
  it('exist for every registered prototype and render the implemented demo routes', () => {
    for (const item of prototypeCatalog) {
      const RouteComponent = require(`../app/(app)/prototypes/${item.id}`).default;
      const { getByText } = render(<RouteComponent />);

      if (item.id === 'plain-language-work-item') {
        expect(getByText('Work Item')).toBeTruthy();
        expect(getByText('Building C - Restroom 114')).toBeTruthy();
        continue;
      }

      if (item.id === 'ai-inspection-comments') {
        expect(getByText('Inspection')).toBeTruthy();
        expect(getByText('Original inspection note')).toBeTruthy();
        expect(getByText('Recommended follow-up')).toBeTruthy();
        continue;
      }

      if (item.id === 'sage-score-summary') {
        expect(getByText('Overall score')).toBeTruthy();
        expect(getByText('Regional highlights')).toBeTruthy();
        expect(getByText('Narrative summary')).toBeTruthy();
        continue;
      }

      if (item.id === 'incident-severity-classification') {
        expect(getByText('Incident summary')).toBeTruthy();
        expect(getByText('Severity explanation')).toBeTruthy();
        expect(getByText('Next actions')).toBeTruthy();
        continue;
      }

      if (item.id === 'monthly-operational-narrative') {
        expect(getByText('Monthly snapshot')).toBeTruthy();
        expect(getByText('What improved')).toBeTruthy();
        expect(getByText('What needs attention')).toBeTruthy();
        continue;
      }

      if (item.id === 'customer-performance-summary') {
        expect(getByText('Performance overview')).toBeTruthy();
        expect(getByText('Customer-facing highlights')).toBeTruthy();
        expect(getByText('Suggested share-out')).toBeTruthy();
        continue;
      }

      throw new Error(`Unhandled prototype route in test: ${item.id}`);
    }
  });
});
