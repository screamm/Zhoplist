import React from 'react';
import type { TodoFilter } from '../types/index.js';
import { SearchIcon, PartyIcon, CheckIcon, WelcomeIcon } from './icons/Icons';

interface EmptyStateProps {
  filter: TodoFilter;
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter, searchQuery }) => {
  const getEmptyMessage = () => {
    if (searchQuery) {
      return {
        icon: SearchIcon,
        title: 'Inga resultat',
        description: `Inga uppgifter hittades för "${searchQuery}"`,
      };
    }

    switch (filter) {
      case 'active':
        return {
          icon: PartyIcon,
          title: 'Fantastiskt!',
          description: 'Du har inga aktiva uppgifter just nu',
        };
      case 'completed':
        return {
          icon: CheckIcon,
          title: 'Inga klara uppgifter',
          description: 'Dina slutförda uppgifter visas här',
        };
      default:
        return {
          icon: WelcomeIcon,
          title: 'Välkommen till Zhoplist!',
          description: 'Tryck på + för att lägga till din första uppgift',
        };
    }
  };

  const { icon: IconComponent, title, description } = getEmptyMessage();

  return (
    <div className="
      flex flex-col items-center justify-center 
      text-center 
      p-8
      animate-scale-in
    ">
      <div className="
        w-20 h-20 
        bg-white/10
        backdrop-blur-xl
        rounded-3xl 
        flex items-center justify-center 
        mb-6
        border border-white/20
      ">
        <IconComponent size={32} color="white" />
      </div>
      
      <h3 className="
        font-semibold 
        text-xl 
        text-white 
        mb-3
      ">
        {title}
      </h3>
      
      <p className="
        text-white/70 
        max-w-xs
        leading-relaxed
      ">
        {description}
      </p>
    </div>
  );
}; 