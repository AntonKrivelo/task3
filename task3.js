const http = require('http');
const url = require('url');

const EMAIL_PATH = '/app/krivelo2017_mail_ru';

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  if (q.pathname === EMAIL_PATH) {
    const x = parseInt(q.query.x),
      y = parseInt(q.query.y);
    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
      res.end('NaN');
    } else {
      res.end(String(lcm(x, y)));
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}, path: ${EMAIL_PATH}?x={}&y={}`);
});
