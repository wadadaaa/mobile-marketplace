import React, { memo, ReactElement } from 'react';
import { Product } from '../../../domain/entities';
import { formatCurrency } from '../../../utils/formatCurrency';
import RatingStars from '../RatingStars/RatingStars';
import StockBadge from '../StockBadge/StockBadge';
import * as S from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({ product, onPress }: ProductCardProps): ReactElement {
  return (
    <S.Card onPress={onPress}>
      <S.ImageContainer>
        <S.ProductImage source={{ uri: product.imageUrl }} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.ProductName numberOfLines={2}>{product.name}</S.ProductName>
        <S.PriceRow>
          <S.Price>{formatCurrency(product.price)}</S.Price>
          <StockBadge stock={product.stock} />
        </S.PriceRow>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
      </S.ContentContainer>
    </S.Card>
  );
}

export default memo(ProductCard);
