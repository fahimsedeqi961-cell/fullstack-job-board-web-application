import axios from "axios";

export const login = async (email, password) => {
  try {
    console.log("inside the login api", email, password);
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    console.log("Error loging in", err);
    throw err;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    console.log("Error registering user");
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    console.log("Error loging out ", err);
    throw err;
  }
};
