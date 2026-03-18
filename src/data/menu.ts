export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  category: string;
  type: 'veg' | 'non-veg';
  image?: string;
}

export interface MenuCategory {
  name: string;
  slug: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    name: 'Mutton Curries',
    slug: 'mutton-curries',
    items: [
      { name: 'Mutton Rogan Josh', price: 300, description: 'Slow-cooked Kashmiri-style mutton in aromatic spices', category: 'mutton-curries', type: 'non-veg' },
      { name: 'Mutton Ghee Roast', price: 320, description: 'Mangalorean-style mutton roasted in pure ghee with spices', category: 'mutton-curries', type: 'non-veg' },
      { name: 'Mutton Masala', price: 280, description: 'Rich and spicy mutton in a thick masala gravy', category: 'mutton-curries', type: 'non-veg' },
      { name: 'Mutton Kheema', price: 260, description: 'Minced mutton cooked with peas and aromatic spices', category: 'mutton-curries', type: 'non-veg' },
      { name: 'Mutton Dalcha', price: 290, description: 'Hyderabadi dal with tender mutton pieces', category: 'mutton-curries', type: 'non-veg' },
      { name: 'Mutton Paya', price: 270, description: 'Traditional slow-cooked trotters curry', category: 'mutton-curries', type: 'non-veg' },
      { name: 'Mutton Nihari', price: 310, description: 'Overnight slow-cooked stew, rich and flavorful', category: 'mutton-curries', type: 'non-veg' },
    ]
  },
  {
    name: 'Chicken Curries',
    slug: 'chicken-curries',
    items: [
      { name: 'Butter Chicken', price: 240, description: 'Creamy tomato-based gravy with tender chicken', category: 'chicken-curries', type: 'non-veg' },
      { name: 'Chicken Tikka Masala', price: 250, description: 'Grilled chicken tikka in rich masala curry', category: 'chicken-curries', type: 'non-veg' },
      { name: 'Chicken Do Pyaza', price: 230, description: 'Chicken cooked with double onions and spices', category: 'chicken-curries', type: 'non-veg' },
      { name: 'Chicken Chettinad', price: 260, description: 'South Indian style spicy chicken with black pepper', category: 'chicken-curries', type: 'non-veg' },
      { name: 'Chicken Korma', price: 240, description: 'Mild creamy chicken with cashew and almond gravy', category: 'chicken-curries', type: 'non-veg' },
      { name: 'Chicken Ghee Roast', price: 280, description: 'Coastal-style chicken roasted in ghee', category: 'chicken-curries', type: 'non-veg' },
    ]
  },
  {
    name: 'Biryani',
    slug: 'biryani',
    items: [
      { name: 'Mutton Biryani', price: 280, description: 'Signature dum biryani with tender mutton and saffron rice', category: 'biryani', type: 'non-veg' },
      { name: 'Chicken Biryani', price: 220, description: 'Aromatic basmati rice with juicy chicken pieces', category: 'biryani', type: 'non-veg' },
      { name: 'Egg Biryani', price: 180, description: 'Fragrant rice layered with boiled eggs and spices', category: 'biryani', type: 'non-veg' },
      { name: 'Veg Biryani', price: 180, description: 'Mixed vegetables in fragrant basmati rice', category: 'biryani', type: 'veg' },
      { name: 'Special Family Biryani', price: 400, description: 'Large portion for family sharing, loaded with meat', category: 'biryani', type: 'non-veg' },
    ]
  },
  {
    name: 'Noodles',
    slug: 'noodles',
    items: [
      { name: 'Chicken Noodles', price: 180, description: 'Stir-fried noodles with chicken and vegetables', category: 'noodles', type: 'non-veg' },
      { name: 'Egg Noodles', price: 150, description: 'Classic egg noodles with vegetables', category: 'noodles', type: 'non-veg' },
      { name: 'Veg Noodles', price: 140, description: 'Hakka-style noodles with fresh vegetables', category: 'noodles', type: 'veg' },
    ]
  },
  {
    name: 'Starters',
    slug: 'starters',
    items: [
      { name: 'Chicken 65', price: 200, description: 'Spicy deep-fried chicken with curry leaves', category: 'starters', type: 'non-veg' },
      { name: 'Chicken Lollipop', price: 220, description: 'Crispy chicken drumettes with spicy sauce', category: 'starters', type: 'non-veg' },
      { name: 'Mutton Fry', price: 280, description: 'Dry-roasted mutton with onions and spices', category: 'starters', type: 'non-veg' },
      { name: 'Fish Fry', price: 200, description: 'Crispy fried fish with masala coating', category: 'starters', type: 'non-veg' },
      { name: 'Prawn Fry', price: 250, description: 'Golden fried prawns with pepper seasoning', category: 'starters', type: 'non-veg' },
      { name: 'Paneer 65', price: 180, description: 'Crispy paneer cubes with spicy coating', category: 'starters', type: 'veg' },
      { name: 'Gobi 65', price: 160, description: 'Crispy cauliflower fritters with spices', category: 'starters', type: 'veg' },
    ]
  },
  {
    name: 'Kebabs',
    slug: 'kebabs',
    items: [
      { name: 'Seekh Kebab', price: 220, description: 'Minced meat kebabs grilled on skewers', category: 'kebabs', type: 'non-veg' },
      { name: 'Shami Kebab', price: 200, description: 'Tender minced meat patties with herbs', category: 'kebabs', type: 'non-veg' },
      { name: 'Chicken Reshmi Kebab', price: 240, description: 'Silky smooth chicken kebabs with cream', category: 'kebabs', type: 'non-veg' },
      { name: 'Mutton Boti Kebab', price: 280, description: 'Marinated mutton chunks grilled to perfection', category: 'kebabs', type: 'non-veg' },
      { name: 'Paneer Tikka', price: 180, description: 'Grilled paneer with bell peppers and onions', category: 'kebabs', type: 'veg' },
    ]
  },
  {
    name: 'Tandoor',
    slug: 'tandoor',
    items: [
      { name: 'Tandoori Chicken (Full)', price: 350, description: 'Whole chicken marinated and roasted in tandoor', category: 'tandoor', type: 'non-veg' },
      { name: 'Tandoori Chicken (Half)', price: 200, description: 'Half portion of our signature tandoori chicken', category: 'tandoor', type: 'non-veg' },
      { name: 'Chicken Tikka', price: 220, description: 'Boneless chicken pieces grilled in tandoor', category: 'tandoor', type: 'non-veg' },
      { name: 'Mutton Tikka', price: 300, description: 'Tender mutton pieces with charred edges', category: 'tandoor', type: 'non-veg' },
      { name: 'Fish Tikka', price: 250, description: 'Fresh fish marinated and grilled in tandoor', category: 'tandoor', type: 'non-veg' },
    ]
  },
  {
    name: 'Fish & Prawns',
    slug: 'fish-prawns',
    items: [
      { name: 'Fish Curry', price: 220, description: 'Fresh fish in tangy coconut-based curry', category: 'fish-prawns', type: 'non-veg' },
      { name: 'Prawn Masala', price: 280, description: 'Juicy prawns in spicy masala gravy', category: 'fish-prawns', type: 'non-veg' },
      { name: 'Fish Fry Masala', price: 240, description: 'Fried fish tossed in onion-tomato masala', category: 'fish-prawns', type: 'non-veg' },
      { name: 'Prawn Biryani', price: 300, description: 'Fragrant rice with juicy prawns', category: 'fish-prawns', type: 'non-veg' },
    ]
  },
  {
    name: 'Rice',
    slug: 'rice',
    items: [
      { name: 'Jeera Rice', price: 100, description: 'Basmati rice tempered with cumin', category: 'rice', type: 'veg' },
      { name: 'Plain Rice', price: 80, description: 'Steamed basmati rice', category: 'rice', type: 'veg' },
      { name: 'Ghee Rice', price: 120, description: 'Aromatic rice cooked in pure ghee', category: 'rice', type: 'veg' },
      { name: 'Fried Rice (Chicken)', price: 180, description: 'Wok-tossed rice with chicken and vegetables', category: 'rice', type: 'non-veg' },
      { name: 'Fried Rice (Veg)', price: 140, description: 'Vegetable fried rice with soy sauce', category: 'rice', type: 'veg' },
    ]
  },
  {
    name: 'Roti & Breads',
    slug: 'roti',
    items: [
      { name: 'Butter Naan', price: 40, description: 'Soft leavened bread brushed with butter', category: 'roti', type: 'veg' },
      { name: 'Garlic Naan', price: 50, description: 'Naan topped with garlic and coriander', category: 'roti', type: 'veg' },
      { name: 'Rumali Roti', price: 30, description: 'Tissue-thin soft roti', category: 'roti', type: 'veg' },
      { name: 'Tandoori Roti', price: 25, description: 'Whole wheat roti baked in tandoor', category: 'roti', type: 'veg' },
      { name: 'Laccha Paratha', price: 45, description: 'Layered flaky paratha', category: 'roti', type: 'veg' },
      { name: 'Kulcha', price: 40, description: 'Stuffed or plain soft bread', category: 'roti', type: 'veg' },
    ]
  },
  {
    name: 'Soups',
    slug: 'soups',
    items: [
      { name: 'Mutton Shorba', price: 120, description: 'Clear mutton broth with spices', category: 'soups', type: 'non-veg' },
      { name: 'Chicken Shorba', price: 100, description: 'Light chicken soup with herbs', category: 'soups', type: 'non-veg' },
      { name: 'Tomato Soup', price: 80, description: 'Classic tomato soup with croutons', category: 'soups', type: 'veg' },
      { name: 'Sweet Corn Soup', price: 90, description: 'Creamy sweet corn soup', category: 'soups', type: 'veg' },
    ]
  },
  {
    name: 'Veg Curries',
    slug: 'veg',
    items: [
      { name: 'Paneer Butter Masala', price: 200, description: 'Cottage cheese in rich buttery tomato gravy', category: 'veg', type: 'veg' },
      { name: 'Dal Tadka', price: 120, description: 'Yellow lentils tempered with spices', category: 'veg', type: 'veg' },
      { name: 'Mixed Veg Curry', price: 150, description: 'Seasonal vegetables in a spiced gravy', category: 'veg', type: 'veg' },
      { name: 'Palak Paneer', price: 180, description: 'Paneer in creamy spinach sauce', category: 'veg', type: 'veg' },
      { name: 'Mushroom Masala', price: 170, description: 'Button mushrooms in onion-tomato gravy', category: 'veg', type: 'veg' },
    ]
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    items: [
      { name: 'Gulab Jamun', price: 60, description: 'Soft milk dumplings in rose-cardamom syrup', category: 'desserts', type: 'veg' },
      { name: 'Shahi Tukda', price: 80, description: 'Royal bread pudding with rabdi', category: 'desserts', type: 'veg' },
      { name: 'Phirni', price: 70, description: 'Traditional rice pudding in earthen pots', category: 'desserts', type: 'veg' },
      { name: 'Ice Cream', price: 50, description: 'Assorted flavors', category: 'desserts', type: 'veg' },
    ]
  },
  {
    name: 'Drinks',
    slug: 'drinks',
    items: [
      { name: 'Fresh Lime Soda', price: 40, description: 'Refreshing lime with soda water', category: 'drinks', type: 'veg' },
      { name: 'Masala Chaas', price: 30, description: 'Spiced buttermilk', category: 'drinks', type: 'veg' },
      { name: 'Mango Lassi', price: 60, description: 'Thick mango yogurt shake', category: 'drinks', type: 'veg' },
      { name: 'Cold Coffee', price: 70, description: 'Chilled blended coffee with cream', category: 'drinks', type: 'veg' },
      { name: 'Soft Drinks', price: 30, description: 'Assorted canned beverages', category: 'drinks', type: 'veg' },
      { name: 'Mineral Water', price: 20, description: 'Packaged drinking water', category: 'drinks', type: 'veg' },
    ]
  },
  {
    name: 'Shawarma',
    slug: 'shawarma',
    items: [
      { name: 'Chicken Shawarma', price: 100, description: 'Juicy chicken wrapped with garlic sauce', category: 'shawarma', type: 'non-veg' },
      { name: 'Chicken Shawarma Plate', price: 160, description: 'Shawarma served with fries and salad', category: 'shawarma', type: 'non-veg' },
      { name: 'Mutton Shawarma', price: 140, description: 'Tender mutton shawarma with special sauce', category: 'shawarma', type: 'non-veg' },
    ]
  },
  {
    name: 'Platters',
    slug: 'platters',
    items: [
      { name: 'Maharaja Non-Veg Platter', price: 400, description: 'A royal assortment of kebabs, tikka, and tandoori', category: 'platters', type: 'non-veg' },
      { name: 'Family Feast Platter', price: 380, description: 'Generous sharing platter with assorted items', category: 'platters', type: 'non-veg' },
      { name: 'Vegetarian Royal Thali', price: 250, description: 'Complete veg meal with multiple curries and bread', category: 'platters', type: 'veg' },
    ]
  },
  {
    name: 'Arabian Items',
    slug: 'arabian',
    items: [
      { name: 'Chicken Mandi', price: 250, description: 'Aromatic rice with roasted chicken, Arabian style', category: 'arabian', type: 'non-veg' },
      { name: 'Mutton Mandi', price: 320, description: 'Slow-cooked mutton on fragrant mandi rice', category: 'arabian', type: 'non-veg' },
      { name: 'Chicken Kabsa', price: 240, description: 'Spiced rice with chicken in Arabic style', category: 'arabian', type: 'non-veg' },
      { name: 'Falafel Plate', price: 150, description: 'Crispy chickpea fritters with hummus', category: 'arabian', type: 'veg' },
    ]
  },
];

