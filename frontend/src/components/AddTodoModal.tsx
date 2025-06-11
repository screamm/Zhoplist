import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickSuggestions = [
  '🥛 Mjölk',
  '🍞 Bröd', 
  '🥚 Ägg',
  '🧈 Smör',
  '🍌 Bananer',
  '🥕 Morötter',
  '🍅 Tomater',
  '🍗 Kyckling'
];

export const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose }) => {
  const { createTodo } = useTodo();
  const [todoText, setTodoText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!todoText.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Smart kategorisering baserat på text
      let category = 'Övrigt';
      let cleanedText = todoText.trim();

      // Ta bort emoji om det finns i början
      const emojiMatch = cleanedText.match(/^[\u{1F300}-\u{1F9FF}]\s*/u);
      if (emojiMatch) {
        cleanedText = cleanedText.substring(emojiMatch[0].length);
      }

      // Kategorisering baserat på nyckelord
      const text = cleanedText.toLowerCase();
      if (text.includes('mjölk') || text.includes('yoghurt') || text.includes('ost') || text.includes('smör') || text.includes('grädde')) {
        category = 'Mejeri';
      } else if (text.includes('kött') || text.includes('kyckling') || text.includes('fläsk') || text.includes('nöt') || text.includes('korv')) {
        category = 'Kött';
      } else if (text.includes('fisk') || text.includes('lax') || text.includes('tonfisk') || text.includes('räkor')) {
        category = 'Mat';
      } else if (text.includes('banan') || text.includes('äpple') || text.includes('apelsin') || text.includes('vindruvor') || text.includes('frukt')) {
        category = 'Frukt';
      } else if (text.includes('morot') || text.includes('tomat') || text.includes('gurka') || text.includes('sallad') || text.includes('lök') || text.includes('potatis')) {
        category = 'Grönsaker';
      } else if (text.includes('bröd') || text.includes('ägg') || text.includes('ris') || text.includes('pasta') || text.includes('mjöl')) {
        category = 'Mat';
      } else if (text.includes('tvättmedel') || text.includes('disk') || text.includes('toapapper') || text.includes('rengöring')) {
        category = 'Hushåll';
      }

      await createTodo({
        title: cleanedText,
        category,
        priority: 1 // medium priority
      });

      setTodoText('');
      onClose();
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const text = suggestion.split(' ').slice(1).join(' '); // Ta bort emoji
    setTodoText(text);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="
        relative
        w-full max-w-md mx-4
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-6
        shadow-2xl
        animate-in slide-in-from-bottom-4 duration-300
      ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Lägg till artikel
          </h2>
          <button
            onClick={onClose}
            className="
              w-8 h-8
              rounded-full
              bg-white/10
              hover:bg-white/20
              flex items-center justify-center
              text-white/70 hover:text-white
              transition-all duration-200
            "
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              ref={inputRef}
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Vad ska du handla?"
              className="
                w-full
                px-4 py-4
                bg-white/10
                border border-white/20
                rounded-2xl
                text-white
                placeholder-white/50
                text-base
                outline-none
                focus:border-cyan-400
                focus:bg-white/20
                transition-all duration-200
              "
              disabled={isSubmitting}
            />
          </div>

          {/* Quick Suggestions */}
          <div>
            <p className="text-white/70 text-sm mb-3 font-medium">
              Snabbval:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="
                    p-3
                    bg-white/5
                    hover:bg-white/15
                    border border-white/10
                    hover:border-white/30
                    rounded-xl
                    text-white/80 hover:text-white
                    text-sm
                    transition-all duration-200
                    text-left
                    hover:scale-105
                    active:scale-95
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                py-3
                px-4
                bg-white/10
                hover:bg-white/20
                border border-white/20
                hover:border-white/30
                rounded-2xl
                text-white/80 hover:text-white
                font-medium
                transition-all duration-200
              "
              disabled={isSubmitting}
            >
              Avbryt
            </button>
            
            <button
              type="submit"
              disabled={!todoText.trim() || isSubmitting}
              className="
                flex-1
                py-3
                px-4
                bg-gradient-to-r from-cyan-400 to-cyan-500
                hover:from-cyan-500 hover:to-cyan-600
                disabled:from-gray-500 disabled:to-gray-600
                disabled:opacity-50
                border-0
                rounded-2xl
                text-white
                font-medium
                transition-all duration-200
                disabled:cursor-not-allowed
                shadow-xl
                shadow-cyan-500/25
              "
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Lägger till...</span>
                </div>
              ) : (
                'Lägg till'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 