import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { addToCartRequest } from '../../../store/slices/cartSlice';
import { setSearch } from '../../../store/slices/productsSlice';
import { selectProductById } from '../../../store/selectors/productsSelectors';
import { selectCartError } from '../../../store/selectors/cartSelectors';
import { RootState } from '../../../store';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useToast } from '../../context';
import RatingStars from '../../components/RatingStars/RatingStars';
import StockBadge from '../../components/StockBadge/StockBadge';
import QuantityStepper from '../../components/QuantityStepper/QuantityStepper';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as S from './ProductDetailScreen.styles';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function ProductDetailScreen(): ReactElement {
  const dispatch = useDispatch();
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { showToast } = useToast();
  const { productId } = route.params;

  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state: RootState) =>
    selectProductById(productId)(state)
  );
  const cartError = useSelector(selectCartError);

  useEffect(() => {
    if (cartError) {
      Alert.alert('Error', cartError);
    }
  }, [cartError]);

  const handleAddToCart = useCallback(() => {
    if (!product) {
      return;
    }

    dispatch(addToCartRequest({ productId: product.id, quantity }));
    showToast({
      message: `Added ${quantity} ${product.name} to cart`,
      action: {
        label: 'View Cart',
        onPress: () => navigation.navigate('MainTabs', { screen: 'Cart' }),
      },
    });
    setQuantity(1);
  }, [dispatch, product, quantity, showToast, navigation]);

  const handleIncrement = useCallback(() => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  }, [product, quantity]);

  const handleDecrement = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const handleTagPress = useCallback((tag: string) => {
    dispatch(setSearch(tag));
    navigation.navigate('MainTabs', { screen: 'ProductList' });
  }, [dispatch, navigation]);

  if (!product) {
    return <ErrorMessage message="Product not found" />;
  }

  const isOutOfStock = product.stock === 0;
  const maxQuantity = Math.min(product.stock, 999);
  const buttonText = isOutOfStock ? 'Out of Stock' : 'Add to Cart';

  return (
    <S.Container>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <S.HeroImage source={{ uri: product.imageUrl }} />
        <S.ContentContainer>
          <S.HeaderSection>
            <S.ProductName>{product.name}</S.ProductName>
            <S.Price>{formatCurrency(product.price)}</S.Price>
          </S.HeaderSection>

          <S.RatingSection>
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size={20}
            />
          </S.RatingSection>

          <S.StockSection>
            <StockBadge stock={product.stock} />
          </S.StockSection>

          <S.DescriptionSection>
            <S.SectionTitle>Description</S.SectionTitle>
            <S.Description>{product.description}</S.Description>
          </S.DescriptionSection>

          <S.TagsSection>
            {product.tags.map((tag) => (
              <S.Tag key={tag} onPress={() => handleTagPress(tag)}>
                <S.TagText>{tag}</S.TagText>
              </S.Tag>
            ))}
          </S.TagsSection>
        </S.ContentContainer>
      </ScrollView>

      <S.BottomBar>
        <S.QuantitySection>
          <S.QuantityLabel>Quantity</S.QuantityLabel>
          <QuantityStepper
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            max={maxQuantity}
            disabled={isOutOfStock}
          />
        </S.QuantitySection>
        <S.AddToCartButton
          onPress={handleAddToCart}
          disabled={isOutOfStock}
          isDisabled={isOutOfStock}
        >
          <S.AddToCartText>{buttonText}</S.AddToCartText>
        </S.AddToCartButton>
      </S.BottomBar>
    </S.Container>
  );
}

export default ProductDetailScreen;
