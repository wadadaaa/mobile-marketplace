import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen/OrderConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator id="Root">
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ title: 'Order Confirmation', headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
