const express = require('express');
const app = express();
const port = 3000;

// مشكلة: متغير مش مستخدم
const unusedVariable = "I am not used";

// مشكلة: console.log كتير
console.log('Starting the app...');

// مشكلة: security risk باستخدام eval
app.get('/eval', (req, res) => {
  const userInput = req.query.code || '2+2';
  const result = eval(userInput); // BAD PRACTICE!
  res.send(`Result: ${result}`);
});

// مشكلة: دالة معقدة وطويلة
function complexFunction(a, b, c, d, e, f, g) {
  if(a > 0 && b > 0 && c > 0 && d > 0 && e > 0 && f > 0 && g > 0){
    return a+b+c+d+e+f+g;
  } else if(a<0 || b<0 || c<0 || d<0 || e<0 || f<0 || g<0){
    return a*b*c*d*e*f*g;
  }
  return 0;
}

// مشكلة: child_process.exec بدون validation => security risk
const { exec } = require('child_process');
app.get('/exec', (req, res) => {
  const cmd = req.query.cmd || 'ls';
  exec(cmd, (err, stdout, stderr) => {
    res.send(`Output: ${stdout}`);
  });
});

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Node.js App! by Ahmed shabaan');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});