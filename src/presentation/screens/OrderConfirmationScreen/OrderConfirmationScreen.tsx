import React, { useCallback, ReactElement } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { selectCurrentOrder } from '../../../store/selectors/ordersSelectors';
import { clearCurrentOrder } from '../../../store/slices/ordersSlice';
import { formatCurrency } from '../../../utils/formatCurrency';
import { RootStackParamList } from '../../navigation/types';
import * as S from './OrderConfirmationScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function OrderConfirmationScreen(): ReactElement {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const order = useSelector(selectCurrentOrder);

  const handleContinueShopping = useCallback(() => {
    dispatch(clearCurrentOrder());
    navigation.navigate('MainTabs', { screen: 'ProductList' });
  }, [dispatch, navigation]);

  if (!order) {
    return (
      <S.Container>
        <S.ErrorText>Order not found</S.ErrorText>
      </S.Container>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString();

  return (
    <S.Container>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <S.SuccessSection>
          <S.SuccessIcon>check</S.SuccessIcon>
          <S.SuccessTitle>Order Confirmed!</S.SuccessTitle>
          <S.SuccessMessage>
            Thank you for your purchase. Your order has been placed successfully.
          </S.SuccessMessage>
        </S.SuccessSection>

        <S.OrderSection>
          <S.SectionTitle>Order Details</S.SectionTitle>
          <S.OrderInfoRow>
            <S.OrderInfoLabel>Order ID</S.OrderInfoLabel>
            <S.OrderInfoValue>{order.id}</S.OrderInfoValue>
          </S.OrderInfoRow>
          <S.OrderInfoRow>
            <S.OrderInfoLabel>Date</S.OrderInfoLabel>
            <S.OrderInfoValue>{formattedDate}</S.OrderInfoValue>
          </S.OrderInfoRow>
          <S.OrderInfoRow>
            <S.OrderInfoLabel>Status</S.OrderInfoLabel>
            <S.StatusBadge>
              <S.StatusText>{order.status}</S.StatusText>
            </S.StatusBadge>
          </S.OrderInfoRow>
        </S.OrderSection>

        <S.ItemsSection>
          <S.SectionTitle>Items ({order.items.length})</S.SectionTitle>
          {order.items.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            return (
              <S.ItemCard key={index}>
                <S.ItemInfo>
                  <S.ItemName numberOfLines={2}>{item.productName}</S.ItemName>
                  <S.ItemDetails>
                    Qty: {item.quantity} x {formatCurrency(item.price)}
                  </S.ItemDetails>
                </S.ItemInfo>
                <S.ItemTotal>{formatCurrency(itemTotal)}</S.ItemTotal>
              </S.ItemCard>
            );
          })}
        </S.ItemsSection>

        <S.TotalSection>
          <S.TotalRow>
            <S.TotalLabel>Total</S.TotalLabel>
            <S.TotalValue>{formatCurrency(order.totalPrice)}</S.TotalValue>
          </S.TotalRow>
        </S.TotalSection>
      </ScrollView>

      <S.BottomBar>
        <S.ContinueButton onPress={handleContinueShopping}>
          <S.ContinueButtonText>Continue Shopping</S.ContinueButtonText>
        </S.ContinueButton>
      </S.BottomBar>
    </S.Container>
  );
}

export default OrderConfirmationScreen;
