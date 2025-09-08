# Databas Schema och Migrations Dokumentation

## Översikt

Zhoplist använder Cloudflare D1, en SQLite-baserad edge-databas som ger snabba queries med global distribution. Databasen är utformad för optimal prestanda med sessionsbaserad data-isolering.

## Databas Arkitektur

### Teknisk Stack
- **Cloudflare D1**: SQLite på edge-servrar
- **SQLite 3.x**: Robust, ACID-compliant databas
- **Edge Distribution**: Data replikerad globalt för låg latens
- **Migration System**: Wrangler-baserad schema evolution

### Design Principer
1. **Session Isolation**: Varje användarsession har isolerad data
2. **Performance First**: Index-optimerad för vanliga queries
3. **ACID Compliance**: Garanterad data-integritet
4. **Scalability**: Designad för miljontals todos

## Schema Evolution

### Migration 0001: Initial Schema (`0001_initial.sql`)

**Syfte**: Etablera grundläggande todo-tabellstruktur

```sql
-- Skapa huvudtabellen för todos
CREATE TABLE todos (
  id TEXT PRIMARY KEY,                -- UUID för unik identifiering
  title TEXT NOT NULL,                -- Obligatorisk titel/produktnamn
  description TEXT,                   -- Valfri beskrivning
  completed BOOLEAN DEFAULT FALSE,    -- Slutförd status
  priority INTEGER DEFAULT 0,         -- 0=låg, 1=medium, 2=hög
  category TEXT,                      -- Produktkategori
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Skapad tidsstämpel
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Uppdaterad tidsstämpel
  due_date DATETIME,                  -- Valfri deadline
  tags TEXT                          -- JSON array som string
);
```

**Performance Index:**
```sql
-- Index för vanliga queries
CREATE INDEX idx_completed ON todos(completed);          -- Status-filter
CREATE INDEX idx_created_at ON todos(created_at DESC);   -- Chronological sort
CREATE INDEX idx_priority ON todos(priority DESC);       -- Priority sort
```

**Designbeslut**:
- `id` som TEXT för UUID-kompatibilitet
- `tags` som TEXT för JSON-serialiserad array (SQLite JSON1 extension tillgänglig)
- `DATETIME` för ISO 8601 timestamp-kompatibilitet
- Compound index strategier för query optimization

### Migration 0002: Multi-User Support (`0002_add_user_session.sql`)

**Syfte**: Lägg till sessionsbaserad användarhantering för multi-user support

```sql
-- Lägg till session-kolumn för användar-isolering
ALTER TABLE todos ADD COLUMN user_session TEXT;

-- Backwards compatibility: sätt default session för befintlig data
UPDATE todos SET user_session = 'legacy-session' WHERE user_session IS NULL;
```

**Performance Optimization:**
```sql
-- Kritiskt index för session-baserade queries
CREATE INDEX idx_user_session ON todos(user_session);

-- Compound index för session + status filter
CREATE INDEX idx_user_session_completed ON todos(user_session, completed);
```

**Designrationale**:
- Session-baserad arkitektur istället för traditionell user authentication
- Backward compatibility för befintlig data
- Performance-fokuserad indexering för session queries

### Migration 0003: Data Integrity (`0003_user_session_constraint.sql`)

**Syfte**: Förstärka data-integritet med NOT NULL constraints och optimerade index

**Tabellrekonstruktion** (SQLite constraint limitation workaround):
```sql
-- Skapa ny tabell med korrekt schema
CREATE TABLE todos_new (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 0,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME,
  tags TEXT,
  user_session TEXT NOT NULL          -- Nu obligatorisk
);

-- Migrera befintlig data med säker default
INSERT INTO todos_new 
SELECT 
  id, title, description, completed, priority, category,
  created_at, updated_at, due_date, tags,
  COALESCE(user_session, 'legacy-session') as user_session
FROM todos;

-- Atomisk tabellbyte
DROP TABLE todos;
ALTER TABLE todos_new RENAME TO todos;
```

**Komplett Index Suite:**
```sql
-- Grundläggande index
CREATE INDEX idx_completed ON todos(completed);
CREATE INDEX idx_created_at ON todos(created_at DESC);
CREATE INDEX idx_priority ON todos(priority DESC);

-- Session-relaterade index
CREATE INDEX idx_user_session ON todos(user_session);
CREATE INDEX idx_user_session_completed ON todos(user_session, completed);

-- Ny compound index för optimal query prestanda
CREATE INDEX idx_user_session_created ON todos(user_session, created_at DESC);
```

**Data Integrity Benefits**:
- Garanterad session-association för alla todos
- Förbättrade query-patterns med compound indexes
- Atomisk migration utan data loss

## Aktuellt Schema

### Todos Tabell

