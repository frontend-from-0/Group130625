const http = require('node:http');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
  const randomNumber = Math.floor(Math.random() * 10);
  console.log('random number is', randomNumber);

  if (randomNumber % 2 === 0) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Success: got a even number. Number is ${randomNumber}`);
  } else {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Failure: the number is not even. Number is ${randomNumber}`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
