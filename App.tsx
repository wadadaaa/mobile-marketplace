import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store';
import { ThemeProvider } from './src/presentation/theme';
import { ToastProvider } from './src/presentation/context';
import { RootNavigator } from './src/presentation/navigation/RootNavigator';
import ErrorBoundary from './src/presentation/components/ErrorBoundary/ErrorBoundary';

export default function App(): React.ReactElement {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <Provider store={store}>
            <ThemeProvider>
              <ToastProvider>
                <RootNavigator />
                <StatusBar style="auto" />
              </ToastProvider>
            </ThemeProvider>
          </Provider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
