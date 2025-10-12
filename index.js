// index.js — clean version for SonarQube testing
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Utility function with clear naming and low complexity
function calculateSum(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Safe endpoint: returns a greeting
app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js App! by Ahmed Shabaan');
});

// Safe endpoint: returns sum of numbers from query
app.get('/sum', (req, res) => {
  const values = req.query.values;
  if (!values) {
    return res.status(400).send('Missing values parameter');
  }

  const numbers = values.split(',').map(Number);
  if (numbers.some(isNaN)) {
    return res.status(400).send('Invalid number format');
  }

  const result = calculateSum(numbers);
  res.send(`Sum: ${result}`);
});

// Safe endpoint: echoes sanitized input
app.post('/echo', (req, res) => {
  const { message } = req.body;
  if (typeof message !== 'string') {
    return res.status(400).send('Invalid message');
  }

  const sanitized = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  res.send(`Echo: ${sanitized}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
