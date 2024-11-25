export function addProducts(product, variants = []) {
    const { name, description, category, price, stock } = product;

    const productQuery = `
        INSERT INTO products (c)
        VALUES (?, ?, ?, ?, ?)
    `;
    //optional
    const variantQuery = `
        INSERT INTO variants (product_id, color, size, additional_price, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        // Begin transaction
        db.transaction(() => {
            // Insert the product into the products table
            const productStmt = db.prepare(productQuery);
            const result = productStmt.run(name, description, category, price, stock);
            const productId = result.lastInsertRowid; // Get the product's ID

            // Check if there are variants
            if (variants.length > 0) {
                // Insert variants only if provided
                const variantStmt = db.prepare(variantQuery);
                for (const variant of variants) {
                    const { color, size, additional_price, stock: variantStock } = variant;
                    variantStmt.run(productId, color, size, additional_price, variantStock);
                }
            }
        })();

        console.log("Product added successfully with or without variants.");
    } catch (err) {
        console.error("Error adding product:", err);
        throw err;
    }
}
