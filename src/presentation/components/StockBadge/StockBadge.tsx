import React, { memo, ReactElement } from 'react';
import * as S from './StockBadge.styles';

interface StockBadgeProps {
  stock: number;
}

type StockStatus = { text: string; color: 'error' | 'warning' | 'success' };

function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return { text: 'Out of Stock', color: 'error' };
  }
  if (stock <= 10) {
    return { text: `Only ${stock} left`, color: 'warning' };
  }
  return { text: 'In Stock', color: 'success' };
}

function StockBadge({ stock }: StockBadgeProps): ReactElement {
  const status = getStockStatus(stock);

  return (
    <S.Badge color={status.color}>
      <S.BadgeText>{status.text}</S.BadgeText>
    </S.Badge>
  );
}

export default memo(StockBadge);
