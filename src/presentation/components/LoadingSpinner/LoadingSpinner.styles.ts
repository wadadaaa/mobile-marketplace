import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  align-items: center;
  justify-content: center;
`;

export const FullScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;
