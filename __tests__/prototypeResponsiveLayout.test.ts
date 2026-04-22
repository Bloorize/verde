import { shouldUsePrototypeDesktopLayout } from '@/src/features/prototypes/layout';

describe('prototype responsive layout helper', () => {
  it('keeps prototype screens stacked until there is room beside the desktop sidebar', () => {
    expect(shouldUsePrototypeDesktopLayout(959)).toBe(false);
    expect(shouldUsePrototypeDesktopLayout(1100)).toBe(false);
    expect(shouldUsePrototypeDesktopLayout(1199)).toBe(false);
    expect(shouldUsePrototypeDesktopLayout(1200)).toBe(true);
    expect(shouldUsePrototypeDesktopLayout(1440)).toBe(true);
  });
});
