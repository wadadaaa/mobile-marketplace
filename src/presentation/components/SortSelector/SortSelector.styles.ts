import styled from 'styled-components/native';

export const TriggerButton = styled.TouchableOpacity`
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const TriggerText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

export const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

interface OptionProps {
  isSelected: boolean;
}

export const OptionButton = styled.TouchableOpacity<OptionProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const OptionText = styled.Text<OptionProps>`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.text.primary};
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '400')};
`;

export const CheckMark = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export const CancelButton = styled.TouchableOpacity`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
`;

export const CancelText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 600;
`;
