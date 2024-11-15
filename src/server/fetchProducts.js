const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { MongoConnection, getDb } = require('../connection/mongo'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 5003;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(uploadsDir)); // Serve static files from public/uploads

MongoConnection()
  .then(() => {
    
    app.get('/api/products', async (req, res) => {
        try {
          const { size, price, color } = req.query; // Extract query parameters

          // Clean and parse price range
          const cleanPrice = price.replace(/\s+/g, '').trim();  // Remove all whitespaces
          const priceRange = cleanPrice.split(',').map(p => parseInt(p.trim())); // Convert price range to integers

          // Log the parameters for debugging
          console.log("Request parameters:", { size, cleanPrice, color });
          console.log("Price Range:", priceRange);

          const db = getDb(); // Get the database connection
          const productsCollection = db.collection('userProducts'); // Access the 'products' collection

          // Build the query object based on the provided parameters
          let query = {};

          // Handle the size filter
          if (size) {
            const sizeArray = size.split(',').map(s => s.trim()); // Convert size to an array
            query.sizes = { $in: sizeArray }; // Filter by size (single or multiple sizes)
          }

          // Handle the price filter
          if (price && priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1])) {
            query.price = { $gte: priceRange[0], $lte: priceRange[1] }; // Filter by price range
          }

          // Handle the color filter
          if (color) {
            const colorArray = color.split(',').map(c => c.trim()); // Convert color to an array
            query.colors = { $in: colorArray }; // Filter by color (single or multiple colors)
          }

          // Log the query to check the final query being used
          console.log("Final MongoDB Query:", query);

          // Fetch products based on the query
          const products = await productsCollection.find(query).toArray();

          // Send the response
          if (products.length === 0) {
            return res.status(404).json({ message: 'No products found matching the criteria' });
          }
          res.json({ products });
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });
      
    // Start the server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1); // Exit the application if unable to connect to the database
    });
