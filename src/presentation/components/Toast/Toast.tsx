import React, { useEffect, useRef, useCallback, ReactElement } from 'react';
import { Animated } from 'react-native';
import * as S from './Toast.styles';

export interface ToastConfig {
  message: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastProps extends ToastConfig {
  visible: boolean;
  onHide: () => void;
}

const ANIMATION_DURATION = 200;
const TRANSLATE_Y_HIDDEN = 20;

function Toast({ message, duration = 3000, action, visible, onHide }: ToastProps): ReactElement | null {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(TRANSLATE_Y_HIDDEN)).current;

  const animateOut = useCallback((): void => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: TRANSLATE_Y_HIDDEN,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, [opacity, translateY, onHide]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(animateOut, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, opacity, translateY, animateOut]);

  function handleActionPress(): void {
    action?.onPress();
    animateOut();
  }

  if (!visible) {
    return null;
  }

  return (
    <S.Container style={{ opacity, transform: [{ translateY }] }}>
      <S.Message>{message}</S.Message>
      {action && (
        <S.ActionButton onPress={handleActionPress}>
          <S.ActionText>{action.label}</S.ActionText>
        </S.ActionButton>
      )}
    </S.Container>
  );
}

export default Toast;
