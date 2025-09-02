import React, { useState } from 'react';
import type { Todo, TodoFormData } from '../types/index.js';
import { PRIORITY_LEVELS } from '../types/index.js';
import { useTodo } from '../context/TodoContext';
import { SHOPPING_CATEGORIES } from '../types/categories.js';

interface EditTodoModalProps {
  todo: Todo;
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo }) => {
  const { stopEditingTodo, updateTodo } = useTodo();

  const [formData, setFormData] = useState<TodoFormData>({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    category: todo.category || '',
    dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
    tags: todo.tags || [],
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTodo(todo.id, {
        ...formData,
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        category: formData.category?.trim() || undefined,
        dueDate: formData.dueDate || undefined,
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof TodoFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags?.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tag]
        }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      stopEditingTodo();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface w-full max-w-md rounded-xl border border-white/10 animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Redigera todo</h2>
          <button
            onClick={stopEditingTodo}
            className="text-muted hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Titel *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Vad behöver du göra?"
              className="form-input"
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Beskrivning
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Lägg till detaljer..."
              className="form-textarea"
              rows={3}
            />
          </div>

          {/* Priority and Category Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Prioritet
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', Number(e.target.value) as 0 | 1 | 2)}
                className="form-input"
              >
                {Object.entries(PRIORITY_LEVELS).map(([value, config]) => (
                  <option key={value} value={value}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Kategori
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="form-input"
              >
                <option value="">Välj kategori...</option>
                {SHOPPING_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Förfallodatum
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Taggar
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Lägg till taggar (tryck Enter)"
              className="form-input"
            />
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-accent/20 text-accent px-2 py-1 rounded border border-accent/30 flex items-center"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-accent/70 hover:text-accent"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg border border-white/5">
            <span className="text-sm text-muted">Status:</span>
            <span className={`text-sm font-medium ${todo.completed ? 'text-success' : 'text-primary'}`}>
              {todo.completed ? '✅ Slutförd' : '⏳ Aktiv'}
            </span>
            <div className="text-xs text-muted">
              Skapad: {new Date(todo.createdAt).toLocaleDateString('sv-SE')}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={stopEditingTodo}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={!formData.title.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Sparar...
                </span>
              ) : (
                'Spara ändringar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 