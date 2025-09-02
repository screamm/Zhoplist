-- Add NOT NULL constraint to user_session column
-- This ensures data integrity for session-based todo isolation

-- First, create a new table with the correct schema
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
  user_session TEXT NOT NULL
);

-- Copy all existing data to the new table
INSERT INTO todos_new 
SELECT 
  id, 
  title, 
  description, 
  completed, 
  priority, 
  category, 
  created_at, 
  updated_at, 
  due_date, 
  tags,
  COALESCE(user_session, 'legacy-session') as user_session
FROM todos;

-- Drop the old table
DROP TABLE todos;

-- Rename the new table
ALTER TABLE todos_new RENAME TO todos;

-- Recreate all indexes for optimal performance
CREATE INDEX idx_completed ON todos(completed);
CREATE INDEX idx_created_at ON todos(created_at DESC);
CREATE INDEX idx_priority ON todos(priority DESC);
CREATE INDEX idx_user_session ON todos(user_session);
CREATE INDEX idx_user_session_completed ON todos(user_session, completed);

-- Add a compound index for better query performance on user session + creation date
CREATE INDEX idx_user_session_created ON todos(user_session, created_at DESC);