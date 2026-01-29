import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FiltersContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const SearchRow = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const FiltersRow = styled.View`
  height: 36px;
  justify-content: center;
`;

export const SortRow = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  justify-content: flex-end;
`;
