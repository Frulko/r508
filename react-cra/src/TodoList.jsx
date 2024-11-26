import React, { useEffect } from "react";

function TodoList(props) {
  const [todos, setTodos] = React.useState([]);

  const loadTodos = () => {
    console.log('todos: load')
    fetch("http://localhost:8080/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmit = (e) => {
    console.log('todos: create new one')
    e.preventDefault();
    const text = e.target.text.value;

    fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }).then(() => {
      loadTodos();
    });

  };

  return (
    <div className="container mx-auto flex items-center justify-center h-full">
      <div>
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-start gap-2">
          <label htmlFor="text" className="flex flex-col">
            <span>Todo: </span>
            <input type="text" name="text" id="text" className="rounded-md border-black border" />
          </label>

          <button type="submit" className="bg-emerald-400 px-2 py-1 rounded">Ajouter</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="text-2xl text-black">
              - {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
