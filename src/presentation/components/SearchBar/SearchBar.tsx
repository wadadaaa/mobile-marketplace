import React, { useState, useCallback, useEffect, memo, ReactElement } from 'react';
import * as S from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search products...',
  debounceMs = 300,
}: SearchBarProps): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (localValue === value) {
      return;
    }

    const timer = setTimeout(() => {
      onChangeText(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, value, onChangeText, debounceMs]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChangeText('');
  }, [onChangeText]);

  const showClearButton = localValue.length > 0;

  return (
    <S.Container>
      <S.SearchIcon>Search</S.SearchIcon>
      <S.Input
        value={localValue}
        onChangeText={setLocalValue}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        returnKeyType="search"
      />
      {showClearButton && (
        <S.ClearButton onPress={handleClear}>
          <S.ClearIcon>x</S.ClearIcon>
        </S.ClearButton>
      )}
    </S.Container>
  );
}

export default memo(SearchBar);
