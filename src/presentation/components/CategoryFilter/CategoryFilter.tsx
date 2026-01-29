import React, { memo, ReactElement } from 'react';
import { ScrollView } from 'react-native';
import { ProductCategory } from '../../../domain/entities';
import * as S from './CategoryFilter.styles';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

interface CategoryOption {
  label: string;
  value: ProductCategory | null;
}

const CATEGORIES: CategoryOption[] = [
  { label: 'All', value: null },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Home', value: 'home' },
  { label: 'Books', value: 'books' },
  { label: 'Sports', value: 'sports' },
  { label: 'Beauty', value: 'beauty' },
  { label: 'Toys', value: 'toys' },
];

function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps): ReactElement {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8, alignItems: 'center' }}
    >
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category.value;
        return (
          <S.Chip
            key={category.label}
            onPress={() => onSelectCategory(category.value)}
            isSelected={isSelected}
          >
            <S.ChipText isSelected={isSelected}>
              {category.label}
            </S.ChipText>
          </S.Chip>
        );
      })}
    </ScrollView>
  );
}

export default memo(CategoryFilter);
