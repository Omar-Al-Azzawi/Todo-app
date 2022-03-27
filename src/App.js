import React, { useContext } from "react";
import TodoList from "./Components/TodoList";
import { MdOutlineDarkMode, MdWbSunny } from "react-icons/md";

import { ThemeContext } from "./context/theme";

import "./App.css";

function App() {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <div
      className="App"
      style={{ backgroundColor: theme.background, color: theme.color }}
    >
      <h1>TODO</h1>
      <button
        className="theme-btn"
        style={{ color: theme.color, transition: "all 1s ease" }}
        onClick={toggleTheme}
      >
        {isDark ? <MdWbSunny /> : <MdOutlineDarkMode />}
      </button>
      <TodoList />
    </div>
  );
}

export default App;
