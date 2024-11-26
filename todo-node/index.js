// index.js
import http from "node:http";

const todos = [
  { text: "Apprendre Node.js" },
  { text: "Créer une API" },
];

const server = http.createServer(async (req, res) => {
  const method = req.method;

  if (req.url.includes("/api/todos")) {
    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const todo = JSON.parse(body);
        todos.push(todo);
        res.end(JSON.stringify(todos));
      });
    }


    if (method === "GET") {
      res.end(JSON.stringify(todos));
    }
  }

  return new Response("404!");
});

server.listen(8080);
