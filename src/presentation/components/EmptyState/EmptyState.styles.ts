import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const IconContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const IconText = styled.Text`
  font-size: 36px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const ActionButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
`;
