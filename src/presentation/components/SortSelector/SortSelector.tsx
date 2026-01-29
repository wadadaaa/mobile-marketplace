import React, { useState, useCallback, memo, ReactElement } from 'react';
import { Modal } from 'react-native';
import { SortOption } from '../../../domain/repositories';
import * as S from './SortSelector.styles';

interface SortSelectorProps {
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

interface SortOptionItem {
  label: string;
  value: SortOption;
}

const SORT_OPTIONS: SortOptionItem[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
];

function SortSelector({ selectedSort, onSelectSort }: SortSelectorProps): ReactElement {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => setModalVisible(false), []);

  const handleSelect = useCallback((value: SortOption) => {
    onSelectSort(value);
    setModalVisible(false);
  }, [onSelectSort]);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === selectedSort);
  const selectedLabel = selectedOption?.label ?? 'Sort';

  return (
    <>
      <S.TriggerButton onPress={openModal}>
        <S.TriggerText>Sort: {selectedLabel}</S.TriggerText>
      </S.TriggerButton>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <S.Overlay onPress={closeModal}>
          <S.ModalContent onPress={(e) => e.stopPropagation()}>
            <S.ModalTitle>Sort By</S.ModalTitle>
            {SORT_OPTIONS.map((option) => {
              const isSelected = selectedSort === option.value;
              return (
                <S.OptionButton
                  key={option.value}
                  onPress={() => handleSelect(option.value)}
                  isSelected={isSelected}
                >
                  <S.OptionText isSelected={isSelected}>
                    {option.label}
                  </S.OptionText>
                  {isSelected && <S.CheckMark>check</S.CheckMark>}
                </S.OptionButton>
              );
            })}
            <S.CancelButton onPress={closeModal}>
              <S.CancelText>Cancel</S.CancelText>
            </S.CancelButton>
          </S.ModalContent>
        </S.Overlay>
      </Modal>
    </>
  );
}

export default memo(SortSelector);
