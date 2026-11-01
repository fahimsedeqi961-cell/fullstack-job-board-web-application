import { useState } from "react";
import { createContext } from "react";
import { login as loginUser, logout as logoutUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      setToken(data.accessToken);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("Loging in Error", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setToken("");
      setIsAuthenticated(false);
    } catch (err) {
      console.log("Error while loging", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
