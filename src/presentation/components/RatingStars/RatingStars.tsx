import React, { memo, ReactElement } from 'react';
import * as S from './RatingStars.styles';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

function RatingStars({ rating, reviewCount, size = 16 }: RatingStarsProps): ReactElement {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  function renderStar(index: number): ReactElement {
    if (index < fullStars) {
      return <S.StarText key={index} size={size}>★</S.StarText>;
    }
    if (index === fullStars && hasHalfStar) {
      return <S.StarText key={index} size={size}>★</S.StarText>;
    }
    return <S.EmptyStarText key={index} size={size}>☆</S.EmptyStarText>;
  }

  return (
    <S.Container>
      <S.StarsContainer>
        {[0, 1, 2, 3, 4].map(renderStar)}
      </S.StarsContainer>
      <S.RatingText>
        {rating.toFixed(1)}{reviewCount ? ` (${reviewCount})` : ''}
      </S.RatingText>
    </S.Container>
  );
}

export default memo(RatingStars);
