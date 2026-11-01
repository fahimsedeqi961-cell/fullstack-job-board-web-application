import axios from "axios";

export const getProfile = async (token) => {
  try {
    const profile = await axios.get(
      "http://localhost:3000/api/v1/job-seeker/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return profile.data;
  } catch (err) {
    console.log("Error Fetching profile", err);
    throw err;
  }
};
