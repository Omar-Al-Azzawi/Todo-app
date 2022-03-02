import React, { useState } from "react";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn React",
      completed: false,
    },
    {
      id: 2,
      text: "Learn Redux",
      completed: false,
    },
    {
      id: 3,
      text: "Learn Cypress",
      completed: false,
    },
  ]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(newTodos);
  };

  return (
    <div>
      <TodoForm onSubmit={addTodo} />
    </div>
  );
}
