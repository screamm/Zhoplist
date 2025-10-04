// English product database with category mapping
// Optimized for English grocery shopping lists

export interface Product {
  name: string;
  category: string;
  aliases?: string[];
  popularity?: number; // 1-10, higher = shown higher in suggestions
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  order: number;
  removable: boolean; // Can the user delete this category?
}

// Predefined categories (optimized for English markets)
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'mejeri', name: 'Dairy', icon: '🥛', order: 1, removable: true },
  { id: 'frukt', name: 'Fruit', icon: '🍎', order: 2, removable: true },
  { id: 'vegetables', name: 'Vegetables', icon: '🥕', order: 3, removable: true },
  { id: 'meat', name: 'Meat', icon: '🥩', order: 4, removable: true },
  { id: 'fish', name: 'Fish', icon: '🐟', order: 5, removable: true },
  { id: 'skafferi', name: 'Pantry', icon: '🥫', order: 6, removable: true },
  { id: 'brod', name: 'Bread', icon: '🍞', order: 7, removable: true },
  { id: 'frys', name: 'Frozen', icon: '❄️', order: 8, removable: true },
  { id: 'dryck', name: 'Drinks', icon: '🥤', order: 9, removable: true },
  { id: 'godis-snacks', name: 'Snacks', icon: '🍬', order: 10, removable: true },
  { id: 'hygien', name: 'Personal Care', icon: '🧼', order: 11, removable: true },
  { id: 'stad', name: 'Household', icon: '🧹', order: 12, removable: true },
  { id: 'husdjur', name: 'Pets', icon: '🐕', order: 13, removable: true },
  { id: 'ovrigt', name: 'Other', icon: '📦', order: 14, removable: false },
];

