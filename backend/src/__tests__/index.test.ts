import { describe, it, expect, vi } from 'vitest';

// Mock Cloudflare Workers environment
const mockEnv = {
  DB: {
    prepare: vi.fn(() => ({
      bind: vi.fn(() => ({
        all: vi.fn(),
        first: vi.fn(),
        run: vi.fn(),
      })),
    })),
  },
};

describe('API Routes', () => {
  it('should handle health check', async () => {
    const { default: app } = await import('../index');
    
    const request = new Request('http://localhost/health', {
      method: 'GET',
    });
    
    const response = await app.fetch(request, mockEnv);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toEqual({ status: 'healthy' });
  });

  it('should handle CORS preflight requests', async () => {
    const { default: app } = await import('../index');
    
    const request = new Request('http://localhost/api/todos', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'content-type',
      },
    });
    
    const response = await app.fetch(request, mockEnv);
    expect(response.status).toBe(200);
    
    const headers = response.headers;
    expect(headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(headers.get('Access-Control-Allow-Methods')).toContain('GET');
  });

  it('should return 404 for unknown routes', async () => {
    const { default: app } = await import('../index');
    
    const request = new Request('http://localhost/unknown', {
      method: 'GET',
    });
    
    const response = await app.fetch(request, mockEnv);
    expect(response.status).toBe(404);
  });

  it('should require user_session for todos API', async () => {
    const { default: app } = await import('../index');
    
    const request = new Request('http://localhost/api/todos', {
      method: 'GET',
    });
    
    const response = await app.fetch(request, mockEnv);
    expect(response.status).toBe(400);
    
    const data = await response.json();
    expect(data.error).toContain('user_session');
  });
}); 