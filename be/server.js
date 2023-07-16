const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

require('dotenv').config();

const app = express();
const port = 8000;

const client = jwksClient({
  jwksUri:
    'https://login.microsoftonline.com/a4310d02-5ebc-4101-8b85-ab8a740dd294/discovery/v2.0/keys',
});

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
];

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    req.user = decoded;
    next();
  });
};

// Route to get the list of items
app.get('/items', validateToken, (req, res) => {
  // Process the request
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
