import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export default function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({ id: null, value: "" });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.completed ? "todo-row complete" : "todo-row"}
        data-cy="todo-row"
        key={index}
      >
        <div
          data-cy="todo-text"
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
        >
          {todo.text}
        </div>
        <div>
          <AiOutlineDelete
            className="delete-icon"
            data-cy="delete-icon"
            onClick={() => removeTodo(todo.id)}
          />
          <FiEdit
            className="edit-icon"
            data-cy="edit-icon"
            onClick={() =>
              setEdit({
                id: todo.id,
                value: todo.text,
              })
            }
          />
        </div>
      </div>
    );
  });
}
