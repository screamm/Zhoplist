import type { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateShoppingMockData = (): Todo[] => {
  const now = new Date().toISOString();
  const sessionId = 'mock-session-' + Date.now();
  
  return [
    // Fruits
    {
      id: uuidv4(),
      title: 'Apples',
      description: '',
      completed: false,
      priority: 0,
      category: 'fruits',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Bananas',
      description: '',
      completed: false,
      priority: 0,
      category: 'fruits',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Vegetables  
    {
      id: uuidv4(),
      title: 'Lettuce',
      description: '',
      completed: false,
      priority: 0,
      category: 'vegetables',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Tomatoes',
      description: '',
      completed: false,
      priority: 0,
      category: 'vegetables',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Cucumber',
      completed: false,
      priority: 0,
      category: 'vegetables',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Dairy Products (exactly like in the image)
    {
      id: uuidv4(),
      title: 'Butter',
      description: '',
      completed: false,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Sour cream',
      description: '',
      completed: false,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Whipped cream',
      description: '',
      completed: false,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Yogurt',
      description: '',
      completed: false,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Cheese cream',
      description: '',
      completed: false,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Parmesan',
      description: '',
      completed: false,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Meat
    {
      id: uuidv4(),
      title: 'Chicken breast',
      description: '',
      completed: false,
      priority: 0,
      category: 'meat',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Ground beef',
      description: '',
      completed: false,
      priority: 0,
      category: 'meat',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Fish
    {
      id: uuidv4(),
      title: 'Salmon',
      description: '',
      completed: false,
      priority: 0,
      category: 'fish',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Tuna',
      description: '',
      completed: false,
      priority: 0,
      category: 'fish',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Breads and pastries (matching image 3)
    {
      id: uuidv4(),
      title: 'Grain bread',
      description: '',
      completed: false,
      priority: 0,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Rolls',
      description: '',
      completed: false,
      priority: 0,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Cookies',
      description: '',
      completed: false,
      priority: 0,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Chocolate cake',
      description: '',
      completed: false,
      priority: 0,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Fruit Cake',
      description: '',
      completed: false,
      priority: 0,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Baguette',
      description: '',
      completed: false,
      priority: 0,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Skafferi
    {
      id: uuidv4(),
      title: 'Pasta',
      description: 'Spaghetti 500g',
      completed: false,
      priority: 0,
      category: 'pantry',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Ris',
      description: 'Jasminris 1kg',
      completed: false,
      priority: 0,
      category: 'pantry',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Olivolja',
      description: 'Extra virgin',
      completed: true,
      priority: 1,
      category: 'pantry',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Krossade tomater',
      description: '2 burkar',
      completed: false,
      priority: 0,
      category: 'pantry',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Frys
    {
      id: uuidv4(),
      title: 'Glass',
      description: 'Vaniljglass 1L',
      completed: false,
      priority: 0,
      category: 'frozen',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Frysta bär',
      description: 'Blåbär 250g',
      completed: false,
      priority: 0,
      category: 'frozen',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Drycker
    {
      id: uuidv4(),
      title: 'Apelsinjuice',
      description: '1 liter',
      completed: false,
      priority: 0,
      category: 'drinks',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Mineralvatten',
      description: '6-pack',
      completed: false,
      priority: 0,
      category: 'drinks',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Snacks & Godis
    {
      id: uuidv4(),
      title: 'Chips',
      description: 'Sourcream & onion',
      completed: false,
      priority: 0,
      category: 'snacks',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Choklad',
      description: 'Mörk 70%',
      completed: false,
      priority: 0,
      category: 'snacks',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Hushåll
    {
      id: uuidv4(),
      title: 'Diskmedel',
      completed: false,
      priority: 1,
      category: 'household',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Hushållspapper',
      description: '4-pack',
      completed: false,
      priority: 0,
      category: 'household',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Hygien
    {
      id: uuidv4(),
      title: 'Tandkräm',
      completed: false,
      priority: 0,
      category: 'personal',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Schampo',
      description: 'Normalt hår',
      completed: false,
      priority: 0,
      category: 'personal',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    }
  ];
};