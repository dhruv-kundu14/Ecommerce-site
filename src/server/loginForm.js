// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoConnection, getDb } = require('../connection/mongo'); // Ensure this path is correct
const mongoose = require('mongoose'); // Ensure mongoose is imported
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5001;

const jwtKey = 'E-cOmm';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
MongoConnection()
  .then(() => {
    // Define User schema and model
    const UserSchema = new mongoose.Schema({
      email: String,
      password: String, // In practice, this should be hashed
    });

    const User = mongoose.model('userData', UserSchema);

    // POST route for user registration
    app.post('/api/register', async (req, res) => {
      try {
        const userData = req?.body;
        const result = await getDb().collection('userData').insertOne(userData);
        res.status(201).json({ message: 'User registered successfully', result });
      } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // POST route for user login

    // app.post('/api/login', async (req, res) => {
    //   const { email, password } = req?.body;

    //   try {
    //     const user = await getDb().collection('userData').findOne({ email });
    //     if (!user) {
    //       return res.status(401).json({ message: 'Invalid email or password' });
    //     }
    //     if (user.password !== password) {
    //       return res.status(401).json({ message: 'Invalid email or password' });
    //     }

    //     res.status(200).json({ message: 'Login successful' });
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     res.status(500).json({ message: 'Internal Server Error' });
    //   }
    // });

    app.post("/api/login", async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const user = await getDb().collection("userData").findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
        if (user.password !== password) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        // Generate JWT token
        jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            console.error("Error generating token:", err);
            return res.status(500).json({ message: "Internal Server Error" });
          }
    
          // Send success response with token
          return res.status(200).json({ message: "Login successful", token });
        });
    
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
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
