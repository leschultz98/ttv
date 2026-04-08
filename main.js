import { readFileSync } from 'fs';
import express from 'express';

// import parse, { HOST } from './sources/ttv.js';
import parse, { HOST } from './sources/wattpad.js';

const TITLE_REGEX = /<title>([\s\S]*?)<\/title>/;
const HTML = readFileSync('index.html', 'utf8');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('*all', async (req, res) => {
  const targetUrl = `${HOST}${req.path}`;

  const response = await fetch(targetUrl);
  const text = await response.text();

  const data = parse(text, req.path);
  data.__TITLE__ = text.match(TITLE_REGEX)[1];

  const result = Object.entries(data).reduce((acc, [key, value]) => acc.replaceAll(key, value), HTML);

  res.send(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('http://localhost:' + port);
});
