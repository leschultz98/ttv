import { readFileSync } from 'fs';
import express from 'express';

const HOST = 'https://truyen.tangthuvien.vn';

const TITLE_REGEX = /<title>([\s\S]*?)<\/title>/;
const CONTENT_REGEX = /<div class="box-chap[^>]*>([\s\S]*?)<\/div>/;

const HTML = readFileSync('index.html', 'utf8');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('*all', async (req, res) => {
  const targetUrl = `${HOST}${req.path}`;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();

    const title = text.match(TITLE_REGEX)[1];
    const content = text.match(CONTENT_REGEX)[1].trim();

    res.send(HTML.replace('__TITLE__', title).replace('__CONTENT__', content));
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000);
