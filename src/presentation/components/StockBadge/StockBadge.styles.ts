import styled, { DefaultTheme } from 'styled-components/native';

interface BadgeProps {
  color: 'success' | 'warning' | 'error';
}

const getBadgeColor = (color: BadgeProps['color'], theme: DefaultTheme) => {
  switch (color) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    default:
      return theme.colors.text.secondary;
  }
};

export const Badge = styled.View<BadgeProps>`
  background-color: ${({ color, theme }) => getBadgeColor(color, theme)}20;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text<BadgeProps>`
  color: ${({ color, theme }) => getBadgeColor(color, theme)};
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: 600;
`;
