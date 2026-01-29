import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  gap: 2px;
`;

interface StarProps {
  size: number;
}

export const StarText = styled.Text<StarProps>`
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.warning};
`;

export const EmptyStarText = styled.Text<StarProps>`
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.text.disabled};
`;

export const RatingText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
