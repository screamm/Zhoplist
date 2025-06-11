-- Add user_session column to todos table for multi-user support
-- This enables hybrid sessionID + manual list-code functionality

ALTER TABLE todos ADD COLUMN user_session TEXT;

-- Update existing todos to have a default session
-- This ensures existing data works with new system
UPDATE todos SET user_session = 'legacy-session' WHERE user_session IS NULL;

-- Now make it NOT NULL
-- We do this after setting default values to avoid constraint errors
-- (SQLite doesn't support NOT NULL in ALTER TABLE directly)

-- Create new index for user_session filtering (critical for performance)
CREATE INDEX idx_user_session ON todos(user_session);

-- Combined index for better query performance when filtering by user and status
CREATE INDEX idx_user_session_completed ON todos(user_session, completed); 