import { averageScore, getScoreColor } from '@/src/utils/score';

describe('score utilities', () => {
  it('calculates average score with one decimal precision', () => {
    expect(averageScore([3, 4, 5])).toBe(4);
    expect(averageScore([3, 3, 4])).toBe(3.3);
  });

  it('returns expected color bands', () => {
    expect(getScoreColor(4.8)).toBe('#2f7a58');
    expect(getScoreColor(3.7)).toBe('#7ea63e');
    expect(getScoreColor(2.9)).toBe('#c17a1b');
    expect(getScoreColor(1.9)).toBe('#b03a3a');
  });
});
