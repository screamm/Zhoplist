import React from 'react';

// Bread icon (bröd)
export const BreadIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10C8 8.5 9 7 11 7H17C19 7 20 8.5 20 10V18C20 19.5 19 21 17 21H11C9 21 8 19.5 8 18V10Z" fill={color}/>
    <path d="M8 10C8 9 9 8 10 8H18C19 8 20 9 20 10V11H8V10Z" fill={color}/>
    <rect x="10" y="13" width="1" height="5" rx="0.5" fill={color} opacity="0.3"/>
    <rect x="12.5" y="13" width="1" height="5" rx="0.5" fill={color} opacity="0.3"/>
    <rect x="15" y="13" width="1" height="5" rx="0.5" fill={color} opacity="0.3"/>
    <rect x="17.5" y="13" width="1" height="5" rx="0.5" fill={color} opacity="0.3"/>
  </svg>
);

// Fish icon (fisk)
export const FishIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 14C5 10.5 7.5 8 11 8H17C20 8 22 10.5 22 14C22 17.5 20 20 17 20H11C7.5 20 5 17.5 5 14Z" fill={color}/>
    <path d="M22 14L25 10V18L22 14Z" fill={color}/>
    <circle cx="9" cy="12" r="1.5" fill="black" opacity="0.3"/>
    <path d="M12 14C12 13 12.5 12 13.5 12C14.5 12 15 13 15 14" stroke="black" strokeWidth="0.5" opacity="0.2" fill="none"/>
  </svg>
);

// Meat icon (biff/kött)
export const MeatIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 13C6 10 8 7 12 6C15 5 19 7 21 10C22 12 22 15 20 17C18 20 15 22 12 22C8 22 6 19 6 16V13Z" fill={color}/>
    <path d="M7 16C8 19 10 21 13 21C16 21 18 19 20 17" stroke="black" strokeWidth="0.5" opacity="0.2" fill="none"/>
    <path d="M10 11C12 10 15 10 18 12" stroke="black" strokeWidth="0.8" opacity="0.2" fill="none"/>
    <path d="M9 14C11 13 14 13 17 15" stroke="black" strokeWidth="0.8" opacity="0.2" fill="none"/>
    <circle cx="18" cy="10" r="2" fill={color} opacity="0.9"/>
  </svg>
);

// Dairy icon (mjölkpaket)
export const DairyIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 8L11 4H17L19 8V21C19 22 18 23 17 23H11C10 23 9 22 9 21V8Z" fill={color}/>
    <path d="M11 4L14 2L17 4H11Z" fill={color}/>
    <rect x="9" y="7" width="10" height="2" fill={color}/>
    <rect x="11" y="11" width="6" height="8" rx="1" fill="black" opacity="0.2"/>
  </svg>
);

// Fruits icon (äpple)
export const FruitsIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8C17 8 19 10 19 13V17C19 20 17 22 14 22C11 22 9 20 9 17V13C9 10 11 8 14 8Z" fill={color}/>
    <rect x="13" y="4" width="2" height="4" rx="1" fill={color}/>
    <path d="M16 5C17 4.5 18 5 17.5 6C16.5 6 16 5.5 16 5Z" fill={color}/>
  </svg>
);

// Vegetable icon (morot)
export const VegetableIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10L12 22C12 23 13 24 14 24C15 24 16 23 16 22L14 10Z" fill={color}/>
    <path d="M12 5L14 10L16 5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M10 4L13 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M18 4L15 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// Pantry icon (konserver)
export const PantryIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="9" width="5" height="14" rx="1" fill={color}/>
    <rect x="15" y="7" width="5" height="16" rx="1" fill={color}/>
    <ellipse cx="10.5" cy="9" rx="2.5" ry="1" fill={color}/>
    <ellipse cx="17.5" cy="7" rx="2.5" ry="1" fill={color}/>
    <rect x="8.5" y="13" width="4" height="6" rx="0.5" fill="black" opacity="0.2"/>
    <rect x="15.5" y="11" width="4" height="7" rx="0.5" fill="black" opacity="0.2"/>
  </svg>
);

