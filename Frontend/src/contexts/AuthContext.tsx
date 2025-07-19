import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("sisotica-auth");
    });

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("sisotica-auth", "1");
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("sisotica-auth");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return ctx;
}
