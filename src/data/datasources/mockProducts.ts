import { Product, ProductCategory } from '../../domain/entities';

const categories: ProductCategory[] = [
  'electronics',
  'clothing',
  'home',
  'books',
  'sports',
  'beauty',
  'toys',
];

const productNames: Record<ProductCategory, string[]> = {
  electronics: [
    'Wireless Headphones',
    'Smart Watch',
    'Laptop Stand',
    'USB-C Cable',
    'Portable Charger',
    'Bluetooth Speaker',
    'Gaming Mouse',
    'Mechanical Keyboard',
    '4K Monitor',
    'Webcam HD',
    'Phone Case',
    'Screen Protector',
    'Wireless Earbuds',
    'Power Bank',
    'HDMI Cable',
  ],
  clothing: [
    'Cotton T-Shirt',
    'Denim Jeans',
    'Leather Jacket',
    'Running Shoes',
    'Sneakers',
    'Hoodie',
    'Dress Shirt',
    'Yoga Pants',
    'Winter Coat',
    'Summer Dress',
    'Polo Shirt',
    'Cargo Shorts',
    'Baseball Cap',
    'Wool Sweater',
    'Athletic Shorts',
  ],
  home: [
    'Coffee Maker',
    'Vacuum Cleaner',
    'Bed Sheets Set',
    'Throw Pillow',
    'Wall Clock',
    'Table Lamp',
    'Storage Bins',
    'Kitchen Knife Set',
    'Cutting Board',
    'Dining Plates',
    'Bath Towels',
    'Area Rug',
    'Curtain Set',
    'Trash Can',
    'Laundry Basket',
  ],
  books: [
    'Fiction Novel',
    'Self-Help Guide',
    'Cookbook',
    'Biography',
    'Science Fiction',
    'Mystery Thriller',
    'Fantasy Series',
    'Business Book',
    'History Book',
    'Art Book',
    'Programming Guide',
    'Poetry Collection',
    'Travel Guide',
    'Children Story',
    'Graphic Novel',
  ],
  sports: [
    'Yoga Mat',
    'Dumbbells Set',
    'Resistance Bands',
    'Jump Rope',
    'Tennis Racket',
    'Basketball',
    'Soccer Ball',
    'Gym Bag',
    'Water Bottle',
    'Exercise Ball',
    'Foam Roller',
    'Fitness Tracker',
    'Running Belt',
    'Knee Sleeves',
    'Protein Shaker',
  ],
  beauty: [
    'Face Moisturizer',
    'Hair Shampoo',
    'Body Lotion',
    'Lip Balm',
    'Nail Polish',
    'Makeup Brush Set',
    'Face Mask',
    'Sunscreen SPF 50',
    'Eye Cream',
    'Hair Serum',
    'Body Wash',
    'Perfume',
    'Hair Dryer',
    'Facial Cleanser',
    'Makeup Remover',
  ],
  toys: [
    'Building Blocks',
    'Action Figure',
    'Board Game',
    'Puzzle Set',
    'Stuffed Animal',
    'Remote Car',
    'Doll House',
    'Art Supplies',
    'Science Kit',
    'Musical Toy',
    'Educational Toy',
    'Card Game',
    'Play Dough Set',
    'Toy Train',
    'Outdoor Toy',
  ],
};

const adjectives = [
  'Premium',
  'Professional',
  'Deluxe',
  'Essential',
  'Ultimate',
  'Classic',
  'Modern',
  'Vintage',
  'Eco-Friendly',
  'Luxury',
  'Compact',
  'Portable',
  'Heavy Duty',
  'Lightweight',
  'Advanced',
];

function generateDescription(name: string, category: ProductCategory): string {
  const descriptions: Record<ProductCategory, string[]> = {
    electronics: [
      'High-quality electronics with latest technology.',
      'Designed for performance and durability.',
      'Features advanced connectivity options.',
      'Compatible with all major devices.',
    ],
    clothing: [
      'Comfortable and stylish apparel for everyday wear.',
      'Made from premium quality materials.',
      'Perfect fit with modern design.',
      'Durable fabric that lasts longer.',
    ],
    home: [
      'Essential home item for everyday use.',
      'Stylish design that complements any decor.',
      'Built to last with premium materials.',
      'Makes your home more comfortable.',
    ],
    books: [
      'Engaging read that captivates from start to finish.',
      'Well-written with compelling storytelling.',
      'Perfect for book lovers and enthusiasts.',
      'Highly rated by readers worldwide.',
    ],
    sports: [
      'Professional-grade equipment for athletes.',
      'Helps you achieve your fitness goals.',
      'Durable construction for intense workouts.',
      'Ergonomic design for maximum comfort.',
    ],
    beauty: [
      'Premium beauty product for radiant skin.',
      'Dermatologist tested and approved.',
      'Natural ingredients for gentle care.',
      'Suitable for all skin types.',
    ],
    toys: [
      'Fun and educational toy for children.',
      'Safe and non-toxic materials.',
      'Encourages creativity and imagination.',
      'Perfect gift for kids of all ages.',
    ],
  };

  const categoryDescriptions = descriptions[category];
  const randomDesc =
    categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
  return `${name} - ${randomDesc} High customer satisfaction guaranteed.`;
}

function generateTags(category: ProductCategory): string[] {
  const commonTags = ['bestseller', 'popular', 'new arrival', 'trending'];
  const categoryTags: Record<ProductCategory, string[]> = {
    electronics: ['tech', 'gadget', 'wireless', 'smart'],
    clothing: ['fashion', 'comfortable', 'stylish', 'casual'],
    home: ['decor', 'essential', 'practical', 'cozy'],
    books: ['reading', 'literature', 'educational', 'entertainment'],
    sports: ['fitness', 'athletic', 'workout', 'active'],
    beauty: ['skincare', 'cosmetics', 'wellness', 'natural'],
    toys: ['kids', 'fun', 'educational', 'creative'],
  };

  const tags = [...categoryTags[category]];
  const numCommonTags = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < numCommonTags; i++) {
    const randomTag = commonTags[Math.floor(Math.random() * commonTags.length)];
    if (!tags.includes(randomTag)) {
      tags.push(randomTag);
    }
  }

  return tags.slice(0, 4);
}

function generateProducts(count: number): Product[] {
  const products: Product[] = [];
  const productsPerCategory = Math.floor(count / categories.length);

  categories.forEach((category, catIndex) => {
    const names = productNames[category];

    for (let i = 0; i < productsPerCategory; i++) {
      const nameIndex = i % names.length;
      const baseName = names[nameIndex];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const name = Math.random() > 0.5 ? `${adjective} ${baseName}` : baseName;

      const id = `${category}-${catIndex * productsPerCategory + i + 1}`;
      const price = Math.floor(Math.random() * 990) + 10;
      const rating = Math.floor(Math.random() * 20 + 30) / 10;
      const reviewCount = Math.floor(Math.random() * 500) + 10;
      const stock = Math.floor(Math.random() * 100);
      const daysAgo = Math.floor(Math.random() * 365);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      products.push({
        id,
        name,
        description: generateDescription(name, category),
        price,
        category,
        imageUrl: `https://picsum.photos/seed/${id}/400/400`,
        rating,
        reviewCount,
        stock,
        tags: generateTags(category),
        createdAt,
      });
    }
  });

  return products;
}

export const mockProducts = generateProducts(1050);
