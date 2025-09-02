import { useState, useRef, useCallback } from 'react';

interface SwipeConfig {
  minDistance?: number;
  threshold?: number;
  preventScroll?: boolean;
}

interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeStart?: (e: TouchEvent) => void;
  onSwipeMove?: (deltaX: number, deltaY: number) => void;
  onSwipeEnd?: () => void;
}

export const useSwipeGestures = (
  callbacks: SwipeCallbacks,
  config: SwipeConfig = {}
) => {
  const {
    minDistance = 50,
    threshold = 0.5,
    preventScroll = true
  } = config;

  const [isTracking, setIsTracking] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      startTime: Date.now()
    };
    setIsTracking(true);
    callbacks.onSwipeStart?.(e.nativeEvent);
  }, [callbacks]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTracking) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;
    
    touchRef.current.currentX = touch.clientX;
    touchRef.current.currentY = touch.clientY;

    // Determine if this is a horizontal swipe
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    
    if (isHorizontalSwipe && Math.abs(deltaX) > 10) {
      if (preventScroll) {
        e.preventDefault();
      }
      
      const progress = Math.abs(deltaX) / minDistance;
      setSwipeProgress(Math.min(progress, 1));
      
      if (deltaX > 0) {
        setSwipeDirection('right');
      } else {
        setSwipeDirection('left');
      }
      
      callbacks.onSwipeMove?.(deltaX, deltaY);
    }
  }, [isTracking, minDistance, preventScroll, callbacks]);

  const handleTouchEnd = useCallback(() => {
    if (!isTracking) return;
    
    const deltaX = touchRef.current.currentX - touchRef.current.startX;
    const deltaY = touchRef.current.currentY - touchRef.current.startY;
    const timeDelta = Date.now() - touchRef.current.startTime;
    
    // Calculate velocity (pixels per ms)
    const velocity = Math.abs(deltaX) / timeDelta;
    
    // Determine if this was a valid swipe
    const isValidSwipe = Math.abs(deltaX) > minDistance && 
                        Math.abs(deltaX) > Math.abs(deltaY) &&
                        (velocity > threshold || Math.abs(deltaX) > minDistance * 2);
    
    if (isValidSwipe) {
      if (deltaX > 0) {
        callbacks.onSwipeRight?.();
      } else {
        callbacks.onSwipeLeft?.();
      }
    }
    
    // Reset state
    setIsTracking(false);
    setSwipeDirection(null);
    setSwipeProgress(0);
    callbacks.onSwipeEnd?.();
  }, [isTracking, minDistance, threshold, callbacks]);

  const swipeProps = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    swipeProps,
    isTracking,
    swipeDirection,
    swipeProgress
  };
};