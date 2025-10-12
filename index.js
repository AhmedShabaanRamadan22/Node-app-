// index.js — intentionally vulnerable sample for SonarQube testing
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs'); // مكتبة مش مستخدمة
const app = express();
var insecureVar = 'bad practice'; // استخدام var بدل const/let
const port = 3000;

app.use(express.json());

// ----------------- Intentional issues -----------------
const unusedVariable = 'I am not used anywhere'; // unused var
let temp = 123; // poor naming

console.log('Starting vulnerable app...'); // debug log

// دالة طويلة ومعقدة جدًا
function complexFunction(a, b, c, d, e, f, g, h, i, j) {
  if (a > 0 && b > 0 && c > 0 && d > 0 && e > 0 && f > 0 && g > 0 && h > 0 && i > 0 && j > 0) {
    return a + b + c + d + e + f + g + h + i + j;
  } else if (a < 0 || b < 0 || c < 0 || d < 0 || e < 0 || f < 0 || g < 0 || h < 0 || i < 0 || j < 0) {
    return a * b * c * d * e * f * g * h * i * j;
  } else {
    if ((a === 0 && b === 0) || (c === 0 && d === 0)) {
      if (e === 0) {
        if (f === 0) {
          return 0;
        }
      }
    }
    return a - b - c - d - e - f - g - h - i - j;
  }
}

// ❌ XSS vulnerability
app.get('/xss', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello ${name}</h1>`); // بدون sanitize
});

// ❌ RCE vulnerability
app.get('/eval', (req, res) => {
  const userInput = req.query.code || '2+2';
  console.log('Received eval request with:', userInput);
  try {
    const result = eval(userInput); // خطر كبير
    res.send(`Result: ${result}`);
  } catch (err) {
    res.status(500).send('Error executing code');
  }
});

// ❌ RCE via POST
app.post('/run', (req, res) => {
  const code = req.body.code;
  console.log('/run invoked with body:', req.body);
  try {
    const result = eval(code); // خطر أكبر
    res.send(`Result: ${result}`);
  } catch (err) {
    res.status(500).send('Error in execution');
  }
});

// ❌ Command Injection
app.get('/exec', (req, res) => {
  const cmd = req.query.cmd || 'ls -la';
  console.log('Executing command:', cmd);
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(`Exec error: ${err.message}`);
    }
    res.send(`Output:\n${stdout || stderr}`);
  });
});

// ❌ عدم التعامل مع الأخطاء
app.get('/error', (req, res) => {
  throw new Error('Unexpected!');
});

// ❌ استخدام res بدون تحقق من الحالة
app.get('/badresponse', (req, res) => {
  res.status(200);
  res.send(); // بدون محتوى
});

// ❌ دالة بدون اسم واضح
function doStuff(x) {
  return x * 2;
}

// ❌ دالة غير مستخدمة
function unusedFunction() {
  console.log('I am never called');
}

// ❌ endpoint بدون تحقق من نوع البيانات
app.post('/data', (req, res) => {
  const input = req.body.input;
  res.send(`Received: ${input}`);
});

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js App! by Ahmed shabaan');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
