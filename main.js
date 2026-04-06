import express from 'express';

const HOST = 'https://truyen.tangthuvien.vn';
const REGEX = /<div class="box-chap[^>]*>([\s\S]*?)<\/div>/;

const app = express();

app.get('*splat', async (req, res) => {
  const path = req.params.splat.join('/');
  const targetUrl = `${HOST}${path}`;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    const match = text.match(REGEX);
    res.send(match[1]);
  } catch (err) {
    res.status(500);
  }
});

app.listen(process.env.PORT);
