export const themeTokens = {
  colors: {
    brandPrimary: '#2f7a58',
    brandPrimaryDark: '#245f45',
    brandPrimaryLight: '#dcefe4',
    background: '#f4f7f5',
    surface: '#ffffff',
    surfaceMuted: '#f8fbf9',
    textPrimary: '#173025',
    textSecondary: '#4d5d55',
    border: '#d6e3db',
    warning: '#c17a1b',
    danger: '#b03a3a',
    success: '#2f7a58',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  shadow: {
    card: {
      shadowColor: '#0d2118',
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
  },
} as const;

export const siteAccentMap: Record<string, string> = {
  site_1: '#2f7a58',
  site_2: '#3a6f8f',
  site_3: '#6a7f39',
};
