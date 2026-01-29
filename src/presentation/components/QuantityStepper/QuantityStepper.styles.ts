import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

interface ButtonProps {
  isDisabled: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.text.disabled : theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: 20px;
  font-weight: 600;
`;

export const QuantityText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 40px;
  text-align: center;
`;
