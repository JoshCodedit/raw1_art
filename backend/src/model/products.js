import db from "../../database/db.js"; 
import { uploadToS3 } from "../utils/s3.js";  // Assuming this handles S3 logic

export async function addProducts(product, variants = []) {
    const { name, description, category, price, stock, imageUrl } = product;

    const productQuery = `
        INSERT INTO products (name, description, category, price, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    const variantQuery = `
        INSERT INTO variants (product_id, color, size, additional_price, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Start transaction
    try {
        // Insert product
        const productStmt = db.prepare(productQuery);
        const result = productStmt.run(name, description, category, price, stock);
        const productId = result.lastInsertRowid; // Get the product ID

        // Insert the image URL into the product_images table
        if (imageUrl) {
            const imageQuery = `
                INSERT INTO product_images (product_id, image_url)
                VALUES (?, ?)
            `;
            const imageStmt = db.prepare(imageQuery);
            imageStmt.run(productId, imageUrl);
        }

        // Insert variants if provided
        if (variants.length > 0) {
            const variantStmt = db.prepare(variantQuery);
            for (const variant of variants) {
                const { color, size, additional_price, stock: variantStock } = variant;
                variantStmt.run(productId, color, size, additional_price, variantStock);
            }
        }

        console.log("Product added successfully with or without variants.");
        return productId;  // Return the product ID after successful insertion

    } catch (err) {
        console.error("Error adding product:", err);
        throw err;
    }
}
