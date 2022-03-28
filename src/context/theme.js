import { useState, useEffect, createContext } from "react";

const themes = {
  dark: {
    background: "#161a2b",
    color: "#fff",
    border: "#fff",
    text: "#fff",
  },
  light: {
    background: "#fff",
    color: "#1a202c",
    border: "#1a202c",
    text: "#1a202c",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem("theme"));
    if (localTheme) {
      setIsDark(localTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
