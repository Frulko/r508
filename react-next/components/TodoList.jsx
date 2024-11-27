import { config, getBaseUrl } from "@/config";
import { revalidateTag } from "next/cache";
import React from "react";

async function getData() {
  console.log('todos: load')
  const res = await fetch(getBaseUrl() + '/api/todos', {
    next: { tags: ['todos'] },
    cache: 'no-store',
  })
  return res.json()
}

async function TodoList() {
  const todos = await getData()

  async function createTodo(formData) {
    'use server'
    console.log('todos: create new one')
    const text = formData.get('text');
    await fetch(getBaseUrl() + "/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
      cache: 'no-store',
    })

    revalidateTag('todo');
  }

  return (
    <div className="container mx-auto flex items-center justify-center h-full">
      <div>
        <form action={createTodo} className="mb-8 flex flex-col items-start gap-2">
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
