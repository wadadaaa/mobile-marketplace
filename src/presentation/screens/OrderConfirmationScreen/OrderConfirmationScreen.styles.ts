import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

export const SuccessSection = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const SuccessIcon = styled.Text`
  font-size: 64px;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const SuccessTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const SuccessMessage = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const OrderSection = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const OrderInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OrderInfoLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const OrderInfoValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

export const StatusBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.success}20;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

export const StatusText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
  text-transform: capitalize;
`;

export const ItemsSection = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const ItemCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ItemInfo = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

export const ItemName = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const ItemDetails = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ItemTotal = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

export const TotalSection = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: 80px;
`;

export const TotalRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TotalValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
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
  ${({ theme }) => theme.shadows.md};
`;

export const ContinueButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
`;

export const ContinueButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
`;
