const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit(); // stops Event loop > stops listener
  res.setHeader('Content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Node Page</title></head>');
  res.write(`<body><h1>Welcome to my first node.js Server!</h1><h1>${JSON.stringify(req.headers)}</h1></body>`);
  res.write('</html>');
  res.end();
});

server.listen(3000);