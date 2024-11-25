import { addProducts } from "../model/products.js";

export const addProduct = async (req, res) => {
    const { name, description, category, price, stock, variants } = req.body;

    // Validate input
    if (!name || !category || price == null || stock == null) {
        return res.status(400).json({ error: "Missing required product fields." });
    }

    try {
        // Add the product with or without variants
        addProducts(
            { name, description, category, price, stock },
            variants || []
        );

        return res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
