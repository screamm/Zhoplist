/**
 * Animation utilities för modern mobile UX
 */

// Haptic feedback simulation (vibrationer på mobil)
export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate(10);
    }
  },
  medium: () => {
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate(20);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate([30, 10, 30]);
    }
  },
  success: () => {
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate([40, 10, 40]);
    }
  },
  error: () => {
    if ('vibrate' in navigator && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }
};

// Spring animation presets for modern feel
export const springPresets = {
  gentle: {
    tension: 200,
    friction: 25,
    precision: 0.1
  },
  bouncy: {
    tension: 300,
    friction: 10,
    precision: 0.1
  },
  snappy: {
    tension: 400,
    friction: 30,
    precision: 0.1
  }
};

// CSS animation keyframes
export const animations = {
  // Bounce in animation för nya todos
  bounceIn: `
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3) translateY(-100px);
      }
      50% {
        opacity: 1;
        transform: scale(1.05) translateY(0);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
  
  // Slide out animation för borttagning
  slideOutRight: `
    @keyframes slideOutRight {
      0% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  `,
  
  // Pulse för completed todos
  pulseSuccess: `
    @keyframes pulseSuccess {
      0% {
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
      }
    }
  `,
  
  // Shake för error states
  shake: `
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(5px);
      }
    }
  `,
  
  // Modern loading spinner
  spinModern: `
    @keyframes spinModern {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  
  // Smooth fade in
  fadeInUp: `
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  // Scale bounce för touch feedback
  scaleBounce: `
    @keyframes scaleBounce {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  `
};

// CSS classes for easy animation application
export const animationClasses = {
  bounceIn: 'animate-[bounceIn_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)]',
  slideOutRight: 'animate-[slideOutRight_0.3s_ease-in-out]',
  pulseSuccess: 'animate-[pulseSuccess_0.6s_ease-out]',
  shake: 'animate-[shake_0.6s_ease-in-out]',
  fadeInUp: 'animate-[fadeInUp_0.4s_ease-out]',
  scaleBounce: 'animate-[scaleBounce_0.15s_ease-out]'
};

// Utility functions för programmatisk animation
export const animateElement = (
  element: HTMLElement,
  animation: string,
  duration: number = 300
): Promise<void> => {
  return new Promise((resolve) => {
    element.style.animation = `${animation} ${duration}ms ease-out`;
    
    const handleAnimationEnd = () => {
      element.style.animation = '';
      element.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    };
    
    element.addEventListener('animationend', handleAnimationEnd);
  });
};

// Smooth scroll utilities
export const smoothScroll = {
  to: (element: HTMLElement) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  },
  
  toTop: (container?: HTMLElement) => {
    const target = container || window;
    if (target === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (target as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};

// Intersection Observer for scroll animations
export const createScrollAnimationObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
};

// Performance-optimized animations using requestAnimationFrame
export const rafAnimation = (
  startValue: number,
  endValue: number,
  duration: number,
  callback: (value: number) => void,
  easing: (t: number) => number = (t: number) => t
): void => {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    
    const currentValue = startValue + (endValue - startValue) * easedProgress;
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

// Easing functions
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  elastic: (t: number) => {
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
  },
  bounce: (t: number) => {
    if (t < 1/2.75) {
      return 7.5625 * t * t;
    } else if (t < 2/2.75) {
      return 7.5625 * (t -= 1.5/2.75) * t + 0.75;
    } else if (t < 2.5/2.75) {
      return 7.5625 * (t -= 2.25/2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
    }
  }
};