import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeroImage = styled.Image`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const HeaderSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const ProductName = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.h2.lineHeight}px;
`;

export const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
`;

export const RatingSection = styled.View``;

export const StockSection = styled.View``;

export const DescriptionSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.body.lineHeight}px;
`;

export const TagsSection = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const Tag = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary}15;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary}30;
`;

export const TagText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BottomBar = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md}px;
  ${({ theme }) => theme.shadows.md};
`;

export const QuantitySection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const QuantityLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

interface ButtonProps {
  isDisabled: boolean;
}

export const AddToCartButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.text.disabled : theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
`;

export const AddToCartText = styled.Text`
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: 600;
`;