export const popularDishes = [
  {
    name: 'Mutton Biryani',
    price: 280,
    description: 'Our signature dum biryani with tender mutton, saffron rice, and hand-ground spices.',
    image: 'images/mutton-biryani.png',
    badge: 'Bestseller',
  },
  {
    name: 'Chicken Mandi',
    price: 250,
    description: 'Aromatic Arabian-style roasted chicken on a bed of fragrant mandi rice.',
    image: 'images/chicken-mandi.png',
    badge: 'Popular',
  },
  {
    name: 'Shawarma',
    price: 100,
    description: 'Juicy chicken shawarma wrapped in fresh bread with creamy garlic sauce.',
    image: 'images/shawarma.png',
    badge: 'Must Try',
  },
  {
    name: 'Mutton Ghee Roast',
    price: 320,
    description: 'Mangalorean-style mutton slow-roasted in pure desi ghee with coastal spices.',
    image: 'images/mutton-ghee-roast.png',
    badge: 'Premium',
  },
  {
    name: 'Butter Chicken',
    price: 240,
    description: 'Creamy, rich tomato-based gravy with tender tandoori chicken pieces.',
    image: 'images/butter-chicken.png',
    badge: 'Classic',
  },
  {
    name: 'Tandoori Chicken',
    price: 350,
    description: 'Whole chicken marinated in yogurt and spices, roasted perfectly in a traditional clay oven.',
    image: 'images/tandoori-chicken.png',
    badge: 'Chef\'s Special',
  },
];
