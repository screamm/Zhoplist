import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the SessionManager class since we're testing the actual implementation
describe('SessionManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
    sessionStorage.clear();
    // Clear URL
    Object.defineProperty(window, 'location', {
      value: { search: '', origin: 'http://localhost:3000', pathname: '/' },
      writable: true,
    });
  });

  it('validates list code format correctly', async () => {
    // Import the actual SessionManager class
    const { SessionManager } = await import('../sessionManager');
    
    expect(SessionManager.validateListCode('abc123')).toEqual({ valid: true });
    expect(SessionManager.validateListCode('test-list')).toEqual({ valid: true });
    expect(SessionManager.validateListCode('mylist')).toEqual({ valid: true });
    
    // Invalid codes
    expect(SessionManager.validateListCode('').valid).toBe(false);
    expect(SessionManager.validateListCode('ab').valid).toBe(false); // too short
    expect(SessionManager.validateListCode('AB@123').valid).toBe(false); // invalid chars
  });

  it('creates new session when none exists', async () => {
    const { SessionManager } = await import('../sessionManager');
    const sessionManager = new SessionManager();
    
    const sessionId = sessionManager.getSessionId();
    expect(sessionId).toBeDefined();
    expect(typeof sessionId).toBe('string');
    expect(sessionId.length).toBeGreaterThan(0);
  });

  it('gets session info correctly', async () => {
    const { SessionManager } = await import('../sessionManager');
    const sessionManager = new SessionManager();
    
    const sessionInfo = sessionManager.getSessionInfo();
    expect(sessionInfo.sessionId).toBeDefined();
    expect(typeof sessionInfo.isCustomListCode).toBe('boolean');
  });

  it('handles custom list codes', async () => {
    const { SessionManager } = await import('../sessionManager');
    const sessionManager = new SessionManager();
    
    sessionManager.setCustomListCode('test-list');
    
    const sessionInfo = sessionManager.getSessionInfo();
    expect(sessionInfo.sessionId).toBe('test-list');
    expect(sessionInfo.isCustomListCode).toBe(true);
  });

  it('generates new session ID', async () => {
    const { SessionManager } = await import('../sessionManager');
    const sessionManager = new SessionManager();
    
    const originalId = sessionManager.getSessionId();
    sessionManager.generateNewSession();
    const newId = sessionManager.getSessionId();
    
    expect(newId).not.toBe(originalId);
    expect(newId).toBeDefined();
  });

  it('clears custom list code', async () => {
    const { SessionManager } = await import('../sessionManager');
    const sessionManager = new SessionManager();
    
    sessionManager.setCustomListCode('test-list');
    expect(sessionManager.getSessionInfo().isCustomListCode).toBe(true);
    
    sessionManager.clearCustomListCode();
    expect(sessionManager.getSessionInfo().isCustomListCode).toBe(false);
  });
}); 