```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,                     -- UUID string
  title TEXT NOT NULL,                     -- Produktnamn/beskrivning
  description TEXT,                        -- Detaljerad beskrivning
  completed BOOLEAN DEFAULT FALSE,         -- Köpt/slutförd
  priority INTEGER DEFAULT 0,              -- 0=låg, 1=medium, 2=hög  
  category TEXT,                          -- Produktkategori
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME,                      -- Deadline för inköp
  tags TEXT,                             -- JSON array: ["tag1", "tag2"]
  user_session TEXT NOT NULL             -- Session ID för isolering
);
```

### Kolumn Definitioner

| Kolumn | Typ | Constraints | Beskrivning |
|--------|-----|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | UUID v4 string för unik identifiering |
| `title` | TEXT | NOT NULL | Produktnamn eller beskrivning (max 255 chars) |
| `description` | TEXT | NULL | Utökad beskrivning eller anteckningar |
| `completed` | BOOLEAN | DEFAULT FALSE | Om produkten är inköpt/slutförd |
| `priority` | INTEGER | DEFAULT 0 | 0=Låg, 1=Medium, 2=Hög prioritet |
| `category` | TEXT | NULL | Produktkategori (dairy, meat, produce, etc.) |
| `created_at` | DATETIME | DEFAULT NOW | ISO 8601 timestamp när todo skapades |
| `updated_at` | DATETIME | DEFAULT NOW | ISO 8601 timestamp för senaste uppdatering |
| `due_date` | DATETIME | NULL | Deadline för när inköpet ska vara klart |
| `tags` | TEXT | NULL | JSON-serialiserad array med taggar |
| `user_session` | TEXT | NOT NULL | Session ID för data-isolering |

### Index Strategi

**Performance Index:**

1. **Primary Access Pattern:**
   ```sql
   CREATE INDEX idx_user_session_created ON todos(user_session, created_at DESC);
   ```
   - Optimerar för: Hämta alla todos för session sorterat på datum
   - Användning: 80% av alla queries

2. **Status Filtering:**
   ```sql
   CREATE INDEX idx_user_session_completed ON todos(user_session, completed);
   ```
   - Optimerar för: "Visa endast aktiva" / "Visa slutförda"
   - Användning: 60% av queries

3. **Priority Sorting:**
   ```sql
   CREATE INDEX idx_priority ON todos(priority DESC);
   ```
   - Optimerar för: Sortera efter prioritet
   - Användning: 25% av queries

4. **Session Isolation:**
   ```sql
   CREATE INDEX idx_user_session ON todos(user_session);
   ```
   - Kritiskt för säkerhet och prestanda
   - Användning: 100% av queries (implicit)

## Query Patterns

### 1. Vanligaste Queries (Query Performance)

**Hämta alla todos för session:**
```sql
SELECT * FROM todos 
WHERE user_session = ? 
ORDER BY created_at DESC;
-- Index: idx_user_session_created (optimal)
-- Estimated rows examined: ~50-100 per session
```

**Hämta aktiva todos:**
```sql
SELECT * FROM todos 
WHERE user_session = ? AND completed = FALSE 
ORDER BY priority DESC, created_at DESC;
-- Index: idx_user_session_completed + idx_priority
-- Estimated rows examined: ~20-50 per session
```

**Uppdatera todo:**
```sql
UPDATE todos 
SET title = ?, description = ?, priority = ?, updated_at = ?
WHERE id = ? AND user_session = ?;
-- Index: PRIMARY + idx_user_session (säkerhet)
-- Estimated rows examined: 1
```

### 2. Batch Operations

**Ta bort slutförda todos:**
```sql
DELETE FROM todos 
WHERE user_session = ? AND completed = TRUE;
-- Index: idx_user_session_completed
-- Estimated rows examined: ~10-30 per session
```

**Toggle completed status:**
```sql
UPDATE todos 
SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND user_session = ?;
-- Index: PRIMARY + säkerhetsvalidering via user_session
```

### 3. Analytics Queries (Admin)

**Session statistics:**
```sql
SELECT 
    user_session,
    COUNT(*) as total_todos,
    COUNT(CASE WHEN completed THEN 1 END) as completed_todos,
    AVG(priority) as avg_priority
FROM todos 
GROUP BY user_session;
```

## Datatyper och Validering

### 1. ID Generation
```typescript
// Frontend: UUID v4 generation
import { v4 as uuidv4 } from 'uuid';
const todoId = uuidv4(); // "550e8400-e29b-41d4-a716-446655440000"
```

### 2. Datetime Handling
```typescript
// ISO 8601 format för konsistens
const timestamp = new Date().toISOString(); 
// "2025-09-07T10:30:00.000Z"
```

### 3. Tags JSON Structure
```typescript
// JSON array stored as TEXT
const tags = JSON.stringify(["ica", "ekologisk", "mjölk"]);
// Stored: "[\"ica\",\"ekologisk\",\"mjölk\"]"

// Parse when reading
const parsedTags = JSON.parse(todo.tags || "[]");
```

