import { useRef, useCallback, type TouchEvent } from 'react';

interface SwipeData {
  direction: 'left' | 'right' | null;
  distance: number;
  velocity: number;
}

interface SwipeOptions {
  minDistance?: number;
  maxTime?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipe?: (data: SwipeData) => void;
}

export const useSwipe = (options: SwipeOptions = {}) => {
  const {
    minDistance = 50,
    maxTime = 300,
    onSwipeLeft,
    onSwipeRight,
    onSwipe,
  } = options;

  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number; time: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    touchEnd.current = null;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchEnd.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const deltaX = touchEnd.current.x - touchStart.current.x;
    const deltaY = touchEnd.current.y - touchStart.current.y;
    const deltaTime = touchEnd.current.time - touchStart.current.time;

    // Calculate distance and velocity
    const distance = Math.abs(deltaX);
    const velocity = distance / deltaTime;

    // Check if it's a valid swipe (horizontal movement > vertical movement)
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (
      isHorizontalSwipe &&
      distance >= minDistance &&
      deltaTime <= maxTime
    ) {
      const direction: 'left' | 'right' = deltaX > 0 ? 'right' : 'left';

      const swipeData: SwipeData = {
        direction,
        distance,
        velocity,
      };

      // Call general swipe handler
      onSwipe?.(swipeData);

      // Call specific direction handlers
      if (direction === 'left') {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    // Reset
    touchStart.current = null;
    touchEnd.current = null;
  }, [minDistance, maxTime, onSwipeLeft, onSwipeRight, onSwipe]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}; 