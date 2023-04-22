import jwt_decode from "jwt-decode";
import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Define a interface para o payload do token
interface ITokenPayload {
    exp: number;
}
interface IAuthContext {
    isAuthenticated: boolean;
}
const AuthContext = createContext<IAuthContext>({ isAuthenticated: false });


interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode<ITokenPayload>(token); // Decodifica o token e extrai o payload
            if (token) {
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAuthenticated(true);
                    navigate("/home");
                } // Verifica se o token ainda é válido
            } else {
                localStorage.removeItem("token"); // Remove o token expirado do armazenamento local
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate]);

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
