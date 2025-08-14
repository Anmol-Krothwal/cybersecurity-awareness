import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("cyber");

  const themeStyles = {
    cyber: "from-blue-100 to-purple-100",
    rainbow: "from-pink-200 via-yellow-200 to-blue-200",
    hacker: "from-black to-green-900 text-green-300",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
