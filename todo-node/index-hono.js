import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const todos = [
  { text: "Apprendre Node.js & Hono" },
  { text: "Créer une API" },
];

const app = new Hono();

app.get('/api/todos', (c) => {
  return c.json(todos);
});

app.post('/api/todos', async (c) => {
  const todo = await c.req.json();
  todos.push(todo);
  return c.json(todos);
});


serve({
  fetch: app.fetch,
  port: 8080,
});
