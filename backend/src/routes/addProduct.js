import { uploadToS3 } from "../utils/s3.js";  // Assuming this handles S3 logic
import multiparty from 'multiparty';
import { addProducts } from "../model/products.js";

// This will handle the product and image upload
export const addProduct = (req, res) => {
    const form = new multiparty.Form();  // Initialize multiparty form handler

    // Parse the incoming request
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form data:", err);
            return res.status(400).json({ error: "Error parsing form data" });
        }

        // Get the form fields and the uploaded image
        const { name, description, category, price, stock, variants } = fields;
        const image = files.image ? files.image[0] : null;  // Access the uploaded image (assuming "image" is the field name)

        // Validate required fields
        if (!name || !category || price == null || stock == null) {
            return res.status(400).json({ error: "Missing required product fields." });
        }

        // Validate image presence
        if (!image) {
            return res.status(400).json({ error: "No image uploaded." });
        }

        try {
            // Upload the image to S3 and get the image URL
            const imageUrl = await uploadToS3(image.path, image.originalFilename);

            // Parse and prepare variants if provided
            let parsedVariants = [];
            if (variants) {
                parsedVariants = JSON.parse(variants[0]); // Assuming variants are sent as a JSON string
                if (!Array.isArray(parsedVariants)) {
                    throw new Error("Variants must be an array.");
                }
            }

            // Add the product to the database, including the image URL
            await addProducts(
                { 
                    name: name[0], 
                    description: description ? description[0] : null, 
                    category: category[0], 
                    price: parseFloat(price[0]), 
                    stock: parseInt(stock[0], 10), 
                    imageUrl 
                },
                parsedVariants
            );

            return res.status(201).json({ message: "Product added successfully" });
        } catch (error) {
            console.error("Error adding product:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
};
