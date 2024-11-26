

const todos = [
  { text: 'Apprendre Bun' },
  { text: 'Créer une API' }
];

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    if (url.pathname === "/api/todos") {
      if (method === "GET") {
        return new Response(JSON.stringify(todos));
      }
      if (method === "POST") {
        const body = await req.json()
        todos.push(body);
        return new Response(JSON.stringify(todos));
      }
    }

    return new Response("404!");
  },
});
