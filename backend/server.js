const http = require('http');

let activeSession = {
  active: true,
  courseCode: 'BCS-301',
  otp: '4829',
  expiresIn: 120,
  markedByAyush: false
};

const server = http.createServer((req, res) => {
  // Enable CORS so frontend can talk to backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === '/api/session' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(activeSession));
  }

  if (req.url === '/api/session/generate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const { courseCode } = JSON.parse(body || '{}');
      activeSession = {
        active: true,
        courseCode: courseCode || 'BCS-301',
        otp: Math.floor(1000 + Math.random() * 9000).toString(),
        expiresIn: 120,
        markedByAyush: false
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, activeSession }));
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(5000, () => {
  console.log('SCMS Backend Server running on http://localhost:5000');
});