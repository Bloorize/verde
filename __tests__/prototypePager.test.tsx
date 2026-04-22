import { render } from '@testing-library/react-native';

import { AIInspectionCommentsScreen } from '@/src/features/prototypes/screens/AIInspectionCommentsScreen';
import { CustomerPerformanceSummaryScreen } from '@/src/features/prototypes/screens/CustomerPerformanceSummaryScreen';
import { PlainLanguageWorkItemScreen } from '@/src/features/prototypes/screens/PlainLanguageWorkItemScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('prototype pager', () => {
  it('derives previous and next prototype routes from the shared catalog order', () => {
    const { prototypeCatalog, getPrototypeRouteNeighbors } = require('@/src/features/prototypes/data/catalog');

    expect(getPrototypeRouteNeighbors?.(prototypeCatalog[0].route)).toEqual({
      previous: undefined,
      next: prototypeCatalog[1],
    });
    expect(getPrototypeRouteNeighbors?.(prototypeCatalog[2].route)).toEqual({
      previous: prototypeCatalog[1],
      next: prototypeCatalog[3],
    });
    expect(getPrototypeRouteNeighbors?.(prototypeCatalog[prototypeCatalog.length - 1].route)).toEqual({
      previous: prototypeCatalog[prototypeCatalog.length - 2],
      next: undefined,
    });
  });

  it('shows only a next pager link on the first prototype screen', () => {
    const { getByText, getByTestId, queryByText, queryByTestId } = render(<PlainLanguageWorkItemScreen />);

    expect(getByText('Next')).toBeTruthy();
    expect(getByTestId('link:/prototypes/ai-inspection-comments')).toBeTruthy();
    expect(queryByText('Previous')).toBeNull();
    expect(queryByTestId('link:/prototypes/customer-performance-summary')).toBeNull();
  });

  it('shows previous and next pager links on a middle prototype screen', () => {
    const { getByText, getByTestId } = render(<AIInspectionCommentsScreen />);

    expect(getByText('Previous')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    expect(getByTestId('link:/prototypes/plain-language-work-item')).toBeTruthy();
    expect(getByTestId('link:/prototypes/sage-score-summary')).toBeTruthy();
  });

  it('shows only a previous pager link on the last prototype screen', () => {
    const { getByText, getByTestId, queryByText, queryByTestId } = render(<CustomerPerformanceSummaryScreen />);

    expect(getByText('Previous')).toBeTruthy();
    expect(getByTestId('link:/prototypes/monthly-operational-narrative')).toBeTruthy();
    expect(queryByText('Next')).toBeNull();
    expect(queryByTestId('link:/prototypes/plain-language-work-item')).toBeNull();
  });
});
