const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>My First Node Page</title></head>');
    res.write(`<body><form method='POST' action='/message'><input type='text' name='message'/><button type='submit'>Send</button></form></body>`);
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method.toLocaleLowerCase() === 'post') {
    const body = [];
    req.on('data', (chunck) => {
      console.log(chunck);
      body.push(chunck);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
      console.log(parsedBody);
    })
    res.statusCode = 302; // redirection status
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Node Page</title></head>');
  res.write(`<body><h1>Welcome to my first node.js Server!</h1><h1>${JSON.stringify(req.headers)}</h1></body>`);
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someTxt: 'test text'
// }

// module.exports.handler = requestHandler;
// module.exports.someTxt = 'test text';

// exports.handler = requestHandler;
