import React, { memo, ReactElement } from 'react';
import * as S from './EmptyState.styles';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({ title, message, icon = '🔍', actionLabel, onAction }: EmptyStateProps): ReactElement {
  return (
    <S.Container>
      <S.IconContainer>
        <S.IconText>{icon}</S.IconText>
      </S.IconContainer>
      <S.Title>{title}</S.Title>
      <S.Message>{message}</S.Message>
      {actionLabel && onAction && (
        <S.ActionButton onPress={onAction}>
          <S.ActionButtonText>{actionLabel}</S.ActionButtonText>
        </S.ActionButton>
      )}
    </S.Container>
  );
}

export default memo(EmptyState);
