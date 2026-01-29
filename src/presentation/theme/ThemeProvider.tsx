import React, { ReactNode, ReactElement } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { theme } from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
