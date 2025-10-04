import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 2500
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respekterar användarens motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actualDuration = prefersReducedMotion ? 1000 : duration;

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Extra tid för fade-out animation
      setTimeout(onFinish, 300);
    }, actualDuration);

    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  if (!isVisible) {
    return (
      <div 
        className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50 transition-opacity duration-300 opacity-0"
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center z-50">
      {/* Sparkles ikon med glow */}
      <div className="mb-8 relative">
        <Sparkles 
          size={48} 
          className="text-blue-400 animate-pulse"
          style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' }}
        />
      </div>
      
      {/* Logo med gradient text */}
      <h1 
        className="text-6xl font-bold mb-4 animate-fadeIn"
        style={{
          background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Zhoplist
      </h1>
      
      {/* Tagline */}
      <p className="text-gray-400 text-lg animate-slideUp">
        {t.appTagline}
      </p>
    </div>
  );
};