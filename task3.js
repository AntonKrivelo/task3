// task3.js — Node.js HTTP GET сервер для НОК
const http = require('http');
const url = require('url');

// Порт можно оставить локальный, для демонстрации
const PORT = 8000;

// Путь, соответствующий email
const EMAIL_PATH = '/app/krivelo2017_mail_ru'; // email: krivelo2017@mail.ru → krivelo2017_mail_ru

// Вычисление НОД и НОК
function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}
function lcm(a, b) {
  return a > 0 && b > 0 ? (a / gcd(a, b)) * b : 0;
}

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  if (q.pathname !== EMAIL_PATH) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('NaN');
    return;
  }
  let x = q.query.x,
    y = q.query.y;
  let n = /^[1-9]\d*$/.test(x) ? parseInt(x) : NaN;
  let m = /^[1-9]\d*$/.test(y) ? parseInt(y) : NaN;
  let out = !isNaN(n) && !isNaN(m) ? lcm(n, m).toString() : 'NaN';
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(out);
});

server.listen(PORT, () =>
  console.log(`Server running locally: http://localhost:${PORT}${EMAIL_PATH}?x={}&y={}`),
);
