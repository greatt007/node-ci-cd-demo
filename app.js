const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node CI/CD demo!' });
});

module.exports = app;
