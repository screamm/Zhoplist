-- Create todos table according to our specification
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 0, -- 0=low, 1=medium, 2=high
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME,
  tags TEXT -- JSON array as string
);

-- Create indexes for better performance
CREATE INDEX idx_completed ON todos(completed);
CREATE INDEX idx_created_at ON todos(created_at DESC);
CREATE INDEX idx_priority ON todos(priority DESC); 