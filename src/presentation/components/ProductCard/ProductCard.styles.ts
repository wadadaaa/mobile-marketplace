import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-horizontal: ${({ theme }) => theme.spacing.md}px;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
  ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const ProductName = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 48px;
`;

export const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;
