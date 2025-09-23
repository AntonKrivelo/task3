// task3.js - без внешних зависимостей, устойчивый к ошибкам
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 8000;
const PATH = '/app/krivelo2017_mail_ru';

function gcdBig(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) {
    let t = a % b;
    a = b;
    b = t;
  }
  return a;
}
function lcmBig(a, b) {
  if (a === 0n || b === 0n) return 0n;
  return (a / gcdBig(a, b)) * b;
}

function normRaw(v) {
  if (v == null) return NaN;
  try {
    v = decodeURIComponent(String(v));
  } catch (e) {
    return NaN;
  }
  v = v.replace(/[{}\s]/g, ''); // убрать фигурные скобки и пробелы
  if (!/^[1-9]\d*$/.test(v)) return NaN;
  try {
    return BigInt(v);
  } catch (e) {
    return NaN;
  }
}

const srv = http.createServer((req, res) => {
  try {
    const q = url.parse(req.url, true);
    if (q.pathname !== PATH) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('NaN');
      return;
    }
    const xb = normRaw(q.query.x);
    const yb = normRaw(q.query.y);
    if (
      xb === NaN ||
      yb === NaN ||
      (typeof xb === 'number' && isNaN(xb)) ||
      (typeof yb === 'number' && isNaN(yb))
    ) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('NaN');
      return;
    }
    // оба должны быть BigInt
    if (typeof xb !== 'bigint' || typeof yb !== 'bigint') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('NaN');
      return;
    }
    const out = lcmBig(xb, yb).toString();
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(out);
  } catch (e) {
    // не даём процессу упасть — логируем в stdout/err и возвращаем NaN
    try {
      console.error('Handler error', e && e.stack ? e.stack : e);
    } catch (_) {}
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('NaN');
  }
});

srv.listen(PORT, () => console.log(`listening ${PORT} ${PATH}?x={}&y={}`));
