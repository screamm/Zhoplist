/**
 * ListManager Component
 * 
 * UI för att hantera hybrid sessionID + lista-kod systemet
 * - Visa nuvarande lista-kod/sessionID
 * - Byt till manuell lista-kod
 * - Dela lista-kod
 * - Byt tillbaka till automatisk sessionID
 */

import React, { useState, useEffect } from 'react';
import { sessionManager, SessionManager, type SessionInfo } from '../utils/sessionManager';

interface ListManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListManager: React.FC<ListManagerProps> = ({ isOpen, onClose }) => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>(sessionManager.getSessionInfo());
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newListCode, setNewListCode] = useState('');
  const [error, setError] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const unsubscribe = sessionManager.onSessionChange(setSessionInfo);
    return unsubscribe;
  }, []);

  const handleSetCustomListCode = () => {
    if (!newListCode.trim()) {
      setError('Lista-kod kan inte vara tom');
      return;
    }

    try {
      sessionManager.setCustomListCode(newListCode);
      setNewListCode('');
      setShowCustomForm(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fel uppstod');
    }
  };

  const handleClearCustomListCode = () => {
    sessionManager.clearCustomListCode();
  };

  const handleGenerateNewSession = () => {
    sessionManager.generateNewSession();
  };

  const handleSuggestListCode = () => {
    const suggested = SessionManager.suggestListCode(newListCode);
    setNewListCode(suggested);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Här kan du lägga till en toast/notification
  };

  const shareUrl = `${window.location.origin}?lista=${sessionInfo.sessionId}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Hantera Lista</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Current Session Info */}
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Nuvarande Lista</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">
                {sessionInfo.isCustomListCode ? sessionInfo.listName : 'Automatisk lista'}
              </p>
              <p className="text-xs text-gray-400 font-mono">
                {sessionInfo.sessionId}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(sessionInfo.sessionId)}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              title="Kopiera lista-kod"
            >
              📋
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {!sessionInfo.isCustomListCode && (
            <button
              onClick={() => setShowCustomForm(true)}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              🔗 Skapa Delbar Lista-kod
            </button>
          )}

          {sessionInfo.isCustomListCode && (
            <>
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                📤 Dela Lista
              </button>
              <button
                onClick={handleClearCustomListCode}
                className="w-full p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                🔄 Tillbaka till Automatisk Lista
              </button>
            </>
          )}

          <button
            onClick={handleGenerateNewSession}
            className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            🗑️ Starta Ny Lista
          </button>
        </div>

        {/* Custom List Code Form */}
        {showCustomForm && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-white font-medium mb-3">Skapa Lista-kod</h4>
            <div className="space-y-3">
              <input
                type="text"
                value={newListCode}
                onChange={(e) => {
                  setNewListCode(e.target.value);
                  setError('');
                }}
                placeholder="t.ex. familj-2024"
                className="w-full p-3 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleSuggestListCode}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
                >
                  Föreslå
                </button>
                <button
                  onClick={handleSetCustomListCode}
                  className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Skapa
                </button>
                <button
                  onClick={() => {
                    setShowCustomForm(false);
                    setNewListCode('');
                    setError('');
                  }}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                >
                  Avbryt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-white font-medium mb-3">Dela Lista</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Lista-kod:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sessionInfo.sessionId}
                    readOnly
                    className="flex-1 p-2 bg-gray-600 text-white rounded border border-gray-500 font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(sessionInfo.sessionId)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    Kopiera
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Dela-länk:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 p-2 bg-gray-600 text-white rounded border border-gray-500 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(shareUrl)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    Kopiera
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full p-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
              >
                Stäng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 