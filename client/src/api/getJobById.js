import axios from "axios";

export const getJobById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/jobs/${id}`);
    return response.data;
  } catch (err) {
    console.log("Failed fetching job by id", err);
    throw err;
  }
};
