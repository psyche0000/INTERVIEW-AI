import React, { createContext, useContext, useEffect, useState } from "react";

// Create the theme context.
export const ThemeContext = createContext();

// Theme provider component.
export function ThemeProvider({ children }) {
  // Store the current theme.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme changes to the document.
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark mode.
  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme context.
export function useTheme() {
  return useContext(ThemeContext);
}