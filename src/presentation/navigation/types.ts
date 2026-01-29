import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ProductDetail: { productId: string };
  OrderConfirmation: undefined;
};

export type MainTabParamList = {
  ProductList: undefined;
  Cart: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
