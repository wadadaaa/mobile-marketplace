import React, { ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import ProductListScreen from '../screens/ProductListScreen/ProductListScreen';
import CartScreen from '../screens/CartScreen/CartScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator(): ReactElement {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: 'Products',
          tabBarLabel: 'Products',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
        }}
      />
    </Tab.Navigator>
  );
}
