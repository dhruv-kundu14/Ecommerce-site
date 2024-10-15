

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { MongoConnection, getDb } = require('../connection/mongo'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 5002;

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(uploadsDir)); // Serve static files from public/uploads

// Sanitize filename
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-z0-9.-]+/gi, '_').toLowerCase();
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    const safeFilename = sanitizeFilename(file.originalname);
    cb(null, `${Date.now()}-${safeFilename}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

// Connect to MongoDB
MongoConnection()
  .then(() => {
    // POST route to store product data with image
    app.post('/enterProducts', (req, res, next) => {
      upload.single('image')(req, res, async (err) => {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).json({ message: err.message });
        }

        console.log('Uploaded file:', req.file);
        console.log('Request body:', req.body);

        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
          const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            currency: req.body.currency,
            category: req.body.category,
            brand: req.body.brand,
            inStock: req.body.inStock === 'true',
            stockQuantity: req.body.stockQuantity,
            rating: req.body.rating,
            reviews: req.body.reviews,
            colors: req.body.colors,
            sizes: req.body.sizes,
            images: `/uploads/${req.file.filename}`, // Correct path
            tags: req.body.tags,
            dimensions: req.body.dimensions,
          };

          const result = await getDb().collection('userProducts').insertOne(productData);
          res.status(201).json({ message: 'Product inserted successfully', result });
        } catch (error) {
          console.error('Error saving product data:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });
    });

    // Route to get all products
    app.get('/getProducts', async (req, res) => {
      try {
        const products = await getDb().collection('userProducts').find({}).toArray();
        res.status(200).json(products); // Send the array of products
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
