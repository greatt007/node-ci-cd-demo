const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: '🎉 Hello from GitHub Actions CI/CD!',
    timestamp: new Date().toISOString(),
    github_sha: process.env.GITHUB_SHA || 'local'
  });
});

app.listen(PORT, () => {
  console.log(🚀 Server running on port ${PORT});
});