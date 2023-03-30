import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    isAuthenticated: boolean;
}

interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({ isAuthenticated: false });

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            navigate("/home");
        } else {
            setIsAuthenticated(false);
            navigate("/login");
        }
    }, [history]);

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