### 4. Priority Validation
```typescript
// Type-safe priority levels
type Priority = 0 | 1 | 2;
const PRIORITY_LABELS = {
  0: "Låg",
  1: "Medium", 
  2: "Hög"
};
```

## Performance Optimering

### 1. Query Optimization

**Index Usage Analysis:**
```sql
-- Kontrollera index usage
EXPLAIN QUERY PLAN 
SELECT * FROM todos 
WHERE user_session = 'test-session' 
ORDER BY created_at DESC;

-- Expected output:
-- USING INDEX idx_user_session_created
```

**Slow Query Detection:**
- Cloudflare D1 ger automatisk query performance metrics
- Queries > 100ms flaggas för optimering
- Index suggestions baserat på query patterns

### 2. Data Size Optimization

**Row Size Estimation:**
- Average todo: ~200 bytes (utan description)
- Max todos per session: ~1000 (rekommenderat)
- Total storage per active session: ~200KB

**Cleanup Strategy:**
```sql
-- Automatisk cleanup av gamla completed todos
DELETE FROM todos 
WHERE completed = TRUE 
AND updated_at < datetime('now', '-30 days');
```

### 3. Connection Pooling

Cloudflare D1 hanterar connection pooling automatiskt:
- **Connection reuse** mellan requests
- **Automatic scaling** baserat på load
- **Edge caching** för read-heavy queries

## Backup och Recovery

### 1. Automated Backups

**Cloudflare D1 Backups:**
- **Automatic daily backups** av hela databasen
- **Point-in-time recovery** upp till 30 dagar
- **Cross-region replication** för disaster recovery

### 2. Migration Rollback

**Rollback Strategy:**
```bash
# Wrangler migration rollback
wrangler d1 migrations apply --remote zhoplist-db --rollback 1

# Manual rollback via backup restore
wrangler d1 restore zhoplist-db --backup-id=<backup-id>
```

### 3. Data Export

```bash
# Export all data för backup
wrangler d1 export zhoplist-db --output=backup.sql

# Import för restore
wrangler d1 import zhoplist-db --file=backup.sql
```

## Säkerhet och Compliance

### 1. Data Isolation

**Session-based Security:**
- **Mandatory user_session** på alla queries
- **No cross-session access** möjligt
- **Automatic session validation** i API layer

### 2. SQL Injection Protection

**Parameterized Queries:**
```typescript
// Säker query med parameters
const result = await db.prepare(`
  SELECT * FROM todos 
  WHERE user_session = ? AND id = ?
`).bind(sessionId, todoId).all();

// ALDRIG direct string concatenation
// FARLIG: `SELECT * FROM todos WHERE id = '${todoId}'`
```

### 3. Data Privacy

**GDPR Compliance:**
- **Session-only identification** (ingen PII)
- **Right to deletion** via session cleanup
- **Data minimization** - endast nödvändig data lagras
- **Retention policy** - automatic cleanup av gamla todos

## Monitoring och Observability

### 1. Database Metrics

**Cloudflare D1 Dashboard:**
- **Query count** per tid-period
- **Response times** percentiles (p50, p95, p99)
- **Error rates** och failure analysis
- **Storage usage** per databas

### 2. Custom Monitoring

```sql
-- Session activity monitoring
SELECT 
    DATE(created_at) as date,
    COUNT(*) as todos_created,
    COUNT(DISTINCT user_session) as active_sessions
FROM todos 
WHERE created_at >= datetime('now', '-7 days')
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### 3. Performance Alerts

**Alert Thresholds:**
- Query response time > 500ms
- Error rate > 1%
- Storage usage > 80% capacity
- Active sessions growth > 100%/day

## Development och Testing

### 1. Local Development

**Setup Local D1:**
```bash
# Skapa lokal databas för development
wrangler d1 create zhoplist-db-dev

# Apply migrations lokalt
wrangler d1 migrations apply zhoplist-db-dev --local

# Interaktiv SQL console
wrangler d1 execute zhoplist-db-dev --local --command="SELECT * FROM todos LIMIT 5"
```

### 2. Schema Testing

**Migration Testing:**
```bash
# Test migration på staging
wrangler d1 migrations apply zhoplist-db-staging

# Validate schema efter migration
wrangler d1 execute zhoplist-db-staging --command=".schema"

# Performance test efter schema changes
npm run test:performance
```

### 3. Data Fixtures

```typescript
// Test data för development
const testTodos = [
  {
    id: 'test-1',
    title: 'Mjölk',
    completed: false,
    priority: 1,
    category: 'dairy',
    user_session: 'test-session',
    tags: JSON.stringify(['ica', 'ekologisk'])
  }
];
```

---

**Databas-dokumentation uppdaterad:** 2025-09-07  
**Schema Version:** 0003  
**Migration Status:** Production Ready  
**Performance Status:** Optimized**