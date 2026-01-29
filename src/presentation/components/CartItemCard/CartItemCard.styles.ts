import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md}px;
  ${({ theme }) => theme.shadows.sm};
`;

export const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ProductName = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

export const RemoveIcon = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const WarningText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 600;
`;

export const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const TotalPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;
