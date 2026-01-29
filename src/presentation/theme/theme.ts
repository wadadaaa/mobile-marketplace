export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: {
      primary: '#000000',
      secondary: '#8E8E93',
      disabled: '#C7C7CC',
    },
    border: '#E5E5EA',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadows: {
    sm: `
      shadow-color: #000;
      shadow-offset: 0px 1px;
      shadow-opacity: 0.1;
      shadow-radius: 2px;
      elevation: 2;
    `,
    md: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.15;
      shadow-radius: 4px;
      elevation: 4;
    `,
    lg: `
      shadow-color: #000;
      shadow-offset: 0px 4px;
      shadow-opacity: 0.2;
      shadow-radius: 8px;
      elevation: 8;
    `,
  },
} as const;

export type Theme = typeof theme;

// Re-export for convenience
export type ThemeColors = Theme['colors'];
export type ThemeSpacing = Theme['spacing'];
export type ThemeTypography = Theme['typography'];
export type ThemeBorderRadius = Theme['borderRadius'];
export type ThemeShadows = Theme['shadows'];
