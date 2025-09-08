# Backend API Dokumentation

## Översikt

Zhoplists backend är byggd som en Cloudflare Worker som tillhandahåller ett RESTful API för todo/inköpslisthantering. API:et använder Cloudflare D1 (SQLite) som databas och stödjer sessionsbaserad användaridentifiering.

## Base URL
- Produktion: `https://zhoplist-api.davidrydgren.workers.dev`
- Utveckling: `http://localhost:8787`

## Autentisering

API:et använder sessionsbaserad autentisering via `X-Session-ID` header:

```http
X-Session-ID: din-unika-session-id
```

## API Endpoints

### Health Check

#### `GET /health`
Kontrollera API:ets status och hälsa.

**Svar:**
```json
{
  "data": {
    "status": "healthy",
    "environment": "production|development",
    "timestamp": "2025-09-07T10:30:00.000Z"
  },
  "success": true,
  "message": "API is healthy"
}
```

### Todo-operationer

#### `GET /api/todos`
Hämta alla todos för den aktuella sessionen.

**Headers:**
- `X-Session-ID`: Obligatorisk session-identifierare

**Svar:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "title": "Köp mjölk",
      "description": "Ekologisk mjölk från ICA",
      "completed": false,
      "priority": 1,
      "category": "dairy",
      "createdAt": "2025-09-07T10:00:00.000Z",
      "updatedAt": "2025-09-07T10:00:00.000Z",
      "dueDate": null,
      "tags": ["ica", "ekologisk"],
      "userSession": "session-id"
    }
  ],
  "success": true
}
```

#### `POST /api/todos`
Skapa en ny todo.

**Headers:**
- `X-Session-ID`: Obligatorisk session-identifierare
- `Content-Type`: application/json

**Body:**
```json
{
  "title": "Köp bröd",
  "description": "Fullkornsbröd från bageriet",
  "priority": 1,
  "category": "bakery",
  "dueDate": "2025-09-08T12:00:00.000Z",
  "tags": ["fullkorn", "bageri"]
}
```

**Svar:**
```json
{
  "data": {
    "id": "generated-uuid",
    "title": "Köp bröd",
    "description": "Fullkornsbröd från bageriet",
    "completed": false,
    "priority": 1,
    "category": "bakery",
    "createdAt": "2025-09-07T10:30:00.000Z",
    "updatedAt": "2025-09-07T10:30:00.000Z",
    "dueDate": "2025-09-08T12:00:00.000Z",
    "tags": ["fullkorn", "bageri"],
    "userSession": "session-id"
  },
  "success": true,
  "message": "Todo created successfully"
}
```

#### `PUT /api/todos/:id`
Uppdatera en befintlig todo.

**Headers:**
- `X-Session-ID`: Obligatorisk session-identifierare
- `Content-Type`: application/json

**Parametrar:**
- `id`: UUID för todo:n som ska uppdateras

**Body:**
```json
{
  "title": "Köp mjölk - uppdaterad",
  "description": "Laktosfri mjölk",
  "priority": 2,
  "category": "dairy",
  "tags": ["laktosfri"]
}
```

**Svar:**
```json
{
  "data": null,
  "success": true,
  "message": "Todo updated successfully"
}
```

#### `DELETE /api/todos/:id`
Ta bort en specifik todo.

**Headers:**
- `X-Session-ID`: Obligatorisk session-identifierare

**Parametrar:**
- `id`: UUID för todo:n som ska tas bort

**Svar:**
```json
{
  "data": null,
  "success": true,
  "message": "Todo deleted successfully"
}
```

#### `DELETE /api/todos/completed`
Ta bort alla slutförda todos för sessionen.

**Headers:**
- `X-Session-ID`: Obligatorisk session-identifierare

**Svar:**
```json
{
  "data": {
    "deletedCount": 5
  },
  "success": true,
  "message": "Completed todos deleted successfully"
}
```

#### `PATCH /api/todos/:id/toggle`
Växla completed-status för en todo.

**Headers:**
- `X-Session-ID`: Obligatorisk session-identifierare

**Parametrar:**
- `id`: UUID för todo:n som ska växlas

**Svar:**
```json
{
  "data": null,
  "success": true,
  "message": "Todo toggled successfully"
}
```

## Datatyper

### Todo-objekt
```typescript
interface Todo {
  id: string;              // UUID
  title: string;           // Obligatorisk titel
  description?: string;    // Valfri beskrivning
  completed: boolean;      // Slutförd status
  priority: 0 | 1 | 2;    // 0=låg, 1=medium, 2=hög
  category?: string;       // Produktkategori
  createdAt: string;       // ISO 8601 datum
  updatedAt: string;       // ISO 8601 datum
  dueDate?: string;        // ISO 8601 datum (valfritt)
  tags: string[];          // Array med tags
  userSession: string;     // Session-ID
}
```

### Prioritetsnivåer
- `0`: Låg prioritet
- `1`: Medium prioritet (standard)
- `2`: Hög prioritet

## Felhantering

API:et returnerar strukturerade felmeddelanden:

```json
{
  "data": null,
  "success": false,
  "message": "Detaljerat felmeddelande",
  "error": "Detaljerat felmeddelande"
}
```

### Vanliga felkoder
- `400`: Felaktigt request (saknad titel, ogiltig data)
- `401`: Obehörig (saknar eller ogiltig Session-ID)
- `404`: Resurs hittades inte
- `405`: Metod inte tillåten
- `500`: Serverfel

## CORS-konfiguration

API:et är konfigurerat med följande CORS-headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Session-ID`
- `Access-Control-Max-Age: 86400`

## Säkerhetsaspekter

1. **Sessionsbaserad isolering**: Varje session kan endast komma åt sina egna todos
2. **Input-validering**: Alla input-parametrar valideras
3. **SQL-injection skydd**: Parametriserade queries används
4. **Felmeddelanden**: Exponerar inte känslig systeminformation

## Prestandaoptimering

- **Edge caching**: Cloudflare Workers körs på edge-servrar globalt
- **D1-databas**: SQLite-baserad för snabba queries
- **Minimala nätverksanrop**: Effektiva API-endpoints
- **Komprimering**: Automatisk svarskomprimering

## Utveckling och Testning

### Lokalt
```bash
cd backend
npm run dev
# API körs på http://localhost:8787
```

### Deployment
```bash
npm run deploy
```

### Databas-migreringar
```bash
npm run db:migrate
```

---

*API-dokumentation uppdaterad: 2025-09-07*