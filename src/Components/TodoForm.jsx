import React, { useState } from "react";

export default function TodoForm() {
  const [input, setInput] = useState("");

  return (
    <form className="todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Add todo"
        value={input}
        name="text"
      />
      <button className="todo-button" type="submit">
        Add
      </button>
    </form>
  );
}
