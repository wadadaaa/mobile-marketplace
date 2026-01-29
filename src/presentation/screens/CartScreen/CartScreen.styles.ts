import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md}px;
  ${({ theme }) => theme.shadows.md};
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SummaryValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

export const PlaceOrderButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
  min-height: 50px;
  justify-content: center;
`;

export const PlaceOrderText = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
`;
