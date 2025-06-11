import { useRef, useCallback, TouchEvent, useState } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  resistance?: number;
}

export const usePullToRefresh = (options: PullToRefreshOptions) => {
  const { onRefresh, threshold = 80, resistance = 2.5 } = options;
  
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const touchStart = useRef<{ y: number; scrollTop: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    // Only start pull-to-refresh if we're at the top of the scroll
    if (container.scrollTop === 0) {
      touchStart.current = {
        y: e.touches[0].clientY,
        scrollTop: container.scrollTop,
      };
    }
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;

    const container = containerRef.current;
    if (!container) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStart.current.y;

    // Only pull if we're moving down and still at the top
    if (deltaY > 0 && container.scrollTop === 0) {
      e.preventDefault();
      
      // Apply resistance to the pull
      const distance = Math.min(deltaY / resistance, threshold * 1.5);
      setPullDistance(distance);
      setIsPulling(distance > 10);
    }
  }, [resistance, threshold]);

  const onTouchEnd = useCallback(async () => {
    if (!touchStart.current || !isPulling) {
      setPullDistance(0);
      setIsPulling(false);
      touchStart.current = null;
      return;
    }

    // Trigger refresh if we've pulled far enough
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

    // Reset state
    setPullDistance(0);
    setIsPulling(false);
    touchStart.current = null;
  }, [isPulling, pullDistance, threshold, onRefresh]);

  // Calculate pull progress (0-1)
  const pullProgress = Math.min(pullDistance / threshold, 1);

  return {
    containerRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
  };
}; 