import { useState, useRef } from "react";

export default function ProductForm() {
  const [variants, setVariants] = useState([{ color: "", size: "", price: 0, stock: 0 }]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Select a category",
    price: 0,
    stock: 0,
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: "", size: "", price: 0, stock: 0 }]);
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    if (formData.image) {
      data.append("image", formData.image);
    }

    variants.forEach((variant, index) => {
      if (variant.color) data.append(`variant-color[${index}]`, variant.color);
      if (variant.size) data.append(`variant-size[${index}]`, variant.size);
      if (variant.price >= 0) data.append(`variant-price[${index}]`, variant.price);
      if (variant.stock >= 0) data.append(`variant-stock[${index}]`, variant.stock);
    });

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "Select a category",
          price: 0,
          stock: 0,
          image: null,
        });
        setVariants([{ color: "", size: "", price: 0, stock: 0 }]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading product.");
    }
  };

  return (
    <form
      className="max-w-3xl mt-16 mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
      id="product-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="text-xl text-center font-bold text-gray-800">Add Products</h2>

      <div className="flex flex-col">
        <label htmlFor="product-name" className="text-sm font-medium text-gray-700">
          Product Name:
        </label>
        <input
          type="text"
          id="product-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label htmlFor="product-description" className="text-sm font-medium text-gray-700">
          Description:
        </label>
        <textarea
          id="product-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="product-category" className="text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          id="product-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Select a category">Select a category</option>
          <option value="hoodie">Hoodie</option>
          <option value="hat">Hat</option>
          <option value="t-shirt">T-shirt</option>
          <option value="canvas">Canvas</option>
          <option value="framed-poster">Framed Poster</option>
        </select>
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="product-price" className="text-sm font-medium mr-1 text-gray-700">
            Price: £
          </label>
          <input
            type="text"
            id="product-price"
            name="price"
            value={formData.price}
            onChange={(e) => {
              // Only allow numbers and one decimal point
              const value = e.target.value.replace(/[^0-9.]/g, '');
              // Ensure only one decimal point
              const decimalCount = (value.match(/\./g) || []).length;
              if (decimalCount <= 1) {
                setFormData(prev => ({
                  ...prev,
                  price: value
                }));
              }
            }}
            pattern="^\d*\.?\d{0,2}$"
            placeholder="0.00"
            required
            className="mt-1 border border-gray-400 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
      </div>

      {/* Variants Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Product Variants</h3>
        {variants.map((variant, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`variant-color-${index}`} className="text-sm font-medium mr-1 text-gray-700">
                  Color:
                </label>
                <input
                  type="text"
                  id={`variant-color-${index}`}
                  name="color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor={`variant-size-${index}`} className="text-sm font-medium mr-1 text-gray-700">
                  Size:
                </label>
                <select
                  id={`variant-size-${index}`}
                  name="size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="mt-1 border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
             
              <div>
                <label htmlFor={`variant-stock-${index}`} className="text-sm font-medium mr-1 text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  id={`variant-stock-${index}`}
                  name="stock"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="mt-1 p-1 border border-gray-400 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="product-image" className="text-sm font-medium text-gray-700">
          Product Image 
        </label>
        <input
          type="file"
          id="product-image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="mt-1 block"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 bg-user-dash-main text-white font-semibold rounded-md "
      >
        Add Product
      </button>
    </form>
  );
}
