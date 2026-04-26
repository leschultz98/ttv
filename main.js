import http from 'http';
import { readFileSync } from 'fs';

const HOST = 'https://metruyenchu.com.vn';

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
      const response = await fetch(HOST + next, {
        headers: {
          cookie:
            '__RequestVerificationToken=LOmW0U1U7gMNevGealoHW1ayoI5Std0MqjgXGqMiEjUtiIozKHwHgbmv38Cz87mrKHPbQDkFmosWedHJEOhe5C505pl6i71Y5fPv39pz7ZY1; cf_clearance=dXDWTpscer3WG8FdCM5EQ_LHJ_8NL93sAj0zy.1WZ8M-1777188215-1.2.1.1-7x8SKH_cSaIklyC2vM7H6UUBaZYwjAVLfZuYrAJmfbpSe_fafgkz0gPYLuwn16UTnJLbCUKwfz1av5iujFvsoYz12gXK9qYMm_F.cbLlR2GWO8SBDwNyoqk58YwYyGH9p4.A_8OPOQu7.dTVg82I3upZqv0UDJxiJ29pTmv7gQtQas7bo2ONeFte_RVGrA4RqspdhAq_qbqeKXl6b7XI2sfKdS.bCKwVAWSgUDamL2lhsBnK6xEGUiBfVSQg5KHP1DfKM0555T8IsJEqMdhGbt9QIG.qRR2bSgDL1hTOV73Fi03_wxSgMC.b0_0atFNW6A957DgMnGfbgUr4DGZ9ZQ; _gc=4',
        },
      });
      const text = await response.text();
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
