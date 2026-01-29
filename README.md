# React Native Marketplace App
<img width="301" height="655" alt="simulator_screenshot_39128093-6866-4529-AB1E-0660CF96CB88" src="https://github.com/user-attachments/assets/7e06f017-5f75-4f02-992f-ebee48506376" />


<img width="301" height="655" alt="simulator_screenshot_0492035C-1AE0-4F0A-83AE-B967DB074B29" src="https://github.com/user-attachments/assets/d7e84937-5a53-420c-ae5d-a9af1d9425d4" />


<img width="301" height="655" alt="simulator_screenshot_978897B3-DA78-463F-8297-FE9EF73A35DA" src="https://github.com/user-attachments/assets/8457ad5d-9d5b-43cd-9b60-ec2571333a20" />


A production-quality marketplace mobile application built with React Native (Expo), TypeScript, Redux Toolkit, Redux Saga, and Styled Components. This project demonstrates clean architecture principles, performance optimization, and comprehensive edge-case handling.

## 🚀 Features

- **Product Browsing**: Browse 1000+ products with infinite scroll
- **Search & Filter**: Real-time search with category filtering and multiple sort options
- **Product Details**: Detailed product view with images, ratings, and stock information
- **Shopping Cart**: Full cart management with quantity updates and stock validation
- **Order Placement**: Complete checkout flow with order confirmation
- **Responsive UI**: Optimized for both iOS and Android platforms
- **Error Handling**: Comprehensive error boundaries and graceful error states
- **Performance**: Optimized list rendering, memoization, and state normalization

## 📋 Tech Stack

### Core Technologies
- **React Native**: 0.76.5 (via Expo SDK 54)
- **TypeScript**: Strict type checking enabled
- **Expo**: 54.0.0

### State Management
- **Redux Toolkit**: Modern Redux with less boilerplate
- **Redux Saga**: Side effect management for async operations
- **Reselect**: Memoized selectors for performance

### UI & Styling
- **Styled Components**: CSS-in-JS with theming support
- **React Navigation**: Type-safe navigation (Stack & Bottom Tabs)

