import React from 'react';

// Bread/Bakery icon (cupcake/muffin style)
export const BreadIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3C11.79 3 10 4.79 10 7C10 7.73 10.19 8.41 10.5 9H9C7.9 9 7 9.9 7 11C7 11.55 7.22 12.05 7.56 12.41L9 24C9 24.55 9.45 25 10 25H18C18.55 25 19 24.55 19 24L20.44 12.41C20.78 12.05 21 11.55 21 11C21 9.9 20.1 9 19 9H17.5C17.81 8.41 18 7.73 18 7C18 4.79 16.21 3 14 3ZM14 5C15.1 5 16 5.9 16 7C16 8.1 15.1 9 14 9C12.9 9 12 8.1 12 7C12 5.9 12.9 5 14 5Z"/>
  </svg>
);

// Fish icon (simple fish shape)
export const FishIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 14C20.5 10 17 7 12 7C6 7 2 10.58 2 14C2 17.42 6 21 12 21C17 21 20.5 18 20.5 14ZM16 14L26 8V20L16 14ZM6 14C5.45 14 5 13.55 5 13C5 12.45 5.45 12 6 12C6.55 12 7 12.45 7 13C7 13.55 6.55 14 6 14Z"/>
  </svg>
);

// Meat icon (drumstick/ham shape)
export const MeatIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.75 8C18.75 4.69 16.31 2 13.25 2C10.19 2 7.75 4.69 7.75 8C7.75 9.59 8.41 11.01 9.44 12.01L4 24H8L10 20H16L18 24H22L16.56 12.01C17.59 11.01 18.25 9.59 18.25 8ZM13.25 10C11.59 10 10.25 8.66 10.25 7C10.25 5.34 11.59 4 13.25 4C14.91 4 16.25 5.34 16.25 7C16.25 8.66 14.91 10 13.25 10Z"/>
  </svg>
);

// Dairy/Milk icon (milk bottle)
export const DairyIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H10V5L8 10V24C8 25.1 8.9 26 10 26H18C19.1 26 20 25.1 20 24V10L18 5V2ZM18 10V24H10V10H18ZM10 4H18V5L19 8H9L10 5V4Z"/>
  </svg>
);

// Fruits icon (water drop shape)
export const FruitsIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2C14 2 6 10.46 6 17C6 21.42 9.58 25 14 25C18.42 25 22 21.42 22 17C22 10.46 14 2 14 2ZM14 22C11.24 22 9 19.76 9 17C9 14.89 10.19 11.86 12.03 8.99C12.63 8.03 13.27 7.11 14 6.11C14.73 7.11 15.37 8.03 15.97 8.99C17.81 11.86 19 14.89 19 17C19 19.76 16.76 22 14 22Z"/>
  </svg>
);

// Vegetable icon (checkmark in circle)
export const VegetableIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2C7.38 2 2 7.38 2 14C2 20.62 7.38 26 14 26C20.62 26 26 20.62 26 14C26 7.38 20.62 2 14 2ZM11 19L6 14L7.41 12.59L11 16.17L20.59 6.58L22 8L11 19Z"/>
  </svg>
);

// Pantry icon (can/jar shape)
export const PantryIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6C8 4.9 8.9 4 10 4H18C19.1 4 20 4.9 20 6V8H22C23.1 8 24 8.9 24 10V22C24 23.1 23.1 24 22 24H6C4.9 24 4 23.1 4 22V10C4 8.9 4.9 8 6 8H8V6ZM10 6V8H18V6H10ZM6 10V22H22V10H6ZM8 12H20V14H8V12ZM8 16H16V18H8V16Z"/>
  </svg>
);

