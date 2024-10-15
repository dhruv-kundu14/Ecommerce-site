import React, { useState } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [product, setProduct] = useState({
    name: '', 
    description: '', 
    price: '',
    currency: '' ,
    category: '' ,
    brand: '' ,
    inStock: false ,
    stockQuantity: '' ,
    rating: '' ,
    reviews: '' ,
    colors: '' ,
    sizes: '' ,
    tags: '' ,
    dimensions: '' ,
  });
  
  const [image, setImage] = useState(null); // State to hold the selected image

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a new FormData object
    // Append product data to FormData
    for (const key in product) {
      formData.append(key, product[key]);
    }
    
    if (image) {
      formData.append('image', image); // Append the image file to FormData
    }

    try {
      // Send the product data to the backend
      const response = await axios.post('http://localhost:5002/enterProducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      console.log('Product added:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label>
          Product Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>
        <br />

        {/* Price */}
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </label>
        <br />

        {/* Currency */}
        <label>
          Currency:
          <input type="text" name="currency" value={product.currency} onChange={handleChange} required />
        </label>
        <br />

        {/* Category */}
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </label>
        <br />

        {/* Brand */}
        <label>
          Brand:
          <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
        </label>
        <br />

        {/* Stock */}
        <label>
          In Stock:
          <input type="checkbox" name="inStock" checked={product.inStock} onChange={handleChange} />
        </label>
        <br />

        {/* Stock Quantity */}
        <label>
          Stock Quantity:
          <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} required />
        </label>
        <br />

        {/* Rating */}
        <label>
          Rating:
          <input type="number" name="rating" value={product.rating} onChange={handleChange} required />
        </label>
        <br />

        {/* Reviews */}
        <label>
          Reviews:
          <textarea name="reviews" value={product.reviews} onChange={handleChange} />
        </label>
        <br />

        {/* Colors */}
        <label>
          Colors:
          <input type="text" name="colors" value={product.colors} onChange={handleChange} />
        </label>
        <br />

        {/* Sizes */}
        <label>
          Sizes:
          <input type="text" name="sizes" value={product.sizes} onChange={handleChange} />
        </label>
        <br />

        {/* Images */}
        <label>
          Images:
          <input type="file" name="image" onChange={handleImageChange} required />
        </label>
        <br />

        {/* Tags */}
        <label>
          Tags:
          <input type="text" name="tags" value={product.tags} onChange={handleChange} />
        </label>
        <br />

        {/* Dimensions */}
        <label>
          Dimensions:
          <input type="text" name="dimensions" value={product.dimensions} onChange={handleChange} />
        </label>
        <br />

        {/* Description */}
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </label>
        <br />

        {/* Submit Button */}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Pricing;
