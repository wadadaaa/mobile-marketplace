import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const RetryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
`;
