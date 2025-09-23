// task3.js
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 8000;
const PATH = '/app/krivelo2017_mail_ru';

function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}
function lcm(a, b) {
  return a > 0 && b > 0 ? (a / gcd(a, b)) * b : 0;
}

function norm(v) {
  if (!v) return NaN;
  v = v.replace(/[{}]/g, ''); // убрать фигурные скобки если есть
  if (!/^[1-9]\d*$/.test(v)) return NaN;
  return Number(v);
}

const srv = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  if (q.pathname !== PATH) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('NaN');
    return;
  }
  const x = norm(q.query.x);
  const y = norm(q.query.y);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('NaN');
    return;
  }
  const out = String(lcm(x, y));
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(out);
});

srv.listen(PORT, () => console.log(`listening ${PORT} ${PATH}?x={}&y={}`));
