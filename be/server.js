const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

// Hardcoded list of items
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid, pass the decoded payload to the next middleware/route
    req.user = decoded;
    next();
  });
};

// Route to get the list of items
app.get('/items', validateToken, (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
