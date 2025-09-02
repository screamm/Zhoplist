import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hapticFeedback } from '../animations';

describe('hapticFeedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls light vibration', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      value: mockVibrate,
      writable: true,
    });

    hapticFeedback.light();
    expect(mockVibrate).toHaveBeenCalledWith(10);
  });

  it('calls success vibration', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      value: mockVibrate,
      writable: true,
    });

    hapticFeedback.success();
    expect(mockVibrate).toHaveBeenCalledWith([40, 10, 40]);
  });

  it('calls error vibration', () => {
    const mockVibrate = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      value: mockVibrate,
      writable: true,
    });

    hapticFeedback.error();
    expect(mockVibrate).toHaveBeenCalledWith([100, 50, 100]);
  });

  it('handles missing vibrate API gracefully', () => {
    // Remove vibrate from navigator
    Object.defineProperty(navigator, 'vibrate', {
      value: undefined,
      writable: true,
    });

    expect(() => hapticFeedback.light()).not.toThrow();
    expect(() => hapticFeedback.success()).not.toThrow();
    expect(() => hapticFeedback.error()).not.toThrow();
  });
}); 