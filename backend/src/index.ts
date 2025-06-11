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
}

interface Env {
	DB: D1Database;
	ENVIRONMENT: string;
}

// CORS headers för frontend
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Access-Control-Max-Age': '86400',
};

function jsonResponse(data: any, status = 200, headers = {}) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders,
			...headers,
		},
	});
}

function errorResponse(message: string, status = 400) {
	return jsonResponse({ error: message }, status);
}

// Handle CORS preflight requests
function handleOptions() {
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}

async function getAllTodos(db: D1Database): Promise<Response> {
	try {
		const { results } = await db.prepare(`
			SELECT * FROM todos 
			ORDER BY created_at DESC
		`).all();

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
		})) || [];

		return jsonResponse(todos);
	} catch (error) {
		console.error('Error fetching todos:', error);
		return errorResponse('Failed to fetch todos', 500);
	}
}

async function createTodo(request: Request, db: D1Database): Promise<Response> {
	try {
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
		};

		await db.prepare(`
			INSERT INTO todos (id, title, description, completed, priority, category, created_at, updated_at, due_date, tags)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
			todo.tags
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
		};

		return jsonResponse(responseData, 201);
	} catch (error) {
		console.error('Error creating todo:', error);
		return errorResponse('Failed to create todo', 500);
	}
}

async function updateTodo(request: Request, db: D1Database, id: string): Promise<Response> {
	try {
		const body = await request.json() as Partial<Todo>;
		
		if (!body.title?.trim()) {
			return errorResponse('Title is required');
		}

		const updated_at = new Date().toISOString();
		
		const result = await db.prepare(`
			UPDATE todos 
			SET title = ?, description = ?, priority = ?, category = ?, updated_at = ?, due_date = ?, tags = ?
			WHERE id = ?
		`).bind(
			body.title.trim(),
			body.description?.trim() || null,
			body.priority || 0,
			body.category?.trim() || null,
			updated_at,
			body.dueDate || null,
			JSON.stringify(body.tags || []),
			id
		).run();

		if (result.changes === 0) {
			return errorResponse('Todo not found', 404);
		}

		return jsonResponse({ message: 'Todo updated successfully' });
	} catch (error) {
		console.error('Error updating todo:', error);
		return errorResponse('Failed to update todo', 500);
	}
}

async function deleteTodo(db: D1Database, id: string): Promise<Response> {
	try {
		const result = await db.prepare('DELETE FROM todos WHERE id = ?').bind(id).run();
		
		if (result.changes === 0) {
			return errorResponse('Todo not found', 404);
		}

		return jsonResponse({ message: 'Todo deleted successfully' });
	} catch (error) {
		console.error('Error deleting todo:', error);
		return errorResponse('Failed to delete todo', 500);
	}
}

async function deleteCompletedTodos(db: D1Database): Promise<Response> {
	try {
		const result = await db.prepare('DELETE FROM todos WHERE completed = true').run();
		
		return jsonResponse({ 
			message: 'Completed todos deleted successfully',
			deletedCount: result.changes 
		});
	} catch (error) {
		console.error('Error deleting completed todos:', error);
		return errorResponse('Failed to delete completed todos', 500);
	}
}

async function toggleTodo(db: D1Database, id: string): Promise<Response> {
	try {
		const updated_at = new Date().toISOString();
		
		const result = await db.prepare(`
			UPDATE todos 
			SET completed = NOT completed, updated_at = ?
			WHERE id = ?
		`).bind(updated_at, id).run();

		if (result.changes === 0) {
			return errorResponse('Todo not found', 404);
		}

		return jsonResponse({ message: 'Todo toggled successfully' });
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
					return await getAllTodos(env.DB);
				}
				
				// POST /api/todos - Create new todo
				if (method === 'POST' && pathParts.length === 3) {
					return await createTodo(request, env.DB);
				}
				
				// DELETE /api/todos/completed - Delete all completed todos
				if (method === 'DELETE' && pathParts[3] === 'completed') {
					return await deleteCompletedTodos(env.DB);
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
					return await deleteTodo(env.DB, todoId);
				}
				
				// PATCH /api/todos/:id/toggle - Toggle completed status
				if (method === 'PATCH' && pathParts[4] === 'toggle') {
					return await toggleTodo(env.DB, todoId);
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
			});
		}

		return errorResponse('Not found', 404);
	},
} satisfies ExportedHandler<Env>;
