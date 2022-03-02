import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export default function Todo({ todos, completeTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.completed ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div>
          <AiOutlineDelete />
          <FiEdit />
        </div>
      </div>
    );
  });
}
