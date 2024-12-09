import React, { createContext, useState, ReactNode } from "react";
import { getUser } from "../service/users";

export interface Friend {
  _id: string;
  nome: string;
  usuario_id: string;
}

export interface User {
  _id: string;
  nome: string;
  email: string;
  amigos: Friend[];
}

// Define types for the context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  const getLoggedUser = async () => {
    try {
      const response = await getUser();
      setUser(response.usuario);
    } catch (err) {
      console.log("Erro ao puxar usuário:", user);
    }
  };

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    getLoggedUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!user && !!token) {
    getLoggedUser();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
