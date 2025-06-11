import React, { ReactNode } from 'react';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const {
    containerRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
  } = usePullToRefresh({ onRefresh });

  return (
    <div className="relative h-full overflow-hidden">
      {/* Pull to Refresh Indicator */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center transition-all duration-200"
        style={{
          transform: `translateY(${Math.max(-60 + pullDistance, -60)}px)`,
          opacity: isPulling ? 1 : 0,
        }}
      >
        <div className="bg-surface/90 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 flex items-center space-x-2">
          {isRefreshing ? (
            <>
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span className="text-sm text-text">Uppdaterar...</span>
            </>
          ) : (
            <>
              <div
                className="w-4 h-4 rounded-full border-2 border-primary transition-transform duration-200"
                style={{
                  transform: `rotate(${pullProgress * 180}deg)`,
                  borderTopColor: pullProgress >= 1 ? '#10b981' : '#6366f1',
                }}
              >
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              </div>
              <span className="text-sm text-text">
                {pullProgress >= 1 ? 'Släpp för att uppdatera' : 'Dra ner för att uppdatera'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="h-full overflow-y-auto scroll-area"
        style={{
          transform: `translateY(${isPulling || isRefreshing ? Math.min(pullDistance, 80) : 0}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}; 