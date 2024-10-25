BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique identifier for each user
    email TEXT UNIQUE NOT NULL,              -- User's email (unique)
    hashed_password TEXT NOT NULL,           -- User's hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the user was created
);

COMMIT;