import React, { memo, ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import * as S from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

function LoadingSpinner({
  size = 'large',
  color = '#007AFF',
  fullScreen = false,
}: LoadingSpinnerProps): ReactElement {
  const Container = fullScreen ? S.FullScreenContainer : S.Container;

  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
}

export default memo(LoadingSpinner);
