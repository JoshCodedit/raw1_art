BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    email TEXT UNIQUE NOT NULL,              
    hashed_password TEXT NOT NULL,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(24) PRIMARY KEY, -- Adjusted to accommodate Base64 encoding
    user_id INTEGER NOT NULL,    -- This references the users table
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- Ensures session is removed if user is deleted
);

COMMIT;
