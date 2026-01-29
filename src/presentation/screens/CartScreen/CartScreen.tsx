import React, { useCallback, ReactElement } from 'react';
import { FlatList, Alert, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  updateQuantityRequest,
  removeFromCart,
} from '../../../store/slices/cartSlice';
import { placeOrderRequest } from '../../../store/slices/ordersSlice';
import {
  selectCartItemsWithProducts,
  selectCartTotal,
  selectCartCount,
} from '../../../store/selectors/cartSelectors';
import { selectOrdersLoading, selectOrdersError } from '../../../store/selectors/ordersSelectors';
import { formatCurrency } from '../../../utils/formatCurrency';
import { RootStackParamList } from '../../navigation/types';
import { Product } from '../../../domain/entities';
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import * as S from './CartScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CartItemWithProduct {
  productId: string;
  quantity: number;
  addedAt: Date;
  product: Product | null;
}

function CartScreen(): ReactElement {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  const cartItems = useSelector(selectCartItemsWithProducts);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);
  const ordersLoading = useSelector(selectOrdersLoading);
  const ordersError = useSelector(selectOrdersError);

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch(updateQuantityRequest({ productId, quantity }));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (productId: string) => {
      Alert.alert(
        'Remove Item',
        'Are you sure you want to remove this item from cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => dispatch(removeFromCart(productId)),
          },
        ]
      );
    },
    [dispatch]
  );

  const handlePlaceOrder = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    const hasInvalidItems = cartItems.some(
      (item) => !item.product || item.quantity > item.product.stock
    );

    if (hasInvalidItems) {
      Alert.alert(
        'Error',
        'Some items in your cart are unavailable or exceed stock. Please review your cart.'
      );
      return;
    }

    Alert.alert(
      'Place Order',
      `Place order for ${cartCount} items (${formatCurrency(cartTotal)})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(placeOrderRequest());
            setTimeout(() => {
              if (!ordersError) {
                navigation.navigate('OrderConfirmation');
              }
            }, 1500);
          },
        },
      ]
    );
  }, [cartItems, cartCount, cartTotal, ordersError, dispatch, navigation]);

  const handleContinueShopping = useCallback(() => {
    navigation.navigate('MainTabs', { screen: 'ProductList' });
  }, [navigation]);

  const renderCartItem: ListRenderItem<CartItemWithProduct> = useCallback(
    ({ item }) => {
      if (!item.product) {
        return null;
      }

      return (
        <CartItemCard
          product={item.product}
          quantity={item.quantity}
          onUpdateQuantity={(quantity) =>
            handleUpdateQuantity(item.productId, quantity)
          }
          onRemove={() => handleRemoveItem(item.productId)}
        />
      );
    },
    [handleUpdateQuantity, handleRemoveItem]
  );

  const keyExtractor = useCallback(
    (item: CartItemWithProduct) => item.productId,
    []
  );

  if (cartItems.length === 0) {
    return (
      <S.Container>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Add some products to your cart to get started"
          actionLabel="Start Shopping"
          onAction={handleContinueShopping}
        />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <FlatList
        style={{ flex: 1 }}
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <S.BottomBar>
        <S.SummaryRow>
          <S.SummaryLabel>Subtotal ({cartCount} items)</S.SummaryLabel>
          <S.SummaryValue>{formatCurrency(cartTotal)}</S.SummaryValue>
        </S.SummaryRow>
        <S.PlaceOrderButton onPress={handlePlaceOrder} disabled={ordersLoading}>
          {ordersLoading ? (
            <LoadingSpinner size="small" color="#FFFFFF" />
          ) : (
            <S.PlaceOrderText>Place Order</S.PlaceOrderText>
          )}
        </S.PlaceOrderButton>
      </S.BottomBar>
    </S.Container>
  );
}

export default CartScreen;
