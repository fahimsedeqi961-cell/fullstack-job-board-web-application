import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

function Login() {
  const { login, logout, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login({ email, password });
      console.log("User loged in successfully", token);
    } catch (err) {
      console.log("Error loging in", err);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successfully");
    } catch (err) {
      console.log("Error while loging out", err);
      throw err;
    }
  };

  return (
    <>
      <h1
        onClick={() => handleLogin("fahim@gmail.com", "fahim123")}
        className="text-5xl font-bold text-center py-20"
      >
        Login
      </h1>

      <button
        className="text-center font-bold text-lg bg-blue-600 rounded-2xl text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}

export default Login;
