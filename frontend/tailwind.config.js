/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired 2025 color palette
        primary: '#007AFF',      // Apple Blue
        secondary: '#5856D6',    // Purple
        accent: '#FF9500',       // Orange
        success: '#32D74B',      // Green
        warning: '#FF9F0A',      // Amber
        error: '#FF453A',        // Red
        
        // Background system
        background: '#000000',   // True Black
        surface: '#1C1C1E',      // Dark Gray
        card: '#2C2C2E',         // Card Gray
        elevated: '#3A3A3C',     // Elevated surface
        
        // Text system
        text: '#FFFFFF',         // Primary text
        'text-secondary': '#8E8E93', // Secondary text
        muted: '#636366',        // Muted text
        
        // Border system
        border: '#38383A',       // Border
        'border-light': '#48484A', // Lighter border
        
        // Glass effects
        glass: '#FFFFFF0A',
        'glass-border': '#FFFFFF14',
      },
      
      backdropBlur: {
        xs: '2px',
        '3xl': '72px',
      },
      
      animation: {
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'bounce-subtle': 'bounce-subtle 0.6s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      
      keyframes: {
        slideUp: {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        slideDown: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-10px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        bounceSubtle: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.25)',
        'neumorphic': '6px 6px 12px #00000040, -6px -6px 12px #FFFFFF08',
        'neumorphic-inset': 'inset 3px 3px 6px #00000060, inset -3px -3px 6px #FFFFFF0A',
        'glow': '0 0 20px rgba(0, 122, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 122, 255, 0.4)',
      },
      
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3.5xl': ['2rem', { lineHeight: '2.25rem' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    // Custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.safe-area-inset-top': {
          'padding-top': 'env(safe-area-inset-top)',
        },
        '.safe-area-inset-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.safe-area-inset-left': {
          'padding-left': 'env(safe-area-inset-left)',
        },
        '.safe-area-inset-right': {
          'padding-right': 'env(safe-area-inset-right)',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}

