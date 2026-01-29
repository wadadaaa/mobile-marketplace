import React, { memo, useCallback, ReactElement } from 'react';
import { Product } from '../../../domain/entities';
import { formatCurrency } from '../../../utils/formatCurrency';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import * as S from './CartItemCard.styles';

interface CartItemCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItemCard({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps): ReactElement {
  const handleIncrement = useCallback(() => {
    if (quantity < product.stock) {
      onUpdateQuantity(quantity + 1);
    }
  }, [quantity, product.stock, onUpdateQuantity]);

  const handleDecrement = useCallback(() => {
    if (quantity > 1) {
      onUpdateQuantity(quantity - 1);
    }
  }, [quantity, onUpdateQuantity]);

  const totalPrice = product.price * quantity;
  const exceedsStock = quantity > product.stock;

  return (
    <S.Card>
      <S.ImageContainer>
        <S.ProductImage source={{ uri: product.imageUrl }} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.TopRow>
          <S.ProductName numberOfLines={2}>{product.name}</S.ProductName>
          <S.RemoveButton onPress={onRemove}>
            <S.RemoveIcon>X</S.RemoveIcon>
          </S.RemoveButton>
        </S.TopRow>
        <S.Price>{formatCurrency(product.price)}</S.Price>
        {exceedsStock && (
          <S.WarningText>
            Only {product.stock} available in stock
          </S.WarningText>
        )}
        <S.BottomRow>
          <QuantityStepper
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            max={product.stock}
          />
          <S.TotalPrice>{formatCurrency(totalPrice)}</S.TotalPrice>
        </S.BottomRow>
      </S.ContentContainer>
    </S.Card>
  );
}

export default memo(CartItemCard);
