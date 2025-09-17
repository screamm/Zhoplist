/**
 * Todo API built with Cloudflare Workers and D1
 * 
 * API Endpoints:
 * GET    /api/todos          - Hämta alla todos
 * POST   /api/todos          - Skapa ny todo
 * PUT    /api/todos/:id      - Uppdatera todo
 * DELETE /api/todos/:id      - Ta bort specifik todo
 * DELETE /api/todos/completed - Ta bort alla completed todos
 * PATCH  /api/todos/:id/toggle - Toggle completed status
 */

import { v4 as uuidv4 } from 'uuid';

interface Todo {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	priority: 0 | 1 | 2; // 0=low, 1=medium, 2=high
	category?: string;
	createdAt: string;
	updatedAt: string;
	dueDate?: string;
	tags: string[];
	userSession: string; // SessionID eller lista-kod för multi-user support
}

interface Env {
	DB: D1Database;
	ENVIRONMENT: string;
}

// CORS headers för frontend
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Session-ID, x-session-id',
	'Access-Control-Max-Age': '86400',
};

function jsonResponse(data: any, status = 200, headers = {}, message?: string) {
	const response = {
		data,
		success: status >= 200 && status < 300,
		...(message && { message })
	};
	
	return new Response(JSON.stringify(response), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders,
			...headers,
		},
	});
}

function errorResponse(message: string, status = 400) {
	const response = {
		data: null,
		success: false,
		message,
		error: message
	};
	
	return new Response(JSON.stringify(response), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders,
		},
	});
}