// Product database with English grocery items
export const PRODUCT_DATABASE: Product[] = [
  // DAIRY
  { name: 'milk', category: 'mejeri', aliases: ['whole milk', 'regular milk'], popularity: 10 },
  { name: 'low-fat milk', category: 'mejeri', aliases: ['skim milk', '1% milk'], popularity: 8 },
  { name: 'fat-free milk', category: 'mejeri', aliases: ['skim milk', 'nonfat milk'], popularity: 6 },
  { name: 'lactose-free milk', category: 'mejeri', aliases: ['lactaid'], popularity: 7 },
  { name: 'oat milk', category: 'mejeri', aliases: ['oatly', 'oat drink'], popularity: 8 },
  { name: 'yogurt', category: 'mejeri', aliases: ['yoghurt'], popularity: 9 },
  { name: 'greek yogurt', category: 'mejeri', aliases: ['greek style'], popularity: 8 },
  { name: 'sour cream', category: 'mejeri', popularity: 6 },
  { name: 'quark', category: 'mejeri', popularity: 8 },
  { name: 'cottage cheese', category: 'mejeri', popularity: 6 },
  { name: 'cheese', category: 'mejeri', popularity: 9 },
  { name: 'cream cheese', category: 'mejeri', aliases: ['philadelphia'], popularity: 7 },
  { name: 'cheddar', category: 'mejeri', popularity: 8 },
  { name: 'mozzarella', category: 'mejeri', popularity: 7 },
  { name: 'parmesan', category: 'mejeri', aliases: ['parmigiano'], popularity: 7 },
  { name: 'feta', category: 'mejeri', popularity: 6 },
  { name: 'butter', category: 'mejeri', aliases: ['salted butter'], popularity: 9 },
  { name: 'margarine', category: 'mejeri', popularity: 6 },
  { name: 'cream', category: 'mejeri', aliases: ['heavy cream', 'whipping cream'], popularity: 7 },
  { name: 'eggs', category: 'mejeri', aliases: ['egg'], popularity: 10 },
  { name: 'almond milk', category: 'mejeri', aliases: ['almond drink'], popularity: 6 },
  { name: 'soy milk', category: 'mejeri', aliases: ['soy drink'], popularity: 5 },

  // FRUIT
  { name: 'apple', category: 'frukt', aliases: ['apples'], popularity: 10 },
  { name: 'banana', category: 'frukt', aliases: ['bananas'], popularity: 10 },
  { name: 'orange', category: 'frukt', aliases: ['oranges'], popularity: 9 },
  { name: 'pear', category: 'frukt', aliases: ['pears'], popularity: 7 },
  { name: 'grapes', category: 'frukt', aliases: ['grape'], popularity: 8 },
  { name: 'strawberries', category: 'frukt', aliases: ['strawberry'], popularity: 9 },
  { name: 'blueberries', category: 'frukt', aliases: ['blueberry'], popularity: 8 },
  { name: 'raspberries', category: 'frukt', aliases: ['raspberry'], popularity: 7 },
  { name: 'blackberries', category: 'frukt', aliases: ['blackberry'], popularity: 6 },
  { name: 'watermelon', category: 'frukt', popularity: 7 },
  { name: 'melon', category: 'frukt', aliases: ['cantaloupe', 'honeydew'], popularity: 6 },
  { name: 'kiwi', category: 'frukt', aliases: ['kiwifruit'], popularity: 6 },
  { name: 'mango', category: 'frukt', aliases: ['mangoes'], popularity: 7 },
  { name: 'pineapple', category: 'frukt', popularity: 6 },
  { name: 'peach', category: 'frukt', aliases: ['peaches'], popularity: 7 },
  { name: 'nectarine', category: 'frukt', aliases: ['nectarines'], popularity: 6 },
  { name: 'plum', category: 'frukt', aliases: ['plums'], popularity: 6 },
  { name: 'apricot', category: 'frukt', aliases: ['apricots'], popularity: 5 },
  { name: 'cherry', category: 'frukt', aliases: ['cherries'], popularity: 7 },
  { name: 'lemon', category: 'frukt', aliases: ['lemons'], popularity: 8 },
  { name: 'lime', category: 'frukt', aliases: ['limes'], popularity: 7 },
  { name: 'grapefruit', category: 'frukt', popularity: 5 },
  { name: 'avocado', category: 'frukt', aliases: ['avocados'], popularity: 8 },
  { name: 'pomegranate', category: 'frukt', popularity: 5 },

  // VEGETABLES
  { name: 'carrot', category: 'vegetables', aliases: ['carrots'], popularity: 10 },
  { name: 'potato', category: 'vegetables', aliases: ['potatoes'], popularity: 10 },
  { name: 'tomato', category: 'vegetables', aliases: ['tomatoes'], popularity: 10 },
  { name: 'cucumber', category: 'vegetables', aliases: ['cucumbers'], popularity: 9 },
  { name: 'lettuce', category: 'vegetables', aliases: ['salad', 'iceberg'], popularity: 9 },
  { name: 'bell pepper', category: 'vegetables', aliases: ['peppers', 'sweet pepper'], popularity: 8 },
  { name: 'onion', category: 'vegetables', aliases: ['onions', 'yellow onion'], popularity: 10 },
  { name: 'red onion', category: 'vegetables', aliases: ['red onions'], popularity: 7 },
  { name: 'garlic', category: 'vegetables', popularity: 9 },
  { name: 'broccoli', category: 'vegetables', popularity: 8 },
  { name: 'cauliflower', category: 'vegetables', popularity: 7 },
  { name: 'zucchini', category: 'vegetables', aliases: ['courgette'], popularity: 7 },
  { name: 'eggplant', category: 'vegetables', aliases: ['aubergine'], popularity: 6 },
  { name: 'spinach', category: 'vegetables', popularity: 8 },
  { name: 'kale', category: 'vegetables', popularity: 6 },
  { name: 'cabbage', category: 'vegetables', popularity: 6 },
  { name: 'sweet potato', category: 'vegetables', aliases: ['sweet potatoes'], popularity: 7 },
  { name: 'corn', category: 'vegetables', aliases: ['sweet corn'], popularity: 7 },
  { name: 'peas', category: 'vegetables', popularity: 7 },
  { name: 'green beans', category: 'vegetables', aliases: ['string beans'], popularity: 7 },
  { name: 'asparagus', category: 'vegetables', popularity: 6 },
  { name: 'mushroom', category: 'vegetables', aliases: ['mushrooms'], popularity: 8 },
  { name: 'celery', category: 'vegetables', popularity: 6 },
  { name: 'radish', category: 'vegetables', aliases: ['radishes'], popularity: 5 },
  { name: 'beet', category: 'vegetables', aliases: ['beets', 'beetroot'], popularity: 5 },
  { name: 'leek', category: 'vegetables', aliases: ['leeks'], popularity: 6 },
  { name: 'parsley', category: 'vegetables', popularity: 6 },
  { name: 'cilantro', category: 'vegetables', aliases: ['coriander'], popularity: 6 },
  { name: 'basil', category: 'vegetables', popularity: 6 },
  { name: 'arugula', category: 'vegetables', aliases: ['rocket'], popularity: 5 },

  // MEAT
  { name: 'chicken breast', category: 'meat', aliases: ['chicken'], popularity: 10 },
  { name: 'ground beef', category: 'meat', aliases: ['minced beef'], popularity: 9 },
  { name: 'pork chops', category: 'meat', aliases: ['pork'], popularity: 7 },
  { name: 'beef steak', category: 'meat', aliases: ['steak'], popularity: 8 },
  { name: 'bacon', category: 'meat', popularity: 8 },
  { name: 'sausage', category: 'meat', aliases: ['sausages'], popularity: 8 },
  { name: 'ham', category: 'meat', popularity: 7 },
  { name: 'turkey', category: 'meat', aliases: ['turkey breast'], popularity: 6 },
  { name: 'lamb', category: 'meat', aliases: ['lamb chops'], popularity: 5 },
  { name: 'ground pork', category: 'meat', aliases: ['minced pork'], popularity: 6 },
  { name: 'hot dogs', category: 'meat', aliases: ['frankfurters'], popularity: 7 },
  { name: 'salami', category: 'meat', popularity: 6 },
  { name: 'pepperoni', category: 'meat', popularity: 6 },
  { name: 'chicken wings', category: 'meat', popularity: 7 },
  { name: 'ribs', category: 'meat', aliases: ['spare ribs'], popularity: 6 },

  // FISH
  { name: 'salmon', category: 'fish', popularity: 9 },
  { name: 'tuna', category: 'fish', popularity: 8 },
  { name: 'cod', category: 'fish', popularity: 7 },
  { name: 'shrimp', category: 'fish', aliases: ['prawns'], popularity: 8 },
  { name: 'crab', category: 'fish', popularity: 5 },
  { name: 'lobster', category: 'fish', popularity: 4 },
  { name: 'mussels', category: 'fish', popularity: 5 },
  { name: 'clams', category: 'fish', popularity: 4 },
  { name: 'scallops', category: 'fish', popularity: 5 },
  { name: 'fish sticks', category: 'fish', aliases: ['fish fingers'], popularity: 7 },
  { name: 'tilapia', category: 'fish', popularity: 6 },
  { name: 'mackerel', category: 'fish', popularity: 5 },
  { name: 'herring', category: 'fish', popularity: 5 },
  { name: 'anchovies', category: 'fish', popularity: 4 },
  { name: 'sardines', category: 'fish', popularity: 5 },

  // PANTRY
  { name: 'pasta', category: 'skafferi', aliases: ['spaghetti', 'penne'], popularity: 10 },
  { name: 'rice', category: 'skafferi', aliases: ['white rice'], popularity: 10 },
  { name: 'flour', category: 'skafferi', aliases: ['all-purpose flour'], popularity: 8 },
  { name: 'sugar', category: 'skafferi', aliases: ['white sugar'], popularity: 9 },
  { name: 'salt', category: 'skafferi', popularity: 9 },
  { name: 'pepper', category: 'skafferi', aliases: ['black pepper'], popularity: 8 },
  { name: 'olive oil', category: 'skafferi', popularity: 9 },
  { name: 'vegetable oil', category: 'skafferi', aliases: ['cooking oil'], popularity: 7 },
  { name: 'canned tomatoes', category: 'skafferi', aliases: ['tomato can'], popularity: 8 },
  { name: 'tomato sauce', category: 'skafferi', aliases: ['pasta sauce'], popularity: 8 },
  { name: 'ketchup', category: 'skafferi', popularity: 8 },
  { name: 'mustard', category: 'skafferi', popularity: 7 },
  { name: 'mayonnaise', category: 'skafferi', aliases: ['mayo'], popularity: 8 },
  { name: 'vinegar', category: 'skafferi', aliases: ['white vinegar'], popularity: 6 },
  { name: 'soy sauce', category: 'skafferi', popularity: 7 },
  { name: 'honey', category: 'skafferi', popularity: 7 },
  { name: 'jam', category: 'skafferi', aliases: ['jelly'], popularity: 7 },
  { name: 'peanut butter', category: 'skafferi', popularity: 8 },
  { name: 'canned beans', category: 'skafferi', aliases: ['beans'], popularity: 7 },
  { name: 'canned corn', category: 'skafferi', popularity: 6 },
  { name: 'cereal', category: 'skafferi', aliases: ['breakfast cereal'], popularity: 9 },
  { name: 'oatmeal', category: 'skafferi', aliases: ['oats', 'porridge'], popularity: 8 },
  { name: 'granola', category: 'skafferi', popularity: 6 },
  { name: 'pancake mix', category: 'skafferi', popularity: 6 },
  { name: 'baking powder', category: 'skafferi', popularity: 5 },
  { name: 'baking soda', category: 'skafferi', popularity: 5 },
  { name: 'vanilla extract', category: 'skafferi', popularity: 5 },
  { name: 'cinnamon', category: 'skafferi', popularity: 6 },
  { name: 'oregano', category: 'skafferi', popularity: 5 },
  { name: 'basil (dried)', category: 'skafferi', popularity: 5 },
  { name: 'garlic powder', category: 'skafferi', popularity: 6 },
  { name: 'onion powder', category: 'skafferi', popularity: 5 },
  { name: 'paprika', category: 'skafferi', popularity: 5 },
  { name: 'cumin', category: 'skafferi', popularity: 5 },
  { name: 'curry powder', category: 'skafferi', popularity: 5 },
  { name: 'chili powder', category: 'skafferi', popularity: 5 },
  { name: 'chicken broth', category: 'skafferi', aliases: ['chicken stock'], popularity: 6 },
  { name: 'beef broth', category: 'skafferi', aliases: ['beef stock'], popularity: 5 },
  { name: 'vegetable broth', category: 'skafferi', aliases: ['vegetable stock'], popularity: 5 },
  { name: 'pasta sauce jar', category: 'skafferi', aliases: ['marinara'], popularity: 7 },
  { name: 'salsa', category: 'skafferi', popularity: 6 },
  { name: 'tortilla chips', category: 'skafferi', popularity: 7 },
  { name: 'crackers', category: 'skafferi', popularity: 7 },
  { name: 'cookies', category: 'skafferi', aliases: ['biscuits'], popularity: 8 },

  // BREAD
  { name: 'bread', category: 'brod', aliases: ['white bread', 'loaf'], popularity: 10 },
  { name: 'whole wheat bread', category: 'brod', aliases: ['brown bread'], popularity: 8 },
  { name: 'bagel', category: 'brod', aliases: ['bagels'], popularity: 7 },
  { name: 'english muffin', category: 'brod', aliases: ['muffins'], popularity: 6 },
  { name: 'croissant', category: 'brod', aliases: ['croissants'], popularity: 6 },
  { name: 'buns', category: 'brod', aliases: ['hamburger buns'], popularity: 7 },
  { name: 'hot dog buns', category: 'brod', popularity: 6 },
  { name: 'tortillas', category: 'brod', aliases: ['wraps'], popularity: 8 },
  { name: 'pita bread', category: 'brod', popularity: 6 },
  { name: 'naan', category: 'brod', popularity: 5 },
  { name: 'pizza dough', category: 'brod', popularity: 6 },
  { name: 'breadcrumbs', category: 'brod', popularity: 5 },
  { name: 'croutons', category: 'brod', popularity: 4 },
  { name: 'cake', category: 'brod', popularity: 6 },
  { name: 'muffins', category: 'brod', aliases: ['blueberry muffins'], popularity: 6 },
  { name: 'donuts', category: 'brod', aliases: ['doughnuts'], popularity: 6 },

  // FROZEN
  { name: 'frozen pizza', category: 'frys', popularity: 9 },
  { name: 'ice cream', category: 'frys', popularity: 10 },
  { name: 'frozen vegetables', category: 'frys', aliases: ['mixed vegetables'], popularity: 8 },
  { name: 'frozen berries', category: 'frys', popularity: 7 },
  { name: 'french fries', category: 'frys', aliases: ['chips'], popularity: 8 },
  { name: 'fish sticks', category: 'frys', aliases: ['fish fingers'], popularity: 7 },
  { name: 'frozen chicken nuggets', category: 'frys', aliases: ['nuggets'], popularity: 7 },
  { name: 'frozen meatballs', category: 'frys', popularity: 6 },
  { name: 'frozen burritos', category: 'frys', popularity: 6 },
  { name: 'frozen dinners', category: 'frys', aliases: ['tv dinners'], popularity: 6 },
  { name: 'frozen waffles', category: 'frys', popularity: 6 },
  { name: 'frozen pancakes', category: 'frys', popularity: 5 },
  { name: 'popsicles', category: 'frys', aliases: ['ice pops'], popularity: 6 },
  { name: 'frozen yogurt', category: 'frys', popularity: 5 },
  { name: 'sorbet', category: 'frys', popularity: 4 },

  // DRINKS
  { name: 'water', category: 'dryck', aliases: ['bottled water'], popularity: 10 },
  { name: 'soda', category: 'dryck', aliases: ['pop', 'soft drink'], popularity: 9 },
  { name: 'juice', category: 'dryck', aliases: ['orange juice'], popularity: 9 },
  { name: 'coffee', category: 'dryck', popularity: 10 },
  { name: 'tea', category: 'dryck', aliases: ['tea bags'], popularity: 9 },
  { name: 'energy drink', category: 'dryck', aliases: ['red bull'], popularity: 6 },
  { name: 'sports drink', category: 'dryck', aliases: ['gatorade'], popularity: 6 },
  { name: 'lemonade', category: 'dryck', popularity: 7 },
  { name: 'iced tea', category: 'dryck', popularity: 6 },
  { name: 'sparkling water', category: 'dryck', aliases: ['seltzer'], popularity: 7 },
  { name: 'beer', category: 'dryck', popularity: 7 },
  { name: 'wine', category: 'dryck', aliases: ['red wine', 'white wine'], popularity: 6 },
  { name: 'spirits', category: 'dryck', aliases: ['liquor', 'vodka'], popularity: 4 },
  { name: 'coconut water', category: 'dryck', popularity: 5 },
  { name: 'almond milk', category: 'dryck', popularity: 6 },
  { name: 'protein shake', category: 'dryck', popularity: 5 },

  // SNACKS
  { name: 'chips', category: 'godis-snacks', aliases: ['potato chips'], popularity: 9 },
  { name: 'popcorn', category: 'godis-snacks', popularity: 8 },
  { name: 'candy', category: 'godis-snacks', aliases: ['sweets'], popularity: 8 },
  { name: 'chocolate', category: 'godis-snacks', aliases: ['chocolate bar'], popularity: 9 },
  { name: 'nuts', category: 'godis-snacks', aliases: ['mixed nuts'], popularity: 7 },
  { name: 'pretzels', category: 'godis-snacks', popularity: 6 },
  { name: 'granola bars', category: 'godis-snacks', aliases: ['protein bars'], popularity: 7 },
  { name: 'trail mix', category: 'godis-snacks', popularity: 6 },
  { name: 'beef jerky', category: 'godis-snacks', popularity: 5 },
  { name: 'cheese crackers', category: 'godis-snacks', popularity: 6 },
  { name: 'rice cakes', category: 'godis-snacks', popularity: 5 },
  { name: 'gummy bears', category: 'godis-snacks', aliases: ['gummies'], popularity: 6 },
  { name: 'licorice', category: 'godis-snacks', popularity: 4 },
  { name: 'mints', category: 'godis-snacks', aliases: ['breath mints'], popularity: 5 },
  { name: 'gum', category: 'godis-snacks', aliases: ['chewing gum'], popularity: 6 },

  // PERSONAL CARE
  { name: 'shampoo', category: 'hygien', popularity: 9 },
  { name: 'conditioner', category: 'hygien', popularity: 8 },
  { name: 'body wash', category: 'hygien', aliases: ['shower gel'], popularity: 9 },
  { name: 'soap', category: 'hygien', aliases: ['bar soap'], popularity: 8 },
  { name: 'toothpaste', category: 'hygien', popularity: 9 },
  { name: 'toothbrush', category: 'hygien', popularity: 7 },
  { name: 'dental floss', category: 'hygien', aliases: ['floss'], popularity: 6 },
  { name: 'mouthwash', category: 'hygien', popularity: 6 },
  { name: 'deodorant', category: 'hygien', popularity: 9 },
  { name: 'razor', category: 'hygien', aliases: ['razors'], popularity: 7 },
  { name: 'shaving cream', category: 'hygien', popularity: 6 },
  { name: 'lotion', category: 'hygien', aliases: ['body lotion'], popularity: 7 },
  { name: 'sunscreen', category: 'hygien', popularity: 6 },
  { name: 'hand soap', category: 'hygien', popularity: 8 },
  { name: 'hand sanitizer', category: 'hygien', popularity: 7 },
  { name: 'tissues', category: 'hygien', aliases: ['kleenex'], popularity: 7 },
  { name: 'toilet paper', category: 'hygien', popularity: 10 },
  { name: 'paper towels', category: 'hygien', popularity: 9 },
  { name: 'feminine products', category: 'hygien', aliases: ['pads', 'tampons'], popularity: 7 },
  { name: 'diapers', category: 'hygien', aliases: ['nappies'], popularity: 6 },
  { name: 'baby wipes', category: 'hygien', popularity: 6 },
  { name: 'cotton swabs', category: 'hygien', aliases: ['q-tips'], popularity: 6 },
  { name: 'band-aids', category: 'hygien', aliases: ['bandages'], popularity: 6 },
  { name: 'pain reliever', category: 'hygien', aliases: ['ibuprofen', 'tylenol'], popularity: 6 },
  { name: 'vitamins', category: 'hygien', aliases: ['supplements'], popularity: 6 },

  // HOUSEHOLD
  { name: 'dish soap', category: 'stad', aliases: ['dish detergent'], popularity: 9 },
  { name: 'laundry detergent', category: 'stad', popularity: 9 },
  { name: 'fabric softener', category: 'stad', popularity: 6 },
  { name: 'bleach', category: 'stad', popularity: 6 },
  { name: 'all-purpose cleaner', category: 'stad', popularity: 8 },
  { name: 'glass cleaner', category: 'stad', aliases: ['windex'], popularity: 6 },
  { name: 'disinfectant', category: 'stad', aliases: ['disinfectant spray'], popularity: 7 },
  { name: 'sponges', category: 'stad', aliases: ['dish sponges'], popularity: 7 },
  { name: 'trash bags', category: 'stad', aliases: ['garbage bags'], popularity: 9 },
  { name: 'aluminum foil', category: 'stad', popularity: 7 },
  { name: 'plastic wrap', category: 'stad', aliases: ['cling film'], popularity: 6 },
  { name: 'ziplock bags', category: 'stad', aliases: ['storage bags'], popularity: 8 },
  { name: 'paper plates', category: 'stad', popularity: 5 },
  { name: 'plastic cups', category: 'stad', popularity: 5 },
  { name: 'napkins', category: 'stad', popularity: 6 },
  { name: 'light bulbs', category: 'stad', popularity: 5 },
  { name: 'batteries', category: 'stad', popularity: 6 },
  { name: 'air freshener', category: 'stad', popularity: 5 },
  { name: 'candles', category: 'stad', popularity: 5 },
  { name: 'matches', category: 'stad', aliases: ['lighter'], popularity: 4 },

  // PETS
  { name: 'dog food', category: 'husdjur', popularity: 8 },
  { name: 'cat food', category: 'husdjur', popularity: 8 },
  { name: 'dog treats', category: 'husdjur', popularity: 6 },
  { name: 'cat treats', category: 'husdjur', popularity: 6 },
  { name: 'cat litter', category: 'husdjur', popularity: 7 },
  { name: 'pet toys', category: 'husdjur', popularity: 5 },
  { name: 'pet shampoo', category: 'husdjur', popularity: 4 },
  { name: 'flea treatment', category: 'husdjur', popularity: 4 },
  { name: 'pet food bowls', category: 'husdjur', popularity: 3 },
  { name: 'bird seed', category: 'husdjur', popularity: 3 },
  { name: 'fish food', category: 'husdjur', popularity: 3 },

  // OTHER
  { name: 'flowers', category: 'ovrigt', popularity: 5 },
  { name: 'greeting cards', category: 'ovrigt', popularity: 4 },
  { name: 'gift wrap', category: 'ovrigt', aliases: ['wrapping paper'], popularity: 3 },
  { name: 'magazines', category: 'ovrigt', popularity: 3 },
  { name: 'lottery tickets', category: 'ovrigt', popularity: 3 },
  { name: 'phone charger', category: 'ovrigt', popularity: 4 },
  { name: 'headphones', category: 'ovrigt', popularity: 4 },
];

