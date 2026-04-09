import http from 'http';
import { readFileSync } from 'fs';

const HOST = 'https://wattpad.com.vn';

const server = http.createServer(async (req, res) => {
  switch (true) {
    case req.url === '/favicon.ico': {
      res.writeHead(204, {
        'Cache-Control': 'public, max-age=31536000, immutable',
      });
      return res.end();
    }

    case req.url.startsWith('/api'): {
      const response = await fetch(HOST + req.url.slice(4));
      const text = await response.text();
      res.writeHead(200);
      res.end(text);
      break;
    }

    default:
      const template = req.url === '/' ? 'index.html' : 'webnovel.html';
      const data = readFileSync('templates/' + template);
      res.writeHead(200);
      res.end(data);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
