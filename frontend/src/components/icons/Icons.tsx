import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const SearchIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <path d="21 21l-4.35-4.35" stroke={color} strokeWidth="2"/>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={color} strokeWidth="2"/>
    <polyline points="9,22 9,12 15,12 15,22" stroke={color} strokeWidth="2"/>
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="21" r="1" stroke={color} strokeWidth="2"/>
    <circle cx="20" cy="21" r="1" stroke={color} strokeWidth="2"/>
    <path d="1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke={color} strokeWidth="2"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
  </svg>
);

export const ExploreIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" stroke={color} strokeWidth="2"/>
  </svg>
);

export const FoodIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 8c0-3.866-1.79-7-4-7s-4 3.134-4 7c0 1.657.757 3.156 2 4.144V15c0 1.105.895 2 2 2s2-.895 2-2v-2.856C17.243 11.156 18 9.657 18 8z" stroke={color} strokeWidth="2"/>
    <path d="M2 9v6c0 1.105.895 2 2 2h1V9c0-1.105-.895-2-2-2s-2 .895-2 2z" stroke={color} strokeWidth="2"/>
    <path d="M7 9c0-1.105-.895-2-2-2v8c1.105 0 2-.895 2-2V9z" stroke={color} strokeWidth="2"/>
  </svg>
);

export const MeatIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="12" rx="8" ry="6" stroke={color} strokeWidth="2"/>
    <ellipse cx="12" cy="10" rx="5" ry="3" stroke={color} strokeWidth="2"/>
    <ellipse cx="12" cy="14" rx="5" ry="3" stroke={color} strokeWidth="2"/>
  </svg>
);

export const DairyIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 2v4l-2 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-2-2V2" stroke={color} strokeWidth="2"/>
    <path d="M16 8v2a4 4 0 01-8 0V8" stroke={color} strokeWidth="2"/>
  </svg>
);

export const FruitIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="8" cy="8" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="16" cy="8" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="10" cy="16" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="14" cy="16" r="3" stroke={color} strokeWidth="2"/>
  </svg>
);

export const VegetableIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C8 2 6 6 6 10v4c0 4 2 8 6 8s6-4 6-8v-4c0-4-2-8-6-8z" stroke={color} strokeWidth="2"/>
    <path d="M12 2v20" stroke={color} strokeWidth="2"/>
    <path d="M9 7c1-1 2-1 3-1s2 0 3 1" stroke={color} strokeWidth="2"/>
    <path d="M9 17c1 1 2 1 3 1s2 0 3-1" stroke={color} strokeWidth="2"/>
  </svg>
);

export const HouseholdIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <rect x="7" y="7" width="3" height="3" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="14" y="7" width="3" height="3" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="7" y="14" width="3" height="3" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="14" y="14" width="3" height="3" rx="1" stroke={color} strokeWidth="2"/>
  </svg>
);

export const NoteIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth="2"/>
    <polyline points="14,2 14,8 20,8" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2"/>
    <polyline points="10,9 9,9 8,9" stroke={color} strokeWidth="2"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="2"/>
  </svg>
);

export const PartyIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke={color} strokeWidth="2"/>
  </svg>
);

export const WelcomeIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polyline points="8,12 12,16 16,12" stroke={color} strokeWidth="2"/>
    <line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2"/>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2"/>
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2"/>
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="15,18 9,12 15,6" stroke={color} strokeWidth="2"/>
  </svg>
);

export const MoreIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="1" stroke={color} strokeWidth="2"/>
    <circle cx="19" cy="12" r="1" stroke={color} strokeWidth="2"/>
    <circle cx="5" cy="12" r="1" stroke={color} strokeWidth="2"/>
  </svg>
); 