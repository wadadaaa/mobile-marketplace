import styled from 'styled-components/native';

interface ChipProps {
  isSelected: boolean;
}

export const Chip = styled.TouchableOpacity<ChipProps>`
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.border};
`;

export const ChipText = styled.Text<ChipProps>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: 600;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.surface : theme.colors.text.primary};
`;