// Frozen icon (snowflake shape)
export const FrozenIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2L16 4L14 6L12 4L14 2ZM22 12L24 14L22 16L20 14L22 12ZM6 12L8 14L6 16L4 14L6 12ZM14 22L16 24L14 26L12 24L14 22ZM19.07 6.93L20.48 8.34L19.07 9.75L17.66 8.34L19.07 6.93ZM8.93 18.25L10.34 19.66L8.93 21.07L7.52 19.66L8.93 18.25ZM19.07 21.07L20.48 19.66L19.07 18.25L17.66 19.66L19.07 21.07ZM8.93 9.75L10.34 8.34L8.93 6.93L7.52 8.34L8.93 9.75ZM14 8V20H14V8ZM8 14H20V14H8Z"/>
  </svg>
);

// Drinks icon (glass/cup shape)
export const DrinksIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2V4H8V20C8 21.1 8.9 22 10 22H18C19.1 22 20 21.1 20 20V4H21V2H7ZM10 4H18V20H10V4ZM11 6V18H13V6H11ZM15 6V18H17V6H15Z"/>
  </svg>
);

// Snacks icon (popcorn/chips shape)
export const SnacksIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.34 2 9 3.34 9 5C9 5.35 9.06 5.69 9.17 6H7C5.9 6 5 6.9 5 8V10C5 11.1 5.9 12 7 12H8V20C8 22.21 9.79 24 12 24H16C18.21 24 20 22.21 20 20V12H21C22.1 12 23 11.1 23 10V8C23 6.9 22.1 6 21 6H18.83C18.94 5.69 19 5.35 19 5C19 3.34 17.66 2 16 2C15.2 2 14.5 2.37 14 2.97C13.5 2.37 12.8 2 12 2ZM12 4C12.55 4 13 4.45 13 5S12.55 6 12 6S11 5.55 11 5S11.45 4 12 4ZM16 4C16.55 4 17 4.45 17 5S16.55 6 16 6S15 5.55 15 5S15.45 4 16 4ZM7 8H21V10H7V8ZM10 12H18V20C18 21.1 17.1 22 16 22H12C10.9 22 10 21.1 10 20V12Z"/>
  </svg>
);

// Household icon (cleaning supplies shape)
export const HouseholdIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2C8.9 2 8 2.9 8 4V6H6C4.9 6 4 6.9 4 8V24C4 25.1 4.9 26 6 26H10C11.1 26 12 25.1 12 24V22H16V24C16 25.1 16.9 26 18 26H22C23.1 26 24 25.1 24 24V8C24 6.9 23.1 6 22 6H20V4C20 2.9 19.1 2 18 2H10ZM10 4H18V6H10V4ZM6 8H22V24H18V20H10V24H6V8ZM8 10V12H20V10H8ZM8 14V16H12V14H8ZM16 14V16H20V14H16Z"/>
  </svg>
);

// Personal care icon (bottle/cosmetic shape)
export const PersonalIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2V4H9V6H11V8H8C6.9 8 6 8.9 6 10V24C6 25.1 6.9 26 8 26H20C21.1 26 22 25.1 22 24V10C22 8.9 21.1 8 20 8H17V6H19V4H17V2H11ZM13 4H15V6H13V4ZM8 10H20V24H8V10ZM10 12V14H18V12H10ZM10 16V18H14V16H10Z"/>
  </svg>
);

// Get icon component by category ID
export const getCategoryIcon = (categoryId: string, color: string = 'white') => {
  switch (categoryId) {
    case 'bread':
      return <BreadIcon color={color} />;
    case 'fish':
      return <FishIcon color={color} />;
    case 'meat':
      return <MeatIcon color={color} />;
    case 'dairy':
      return <DairyIcon color={color} />;
    case 'fruits':
      return <FruitsIcon color={color} />;
    case 'vegetables':
      return <VegetableIcon color={color} />;
    case 'pantry':
      return <PantryIcon color={color} />;
    case 'frozen':
      return <FrozenIcon color={color} />;
    case 'drinks':
      return <DrinksIcon color={color} />;
    case 'snacks':
      return <SnacksIcon color={color} />;
    case 'household':
      return <HouseholdIcon color={color} />;
    case 'personal':
      return <PersonalIcon color={color} />;
    default:
      return null;
  }
};