import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled(Animated.View)`
  position: absolute;
  bottom: 100px;
  left: 16px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.shadows.lg};
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  flex: 1;
`;

export const ActionButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

export const ActionText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
`;
