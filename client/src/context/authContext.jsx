import { useState, useEffect } from "react";
import { createContext } from "react";
import {
  login as loginUser,
  logout as logoutUser,
  refreshToken,
  register,
} from "../api/auth";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Register A user
  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password);
      console.log("User registered successfully!");
      return data;
    } catch (err) {
      console.log("Error registering user", err);
      throw err;
    }
  };

  // Login

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const decoded = jwtDecode(data.accessToken);
      setToken(data.accessToken);
      setUser({
        id: decoded.id,
        username: decoded.username,
      });
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      console.log("Loging in Error", err);
      throw err;
    }
  };
  // Log out a user
  const logout = async () => {
    try {
      await logoutUser();
      setToken("");
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.log("Error while loging", err);
      throw err;
    }
  };

  // Access new access token
  const initializeAuth = async () => {
    try {
      const data = await refreshToken();
      setToken(data.accessToken);
      const decoded = jwtDecode(data.accessToken);
      setUser({
        id: decoded.id,
        username: decoded.username,
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.log("Errot fetching new access token", err);
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        registerUser,
        user,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
