import React from "react";

export const ThemeContext = React.createContext<{
    theme: string;
    toggleTheme: () => void;
    setTheme: (theme: string) => void;
}>({
    theme: localStorage.getItem("theme") || "light",
    toggleTheme: () => { },
    setTheme: () => { },
});
