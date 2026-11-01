import axios from "axios";

export const login = async ({ email, password }) => {
  try {
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
