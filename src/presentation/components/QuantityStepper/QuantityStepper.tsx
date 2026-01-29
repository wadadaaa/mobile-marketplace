import React, { memo, ReactElement } from 'react';
import * as S from './QuantityStepper.styles';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 999,
  disabled = false,
}: QuantityStepperProps): ReactElement {
  const canDecrement = quantity > min && !disabled;
  const canIncrement = quantity < max && !disabled;

  return (
    <S.Container>
      <S.Button
        onPress={onDecrement}
        disabled={!canDecrement}
        isDisabled={!canDecrement}
      >
        <S.ButtonText>-</S.ButtonText>
      </S.Button>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.Button
        onPress={onIncrement}
        disabled={!canIncrement}
        isDisabled={!canIncrement}
      >
        <S.ButtonText>+</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

export default memo(QuantityStepper);
