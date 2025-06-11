import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const SearchIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1"/>
    <path d="M18 18l3 3" stroke={color} strokeWidth="1"/>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12l9-9 9 9" stroke={color} strokeWidth="1"/>
    <path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" stroke={color} strokeWidth="1"/>
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="21" r="1" stroke={color} strokeWidth="1"/>
    <circle cx="20" cy="21" r="1" stroke={color} strokeWidth="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72" stroke={color} strokeWidth="1"/>
    <path d="M7 13h13l-1-5H6" stroke={color} strokeWidth="1"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="1"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1"/>
  </svg>
);

export const ExploreIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1"/>
    <path d="M16 8l-8 8" stroke={color} strokeWidth="1"/>
    <path d="M16 16L8 8" stroke={color} strokeWidth="1"/>
  </svg>
);

export const FoodIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1"/>
    <path d="M8 12h8" stroke={color} strokeWidth="1"/>
    <path d="M12 8v8" stroke={color} strokeWidth="1"/>
  </svg>
);

export const MeatIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1"/>
    <circle cx="10" cy="10" r="2" stroke={color} strokeWidth="1"/>
    <circle cx="14" cy="14" r="2" stroke={color} strokeWidth="1"/>
  </svg>
);

export const DairyIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth="1"/>
    <path d="M10 8h4" stroke={color} strokeWidth="1"/>
    <path d="M10 12h4" stroke={color} strokeWidth="1"/>
  </svg>
);

export const FruitIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="14" r="7" stroke={color} strokeWidth="1"/>
    <path d="M12 7v7" stroke={color} strokeWidth="1"/>
    <path d="M9 5c0 0 2-2 3-2s3 2 3 2" stroke={color} strokeWidth="1"/>
  </svg>
);

export const VegetableIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4C9 4 7 7 7 11v6c0 2 2 3 5 3s5-1 5-3v-6c0-4-2-7-5-7z" stroke={color} strokeWidth="1"/>
    <path d="M12 4v16" stroke={color} strokeWidth="1"/>
  </svg>
);

export const HouseholdIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1"/>
    <path d="M8 8h8" stroke={color} strokeWidth="1"/>
    <path d="M8 12h8" stroke={color} strokeWidth="1"/>
    <path d="M8 16h8" stroke={color} strokeWidth="1"/>
  </svg>
);

export const NoteIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth="1"/>
    <polyline points="14,2 14,8 20,8" stroke={color} strokeWidth="1"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="1"/>
  </svg>
);

export const PartyIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={color} strokeWidth="1"/>
    <circle cx="9" cy="9" r="0.5" fill={color}/>
    <circle cx="15" cy="9" r="0.5" fill={color}/>
  </svg>
);

export const WelcomeIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 12l4 4 4-4" stroke={color} strokeWidth="1"/>
    <path d="M12 8v8" stroke={color} strokeWidth="1"/>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="1"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="1"/>
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="1"/>
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polyline points="15,18 9,12 15,6" stroke={color} strokeWidth="1"/>
  </svg>
);

export const MoreIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <circle cx="19" cy="12" r="1" fill={color}/>
    <circle cx="5" cy="12" r="1" fill={color}/>
  </svg>
);

export const AllIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1"/>
    <path d="M7 12h10" stroke={color} strokeWidth="1"/>
    <path d="M7 8h10" stroke={color} strokeWidth="1"/>
    <path d="M7 16h10" stroke={color} strokeWidth="1"/>
  </svg>
);

export const PendingIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1"/>
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="1"/>
  </svg>
);

export const DoneIcon: React.FC<IconProps> = ({ size = 20, className = "", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1"/>
    <path d="M8 12l3 3 5-6" stroke={color} strokeWidth="1"/>
  </svg>
); 