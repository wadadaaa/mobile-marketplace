import React, { useEffect, useCallback, ReactElement } from 'react';
import { FlatList, RefreshControl, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  fetchProductsRequest,
  setSearch,
  setCategory,
  setSortBy,
  loadMoreProducts,
  clearFilters,
} from '../../../store/slices/productsSlice';
import {
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
  selectHasMore,
  selectFilters,
} from '../../../store/selectors/productsSelectors';
import { Product } from '../../../domain/entities';
import { RootStackParamList } from '../../navigation/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import SortSelector from '../../components/SortSelector/SortSelector';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import * as S from './ProductListScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function ProductListScreen(): ReactElement {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const hasMore = useSelector(selectHasMore);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(loadMoreProducts());
    }
  }, [hasMore, loading, dispatch]);

  const handleProductPress = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation]
  );

  const handleSearchChange = useCallback(
    (text: string) => dispatch(setSearch(text)),
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (category: Parameters<typeof setCategory>[0]) => dispatch(setCategory(category)),
    [dispatch]
  );

  const handleSortChange = useCallback(
    (sort: Parameters<typeof setSortBy>[0]) => dispatch(setSortBy(sort)),
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const renderProduct: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.id)}
      />
    ),
    [handleProductPress]
  );

  const renderFooter = useCallback((): ReactElement | null => {
    if (!loading) {
      return null;
    }
    return <LoadingSpinner size="small" />;
  }, [loading]);

  const renderEmpty = useCallback((): ReactElement | null => {
    if (loading) {
      return null;
    }
    if (error) {
      return <ErrorMessage message={error} onRetry={handleRefresh} />;
    }
    return (
      <EmptyState
        icon="📦"
        title="No products found"
        message="Try adjusting your filters or search query"
        actionLabel="Clear Filters"
        onAction={handleClearFilters}
      />
    );
  }, [loading, error, handleRefresh, handleClearFilters]);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const isInitialLoad = loading && products.length === 0;
  if (isInitialLoad) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <S.Container>
      <S.FiltersContainer>
        <S.SearchRow>
          <SearchBar
            value={filters.search}
            onChangeText={handleSearchChange}
          />
        </S.SearchRow>
        <S.FiltersRow>
          <CategoryFilter
            selectedCategory={filters.category}
            onSelectCategory={handleCategoryChange}
          />
        </S.FiltersRow>
        <S.SortRow>
          <SortSelector
            selectedSort={filters.sortBy}
            onSelectSort={handleSortChange}
          />
        </S.SortRow>
      </S.FiltersContainer>
      <FlatList
        style={{ flex: 1 }}
        data={products}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        contentContainerStyle={products.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : undefined}
      />
    </S.Container>
  );
}

export default ProductListScreen;
