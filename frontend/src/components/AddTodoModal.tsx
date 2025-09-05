import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import SmartAutocomplete from './SmartAutocomplete';
import { type Suggestion } from '../utils/smartAutocomplete';
import { getCategoryForProduct } from '../data/swedishProducts';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}


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
      const cleanedText = todoText.trim();
      const category = getCategoryForProduct(cleanedText);

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

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setTodoText(suggestion.name);
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
            <SmartAutocomplete
              value={todoText}
              onChange={setTodoText}
              onSelect={handleSuggestionSelect}
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
              showCategoryHints={true}
              maxSuggestions={5}
            />
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