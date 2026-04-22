import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';

describe('prototype catalog', () => {
  it('defines the six required prototype routes in order with no duplicates', () => {
    expect(prototypeCatalog).toHaveLength(6);
    expect(new Set(prototypeCatalog.map((item) => item.route)).size).toBe(6);
    expect(prototypeCatalog.map((item) => item.route)).toEqual([
      '/prototypes/plain-language-work-item',
      '/prototypes/ai-inspection-comments',
      '/prototypes/sage-score-summary',
      '/prototypes/incident-severity-classification',
      '/prototypes/monthly-operational-narrative',
      '/prototypes/customer-performance-summary',
    ]);
  });
});
