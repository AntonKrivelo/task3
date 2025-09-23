const express = require('express');
const app = express();

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// нормализация параметров
function norm(v) {
  if (!v) return NaN;
  try {
    v = decodeURIComponent(v); // превращаем %7B12%7D -> {12}
  } catch (e) {
    return NaN;
  }
  v = v.replace(/[{}]/g, ''); // убираем фигурные скобки
  const n = parseInt(v, 10);
  return n > 0 ? n : NaN; // только натуральные числа
}

app.get('/app/krivelo2017_mail_ru', (req, res) => {
  const x = norm(req.query.x);
  const y = norm(req.query.y);
  if (isNaN(x) || isNaN(y)) {
    res.send('NaN');
  } else {
    res.send(String(lcm(x, y)));
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server running on port ' + port));
