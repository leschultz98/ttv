import { readFileSync } from 'fs';
import express from 'express';

const HOST = 'https://truyen.tangthuvien.vn';

const TITLE_REGEX = /<title>([\s\S]*?)<\/title>/;
const CONTENT_REGEX = /<div class="box-chap[^>]*>([\s\S]*?)<\/div>/;
const NUMBER_REGEX = /chuong-(\d+)$/;

const HTML = readFileSync('index.html', 'utf8');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('*all', async (req, res) => {
  const number = +req.path.match(NUMBER_REGEX)?.[1];

  if (isNaN(number)) {
    res.redirect('/');
    return;
  }

  const targetUrl = `${HOST}${req.path}`;

  const response = await fetch(targetUrl, { redirect: 'manual' });

  if (response.status === 302) {
    res.redirect('/');
    return;
  }

  const text = await response.text();
  const data = {
    __TITLE__: text.match(TITLE_REGEX)[1],
    __CONTENT__: text.match(CONTENT_REGEX)[1].trim(),
    __PREVIOUS__: req.path.replace(NUMBER_REGEX, 'chuong-' + (number - 1)),
    __NEXT__: req.path.replace(NUMBER_REGEX, 'chuong-' + (number + 1)),
  };

  const result = Object.entries(data).reduce((acc, [key, value]) => acc.replaceAll(key, value), HTML);

  res.send(result);
});

app.listen(process.env.PORT || 3000);
