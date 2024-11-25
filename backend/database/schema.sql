BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    email TEXT UNIQUE NOT NULL,              
    hashed_password TEXT NOT NULL,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(24) PRIMARY KEY, 
    user_id INTEGER NOT NULL,    
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price DECIMAL NOT NULL,
    stock INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,  
    color TEXT,                   
    size TEXT,                    
    additional_price DECIMAL DEFAULT 0, 
    stock INTEGER NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE 
);

CREATE TABLE product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

COMMIT;
