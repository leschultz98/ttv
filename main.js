import http from 'http';
import { readFileSync, existsSync } from 'fs';
import puppeteer from 'puppeteer';

const path = puppeteer.executablePath();

console.log('Chrome path:', path);
console.log('Exists:', existsSync(path));

const HOST = 'https://metruyenchu.com.vn';

const browser = await puppeteer.launch();
const page = await browser.newPage();

let last, next;

const server = http.createServer(async (req, res) => {
  switch (true) {
    case req.url === '/favicon.ico': {
      res.writeHead(204, { 'Cache-Control': 'public, max-age=31536000, immutable' });
      return res.end();
    }

    case req.url.startsWith('/api'): {
      last = next;
      next = req.url.slice(4);
      // const response = await fetch(HOST + next);
      // const text = await response.text();
      await page.goto(HOST + next);
      await page.waitForSelector('.truyen');
      const text = await page.content();
      res.writeHead(200);
      return res.end(text);
    }

    case req.url === '/last':
      res.writeHead(302, { Location: last || '/' });
      return res.end();

    default: {
      last = next = req.url;
      const template = req.url === '/' ? 'index.html' : 'webnovel.html';
      const data = readFileSync('templates/' + template);
      res.writeHead(200);
      res.end(data);
    }
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
