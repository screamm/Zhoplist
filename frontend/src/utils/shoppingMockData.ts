import type { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateShoppingMockData = (): Todo[] => {
  const now = new Date().toISOString();
  const sessionId = 'mock-session-' + Date.now();
  
  return [
    // Frukt & Grönt
    {
      id: uuidv4(),
      title: 'Äpplen',
      description: '6 st Granny Smith',
      completed: false,
      priority: 0,
      category: 'produce',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Bananer',
      description: '1 klase',
      completed: true,
      priority: 0,
      category: 'produce',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Sallad',
      description: 'Isbergssallad',
      completed: false,
      priority: 1,
      category: 'produce',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Tomater',
      description: '500g körsbärstomater',
      completed: false,
      priority: 0,
      category: 'produce',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Gurka',
      completed: false,
      priority: 0,
      category: 'produce',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Mejeri
    {
      id: uuidv4(),
      title: 'Mjölk',
      description: '2 liter, 3%',
      completed: false,
      priority: 2,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Ost',
      description: 'Grevé 28%',
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
      title: 'Yoghurt',
      description: 'Vanilj, 1 liter',
      completed: true,
      priority: 0,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Smör',
      description: 'Normalsaltat',
      completed: false,
      priority: 1,
      category: 'dairy',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Kött & Fisk
    {
      id: uuidv4(),
      title: 'Kycklingfilé',
      description: '600g',
      completed: false,
      priority: 1,
      category: 'meat',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Köttfärs',
      description: '500g nötfärs',
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
      title: 'Lax',
      description: '400g laxfilé',
      completed: false,
      priority: 0,
      category: 'meat',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    
    // Bröd & Bakverk
    {
      id: uuidv4(),
      title: 'Bröd',
      description: 'Fullkornsbröd',
      completed: false,
      priority: 2,
      category: 'bread',
      createdAt: now,
      updatedAt: now,
      tags: [],
      userSession: sessionId
    },
    {
      id: uuidv4(),
      title: 'Frallor',
      description: '6-pack',
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