### Testing
- **Jest**: Unit testing framework
- **React Native Testing Library**: Component testing

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/              # Business logic layer (pure TypeScript)
│   ├── entities/        # Core business entities (Product, Cart, Order)
│   └── repositories/    # Repository interfaces
├── data/                # Data layer
│   ├── repositories/    # Repository implementations
│   ├── datasources/     # Mock API, data generators
│   └── models/          # Data transfer objects
├── presentation/        # UI layer
│   ├── screens/         # Screen components
│   ├── components/      # Reusable UI components
│   ├── navigation/      # Navigation configuration
│   └── theme/           # Design tokens, styled-components theme
├── store/               # Redux store configuration
│   ├── slices/          # Redux Toolkit slices
│   ├── sagas/           # Redux Saga workers/watchers
│   └── selectors/       # Reselect memoized selectors
└── utils/               # Shared utilities
```

### Key Architectural Principles

1. **Dependency Inversion**: Domain layer has no dependencies on outer layers
2. **Separation of Concerns**: Clear boundaries between business logic, data, and UI
3. **Single Responsibility**: Each module handles one aspect
4. **Immutability**: Redux Toolkit's Immer for immutable state updates
5. **Type Safety**: Full TypeScript coverage with strict mode

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (installed automatically)
- iOS Simulator (Mac only) or Android Emulator

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketplace-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platform**
   ```bash
   npm run ios      # Run on iOS simulator
   npm run android  # Run on Android emulator
   npm run web      # Run in web browser
   ```

## 🎮 Usage

### Running the App

1. Start the Expo development server:
   ```bash
   npm start
   ```

2. Choose your platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

### Testing the App

1. **Product List**:
   - Scroll through products
   - Use search bar to find products
   - Filter by category using chips
   - Sort by price, rating, or newest
   - Pull down to refresh
   - Scroll to bottom for infinite loading

2. **Product Details**:
   - Tap any product card
   - View product information
   - Adjust quantity with stepper
   - Add to cart (disabled if out of stock)

3. **Shopping Cart**:
   - Navigate to Cart tab
   - Update quantities
   - Remove items
   - Place order

4. **Order Confirmation**:
   - View order details
   - See order summary
   - Continue shopping

## 🧪 Testing

### Run Tests

```bash
npm test                    # Run all tests
npm test -- --coverage      # Run with coverage report
npm test -- --watch         # Run in watch mode
```

### Test Coverage Goals

- Redux Slices: 100%
- Sagas: 90%+
- Critical UI Components: 80%+
- Overall: 70%+

## 🎨 Design System

### Theme

The app uses a consistent design system defined in `src/presentation/theme/theme.ts`:

- **Colors**: Primary, secondary, success, warning, error, neutral tones
- **Typography**: H1, H2, H3, body, caption with consistent sizing
- **Spacing**: XS (4px) to XL (32px)
- **Border Radius**: SM (4px) to XL (16px)
- **Shadows**: Elevation system for depth

### Component Library

Reusable components built with Styled Components:

- **ProductCard**: Product display with image, name, price, rating
- **SearchBar**: Debounced search input
- **CategoryFilter**: Horizontal scrollable category chips
- **SortSelector**: Modal-based sort options
- **QuantityStepper**: Increment/decrement quantity control
- **StockBadge**: Color-coded stock indicator
- **RatingStars**: Visual star rating display
- **CartItemCard**: Cart item with quantity controls
- **EmptyState**: Empty state with action button
- **LoadingSpinner**: Loading indicator
- **ErrorMessage**: Error display with retry option
- **ErrorBoundary**: React error boundary

## ⚡ Performance Optimizations

1. **List Rendering**:
   - FlatList with `getItemLayout` for known heights
   - `removeClippedSubviews` on Android
   - `windowSize` and `maxToRenderPerBatch` configuration
   - Memoized list items with `React.memo()`

2. **State Management**:
   - Normalized state shape (products by ID)
   - Memoized selectors with Reselect
   - Debounced search input (300ms)

3. **Component Optimization**:
   - `React.memo()` on pure components
   - `useMemo()` for expensive computations
   - `useCallback()` for event handlers

4. **Bundle Size**:
   - Tree-shaking with Metro bundler
   - Selective imports from lodash

## 🛡️ Edge Cases Handled

### Products
- ✅ Empty search results with clear filters option
- ✅ Network errors with retry button
- ✅ Out of stock products (disabled add to cart)
- ✅ Last page indication (no more load)
- ✅ Active filters indication

### Cart
- ✅ Stock validation on add/update
- ✅ Quantity exceeds stock warning
- ✅ Product unavailable in cart
- ✅ Empty cart state
- ✅ Auto-remove items with quantity 0

### Orders
- ✅ Order placement failure (10% mock failure)
- ✅ Empty cart checkout prevention
- ✅ Network timeout handling
- ✅ Success flow with cart clearance
- ✅ Debounced place order button

### UI
- ✅ Loading states with spinners
- ✅ Error boundaries for React errors
- ✅ Pull-to-refresh support
- ✅ Keyboard avoidance (implicit via React Native)

## 🔧 Configuration

### Environment Variables

No environment variables required for mock data. For real API:

1. Create `.env` file:
   ```
   API_BASE_URL=https://your-api.com
   ```

2. Update datasources to use real endpoints

### TypeScript Configuration

TypeScript strict mode is disabled for styled-components compatibility. To enable:

1. Update `tsconfig.json`: `"strict": true`
2. Add explicit type annotations to all styled-components

## 📱 Platform Differences

### iOS
- Native shadows via `shadowColor`, `shadowOffset`, `shadowOpacity`
- Pull-to-refresh with native iOS style

### Android
- Elevation-based shadows via `elevation`
- Pull-to-refresh with Android material style
- `removeClippedSubviews` optimization enabled

## 🚧 Known Limitations

1. **Mock Data**: All data is generated in-memory (no persistence)
2. **Authentication**: No user authentication implemented
3. **Payment**: No real payment integration
4. **Push Notifications**: Not implemented
5. **Offline Mode**: No offline support (future enhancement)

## 🔮 Future Enhancements

- [ ] Persistent storage (AsyncStorage/SQLite)
- [ ] User authentication & profiles
- [ ] Wishlist/favorites
- [ ] Product reviews and ratings
- [ ] Payment gateway integration
- [ ] Order history with details
- [ ] Push notifications
- [ ] Offline mode with sync
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Analytics integration
- [ ] Performance monitoring

## 🐛 Troubleshooting

### Metro bundler cache issues
```bash
npm start -- --clear
```

### iOS simulator not opening
```bash
npx expo run:ios
```

### Android emulator issues
```bash
npx expo run:android
```

### TypeScript errors
```bash
npx tsc --noEmit
```

### Reset project
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built with ❤️ as a demonstration of modern React Native development practices.

## 🙏 Acknowledgments

- React Native community
- Redux Toolkit team
- Styled Components maintainers
- Expo team for amazing developer experience

---

**Note**: This is a sample/demo application built for educational purposes. Mock data is used throughout the application.
