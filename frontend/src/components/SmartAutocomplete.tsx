// Smart Autocomplete Komponent med svensk produktdatabas
import { useState, useEffect, useRef, useMemo } from 'react';
import { smartAutocomplete, type Suggestion } from '../utils/smartAutocomplete';
import { DEFAULT_CATEGORIES } from '../data/swedishProducts';

interface SmartAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: Suggestion) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showCategoryHints?: boolean;
  maxSuggestions?: number;
}

export const SmartAutocomplete: React.FC<SmartAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = 'Vad behöver du?',
  className = '',
  disabled = false,
  showCategoryHints = true,
  maxSuggestions = 6
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Debounced search för performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.length >= 0) { // Visa även populära förslag när tomt
        setIsLoading(true);
        const startTime = performance.now();
        
        const newSuggestions = smartAutocomplete.getSuggestions(value);
        
        const endTime = performance.now();
        console.log(`Autocomplete search took ${endTime - startTime}ms`);
        
        setSuggestions(newSuggestions.slice(0, maxSuggestions));
        setIsLoading(false);
        setIsOpen(true);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 150); // 150ms debounce för smooth typing

    return () => clearTimeout(timeoutId);
  }, [value, maxSuggestions]);

  // Stäng dropdown när man klickar utanför
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
        
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll till vald suggestion
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  // Hantera val av suggestion
  const handleSuggestionClick = (suggestion: Suggestion) => {
    // Lär autocomplete från valet
    smartAutocomplete.learn(suggestion.name);
    
    // Meddela parent component
    onSelect(suggestion);
    
    // Stäng dropdown
    setIsOpen(false);
    setSelectedIndex(-1);
    
    // Rensa input för nästa val
    onChange('');
  };

  // Få kategori-ikon
  const getCategoryIcon = (categoryId: string): string => {
    const category = DEFAULT_CATEGORIES.find(c => c.id === categoryId);
    return category?.icon || '📦';
  };

  // Highlight matched text
  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query || query.length < 2) return text;
    
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    
    return (
      <>
        {text.substring(0, index)}
        <mark className="bg-cyan-400/30 text-cyan-300 rounded px-0.5">
          {text.substring(index, index + query.length)}
        </mark>
        {text.substring(index + query.length)}
      </>
    );
  };


  // Memoized suggestion list för performance
  const suggestionList = useMemo(() => (
    suggestions.map((suggestion, index) => (
      <div
        key={`${suggestion.name}-${suggestion.category}-${index}`}
        ref={(el) => {
          suggestionRefs.current[index] = el;
        }}
        className={`
          px-4 py-3 cursor-pointer transition-all duration-200
          flex items-center justify-between
          ${selectedIndex === index 
            ? 'bg-white/20 border-l-4 border-cyan-400' 
            : 'hover:bg-white/10'
          }
        `}
        onClick={() => handleSuggestionClick(suggestion)}
        role="option"
        aria-selected={selectedIndex === index}
        tabIndex={-1}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {showCategoryHints && (
            <span 
              className="text-lg flex-shrink-0"
              title={DEFAULT_CATEGORIES.find(c => c.id === suggestion.category)?.name}
            >
              {getCategoryIcon(suggestion.category)}
            </span>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white truncate">
              {highlightMatch(suggestion.name, value)}
            </div>
            
            {suggestion.aliases && suggestion.aliases.length > 0 && (
              <div className="text-xs text-white/60 truncate">
                även: {suggestion.aliases.slice(0, 2).join(', ')}
                {suggestion.aliases.length > 2 && '...'}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Reason indicator */}
          {suggestion.reason === 'history' && (
            <span className="w-2 h-2 bg-blue-400 rounded-full" title="Från din historik" />
          )}
          {suggestion.reason === 'popularity' && (
            <span className="w-2 h-2 bg-orange-400 rounded-full" title="Populär produkt" />
          )}
          
          {/* Score indicator (endast i dev mode) */}
          {process.env.NODE_ENV === 'development' && (
            <span className="text-xs text-white/40 font-mono">
              {Math.round(suggestion.score * 100)}%
            </span>
          )}
        </div>
      </div>
    ))
  ), [suggestions, selectedIndex, value, showCategoryHints]);

  return (
    <div className="relative w-full">
      {/* Input field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-base border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
          transition-colors duration-200
          ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}
          ${className}
        `}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-activedescendant={
          selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
        }
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div 
          className="
            absolute z-50 w-full mt-1 
            bg-white/10 backdrop-blur-xl
            border border-white/20 rounded-2xl shadow-2xl
            max-h-64 overflow-y-auto
          "
          role="listbox"
          aria-label="Produktförslag"
        >
          {suggestionList}

          {/* Footer med tips */}
          <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-xs text-white/70">
            <div className="flex items-center justify-between">
              <span>Använd ↑↓ för att navigera, Enter för att välja</span>
              {suggestions.some(s => s.reason === 'history') && (
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>Från historik</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ingen match meddelande */}
      {isOpen && !isLoading && value.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 text-center text-white/70">
          <div>Inga förslag hittades för "{value}"</div>
          <div className="text-xs mt-1">Skriv produktens namn och tryck Enter för att lägga till den ändå</div>
        </div>
      )}
    </div>
  );
};

export default SmartAutocomplete;