// Helper function to find product by name
export function findProduct(searchTerm: string): Product | undefined {
  const normalizedSearch = searchTerm.toLowerCase().trim();

  return PRODUCT_DATABASE.find(product => {
    // Check exact name match
    if (product.name.toLowerCase() === normalizedSearch) {
      return true;
    }

    // Check if search term starts with product name
    if (normalizedSearch.startsWith(product.name.toLowerCase())) {
      return true;
    }

    // Check aliases
    if (product.aliases) {
      return product.aliases.some(alias =>
        alias.toLowerCase() === normalizedSearch ||
        normalizedSearch.startsWith(alias.toLowerCase())
      );
    }

    return false;
  });
}

// Helper function to get category for a product
export function getCategoryForProduct(productName: string): string | null {
  const product = findProduct(productName);
  return product ? product.category : null;
}

// Helper function to get suggestions
export function getProductSuggestions(searchTerm: string, limit: number = 5): Product[] {
  if (!searchTerm || searchTerm.length < 2) {
    return [];
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();

  const matches = PRODUCT_DATABASE
    .filter(product => {
      // Match by name
      if (product.name.toLowerCase().includes(normalizedSearch)) {
        return true;
      }

      // Match by aliases
      if (product.aliases) {
        return product.aliases.some(alias =>
          alias.toLowerCase().includes(normalizedSearch)
        );
      }

      return false;
    })
    .sort((a, b) => {
      // Sort by popularity (higher first)
      const popularityDiff = (b.popularity || 0) - (a.popularity || 0);
      if (popularityDiff !== 0) return popularityDiff;

      // Then by name length (shorter first)
      return a.name.length - b.name.length;
    });

  return matches.slice(0, limit);
}
