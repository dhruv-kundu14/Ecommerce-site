
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoConnection, getDb } = require('../connection/mongo'); // Ensure this path is correct

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
MongoConnection()
  .then(() => {
    // POST route to store registration data
    app.post('/api/register', async (req, res) => {
      try {
        const userData = req?.body;

        // You can add validation here if needed

        const result = await getDb().collection('userData').insertOne(userData);
        res.status(201).json({ message: 'User registered successfully', result });
      } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // Start the server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the application if unable to connect to the database
  });
