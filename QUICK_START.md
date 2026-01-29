# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm or yarn installed (`npm --version`)
- ✅ iOS Simulator (Mac only) or Android Emulator

## Installation (2 minutes)

```bash
# 1. Navigate to project
cd marketplace-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

## Running the App

After `npm start`, you'll see a QR code and options:

### Option 1: iOS Simulator (Mac only)
```bash
Press 'i' or run: npm run ios
```

### Option 2: Android Emulator
```bash
Press 'a' or run: npm run android
```

### Option 3: Physical Device
1. Install "Expo Go" app from App Store/Play Store
2. Scan the QR code shown in terminal
3. App will load on your device

## Quick Tour

### 1. Product List Screen (Default)
- Browse 1050+ products
- Search products (try "laptop" or "shirt")
- Filter by category (swipe horizontal chips)
- Sort by price/rating (top-right dropdown)
- Scroll to bottom for infinite loading
- Pull down to refresh

### 2. Product Details
- Tap any product card
- View details, rating, stock
- Adjust quantity with +/- buttons
- Tap "Add to Cart" (disabled if out of stock)

### 3. Shopping Cart
- Tap "Cart" tab at bottom
- Update quantities or remove items
- View total price
- Tap "Place Order"
- Confirm in alert dialog

### 4. Order Confirmation
- View order details
- See success message
- Tap "Continue Shopping" to return

## Testing Features

### Search
- Type "premium laptop" - see filtered results
- Type "xyz123" - see empty state

### Filters
- Tap "Electronics" category
- Tap "Sort" → "Price: Low to High"
- Tap "All" to clear category

### Cart Operations
- Add 5 items to cart
- Update quantity to 1
- Remove an item
- Try to place order

### Edge Cases to Test
- Add out-of-stock item (disabled button)
- Add item with low stock (warning badge)
- Empty cart → see empty state
- Search with no results → see empty state
- Place order → 10% chance of failure (retry)

## Common Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Type check
npm run type-check

# Clear cache and restart
npm start -- --clear
```

## Troubleshooting

### Metro bundler won't start
```bash
npm start -- --clear
```

### iOS simulator not opening
```bash
npx expo run:ios
```

### Android emulator issues
```bash
# Make sure emulator is running first
# Then: npx expo run:android
```

### "Cannot find module" errors
```bash
rm -rf node_modules
npm install
```

### Port already in use
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
npm start
```

## What to Explore

### Code Structure
- `src/domain/` - Business entities
- `src/data/` - Mock data (1050 products!)
- `src/store/` - Redux setup
- `src/presentation/` - UI components and screens

### Key Files
- `src/data/datasources/mockProducts.ts` - Product generator
- `src/store/slices/productsSlice.ts` - Product state
- `src/presentation/screens/ProductListScreen/` - Main screen
- `src/presentation/theme/theme.ts` - Design system

### Mock Data
- 1050 products generated
- 7 categories
- Realistic prices, ratings, stock
- Random images from picsum.photos

## Features Implemented

✅ Product browsing with 1050+ items
✅ Real-time search with debounce
✅ Category filtering
✅ Multiple sort options
✅ Infinite scroll pagination
✅ Product details view
✅ Shopping cart management
✅ Stock validation
✅ Order placement with 10% failure rate
✅ Order confirmation
✅ Empty states
✅ Error handling
✅ Loading states
✅ Pull-to-refresh

## Next Steps

1. **Explore the code** - Check out the clean architecture
2. **Read README.md** - Full documentation
3. **Run tests** - `npm test`
4. **Try building** - `npx expo prebuild`
5. **Add features** - It's your playground!

## Getting Help

- Check `README.md` for full documentation
- Check `PROJECT_SUMMARY.md` for implementation details
- Search issues in React Native docs
- Check Expo documentation at docs.expo.dev

## Development Tips

- Hot reload is enabled - save files to see changes
- Use React DevTools for debugging
- Check Redux DevTools for state inspection
- Console logs appear in terminal
- Use `console.log()` for debugging
- Errors show in red screen (shake device to dismiss)

---

**Ready to start?** Run `npm start` and press `i` (iOS) or `a` (Android)!

Happy coding! 🚀