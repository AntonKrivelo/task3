const express = require('express');
const app = express();

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

app.get('/app/krivelo2017_mail_ru', (req, res) => {
  let { x, y } = req.query;

  // убираем фигурные скобки если есть
  if (x) x = x.replace(/[{}]/g, '');
  if (y) y = y.replace(/[{}]/g, '');

  const a = Number(x);
  const b = Number(y);

  if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 0 || b <= 0) {
    return res.send('NaN');
  }

  res.send(String(lcm(a, b)));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
