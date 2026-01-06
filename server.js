const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello from Node CI/CD Demo!' }));
app.get('/health', (req, res) => res.json({ status: 'OK', time: new Date() }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;  // Export for tests
