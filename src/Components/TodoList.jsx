import React, { useState } from "react";
import Todo from "./Todo";
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

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
    alert(`Todo ${id} removed`);
  };

  const updateTodos = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) => {
      return prev.map((item) => (item.id === todoId ? newValue : item));
    });
  };

  const completeTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  const todoLength = todos.length;
  const completedLength = todos.filter((todo) => todo.completed).length;

  return (
    <div data-cy="todo-list">
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodos}
      />
      <div className="todo_list_info">
        <h2>Todo: {todoLength - completedLength}</h2>
        <h2>completed: {completedLength}</h2>
      </div>
    </div>
  );
}
