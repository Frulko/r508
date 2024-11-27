import { createServer } from 'node:http';

const todos = [
  { text: 'Apprendre Node.js' },
  { text: 'Créer une API' }
];

const server = createServer((req, res) => {

  console.log(req.url, req.method);

  if (req.url === '/api/todos') {

    if (req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const todo = JSON.parse(body);
        todos.push(todo);
        console.log('-->', todos);
        res.end(JSON.stringify(todos));
      });
    }

    console.log('--> GET', todos);


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos, null, 2));
    return;
  }

  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});