import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  height: 40px;
`;

export const SearchIcon = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

export const ClearIcon = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
