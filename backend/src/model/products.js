import db from "../../database/db.js"; 
import { uploadToS3 } from "../utils/s3.js";  // Assuming this handles S3 logic

export async function addProducts(product, variants = [], image = null) {
    const { name, description, category, price, stock } = product;

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

        // If image is provided, upload it to S3 and get the image URL
        let imageUrl = null;
        if (image) {
            const fileBuffer = image.data;  // Image data from request
            const fileName = `product-images/${Date.now()}-${image.name}`; // Generate unique file name
            imageUrl = await uploadToS3(fileBuffer, fileName);  // Upload image and get URL
        }

        // Insert the image URL into the product_images table
        if (imageUrl) {
            const imageQuery = `
                INSERT INTO product_images (product_id, image_url)
                VALUES (?, ?)
            `;
            const imageStmt = db.prepare(imageQuery);
            imageStmt.run(productId, imageUrl);  // Insert product_id and image_url
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
