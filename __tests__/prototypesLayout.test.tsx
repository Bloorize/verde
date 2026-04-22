import { render } from '@testing-library/react-native';

import PrototypesLayout from '@/app/(app)/prototypes/_layout';
import { prototypeScreenNames } from '@/src/features/prototypes/types';

const mockRegisteredScreenNames: string[] = [];

jest.mock('expo-router', () => {
  const React = require('react');

  const MockStack = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  MockStack.Screen = ({ name }: { name: string }) => {
    mockRegisteredScreenNames.push(name);
    return null;
  };

  return {
    Stack: MockStack,
  };
});

describe('prototypes layout', () => {
  beforeEach(() => {
    mockRegisteredScreenNames.length = 0;
  });

  it('registers index plus the shared prototype screen names', () => {
    render(<PrototypesLayout />);

    expect(prototypeScreenNames).toEqual([
      'plain-language-work-item',
      'ai-inspection-comments',
      'sage-score-summary',
      'incident-severity-classification',
      'monthly-operational-narrative',
      'customer-performance-summary',
    ]);

    expect(mockRegisteredScreenNames).toEqual(['index', ...prototypeScreenNames]);
  });
});
