const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

// Sample secret key (in practice, store securely in an environment variable)
const SECRET_KEY = 'your-secret-key';

// Mock user data
const users = [
  { id: 1, username: 'testuser', password: '$2b$10$hash123' } // Assume password is hashed
];

app.use(express.json());

const fetchProtectedData = async () => {
    const token = localStorage.getItem('jwtToken');
  
    try {
      const response = await axios.get('http://localhost:3000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).send('User not found');
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid password');
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(3000, () => console.log('Server running on port 3000'));
