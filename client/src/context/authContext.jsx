import { useState } from "react";
import { createContext } from "react";
import {
  login as loginUser,
  logout as logoutUser,
  register,
} from "../api/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Register
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
      console.log("In the authcontext:", email, password);
      const data = await loginUser(email, password);
      setToken(data.accessToken);
      setIsAuthenticated(true);
      setUser(data.user);
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
      setUser(null);
    } catch (err) {
      console.log("Error while loging", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, registerUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