// Handle CORS preflight requests
function handleOptions() {
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

// Extrahera sessionID från request headers
function getSessionId(request: Request): string | null {
	return request.headers.get('X-Session-ID');
}

async function getAllTodos(db: D1Database, request: Request): Promise<Response> {
	try {
		const sessionId = getSessionId(request);
		if (!sessionId) {
			return errorResponse('Session ID is required', 400);
		}

		const { results } = await db.prepare(`
			SELECT * FROM todos 
			WHERE user_session = ?
			ORDER BY created_at DESC
		`).bind(sessionId).all();

		const todos = results?.map(todo => ({
			id: todo.id,
			title: todo.title,
			description: todo.description,
			completed: Boolean(todo.completed),
			priority: todo.priority,
			category: todo.category,
			createdAt: todo.created_at,
			updatedAt: todo.updated_at,
			dueDate: todo.due_date,
			tags: todo.tags ? JSON.parse(todo.tags as string) : [],
			userSession: todo.user_session,
		})) || [];

		return jsonResponse(todos);
	} catch (error) {
		console.error('Error fetching todos:', error);
		return errorResponse('Failed to fetch todos', 500);
	}
}

async function createTodo(request: Request, db: D1Database): Promise<Response> {
	try {
		const sessionId = getSessionId(request);
		if (!sessionId) {
			return errorResponse('Session ID is required', 400);
		}

		const body = await request.json() as Partial<Todo>;
		
		if (!body.title?.trim()) {
			return errorResponse('Title is required');
		}

		const todo = {
			id: uuidv4(),
			title: body.title.trim(),
			description: body.description?.trim() || null,
			completed: false,
			priority: body.priority || 0,
			category: body.category?.trim() || null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			due_date: body.dueDate || null,
			tags: JSON.stringify(body.tags || []),
			user_session: sessionId,
		};

		await db.prepare(`
			INSERT INTO todos (id, title, description, completed, priority, category, created_at, updated_at, due_date, tags, user_session)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`).bind(
			todo.id,
			todo.title,
			todo.description,
			todo.completed,
			todo.priority,
			todo.category,
			todo.created_at,
			todo.updated_at,
			todo.due_date,
			todo.tags,
			todo.user_session
		).run();

		const responseData = {
			id: todo.id,
			title: todo.title,
			description: todo.description,
			completed: todo.completed,
			priority: todo.priority,
			category: todo.category,
			createdAt: todo.created_at,
			updatedAt: todo.updated_at,
			dueDate: todo.due_date,
			tags: JSON.parse(todo.tags),
			userSession: todo.user_session,
		};

		return jsonResponse(responseData, 201, {}, 'Todo created successfully');
	} catch (error) {
		console.error('Error creating todo:', error);
		return errorResponse('Failed to create todo', 500);
	}
}

async function updateTodo(request: Request, db: D1Database, id: string): Promise<Response> {
	try {
		const sessionId = getSessionId(request);
		if (!sessionId) {
			return errorResponse('Session ID is required', 400);
		}

		const body = await request.json() as Partial<Todo>;
		
		if (!body.title?.trim()) {
			return errorResponse('Title is required');
		}

		const updated_at = new Date().toISOString();
		
		const result = await db.prepare(`
			UPDATE todos 
			SET title = ?, description = ?, priority = ?, category = ?, updated_at = ?, due_date = ?, tags = ?
			WHERE id = ? AND user_session = ?
		`).bind(
			body.title.trim(),
			body.description?.trim() || null,
			body.priority || 0,
			body.category?.trim() || null,
			updated_at,
			body.dueDate || null,
			JSON.stringify(body.tags || []),
			id,
			sessionId
		).run();

		if (result.changes === 0) {
			return errorResponse('Todo not found or access denied', 404);
		}

		return jsonResponse(null, 200, {}, 'Todo updated successfully');
	} catch (error) {
		console.error('Error updating todo:', error);
		return errorResponse('Failed to update todo', 500);
	}
}

async function deleteTodo(db: D1Database, request: Request, id: string): Promise<Response> {
	try {
		const sessionId = getSessionId(request);
		if (!sessionId) {
			return errorResponse('Session ID is required', 400);
		}

		const result = await db.prepare('DELETE FROM todos WHERE id = ? AND user_session = ?').bind(id, sessionId).run();
		
		if (result.changes === 0) {
			return errorResponse('Todo not found or access denied', 404);
		}

		return jsonResponse(null, 200, {}, 'Todo deleted successfully');
	} catch (error) {
		console.error('Error deleting todo:', error);
		return errorResponse('Failed to delete todo', 500);
	}
}

async function deleteCompletedTodos(db: D1Database, request: Request): Promise<Response> {
	try {
		const sessionId = getSessionId(request);
		if (!sessionId) {
			return errorResponse('Session ID is required', 400);
		}

		const result = await db.prepare('DELETE FROM todos WHERE completed = true AND user_session = ?').bind(sessionId).run();
		
		return jsonResponse(
			{ deletedCount: result.changes }, 
			200, 
			{}, 
			'Completed todos deleted successfully'
		);
	} catch (error) {
		console.error('Error deleting completed todos:', error);
		return errorResponse('Failed to delete completed todos', 500);
	}
}

async function toggleTodo(db: D1Database, request: Request, id: string): Promise<Response> {
	try {
		const sessionId = getSessionId(request);
		if (!sessionId) {
			return errorResponse('Session ID is required', 400);
		}

		const updated_at = new Date().toISOString();
		
		const result = await db.prepare(`
			UPDATE todos 
			SET completed = NOT completed, updated_at = ?
			WHERE id = ? AND user_session = ?
		`).bind(updated_at, id, sessionId).run();

		if (result.changes === 0) {
			return errorResponse('Todo not found or access denied', 404);
		}

		return jsonResponse(null, 200, {}, 'Todo toggled successfully');
	} catch (error) {
		console.error('Error toggling todo:', error);
		return errorResponse('Failed to toggle todo', 500);
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return handleOptions();
		}

		const url = new URL(request.url);
		const path = url.pathname;
		const method = request.method;

		// Route API requests
		if (path.startsWith('/api/todos')) {
			const pathParts = path.split('/');

			try {
				// GET /api/todos - Get all todos
				if (method === 'GET' && pathParts.length === 3) {
					return await getAllTodos(env.DB, request);
				}

				// POST /api/todos - Create new todo
				if (method === 'POST' && pathParts.length === 3) {
					return await createTodo(request, env.DB);
				}
				
				// DELETE /api/todos/completed - Delete all completed todos
				if (method === 'DELETE' && pathParts[3] === 'completed') {
					return await deleteCompletedTodos(env.DB, request);
				}
				
				const todoId = pathParts[3];
				if (!todoId) {
					return errorResponse('Todo ID is required');
				}
				
				// PUT /api/todos/:id - Update todo
				if (method === 'PUT') {
					return await updateTodo(request, env.DB, todoId);
				}
				
				// DELETE /api/todos/:id - Delete specific todo
				if (method === 'DELETE') {
					return await deleteTodo(env.DB, request, todoId);
				}
				
				// PATCH /api/todos/:id/toggle - Toggle completed status
				if (method === 'PATCH' && pathParts[4] === 'toggle') {
					return await toggleTodo(env.DB, request, todoId);
				}
				
				return errorResponse('Method not allowed', 405);
			} catch (error) {
				console.error('API Error:', error);
				return errorResponse('Internal server error', 500);
			}
		}

		// Health check endpoint
		if (path === '/health') {
			return jsonResponse({ 
				status: 'healthy', 
				environment: env.ENVIRONMENT,
				timestamp: new Date().toISOString() 
			}, 200, {}, 'API is healthy');
		}

		return errorResponse('Not found', 404);
	},
} satisfies ExportedHandler<Env>;
