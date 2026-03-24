export const getScoreColor = (score: number): string => {
  if (score >= 4.5) return '#2f7a58';
  if (score >= 3.5) return '#7ea63e';
  if (score >= 2.5) return '#c17a1b';
  return '#b03a3a';
};

export const averageScore = (scores: number[]): number => {
  if (scores.length === 0) return 0;
  return Number((scores.reduce((total, value) => total + value, 0) / scores.length).toFixed(1));
};
