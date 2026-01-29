import React, { memo, ReactElement } from 'react';
import * as S from './ErrorMessage.styles';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps): ReactElement {
  return (
    <S.Container>
      <S.ErrorText>{message}</S.ErrorText>
      {onRetry && (
        <S.RetryButton onPress={onRetry}>
          <S.RetryButtonText>Retry</S.RetryButtonText>
        </S.RetryButton>
      )}
    </S.Container>
  );
}

export default memo(ErrorMessage);