// Frozen icon (snöflinga)
export const FrozenIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 5V23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 14H23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 8L20 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 8L8 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 5L11 8H17L14 5Z" fill={color}/>
    <path d="M14 23L11 20H17L14 23Z" fill={color}/>
    <path d="M5 14L8 11V17L5 14Z" fill={color}/>
    <path d="M23 14L20 11V17L23 14Z" fill={color}/>
  </svg>
);

// Drinks icon (glas)
export const DrinksIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5H18L17 20C17 21 16 22 15 22H13C12 22 11 21 11 20L10 5Z" fill={color}/>
    <rect x="10" y="5" width="8" height="2" rx="1" fill={color}/>
    <path d="M11.5 12H16.5V18C16.5 19 15.5 20 14 20C12.5 20 11.5 19 11.5 18V12Z" fill="black" opacity="0.2"/>
    <circle cx="13" cy="10" r="1" fill="black" opacity="0.15"/>
    <circle cx="15.5" cy="11" r="0.7" fill="black" opacity="0.15"/>
  </svg>
);

// Snacks icon (chipspåse)
export const SnacksIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5L8 9V22C8 23 9 24 10 24H18C19 24 20 23 20 22V9L19 5H9Z" fill={color}/>
    <path d="M8 9H20L19 6C19 5 18 4 17 4H11C10 4 9 5 9 6L8 9Z" fill={color}/>
    <circle cx="11" cy="13" r="2" fill="black" opacity="0.15"/>
    <circle cx="16" cy="15" r="1.8" fill="black" opacity="0.15"/>
    <circle cx="13" cy="18" r="1.5" fill="black" opacity="0.15"/>
    <circle cx="17" cy="20" r="1.3" fill="black" opacity="0.15"/>
  </svg>
);

// Household icon (rengöring)
export const HouseholdIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="8" width="8" height="15" rx="2" fill={color}/>
    <rect x="12" y="4" width="4" height="5" rx="2" fill={color}/>
    <rect x="11" y="12" width="6" height="8" rx="1" fill="black" opacity="0.2"/>
    <circle cx="14" cy="5" r="1" fill={color}/>
    <path d="M13 8H15V4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Personal care icon (kosmetika)
export const PersonalIcon: React.FC<{ color?: string }> = ({ color = 'white' }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="5" height="13" rx="2.5" fill={color}/>
    <rect x="15" y="8" width="5" height="15" rx="2.5" fill={color}/>
    <rect x="9.5" y="6" width="2" height="5" rx="1" fill={color}/>
    <rect x="16.5" y="4" width="2" height="5" rx="1" fill={color}/>
    <rect x="8.5" y="14" width="4" height="6" rx="0.5" fill="black" opacity="0.2"/>
    <rect x="15.5" y="12" width="4" height="7" rx="0.5" fill="black" opacity="0.2"/>
  </svg>
);

import { CustomIcon as BaseCustomIcon } from './AddCategoryModal';
import { type CustomCategory } from '../utils/customCategories';

// Wrapper för CustomIcon med 28x28 storlek för kategorivy
const CustomIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => (
  <div style={{ transform: 'scale(1.16)' }}>
    <BaseCustomIcon type={type} color={color} />
  </div>
);

// Get icon component by category ID
export const getCategoryIcon = (categoryId: string, color: string = 'white', customCategories?: CustomCategory[]) => {
  // Check if it's a default category
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
      // Check if it's a custom category with custom icon
      if (categoryId.startsWith('custom_') && customCategories) {
        const customCategory = customCategories.find(cat => cat.id === categoryId);
        if (customCategory) {
          return <CustomIcon type={customCategory.icon} color={color} />;
        }
      }
      
      // Default fallback
      return <CustomIcon type="box" color={color} />;
  }
};