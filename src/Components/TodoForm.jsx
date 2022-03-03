import React, { useState, useEffect, useRef } from "react";

export default function TodoForm(props) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" data-cy="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add todo..."
        value={input}
        name="text"
        onChange={handleChange}
        ref={inputRef}
        data-cy="todo-input"
      />
      <button className="todo-button" data-cy="todo-btn" type="submit">
        Add
      </button>
    </form>
  );
}
